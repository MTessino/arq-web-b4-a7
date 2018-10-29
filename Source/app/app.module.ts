import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from 'environments/environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { HomeComponent } from './home';
import { PageNotFoundComponent } from './not-found/not-found.component';

// MODULES
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { GrupoUnicoModule } from './grupo-unico/grupo-unico.module';

//BOOTSTRAP
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateShortParserFormatter } from './shared/ngb/ngb-date-formatter.service';

import '../styles/styles.scss';
import '../styles/headings.css';


import { SpinnerService } from './core/spinner/spinner.service';
import { AuthGuard } from './core/auth/auth-guard';


import { PerfilesModule } from './perfiles/perfiles.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ReqResInterceptor } from './core/http/req-res-interceptor.service';

// Application wide providers
const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
    AppState,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ReqResInterceptor,
        multi: true
    },
    {provide: NgbDateParserFormatter, useClass: NgbDateShortParserFormatter},
    AuthGuard
];

interface StoreType {
    state: InternalStateType;
    restoreInputValues: () => void;
    disposeOldHosts: () => void;
}

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        HomeComponent,
    ],
    /**
     * Import Angular's modules.
     */
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        CoreModule,
        RouterModule.forRoot(ROUTES, {
            useHash: Boolean(history.pushState) === false,
            preloadingStrategy: PreloadAllModules
        }),

        /**
         * This section will import the `DevModuleModule` only in certain build types.
         * When the module is not imported it will get tree shaked.
         * This is a simple example, a big app should probably implement some logic
         */
        //...environment.showDevModule ? [ DevModuleModule ] : [],
    ],
    /**
     * Expose our Services and Providers into Angular's dependency injection.
     */
    providers: [
        {provide: LOCALE_ID, useValue: 'es-AR'},
        environment.ENV_PROVIDERS,
        APP_PROVIDERS
    ]
})
export class AppModule {
}
