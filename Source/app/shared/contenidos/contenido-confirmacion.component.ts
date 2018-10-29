import { Component, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title mr-auto">{{titulo | uppercase}}</h4>
    </div>
    <div class="modal-body line-divider-bottom line-divider-top">
      {{mensaje}}
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.close(false)">NO</button>
      <button type="button" class="btn btn-primary" (click)="activeModal.close(true)">SI</button>
    </div>
  `
})
export class ContenidoConfirmacionComponent {
  @Input()
  public titulo: string = 'Confirmación';
  @Input()
  public mensaje: string;

  constructor(public activeModal: NgbActiveModal) {
  }

}
