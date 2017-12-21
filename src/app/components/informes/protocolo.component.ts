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
  public _id : string;

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
                    console.log(this._informe);
                  });
          }

        });
  }

  crearCaracteristica(){
    let _c : Caracteristica = new Caracteristica(this.cNombre.nativeElement.value,[]);

    this._caracteristicas.push(_c);
    console.log(this._caracteristicas);
  }

  borrarCaracteristica(){
    console.log("Se va a eliminar");
  }

  getOptions(index: number){
    console.log(index);
    this.indexC = index;
  }

  agregarOpcion(){
    for (let i in this._caracteristicas) {
        this._caracteristicas[i].opciones;
    }

  }


}
