import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Token } from './modelos/token.model';
import { catchError, map, share, } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({providedIn: 'root'})
export class AuthService {

    private url = '/autenticacion/token';
    private usuarioInicioSesion = new BehaviorSubject<boolean>(this.hayUnToken());
    private grantType: string = 'cidi';

    constructor(private http: HttpClient) {
    }

    iniciarSesion(): Observable<boolean> {
        let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = {headers: headers};
        return this.http.post<Token>(this.url, this.urlEncoded(), options)
            .pipe(
                map(token  => {
                    localStorage.setItem('auth_token', token.accessToken);
                    this.usuarioInicioSesion.next(true);
                    return true;
                }),
                catchError(error => {
                    this.handleError(error);
                    return of(error);
                }));
    }

    private urlEncoded(): string {
        return `grant_type=${this.grantType}&client_id=${KEY_APP}`;
    }

    private hayUnToken(): boolean {
        return !!this.token();
    }

    public token(): String {
        return localStorage.getItem('auth_token');
    }

    public estaLogueado(): Observable<boolean> {
        return this.usuarioInicioSesion.asObservable().pipe(share());
    }

    private handleError<T>(result?: HttpErrorResponse) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            window.location.href = result.headers.get('x-auth-login-path') || '/';

            // TODO: better job of transforming error for user consumption
            //this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return throwError(result);
        };
    }
}
