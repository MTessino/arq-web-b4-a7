export class DocumentoConsulta {
  public idItem: number;
  public idPrestamo: number;
  public numeroPagina: number;
  public tamañoPagina: number;

  constructor(idItem?: number,
              idPrestamo?: number,
              numeroPagina?: number,
              tamañoPagina?: number) {

    this.idItem = idItem;
    this.idPrestamo = idPrestamo;
    this.numeroPagina = numeroPagina;
    this.tamañoPagina = tamañoPagina;
  }
}
