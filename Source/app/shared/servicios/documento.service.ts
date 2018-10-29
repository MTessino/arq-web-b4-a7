import { Injectable } from '@angular/core';
import { ErrorHandler } from '../../core/http/error-handler.service';
import { Documento } from '../modelo/documento.model';
import { HttpUtils } from '../http-utils';
import { Documentacion } from '../modelo/documentacion.model';
import { Pagina, PaginaUtils } from '../paginacion/pagina-utils';
import { DocumentoConsulta } from '../modelo/consultas/documento-consulta.model';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { pipe } from 'rxjs/internal-compatibility';

@Injectable()
export class DocumentoService {
    private url: string = '/documentaciones';

    constructor(private http: HttpClient, private errorHandler: ErrorHandler) {
    }

    public consultarHistorialArchivos(consulta: DocumentoConsulta): Observable<Pagina<Documento>> {
        return null;/*this.http.get<Documento>(this.url, {params: HttpUtils.insertarPrefijo(consulta)})
            .catch(this.errorHandler.handle);*/
    }

    public guardarDocumento(documentacion: Documentacion): Observable<number> {
        let formData = HttpUtils.createFormData(documentacion);

        return this.http
            .post<number>(this.url, formData, {headers: new HttpHeaders()}).pipe(
                catchError(this.errorHandler.handle));
    }

    public consultarDocumento(documentoId: number, idItem: number): Observable<any> {
        return this.http.get<any>(`${this.url}?idDocumento=${documentoId}&idItem=${idItem}`)
            .pipe(
                catchError(this.errorHandler.handle));
    }
}
