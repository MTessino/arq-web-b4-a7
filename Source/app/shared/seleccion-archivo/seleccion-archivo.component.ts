import { ElementRef, ViewChild, Input, Output, EventEmitter, Component } from '@angular/core';
import { NotificacionService } from '../notificacion.service';

@Component({
  selector: 'bg-seleccion-archivo',
  styleUrls: ['./seleccion-archivo.component.scss'],
  templateUrl: './seleccion-archivo.component.html'
})

export class SeleccionArchivoComponent {

  @ViewChild('fileInput')
  public fileInput: ElementRef;
  @Input()
  public accept: string = 'no validar';
  @Input()
  public maxSize: number = 10;
  @Input()
  public texto: string = 'SELECCIONAR ARCHIVO';
  @Input()
  public esGrilla: boolean = false;
  @Input()
  public buttonClass: string = 'btn btn-grey';
  @Input()
  public icono: string;
  @Output()
  public archivoSeleccionado: EventEmitter<File> = new EventEmitter<File>();
  public tipoNoAceptado: boolean = false;
  public archivoMuyGrande: boolean = false;

  constructor(private notificacionService: NotificacionService) {
  }

  public select() {
    this.fileInput.nativeElement.click();
  }

  public onChange(event): void {
    let archivos = event.srcElement.files;
    if (archivos && archivos.length) {
      let archivo = archivos[0];
      if (this.validarArchivo(archivo)) {
        this.archivoSeleccionado.emit(archivo);
      } else {
        if (this.esGrilla) {
          this.notificacionService.informar(['El archivo no es válido.']);
        }
      }
    }
  }

  private validarArchivo(archivo: File): boolean {
    if (this.accept === 'no validar') {
      return true;
    }
    this.tipoNoAceptado = this.archivoMuyGrande = false;
    if (this.accept.indexOf(archivo.type) === -1) {
      this.tipoNoAceptado = true;
      return false;
    }
    let tamanioArchivo = ((archivo.size / 1024) / 1024);
    if (tamanioArchivo > this.maxSize) {
      this.archivoMuyGrande = true;
      return false;
    }
    return true;
  }
}
