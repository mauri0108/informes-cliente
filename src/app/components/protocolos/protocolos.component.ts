import { Component, OnInit } from '@angular/core';

import { ProtocoloService } from '../../services/protocolos.service';

import { Protocolo } from '../../models/protocolo-informe';


@Component({
  selector: 'app-protocolos',
  templateUrl: './protocolos.component.html',
  styles: []
})
export class ProtocolosComponent implements OnInit {

  public _protocolos: Protocolo[] ;
  // public keys: string[];

  constructor( private _protocoloService: ProtocoloService) { }

  ngOnInit() {


    this._protocoloService.getProtocolos()
                        .subscribe( res =>  {
                          this._protocolos = res.protocolos;
                          // this.keys = Object.keys(this._informes);
                          // console.log(res);
                        },
                        error => {
                          console.log(error);
                        });
  }

}
