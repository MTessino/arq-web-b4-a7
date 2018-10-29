import {Injectable} from '@angular/core';
import * as FileSaver from 'file-saver';
import {Archivo} from "./modelo/archivo.model";

@Injectable()
export class ArchivoService {

  constructor() {

  }

  public descargarArchivo(arch: Archivo){
    let arrayBytes = this.base64ToBytes(arch.archivo);
    let blob = new Blob([arrayBytes], { type: arch.tipo.type });
    FileSaver.saveAs(blob, arch.nombreConExtension);
  }

  public descargarArchivos(archivos: Archivo[]){
    for (let archivo of archivos) {
      this.descargarArchivo(archivo);
    }
  }

  public descargarArchivoDesdeBase64(archivo: string, nombreArchivo: string, tipoArchivo: string){
    let arrayBytes = this.base64ToBytes(archivo);
    let blob = new Blob([arrayBytes], { type: tipoArchivo });
    FileSaver.saveAs(blob, nombreArchivo);
  }

  private base64ToBytes(base64) {
    let raw = window.atob(base64);
    let n = raw.length;
    let bytes = new Uint8Array(new ArrayBuffer(n));

    for (let i = 0; i < n; i++) {
      bytes[i] = raw.charCodeAt(i);
    }
    return bytes;
  }

  public getUrlPrevisualizacionArchivo(arch: Archivo): string{
    return 'data:' + arch.tipo.type +';base64,' + arch.archivo;
  }

  public getUrlPrevisualizacion(archivoEnBase64: string, tipoArchivo: string): string{
    return 'data:' + tipoArchivo +';base64,' + archivoEnBase64;
  }

}
