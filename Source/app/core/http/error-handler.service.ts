import { Injectable } from '@angular/core';
import { LoggerService } from '../logger.service';
import { throwError } from 'rxjs/internal/observable/throwError';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Error } from './error.model';

@Injectable()
export class ErrorHandler {

  constructor(private logger: LoggerService) {
  }

  public handle(error: HttpResponse<Error> | any) {
    console.log(error);
    if (error instanceof HttpErrorResponse) {
      let body = error.error;
      if (error.status === 400) {
        return throwError(body.errores.map((error) => error.titulo));
      }
    }
    if (typeof error == 'string') {
      this.logger.error(error);
    }
    return throwError(['Se ha producido un inconveniente.']);
  }
}
