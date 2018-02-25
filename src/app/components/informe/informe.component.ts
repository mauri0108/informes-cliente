import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';

import * as locale from 'jquery-ui/ui/i18n/datepicker-es.js'

import { Router, ActivatedRoute } from '@angular/router';

import { Usuario, Institucion } from "../../models/usuario";
import { UsuariosService } from "../../services/service.index";

import { Informe, Protocolo } from '../../models/protocolo-informe';
import { ProtocoloService } from '../../services/service.index';
import { InformesService } from '../../services/service.index';

import { saveAs } from 'file-saver';

declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styles: []
})
export class InformeComponent implements OnInit {
  public idUsuario = localStorage.getItem('id');
  public _usuario: Usuario;

  public _detalle: Protocolo = new Protocolo('', '', [], '');
  public _informe: Informe = new Informe('', '', '' , '', '', this._detalle, '', this.idUsuario, moment().format('DD-MM-YYYY') );

  public _idModelo: string;
  public _idInforme: string;

  public editItemIndex: number;
  public editCaractIndex: number;

  public nuevo = true;
  public file: File;
  public logoTemporal: string;

  public mensaje: string;
  public errorMensaje: string;

  constructor(
    private _protocoloService: ProtocoloService,
    private _usuarioService: UsuariosService,
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
                    
                    swal('Error al buscar modelo', `${error.error.message}, este modelo no existe` , 'error');
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
                                  console.log(error);
                                  swal('Error al buscar informe', `${error.error.message}, este informe no existe` , 'error');
                                });

            this.nuevo = false;
          }
          
            this._usuarioService.getUsuario( this.idUsuario )
                                .subscribe( res => {
                                  this._usuario = res.usuario;
                                  this._informe.medico = `${this._usuario.nombre} ${this._usuario.apellido}`;
                                }, error => {
                                  console.log(error);
                                  swal('Error al buscar usuario', `${error.error.message}` , 'error');
                                });
          
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
    //console.log(this.editItemIndex);
    //console.log(this.editCaractIndex);
    //console.log( this._informe.detalle.items[this.editItemIndex].caracteristicas[this.editCaractIndex] );
  }

  editOption(optionIndex: number, newValue: string) {
    // this._informe.items[this.editItemIndex].caracteristicas[this.editCaractIndex].opciones[optionIndex] = newValue;
    this._informe.detalle.items[this.editItemIndex].caracteristicas[this.editCaractIndex].opciones[optionIndex] = newValue;
    // console.log(optionIndex);
    // console.log(this._informe.items[this.editItemIndex].caracteristicas[this.editCaractIndex].opciones[optionIndex]);
  }

  getImagem(readerEvt) {
    this.file = null;
    this.logoTemporal = null;
    //console.log('change no input file', readerEvt);
    this.file = readerEvt.target.files[0];
    const reader = new FileReader();

    if (this.file) {
      reader.readAsDataURL( this.file);
    }
    
    reader.onload = () => {
        // console.log('base64 do arquivo', reader.result);
         this.logoTemporal = reader.result ;
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

  selectOption(idItem, idCaracteristica, idOpcion, newOpcion) {
    // tslint:disable-next-line:no-unused-expression
    //console.log(this._informe.detalle.items[idItem].caracteristicas[idCaracteristica].opciones)
    //this._informeCompleto.infDetalle.items[idItem].caracteristicas[idCaracteristica].opciones;
    if (this._informe.detalle.items[idItem].caracteristicas[idCaracteristica].opciones[idOpcion] !== newOpcion) {
      this.editOption( idOpcion, newOpcion);
    }
    this.move(this._informe.detalle.items[idItem].caracteristicas[idCaracteristica].opciones, idOpcion, 0 );
    $('#editOptionsModal').modal('hide');
  }

  filterInstitucion(opcion: string) {
    for (const inst of this._usuario.instituciones) {
      if (inst.nombre === opcion ) {
        console.log(inst)
        return inst;
      } 
    }
  }

  setInst(opcion: any) {
    console.log(opcion)
    if (opcion === 'seleccionar') {
      this._informe.institucion = null;
      this._informe.logo = null;
    } else {
      let inst = this.filterInstitucion(opcion);
      this._informe.institucion = inst.nombre;
      this._informe.logo =  inst.logo;
      
    }
  }

  submitInforme() {
    console.log( this.nuevo );

    if ( this.nuevo === true ) {

      this._informe.logo = null;

      this._informeService.saveInforme( this._informe )
                          .subscribe( res => {
                            this._informe = res.informe;

                            //if (this.file) {
                            //  this.uploadImg( this.file, this._informe._id );
                            //  swal('Perfecto!', res.message  , 'success');
                            //}else {
                              swal('Perfecto!', res.message  , 'success');
                           // }

                          

                            this._router.navigate(['/modelo', this._informe.detalle._id, 'informe', this._informe._id ]);
                          },
                          error => {
                            console.log(error )
                            swal('Error al crear el informe!', error.error.message  , 'error');

                          }
                        );
    }else {
      this._informeService.updateInforme( this._informe )
                          .subscribe( res => {
                            this._informe = res.informe

                            //if ( this.file ) {
                             // this.uploadImg( this.file, this._informe._id );
                            //  swal('Perfecto!', res.message  , 'success');
                            //} else {
                              swal('Perfecto!', res.message  , 'success');
                            //}
                          },
                          error => {
                            console.log(error )
                            swal('Error al actualizar!', error.error.message , 'error');
                          });
    }
  }

  generatePDF( descarga: boolean ) {
    this._informeService.printPDF( this._informe )
                        .subscribe( res => {
                          //console.log(res)
                          let mediaType = 'application/pdf';
                          let blob = new Blob([res], {type: mediaType});
                          let filename = `${this._informe.paciente}-${this._informe.detalle.nombre}-${this._informe.fecha}.pdf`;

                          if (descarga) {
                            saveAs(blob, filename);
                          } else {
                            let pdfUrl = URL.createObjectURL(blob);
                            this.popUp(pdfUrl);
                          }     
                        },
                        error => {
                          console.log(error);
                        });
  }

  popUp(url) {
    let newWindow = window.open();
    let iframe = `<iframe src="${url}" frameborder="0" style="position: fixed;
                    background: #000;
                    border: none;
                    top: 0; right: 0;
                    bottom: 0; left: 0;
                    width: 100%;
                    height: 100%;" ></iframe>`;
    newWindow.document.open();
    newWindow.document.write(iframe);
    newWindow.document.close();
  } 

}
