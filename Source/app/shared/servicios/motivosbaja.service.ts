import { Observable } from 'rxjs';
import { ErrorHandler} from '../../core/http/error-handler.service';
import { List } from 'lodash';
import { MotivoBaja } from '../modelo/motivoBaja.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()

export class MotivosBajaService {
  public url: string = '/MotivosBaja';

  constructor(private http: HttpClient, private errorHandler: ErrorHandler) {
  }

  public consultarMotivosBaja(): Observable<List<MotivoBaja>> {
    return this.http.get<List<MotivoBaja>>(this.url).pipe(
      catchError(this.errorHandler.handle));
  }
}
