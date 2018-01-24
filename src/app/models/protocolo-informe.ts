import { Item } from './item';

export class Protocolo {
  constructor(
    public _id: string,
    public nombre: string,
    public items: Item[],
    public creado: string
  ) {}
}

export class Informe {
  constructor(
    public _id: string,
    public institucion: string,
    public logo: string,
    public medico: string,
    public paciente: string,
    public detalle: Protocolo,
    public observacion: string,
    public creado: string
  ) {}
}
