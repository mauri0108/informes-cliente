import { Component, OnInit } from '@angular/core';

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
  public _id : string;

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



}
