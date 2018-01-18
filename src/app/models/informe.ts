import { Item } from './item';

export class Informe {
  constructor(
    public _id: string,
    public nombre: string,
    public items: Item[],
    public creado: string
  ) {}
}

export class InformeCompleto {
  constructor(
    public _id: string,
    public medico: string,
    public paciente: string,
    public infDetalle: Informe,
    public creado: Date
  ) {}
}
