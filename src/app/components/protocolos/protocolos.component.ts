import { Component, OnInit } from '@angular/core';

import { ProtocoloService } from '../../services/service.index';

import { Protocolo } from '../../models/protocolo-informe';


@Component({
  selector: 'app-protocolos',
  templateUrl: './protocolos.component.html',
  styles: []
})
export class ProtocolosComponent implements OnInit {

  public _protocolos: Protocolo[] ;
  public loading = false;
  // public keys: string[];

  constructor( private _protocoloService: ProtocoloService) { }

  ngOnInit() {

    this.loading = true;
    this._protocoloService.getProtocolos()
                        .subscribe( res =>  {
                          this._protocolos = res.protocolos;
                          this.loading = false;
                          // this.keys = Object.keys(this._informes);
                          // console.log(res);
                        },
                        error => {
                          console.log(error);
                          this.loading = false;
                        });
  }

}
