import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { Informe, Protocolo } from '../../models/protocolo-informe';
import { InformesService } from '../../services/informes.service';
import { ProtocoloService } from '../../services/protocolos.service';

import { saveAs } from 'file-saver';

declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-informes-usuario',
  templateUrl: './informes-usuario.component.html',
  styles: []
})
export class InformesUsuarioComponent implements OnInit {

  public _informes: Informe[];
  public usuarioId: string;
  public nombre = localStorage.getItem('nombre');

  public _protocolos: Protocolo[];

    constructor(
      private  _informeService: InformesService,
      private _protocoloService: ProtocoloService,
      private _router: Router,
      private _activatedRoute: ActivatedRoute 
    ) { }

  ngOnInit() {
    this._activatedRoute.params
        .subscribe( params => {

            this.usuarioId = params['id'];

            this._informeService.getInformesUsuario( this.usuarioId )
                                .subscribe( res => {
                                  this._informes = res.informes;
                                  //console.log(this._informes);
                                },
                                error => {
                                  console.log(error);
                                  swal('Error en la busqueda de informes del usuario', error.name , 'error');
                                });

        });
  }

  getModelos() {
    this._protocoloService.getProtocolos()
                          .subscribe( res => {
                            this._protocolos = res.protocolos;
                          }, error => {
                            swal('Error en la busqueda de protocolos', error.name , 'error');
                          });
  }

  searchInforme( text: string) {
    // console.log(text);
    if (text.length > 0) {
      this._informeService.getInformesText(this.usuarioId, text)
                        .subscribe( res => {
                          this._informes = res.informes;
                          if (this._informes.length == 0) {
                            swal('No se encontraron informes', 'Intente buscar palabras completas' , 'warning');
                          }
                        },
                        error => {
                          swal('Error en la busqueda', error.name , 'error');
                        });
    } else {
      this._informeService.getInformesUsuario( this.usuarioId )
                                .subscribe( res => {
                                  this._informes = res.informes;
                                  //console.log(this._informes);
                                },
                                error => {
                                  console.log(error);
                                  swal('Error en la busqueda de informes del usuario', error.name , 'error');
                                });
    }
  }

  generatePDF(index: number) {
    console.log(index);
    let informe = this._informes[index];

    this._informeService.printPDF( informe )
                        .subscribe( res => {
                          console.log(res);
                          let mediaType = 'application/pdf';
                          let blob = new Blob([res], {type: mediaType});
                          let filename = 'test.pdf';
                          saveAs(blob, filename);
                        },
                        error => {
                          console.log(error);
                        });
  }
}
