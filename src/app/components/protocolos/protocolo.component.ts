import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';

import { NgForm } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { Protocolo } from '../../models/protocolo-informe';
import { Caracteristica } from '../../models/caracteristica';
import { Item } from '../../models/item';

import { ProtocoloService } from '../../services/protocolos.service';
declare var swal: any;

@Component({
  selector: 'app-protocolo',
  templateUrl: './protocolo.component.html',
  styles: []
})
export class ProtocoloComponent implements OnInit {
  public _protocolo: Protocolo = new Protocolo('', '', [], '');
  public _items: Item [] = [];
  public _caracteristicas: Caracteristica[] = [];

  public indexC: number;
  public indexI: number;

  public isBtnActive = false;
  public _id: string;
  public nItem = true;
  public nuevo = true;


  public cNombre: string ;
  public iNombre: string ;
  public oNombre: string ;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _protocoloService: ProtocoloService
  ) {  }

  ngOnInit() {
    this._activatedRoute.params
        .subscribe( params => {
          this._id = params['id'];

          if (this._id !== 'nuevo') {
              this.nuevo = false;

              this._protocoloService.getProtocolo( this._id )
                  .subscribe( res => {
                    this._protocolo = res.protocolo ;
                  },
                  error => {
                    swal('Error al buscar modelo', `${error.error.message}, este modelo no existe` , 'error');
                  }
                );
          }

        });
  }



  nuevoItem() {
    this.nItem = true;
    this.iNombre = '';
    this.cNombre = '';
    this.oNombre = '';
    this.indexC = undefined;
    this._caracteristicas = [];
  }

  editItem(index: number) {
    this.nItem = false;
    this.indexI = index;
    this.indexC = undefined;
    this.iNombre = this._protocolo.items[index].nombre;
    this._caracteristicas = this._protocolo.items[index].caracteristicas;

  }

  crearCaracteristica() {
    if (this.cNombre) {
      const _c: Caracteristica = new Caracteristica(this.cNombre, []);

      if (this.nItem === true) {
        this._caracteristicas.push(_c);
        // console.log(this._caracteristicas);
        
      } else {
        this._protocolo.items[this.indexI].caracteristicas.push(_c);
      }

      this.cNombre = '';
    }
  }

  borrarCaracteristica(index: number) {
    if (this.nItem === true) {
      this._caracteristicas.splice(index, 1);
      // console.log(this._caracteristicas);
    } else {
      this._protocolo.items[this.indexI].caracteristicas.splice(index, 1);
    }
  }

  getOptions(index: number) {
    // console.log(index);
    this.indexC = index;
    this.isBtnActive = true;
  }

  agregarOpcion() {
    if (this.oNombre) {
      if (this.nItem === true) {
        this._caracteristicas[this.indexC].opciones.push(this.oNombre);
        // console.log(this._caracteristicas);
      } else {
        this._protocolo.items[this.indexI].caracteristicas[this.indexC].opciones.push(this.oNombre);
      }

      this.oNombre = '';
    }
  }

  borrarOpcion(index: number) {
    if (this.nItem === true) {
      this._caracteristicas[this.indexC].opciones.splice(index, 1);
    } else {
      this._protocolo.items[this.indexI].caracteristicas[this.indexC].opciones.splice(index, 1);
    }
  }

  addItem() {
    const _i: Item = new Item(this.iNombre, []);

    if (this.nItem === true) {
      _i.caracteristicas = this._caracteristicas;
      this._protocolo.items.push(_i);
    } else {
      this.nuevoItem();
    }

    // this.nuevoItem();
  }

  guardarProtocolo() {
    if (this.nuevo) {
      this._protocoloService.saveProtocolo(this._protocolo)
          .subscribe(
            res => {
              this._protocolo = res.protocolo;
              this._router.navigate(['/admin/protocolo', this._protocolo._id ]);
              swal('Perfecto!', res.message , 'success');
            },
            error => {
              swal('Error al insertar protocolo', `${error.error.message}` , 'error');
            }
          );
    } else {
      this._protocoloService.updateProtocolo(this._protocolo)
          .subscribe(
            res => {
              this._protocolo = res.protocolo;
              swal('Perfecto!', res.message , 'success');
            },
            error => {
              swal('Error al actualizar protocolo', `${error.error.message}` , 'error');
            }
          );
    }
  }

}
