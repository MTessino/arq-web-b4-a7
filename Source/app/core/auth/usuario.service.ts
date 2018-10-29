import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Permiso } from './modelos/permiso.model';
import { Usuario } from './modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError, find, first, flatMap, map, share } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable()
export class UsuarioService {

    private url = '/usuarios';
    private usuarioActual = new BehaviorSubject<Usuario>(null);
    private permisos = new BehaviorSubject<Permiso[]>([]);

    constructor(private http: HttpClient,
                private authService: AuthService) {

        authService
            .estaLogueado()
            .subscribe((valor) => {
                if (valor) {
                    this.consultarUsuario()
                        .subscribe((usuario) => {
                            this.usuarioActual.next(usuario);
                        });
                    this.consultarPermisos()
                        .subscribe((permisos) => {
                            this.permisos.next(permisos);
                        });
                } else {
                    this.usuarioActual.next(null);
                    this.permisos.next([]);
                    localStorage.removeItem('permission');
                    authService
                        .iniciarSesion()
                        .subscribe();
                }
            });
    }

    private consultarPermisos(): Observable<Permiso[]> {
        let funcionalidades = localStorage.getItem('permission');

        if (!funcionalidades) {
            return this.http
                .get<Permiso[]>(this.url + '/yo/permisos')
                .pipe(
                    map((permisos: Permiso[]) => {
                        this.guardarPermisos(permisos);
                        return of(permisos || []);
                    }),
                    catchError((error) => {
                        window.location.href = error.headers.get('x-auth-login-path') || '/';
                        return throwError(error);
                    }) as any);
        } else {
            let bytes = CryptoJS.AES.decrypt(funcionalidades, 'deRhGfhtDsFsdFsfsa');
            let localStoragePermisos = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            return of(localStoragePermisos);
        }
    }

    private guardarPermisos(resultado: Permiso[]): void {
        let allowed = CryptoJS.AES.encrypt(JSON.stringify(resultado), 'deRhGfhtDsFsdFsfsa').toString();

        localStorage.setItem('permission', allowed);
    }

    private consultarUsuario(): Observable<Usuario> {
        return this.http
            .get<Usuario>(this.url + '/yo')
            .pipe(
                catchError((res: Response) => {
                    window.location.href = res.headers.get('x-auth-login-path') || '/';
                    return throwError(res);
                }));
    }

    public obtenerUsuarioActual(): Observable<Usuario> {
        return this.usuarioActual.asObservable().pipe(share());
    }

    public tienePermiso(codigo: string): Observable<boolean> {
        return this.permisos
            .asObservable()
            .pipe(
                find((permisos: Permiso[]) => {
                    return permisos.some((permiso) => permiso.codigo === codigo);
                }),
                flatMap((permisos) => {
                    return of(permisos.length > 0);
                })
                , share());
    }

    public tienePermisoFuncionalidad(codigo: string): Observable<boolean> {
        return this.permisos
            .asObservable()
            .pipe(
                flatMap((permisos) => {
                    return of(permisos.some((permiso) => permiso.codigo === codigo));
                }),
                share());
    }

    public tienePermisoLista(codigos: string[]): Observable<boolean> {
        return this.permisos
            .asObservable()
            .pipe(
                first((permisos: Permiso[]) => {
                    return permisos.some((permiso) => {
                        return codigos.some((codigo) => {
                            return codigo === permiso.codigo;
                        });
                    });
                }),
                flatMap((permisos) => {
                    return of(permisos.length > 0);
                }),
                share());
    }
}
