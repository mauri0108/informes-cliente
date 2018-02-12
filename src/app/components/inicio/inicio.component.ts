import { Component, OnInit } from '@angular/core';
import { ProtocoloService } from '../../services/service.index';
import { Protocolo } from '../../models/protocolo-informe';

declare var swal: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: []
})
export class InicioComponent implements OnInit {
  public _protocolos: Protocolo[] = [];

  constructor(private _protocoloService: ProtocoloService) { }

  ngOnInit() {
    this._protocoloService.getProtocolos()
                        .subscribe( res =>  {
                          this._protocolos = res.protocolos;
                          //this.keys = Object.keys(this._informes);
                          //console.log(res);
                        },
                        error => {
                          console.log(error);
                          if (error.error.message) {
                            swal('Error en el ingreso', error.error.message, 'error');
                          } else {
                            swal('Error en el ingreso', 'La api del servidor no esta conectada', 'error');
                          }
                        });
  }
}
