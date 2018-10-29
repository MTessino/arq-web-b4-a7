import { Injectable } from '@angular/core';
import { ErrorHandler } from '../../core/http/error-handler.service';
import { Pais } from '../modelo/pais.model';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PaisService {
  private url = '/paises';

  constructor(private http: HttpClient,
              private errorHandler: ErrorHandler) {
  }

  public obtenerPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(this.url).pipe(
        catchError(this.errorHandler.handle));
  }
}
