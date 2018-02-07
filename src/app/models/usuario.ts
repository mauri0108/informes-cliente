export class Usuario {
  constructor(
    public _id: string,
    public nombre: string,
    public apellido: string,
    public email: string,
    public instituciones: [
      Institucion
    ],
    public pass: string,
    public role: string,
    public fechaAlta: string,
    public fechaBaja: string
  ) {}

}

export class Institucion {
  constructor(
    public nombre: string,
    public logo: string
  ) {}
}
