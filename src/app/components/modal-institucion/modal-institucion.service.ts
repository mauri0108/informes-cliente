import { Injectable, EventEmitter } from '@angular/core';
import { Institucion } from '../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ModalInstitucionService {

  public institucion: Institucion;
  public indexInst: number;
  // tslint:disable-next-line:no-inferrable-types
  public display: string = 'oculto';
  public notificacion = new EventEmitter<any>();

  constructor() { }

  ocultarModal () {
    this.display = 'oculto';
    this.institucion = null;
  }

  mostrarModal (index: number, institucion: Institucion) {
    this.display = '';
    this.institucion = institucion;
    this.indexInst = index;

    this.notificacion.emit(this.institucion);
  }
}
