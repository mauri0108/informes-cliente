import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import * as moment from 'moment';

import * as locale from 'jquery-ui/ui/i18n/datepicker-es.js'

import { Router, ActivatedRoute } from '@angular/router';
import {  Informe, InformeCompleto } from '../../models/informe';
import { InformesService } from '../../services/informes.service';

declare var $: any;

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styles: []
})
export class InformeComponent implements OnInit {
  public _informe: Informe = new Informe('', '', [], '');
  public _informeCompleto: InformeCompleto = new InformeCompleto('', '', '', '', this._informe, '', moment().format('DD-MM-YYYY') );
  public _id: string;
  public editItemIndex: number;
  public editCaractIndex: number;
  public logoImg: any;



  // @ViewChild('content') content: ElementRef;

  constructor(
    private _informesService: InformesService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.params
        .subscribe( params => {
          this._id = params['id'];

          if (this._id !== 'nuevo') {


              this._informesService.getInforme( this._id )
                  .subscribe( res => {
                    this._informeCompleto.infDetalle = res.informe;
                    // this._informe = res.informe;
                    // console.log(this._informe);
                  },
                  error => {

                  }
                );
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
    console.log( this._informeCompleto.infDetalle.items[this.editItemIndex].caracteristicas[this.editCaractIndex] );
  }

  editOption(optionIndex: number, newValue: string) {
    // this._informe.items[this.editItemIndex].caracteristicas[this.editCaractIndex].opciones[optionIndex] = newValue;
    this._informeCompleto.infDetalle.items[this.editItemIndex].caracteristicas[this.editCaractIndex].opciones[optionIndex] = newValue;
    // console.log(optionIndex);
    // console.log(this._informe.items[this.editItemIndex].caracteristicas[this.editCaractIndex].opciones[optionIndex]);
  }

  getImagem(readerEvt) {
    //console.log('change no input file', readerEvt);
    
    const file = readerEvt.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        //console.log('base64 do arquivo',reader.result);
         this.logoImg = btoa(reader.result);
        //console.log('base64 do arquivo codificado',midia.binario);
    };
    reader.onerror = (error) => {
        console.log('Erro ao ler a imagem : ', error);
    };
  }

  generatePdf() {
    const doc = new jsPDF();

    const cabecera = `<div><h3>${ this._informeCompleto.infDetalle.nombre }</h3></div>
                      <br>
                      <div><b>${this._informe.items[0].nombre}</b></div>`;

    doc.fromHTML(cabecera, 90, 10);
    doc.save(`${this._informe.nombre}.pdf`);

  }

}
