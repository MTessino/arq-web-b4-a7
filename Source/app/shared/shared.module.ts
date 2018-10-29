import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
/*
import { NotificacionService } from './notificacion.service';
import { ContenidoInformativoComponent } from './contenidos/contenido-informativo.component';*/
import { RouterModule } from '@angular/router';/*
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ControlMessagesComponent } from './forms/control-messages.component';
import { ControlMessageComponent } from './forms/control-message.component';
import { ErrorFeedbackDirective } from './forms/error-feedback.directive';
import { ContenidoConfirmacionComponent } from './contenidos/contenido-confirmacion.component';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { SafePipe } from './safe.pipe';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';*/
import { IfPermissionDirective } from './show-elemento/show-elemento.directive';
/*
import { NgSelectModule } from './forms/ng-select/ng-select.module';
import { ValidacionEdadesComponent } from './componentes/validacion-edades/validacion-edades.component';
import { ArchivoService } from './archivo.service';
import { SeleccionArchivoComponent } from './seleccion-archivo/seleccion-archivo.component';
import { ModalArchivoComponent } from './modal-archivo/modal-archivo.component';
import { DocumentoService } from './servicios/documento.service';
import { BusquedaPorPersonaComponent } from './componentes/busqueda-por-persona/busqueda-por-persona.component';
import { BusquedaSucursalBancariaComponent } from './componentes/busqueda-sucursal-bancaria/busqueda-sucursal-bancaria.component';
*/
/*import { DropMenuPermissionDirective } from './dropbox-menu-permission/drop-menu-permission.directive';*/

@NgModule({
  imports: [CommonModule,
    ReactiveFormsModule,/*
    ColorPickerModule,
    NgSelectModule*/],
  declarations: [
      IfPermissionDirective,
    /*ContenidoInformativoComponent,
    ContenidoConfirmacionComponent,
    ControlMessagesComponent,
    ControlMessageComponent,
    ErrorFeedbackDirective,
    PaginacionComponent,
    SafePipe,
    ValidacionEdadesComponent,
    SeleccionArchivoComponent,
    ModalArchivoComponent,
    SeleccionArchivoComponent,
    BusquedaPorPersonaComponent,
    BusquedaSucursalBancariaComponent*/
  ],
  providers: [/*
    NotificacionService,
    ColorPickerService,
    ArchivoService,
    DocumentoService*/],
  exports: [
    CommonModule,
    RouterModule,
    /*SeleccionArchivoComponent,
    NgbModule,*/
    ReactiveFormsModule,/*
    ControlMessagesComponent,
    ControlMessageComponent,
    ErrorFeedbackDirective,
    PaginacionComponent,
    SafePipe,
    ColorPickerModule,
    IfPermissionDirective,
    NgSelectModule,
    ValidacionEdadesComponent,
    ModalArchivoComponent,
    ValidacionEdadesComponent,
    BusquedaPorPersonaComponent,
    BusquedaSucursalBancariaComponent*/
  ],
  entryComponents: [
    /*ContenidoInformativoComponent,
    ContenidoConfirmacionComponent,
    ModalArchivoComponent,
    SeleccionArchivoComponent*/
  ]
})
export class SharedModule {
}
