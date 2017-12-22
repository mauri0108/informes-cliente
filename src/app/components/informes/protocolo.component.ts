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
  public nuevo : boolean = true;

  @ViewChild("iNombre") public iNombre: ElementRef;
  @ViewChild("cNombre") public cNombre: ElementRef;
  @ViewChild("oNombre") public oNombre: ElementRef;


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
                    this.nuevo = false;
                    console.log(this._informe);
                  });
          }

        });
  }

  editItem(index :number){
    this.indexI = index;
    this.iNombre.nativeElement.value = this._informe.items[index].nombre;
    this._caracteristicas = this._informe.items[index].caracteristicas;

  }

  crearCaracteristica(){
    let _c : Caracteristica = new Caracteristica(this.cNombre.nativeElement.value,[]);

    if (this.nuevo == true) {
      this._caracteristicas.push(_c);
      console.log(this._caracteristicas);
    } else {
      this._informe.items[0].caracteristicas.push(_c);
    }

  }

  borrarCaracteristica(){
    console.log("Se va a eliminar");
  }

  getOptions(index: number){
    console.log(index);
    this.indexC = index;
    this.isBtnActive = true;
  }

  agregarOpcion(){
    if (this.nuevo == true) {
      this._caracteristicas[this.indexC].opciones.push(this.oNombre.nativeElement.value);
      console.log(this._caracteristicas);
    } else {
      this._informe.items[0].caracteristicas[this.indexC].opciones.push(this.oNombre.nativeElement.value);
    }


  }

  addItem(){
    let _i : Item = new Item('',[]);

    if (this.nuevo == true) {
      _i.caracteristicas = this._caracteristicas;
      this._informe.items.push(_i);
    } else {
      this._informe.items.push(_i);
    }

  }


}
