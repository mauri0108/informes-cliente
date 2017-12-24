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
  public _informe : Informe = new Informe('','',[],'');
  public _items : Item [] = [];
  public _caracteristicas : Caracteristica[] = [];

  public indexC : number;
  public indexI :number;

  public isBtnActive:boolean = false;
  public _id : string;
  public nItem : boolean = true;


  public cNombre :string ;
  public iNombre :string ;
  public oNombre :string ;

  public mensaje : string;

  constructor(
    private _router : Router,
    private _activatedRoute : ActivatedRoute,
    private _informesService : InformesService
  ) {  }

  ngOnInit() {
    this._activatedRoute.params
        .subscribe( params =>{
          this._id = params['id'];

          if (this._id !== "nuevo") {
              this._informesService.getInforme( this._id )
                  .subscribe( res => {
                    this._informe = res;
                    console.log(this._informe);
                  });
          }

        });
  }



  nuevoItem(){
    this.nItem = true;
    this.iNombre = '';
    this.cNombre = '';
    this.oNombre = '';
    this.indexC = undefined;
    this._caracteristicas = [];
  }

  editItem(index :number){
    this.nItem = false;
    this.indexI = index;
    this.indexC = undefined;
    this.iNombre = this._informe.items[index].nombre;
    this._caracteristicas = this._informe.items[index].caracteristicas;

  }

  crearCaracteristica(){
    let _c : Caracteristica = new Caracteristica(this.cNombre,[]);

    if (this.nItem == true) {
      this._caracteristicas.push(_c);
      //console.log(this._caracteristicas);
    } else {
      this._informe.items[this.indexI].caracteristicas.push(_c);
    }

  }

  borrarCaracteristica(index: number){
    if (this.nItem == true) {
      this._caracteristicas.splice(index,1);
      //console.log(this._caracteristicas);
    } else {
      this._informe.items[this.indexI].caracteristicas.splice(index,1);
    }
  }

  getOptions(index: number){
    //console.log(index);
    this.indexC = index;
    this.isBtnActive = true;
  }

  agregarOpcion(){
    if (this.oNombre.length != 0) {
      if (this.nItem == true) {
        this._caracteristicas[this.indexC].opciones.push(this.oNombre);
        //console.log(this._caracteristicas);
      } else {
        this._informe.items[this.indexI].caracteristicas[this.indexC].opciones.push(this.oNombre);
      }
    }
  }

  borrarOpcion(index: number){
    if (this.nItem == true) {
      this._caracteristicas[this.indexC].opciones.splice(index,1);
    } else {
      this._informe.items[this.indexI].caracteristicas[this.indexC].opciones.splice(index,1);
    }
  }

  addItem(){
    let _i : Item = new Item(this.iNombre,[]);

    if (this.nItem == true) {
      _i.caracteristicas = this._caracteristicas;
      this._informe.items.push(_i);
    } else {
      this._informe.items.push(_i);
    }

    this.nuevoItem();
  }

  guardarProtocolo(){

    console.log(this._informe);
    this._informesService.saveInforme(this._informe)
        .subscribe(
          res => {
            this._informe = res;
            this.mensaje = "Se guardaron correctamente los cambios";
            //this._router.navigate(['protocolo', this._informe._id ]);
          },
          error => {
            this.mensaje = "Se produjo un error";

            setTimeout( ()=>{
              this.mensaje = undefined;
            }, 3000);

          }
        );
  }


}
