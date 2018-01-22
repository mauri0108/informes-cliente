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
  public _informeCompleto: InformeCompleto = new InformeCompleto('', '', '' , '', '', this._informe, '', moment().format('DD-MM-YYYY') );
  public _id: string;
  public editItemIndex: number;
  public editCaractIndex: number;

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
        // console.log('base64 do arquivo', reader.result);
         this._informeCompleto.logo = btoa(reader.result);
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
    this.move(this._informeCompleto.infDetalle.items[idItem].caracteristicas[idCaracteristica].opciones, idOpcion, 0 );
  }

  generatePdf() {

    console.log( this._informeCompleto);
    /*const doc = new jsPDF();
    "logo": 
    "data:image/png;base64,iVBORw0KGgoAAAANS
    UhEUgAAASwAAAEsCAYAAAB5fY51AAAABHNCSVQICAg
    IfAhkiAAAAF96VFh0UmF3IHByb2ZpbGUgdHlwZSBBUF
    AxAAAImeNKT81LLcpMVigoyk/LzEnlUgADYxMuE0sTS
    6NEAwMDCwMIMDQwMDYEkkZAtjlUKNEABZgamFmaGZsZ
    mgMxiM8FAEi2FMk61EMyAAAgAElEQVR4nNS9abAlyX
    Ue9mVV3fuW7vdev9779Trd0z3dPfsCYBZAGADkBEEA
    xDIQF4uyCEk0LUWIssMKSXYowqIdNBUh0WaELJpmyD
    9E22FFkLBAUSahIYABCAIDYDD79Exv08tM9/S+vX77vb
    fSP3I7mZVVlVl1Xw90Ol7funUrT57MPHnyOyeXYigSk39
    wPunfsnr4mc/+0cHuyOQzSdL5abDsrsEAazjjXQZ0Ofgo5z
    xlYByccOKEsyJubnN4iN4sfagkgZW3SMztr9UsXcGYvOXcd9MH
    ibmKxPV/cZSrdKqNWhSCk7SUXRBr2m7u90LCIif38crkIeRR0GD5u
    e+nUCkCJA5kVVltbgMVZPZ0BH8t98CwnICtAFhhCbvFeO+VQe/WHy/1
    Vl7+0Xd++ZxMlADI5HVOcufk2pKSmg2fkUrINQMwANB/+Kl/OLNly898I
    UvTT4BlH+qtYNPySm98ZYVjZSXHYJBjkHP0+zl4zgsKV6awsXbIvW2nD9W
    qGvY1Sufa3cjsqo10ANNaIx9gGbj7rbajGaqV3fNjqVi0MLFWhYc/XCgDl
    wOXKwPENed2O9eW16cUKh23vlXysOqprnycBdddk+oV6XhQFknCkKUMaZY
    gSxlGuhk6XZaPj3VnE9Y7x/PBd/q9hT/9/vNf+FOZpEtEU5/0T//mM1LqU/
    0po7UMAM984d8/O9JZ97dynn1ycWkwMjfXw+25FSwu9DHIlZGEwy6MqhEBqaaK2grS27oGbQmL7PRhzN",
    const cabecera = `<div><h3>${ this._informeCompleto.infDetalle.nombre }</h3></div>
                      <br>
                      <div><b>${this._informeCompleto.infDetalle.items[0].nombre}</b></div>`;

    doc.fromHTML(cabecera, 90, 10);
    doc.save(`${this._informe.nombre}.pdf`);*/

  }

}
