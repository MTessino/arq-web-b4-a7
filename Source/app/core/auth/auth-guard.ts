import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlSegment
} from '@angular/router';
import { AuthService } from './auth.service';
import { UsuarioService } from './usuario.service';
import { catchError, concatMap, debounceTime, map } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService, private usuarioService: UsuarioService) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService
            .estaLogueado()
            .pipe(
                debounceTime(200),
                map((logueado) => {
                    if (!logueado) {
                        this.router.navigate(['/'], {queryParams: {returnUrl: state.url}});
                    }
                    return logueado;
                }), concatMap((logueado) => this.usuarioService.tienePermisoFuncionalidad(this.obtenerCodigoFuncionalidad(route.url))),
                map((tienePermiso) => tienePermiso),
                catchError(() => {
                    this.router.navigate(['/'], {queryParams: {returnUrl: state.url}});
                    return of(false);
                }));
    }

    private obtenerCodigoFuncionalidad(segmentosUrl: UrlSegment[]): string {
        let concat = '';
        for (let i = 0; i < segmentosUrl.length; i++) {
            if (isNaN(parseInt(segmentosUrl[i].path, 10))) {
                concat += '/' + segmentosUrl[i].path;
            } else {
                concat += '/:id';
            }
        }
        return concat;
    }
}
