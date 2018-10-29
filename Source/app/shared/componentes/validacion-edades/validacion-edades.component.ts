import { Component, Input } from '@angular/core';
import { Persona } from '../../modelo/persona.model';
import { NgbUtils } from '../../ngb/ngb-utils';
import { ParametroService } from '../../../soporte/parametro.service';
import { VigenciaParametroConsulta } from '../../modelo/consultas/vigencia-parametro-consulta.model';

@Component({
  selector: 'bg-validacion-edades',
  template: `
    <ul style="margin-bottom: 0;">
      <li style="color: #a94442 " *ngFor="let persona of personasFueraDeParametro">
       <span *ngIf="persona.fechaNacimiento"> El integrante {{persona.apellido + ', ' + persona.nombre}} tiene
        {{calcularEdad(persona.fechaNacimiento)}} años.
        No cumple con las edades definidas en los parámetros.</span>
        <span *ngIf="!persona.fechaNacimiento"> El integrante {{persona.apellido + ', ' + persona.nombre}} no
          tiene fecha de nacimiento.</span>
      </li>
    </ul>
  `
})

export class ValidacionEdadesComponent {
  private _personas: Persona [] = [];

  @Input()
  public set  personas(personas: Persona []) {
    this._personas = personas;
    if (this.edadMinParametro !== 0 || this.edadMaxParametro !== 0) {
      this.verificarEdadIntegrantes();
    }
  }

  public personasFueraDeParametro: Persona [] = [];
  public edadMinParametro: number = 0;
  public edadMaxParametro: number = 0;

  //constructor(private parametrosService: ParametroService) {
    constructor() {
      /*this.parametrosService.obtenerVigenciaParametro(new VigenciaParametroConsulta(6))
      .subscribe((min) => {
        this.edadMinParametro = parseInt(min.valor, 10);
        this.parametrosService.obtenerVigenciaParametro(new VigenciaParametroConsulta(5))
          .subscribe((max) => {
            this.edadMaxParametro = parseInt(max.valor, 10);
            this.verificarEdadIntegrantes();
          });
      });*/
  }

  public calcularEdad(fecha: Date): number {
    return NgbUtils.calcularEdad(fecha);
  }

  private verificarEdadIntegrantes(): void {
    this.personasFueraDeParametro = this._personas.filter((integrante) =>
    !integrante.fechaNacimiento || NgbUtils.calcularEdad(integrante.fechaNacimiento) > this.edadMaxParametro ||
    NgbUtils.calcularEdad(integrante.fechaNacimiento) < this.edadMinParametro);
  }
}
