import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';

import { NgForm } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { Informe } from '../../models/informe';
import { Caracteristica } from '../../models/caracteristica';
import { Item } from '../../models/item';

import { InformesService } from '../../services/informes.service';


@Component({
  selector: 'app-protocolo',
  templateUrl: './protocolo.component.html',
  styles: []
})
export class ProtocoloComponent implements OnInit {
  public _informe: Informe = new Informe('', '', [], '');
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

  public mensaje: string;
  public errorMensaje: string;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _informesService: InformesService
  ) {  }

  ngOnInit() {
    this._activatedRoute.params
        .subscribe( params => {
          this._id = params['id'];

          if (this._id !== 'nuevo') {
              this.nuevo = false;

              this._informesService.getInforme( this._id )
                  .subscribe( res => {
                    this._informe = res.informe;
                    console.log(this._informe);
                  },
                  error => {
                    this.mensaje = error
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

  editItem(index: number){
    this.nItem = false;
    this.indexI = index;
    this.indexC = undefined;
    this.iNombre = this._informe.items[index].nombre;
    this._caracteristicas = this._informe.items[index].caracteristicas;

  }

  crearCaracteristica(){
    const _c: Caracteristica = new Caracteristica(this.cNombre,[]);

    if (this.nItem === true) {
      this._caracteristicas.push(_c);
      // console.log(this._caracteristicas);
    } else {
      this._informe.items[this.indexI].caracteristicas.push(_c);
    }

  }

  borrarCaracteristica(index: number){
    if (this.nItem === true) {
      this._caracteristicas.splice(index,1);
      // console.log(this._caracteristicas);
    } else {
      this._informe.items[this.indexI].caracteristicas.splice(index, 1);
    }
  }

  getOptions(index: number){
    // console.log(index);
    this.indexC = index;
    this.isBtnActive = true;
  }

  agregarOpcion(){
    if (this.oNombre.length !== 0) {
      if (this.nItem === true) {
        this._caracteristicas[this.indexC].opciones.push(this.oNombre);
        // console.log(this._caracteristicas);
      } else {
        this._informe.items[this.indexI].caracteristicas[this.indexC].opciones.push(this.oNombre);
      }
    }
  }

  borrarOpcion(index: number){
    if (this.nItem === true) {
      this._caracteristicas[this.indexC].opciones.splice(index,1);
    } else {
      this._informe.items[this.indexI].caracteristicas[this.indexC].opciones.splice(index,1);
    }
  }

  addItem() {
    const _i: Item = new Item(this.iNombre, []);

    if (this.nItem === true) {
      _i.caracteristicas = this._caracteristicas;
      this._informe.items.push(_i);
    } else {
      this.nuevoItem();
    }

    // this.nuevoItem();
  }

  guardarProtocolo(){
    if (this.nuevo) {
      this._informesService.saveInforme(this._informe)
          .subscribe(
            res => {
              this._informe = res.informe;
              this._router.navigate(['/admin/protocolo', this._informe._id ]);
              this.mensaje = res.message;
              this.ocultarMensaje(this.mensaje);
            },
            error => {
              this.errorMensaje = new String(error.error).split("<br>")[0];
              this.ocultarMensaje(this.errorMensaje);
            }
          );
    } else {
      this._informesService.updateInforme(this._informe)
          .subscribe(
            res =>{
              this._informe = res.informe;
              this.mensaje = res.message;
              this.ocultarMensaje(this.mensaje);
            },
            error =>{
              this.errorMensaje = new String(error.error).split("<br>")[0];
              this.ocultarMensaje(this.errorMensaje);
            }
          );
    }
  }

  ocultarMensaje(mensaje:any){
    setTimeout( ()=>{
      this.mensaje = undefined;
    }, 2000);
  }


}
