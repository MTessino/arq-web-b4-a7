import { Component, Input } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
    <i [ngClass]="{'modal-icon-error':error}" class="modal-icon material-icons">{{error ? 'error': 'info'}}</i>
      <h4 class="modal-title mr-auto">{{getTitulo | uppercase}}</h4>
    </div>
    <div class="modal-body line-divider-bottom line-divider-top">
      <ul>
        <li *ngFor="let mensaje of mensajes">{{mensaje}}</li>
      </ul>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="activeModal.close('Close click')">ACEPTAR</button>
    </div>
  `
})
export class ContenidoInformativoComponent {
  @Input()
  public error: boolean;
  @Input()
  public titulo: string;
  @Input()
  public mensajes: string[];

  constructor(public activeModal: NgbActiveModal) {
  }

  public get getTitulo() {
    return this.titulo ? this.titulo : (this.error ? 'Error' : 'Información');
  }
}
