import { Injectable } from '@angular/core';
import { ErrorHandler } from '../../core/http/error-handler.service';
import { TipoDocumentacion } from '../modelo/tipo.documentacion.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TipoDocumentacionService {
  private url = '/documentaciones';

  constructor(private http: HttpClient,
              private errorHandler: ErrorHandler) {
  }

  public obtenerTiposDocumentacion(): Observable<TipoDocumentacion[]> {
    return this.http.get<TipoDocumentacion[]>(this.url + '/tipos-documentacion')
        .pipe(catchError(this.errorHandler.handle));
  }
}
