import { Component, OnInit } from '@angular/core';

import { InformesService } from '../../services/informes.service';

import { Informe } from '../../models/informe';


@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styles: []
})
export class InformesComponent implements OnInit {

  public _informes : any ;
  //public keys: string[];

  constructor( private _informeService : InformesService) { }

  ngOnInit() {


    this._informeService.getInformes()
                        .subscribe( res =>  {
                          this._informes = res;
                          //this.keys = Object.keys(this._informes);
                          console.log(res);
                        });
  }

}
