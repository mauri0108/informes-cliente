import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

import { Router, ActivatedRoute } from '@angular/router';

import { Informe } from '../../models/informe';
import { InformesService } from '../../services/informes.service';


@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styles: []
})
export class InformeComponent implements OnInit {
  public _informe : Informe = new Informe('','',[],'');
  public _id: string;

  @ViewChild('content') content : ElementRef;

  constructor(
    private _informesService : InformesService,
    private _router : Router,
    private _activatedRoute : ActivatedRoute,) { }

  ngOnInit() {
    this._activatedRoute.params
        .subscribe( params =>{
          this._id = params['id'];

          if (this._id !== "nuevo") {


              this._informesService.getInforme( this._id )
                  .subscribe( res => {
                    this._informe = res.informe;
                    console.log(this._informe);
                  },
                  error =>{

                  }
                );
          }

        });
  }

  generatePdf(){
    let doc = new jsPDF();

    // let specialElementHandlers = {
    //   '#editor' : function( element, renderer){
    //     return true;
    //   }
    // }

    let content = this.content.nativeElement;

    //console.log(content);
    //console.log(content.innerHTML);

    // html2canvas(content).then(function(canvas) {
    //   let img = canvas.toDataURL("image/png");
    //   document.body.appendChild(canvas);
    //   doc.addImage(img,'PNG',10, 10,150, 150);
    //
    //
    // });




    // doc.fromHTML(content.innerHTML, 15, 15, {
    //   'width' : 522,
    //   'elementHandlers' : specialElementHandlers
    // });

    //doc.save('test.pdf');


  }

}
