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
  public searchText: String;
  public loading = false;

  constructor(private _protocoloService: ProtocoloService) { }

  ngOnInit() {
    this.loading = true;
    this._protocoloService.getProtocolos()
                        .subscribe( res =>  {
                          this._protocolos = res.protocolos;
                          this.loading = false;
                          //this.keys = Object.keys(this._informes);
                          //console.log(res);
                        },
                        error => {
                          console.log(error);
                          if (error.error.message) {
                            swal('Error la busqueda', error.error.message, 'error');
                          } else {
                            swal('Error la busqueda', 'La api del servidor no esta conectada', 'error');
                          }
                          this.loading = false;
                        });
  }
}
