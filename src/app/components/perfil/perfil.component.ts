import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Usuario, Institucion } from '../../models/usuario';
import { UsuariosService  } from '../../services/usuarios.service';
import { UploadService } from '../../services/upload.service';

declare var swal: any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {
  public _id: string;
  public _usuario: Usuario;

  public instIndex: number;
  public editInst = false;
  public instNombre: string;

  public file: File;
  public logoTemporal: string;
    
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _uploadService: UploadService,
    private _usuariosService: UsuariosService) { }

  ngOnInit() {
    this._activatedRoute.params
        .subscribe(
          params => {
            this._id = params['id'];
            if (this._id) {
                this._usuariosService.getUsuario( this._id )
                    .subscribe( res => {
                      this._usuario = res.usuario;
                    },
                    error => {
                      swal('Error al buscar usuario', `${error.error.message}` , 'error');
                    });
            }
          });
  }

  getImagem(readerEvt) {
    this.file = null;
    this.logoTemporal = null;
    //console.log('change no input file', readerEvt);
    this.file = readerEvt.target.files[0];
    //console.log(this.file)
    const reader = new FileReader();

    if (this.file) {
      reader.readAsDataURL( this.file);
    }
    
    reader.onload = () => {
        // console.log('base64 do arquivo', reader.result);
         this.logoTemporal = reader.result ;
        //console.log(this.logoTemporal);
        // console.log(this._informeCompleto.logo)
        //console.log('base64 do arquivo codificado',midia.binario);
    };
    reader.onerror = (error) => {
        console.log('Erro ao ler a imagem : ', error);
    };
  }

  getInst(opcion: any) {
    if (opcion === 'agregar') {
      this.editInst = false;
      this.instIndex = null;
      
    } else {
      this.editInst = true;
      this.instIndex = opcion;
      this.instNombre = this._usuario.instituciones[this.instIndex].nombre;
    }
  }

  addEditInst() {
    if (this.editInst) {
      this._usuario.instituciones[this.instIndex].nombre = this.instNombre;

      this._usuariosService.updateUser( this._usuario )
                           .subscribe( res => {
                            this._usuario = res.usuario;

                            if (this.file) {
                              this.uploadImg(this.file, this._usuario._id, this.instIndex);
                            }else {
                              this.instNombre = null;
                              this.instIndex = null;
                              swal('Perfecto!', 'Se actulizo correctamente la institucion'  , 'success');
                            }
                           },
                           error => {
                            console.log(error )
                            swal('Error al actualizar!', error.error.message , 'error'); 
                           });
      
    } else {
      let inst: Institucion = new Institucion( this.instNombre , null);
      let indexInst = this._usuario.instituciones.push(inst) - 1;
      
      this._usuariosService.updateUser(this._usuario)
                          .subscribe( res => {
                              this._usuario = res.usuario;

                              if (this.file) {
                                this.uploadImg(this.file, this._usuario._id, indexInst);
                              }
                          },
                          error => {
                            console.log(error )
                            swal('Error al actualizar!', error.error.message , 'error');
                          });
    }
  }

  uploadImg(file: File, id: string, instIndex: number) {
    this._uploadService.uploadImg( file, id , instIndex)
    .then( res => {
         return res.json() 
     })
     .then( resJson => {
         swal('Perfecto!', resJson.message  , 'success');
         this._usuario.instituciones[instIndex] = resJson.usuario.instituciones[instIndex].logo;
     })
     .catch( err => {
        console.log( err );
        swal('Error!', err.message  , 'error');
     });
  }


}
