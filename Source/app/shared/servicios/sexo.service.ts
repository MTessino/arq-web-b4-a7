import { Injectable } from '@angular/core';
import { ErrorHandler } from '../../core/http/error-handler.service';
import { Sexo } from '../modelo/sexo.model';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class SexoService {
  private url = '/sexos';

  constructor(private http: HttpClient,
              private errorHandler: ErrorHandler) {
  }

  public obtenerSexos(): Observable<Sexo[]> {
    return this.http.get<Sexo[]>(this.url).pipe(
      catchError(this.errorHandler.handle));
  }
}
