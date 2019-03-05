import { Component, OnInit } from '@angular/core';
import { Institucion, Usuario } from '../../models/usuario';
import { UploadService } from '../../services/service.index';
import { UsuariosService } from '../../services/app/usuarios.service';
import { ModalInstitucionService } from './modal-institucion.service';

declare var swal: any;

@Component({
  selector: 'app-modal-institucion',
  templateUrl: './modal-institucion.component.html',
  styles: []
})
export class ModalInstitucionComponent implements OnInit {

  usuario: Usuario;

  nombreInstitucion: string;
  logo: string;

  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;


  constructor(
    public _uploadService: UploadService,
    public _usuarioService: UsuariosService,
    public _modalInstitucionService: ModalInstitucionService
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;

    this._modalInstitucionService.notificacion.subscribe( institucion => {
      this.nombreInstitucion = institucion.nombre;
      this.logo = institucion.logo;
    });
  }

  seleccionImagen( archivo: File) {
    
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal('Solo imagenes', 'el archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;  
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  crearActualizarInstitucion() {
    if (this._modalInstitucionService.institucion) {

    } else {
      let inst: Institucion = new Institucion( this.nombreInstitucion , null);
      let indexInst = this.usuario.instituciones.push(inst) - 1;

      this._usuarioService.updateUser(this.usuario)
                          .subscribe( res => {
                              this.usuario = res.usuario;

                              if (this.imagenSubir) {
                                
                                this._uploadService.uploadImg( this.imagenSubir, this.usuario._id , indexInst)
                                .then( res => res.json())
                                .then( resJson => {
                                  swal('Perfecto!', resJson.message  , 'success');

                                  
                                  this.usuario = resJson.usuario;
                                  this._usuarioService.guardarStorage(this.usuario._id, this._usuarioService.token, this.usuario);

                                  this.cerrarModal();
                                })
                                .catch( err => {
                                    swal('Error!', err.message  , 'error');
                                });

                              }
                          },
                          error => {
                            console.log(error )
                            swal('Error al actualizar!', error.error.message , 'error');
                          });
    }
  }

  cerrarModal() {
    this.nombreInstitucion = null;
    this.imagenSubir = null;
    this.imagenTemp = null;

    this._modalInstitucionService.ocultarModal();
  }

}
