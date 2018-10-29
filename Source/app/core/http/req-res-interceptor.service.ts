import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { SpinnerService } from '../spinner/spinner.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable()
export class ReqResInterceptor implements HttpInterceptor {

  public pendingRequests: number = 0;

  constructor(private spinnerService: SpinnerService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.pendingRequests++;
      this.spinnerService.show();

      request = this.getUpdatedRequest(request);

      return next.handle(request).pipe(
          map(response =>
              this.handleResponse(response)),
          catchError( error => {
              this.handleError(error);
              return of(error);
          }));
  }

  private updateUrl(req: string) {
    return API_URL + req;
  }

  private getUpdatedRequest(request?: HttpRequest<any>): HttpRequest<any> {
    request = request.clone(
        {
            url: this.updateUrl(request.url)
        }
    );
    if (request.headers == null) {
      request = request.clone({
          setHeaders: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              }
          }
      );
    }
    if (this.token) {
        request = request.clone({
            setHeaders: {
                Authorization: 'Bearer ' + this.token
            }
        });
    }

    return request;
  }

  private get token(): string {
    return localStorage.getItem('auth_token');
  }

  private handleResponse(response: any) {
      this.pendingRequests--;
      this.updateSpinner();
      return of(response);
  }

  private handleError(error: HttpErrorResponse) {
      this.pendingRequests--;
      this.updateSpinner();

      if (error.status === 401 || error.status === 403) {
        delete localStorage['auth_token'];
      }
      return throwError(error);
  }

  private updateSpinner(): void {
    if (this.pendingRequests === 0) {
      this.spinnerService.hide();
    }
  }
}
