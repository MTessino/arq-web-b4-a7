export class BusquedaPorPersonaConsulta{
  public tipoPersona: number;
  public cuil: string;
  public apellido: string;
  public nombre: string;


  constructor(tipoPersona?: number,
              cuil?: string,
              apellido?: string,
              nombre?: string) {
    this.tipoPersona = tipoPersona;
    this.cuil = cuil;
    this.apellido = apellido;
    this.nombre = nombre;
  }
}
