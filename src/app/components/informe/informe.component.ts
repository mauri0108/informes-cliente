import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import * as moment from 'moment';

import * as locale from 'jquery-ui/ui/i18n/datepicker-es.js'

import { Router, ActivatedRoute } from '@angular/router';
import { Informe, Protocolo } from '../../models/protocolo-informe';
import { ProtocoloService } from '../../services/protocolos.service';
import { UploadService } from '../../services/upload.service';
import { InformesService } from '../../services/informes.service';
import { InformeResponse } from '../../models/response';

declare var $: any;

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styles: []
})
export class InformeComponent implements OnInit {
  public _detalle: Protocolo = new Protocolo('', '', [], '');
  public _informe: Informe = new Informe('', '', '' , '', '', this._detalle, '', moment().format('DD-MM-YYYY') );
  public _idModelo: string;
  public _idInforme: string;
  public editItemIndex: number;
  public editCaractIndex: number;
  public nuevo = true;
  public file: File;

  // @ViewChild('content') content: ElementRef;

  constructor(
    private _protocoloService: ProtocoloService,
    private _uploadService: UploadService,
    private _informeService: InformesService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.params
        .subscribe( params => {
          this._idModelo = params['idModelo'];
          this._idInforme = params['idInforme'];

          if (this._idModelo) {


              this._protocoloService.getProtocolo( this._idModelo )
                  .subscribe( res => {
                    this._informe.detalle = res.protocolo;
                    // this._informe = res.informe;
                    // console.log(this._informe);
                  },
                  error => {
                    
                  }
                );
          }

          if ( this._idInforme !== 'nuevo') {
            this._informeService.getInforme( this._idInforme )
                                .subscribe( res => {
                                  console.log(res);
                                  this._informe = res.informe
                                  console.log(this._informe);
                                },
                                error => {
                                  
                                });

            this.nuevo = false;
          }
        });

        // console.log( moment );
        // $( function() {  } );
        $( '#txtFecha' ).datepicker({ dateFormat: 'dd-mm-yy', changeMonth: true, changeYear: true});
        $.datepicker.regional['es'] = locale;
        $.datepicker.setDefaults($.datepicker.regional['es']);
  }

  editOptions( itemIndex: number, caractIndex: number) {
    this.editItemIndex = itemIndex;
    this.editCaractIndex = caractIndex;
    console.log(this.editItemIndex);
    console.log(this.editCaractIndex);
    console.log( this._informe.detalle.items[this.editItemIndex].caracteristicas[this.editCaractIndex] );
  }

  editOption(optionIndex: number, newValue: string) {
    // this._informe.items[this.editItemIndex].caracteristicas[this.editCaractIndex].opciones[optionIndex] = newValue;
    this._informe.detalle.items[this.editItemIndex].caracteristicas[this.editCaractIndex].opciones[optionIndex] = newValue;
    // console.log(optionIndex);
    // console.log(this._informe.items[this.editItemIndex].caracteristicas[this.editCaractIndex].opciones[optionIndex]);
  }

  getImagem(readerEvt) {
    //console.log('change no input file', readerEvt);
    
    this.file = readerEvt.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL( this.file);
    reader.onload = () => {
        // console.log('base64 do arquivo', reader.result);
         this._informe.logo = reader.result ;
        // console.log(this._informeCompleto.logo)
        //console.log('base64 do arquivo codificado',midia.binario);
    };
    reader.onerror = (error) => {
        console.log('Erro ao ler a imagem : ', error);
    };
  }

  move(arr, old_index, new_index) {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        let k = new_index - arr.length;
        while ((k--) + 1) {
            arr.push(undefined);
        }
    }

    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);  
    //return arr;
  }

  selectOption(idItem, idCaracteristica, idOpcion) {
    // tslint:disable-next-line:no-unused-expression
    //this._informeCompleto.infDetalle.items[idItem].caracteristicas[idCaracteristica].opciones;
    this.move(this._informe.detalle.items[idItem].caracteristicas[idCaracteristica].opciones, idOpcion, 0 );
  }

  generatePdf() {
    console.log( JSON.stringify( this._informe ));

    if (this.nuevo) {

      this._informe.logo = null;

      this._informeService.saveInforme( this._informe )
                          .subscribe( res => {
                            this._informe = res.informe;

                            if (this.file) {
                              this._uploadService.uploadImg( this.file, this._informe._id)
                                                   .then( res => {
                                                        console.log( res.json() );
                                                        return res.json()
                                                        
                                                    })
                                                    .then( resJson => {
                                                        this._informe.logo = resJson.informe.logo;
                                                    })
                                                    .catch( err => {
                                                       console.log( err );
                                                    });
                            }
                          },
                          error => {

                          }
                        );
    }else {

    }
  }

}
