import { Caracteristica } from './caracteristica';

export class Item {
  constructor(
    public nombre: string,
    public caracteristicas: Caracteristica [],
  ) {}
}
