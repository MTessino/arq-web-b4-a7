export class Documentacion {
  public documento?: any;
  public idItem?: number;
  public idPrestamo?: number;

  constructor(documento?: any, idItem?: number, idPrestamo?: number) {
    this.documento = documento;
    this.idItem = idItem;
    this.idPrestamo = idPrestamo;
  }
}
