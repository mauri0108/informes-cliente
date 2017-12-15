import { Item } from './item';

export class Informe{
  constructor(
    public _id:string,
    public nombre:string,
    public items : Item[],
    public creado : string
  ){}
}
