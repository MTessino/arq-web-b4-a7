export class Usuario {

  public nombre: string;
  public apellido: string;
  public cuil: string;
  public email: string;

  constructor(nombre?: string,
              apellido?: string,
              cuil?: string,
              email?: string) {

    this.nombre = nombre;
    this.apellido = apellido;
    this.cuil = cuil;
    this.email = email;
  }
}
