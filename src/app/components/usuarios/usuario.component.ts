import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Usuario } from '../../models/usuario';
import { UsuariosService  } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {
  public _usuario: Usuario = new Usuario('', '', '', '', '', '', '', '');
  public _id: string;
  public nuevo = true;
  public mensaje: string;
  public errorMensaje: string;

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _usuariosService: UsuariosService) { }

  ngOnInit() {
    this._activatedRoute.params
        .subscribe(
          params => {
            this._id = params['id'];
            if (this._id !== 'nuevo') {
                this.nuevo = false;
                this._usuariosService.getUsuario( this._id )
                    .subscribe( res => {
                      this._usuario = res.usuario;
                      console.log(this._usuario);
                    },
                    error => {
                      this.mensaje = error
                    });
            }
          });
  }

  saveUser() {
    if (this.nuevo) {
      this._usuariosService.saveUser(this._usuario)
                           .subscribe(
                            res => {
                              this._usuario = res.usuario;
                              this._router.navigate(['/admin/usuario', this._usuario._id ]);
                              this.mensaje = res.message;
                              this.ocultarMensaje(this.mensaje);
                            },
                            error => {
                              this.errorMensaje = <string>(error.error).split('<br>')[0];
                              this.ocultarMensaje(this.errorMensaje);
                            }

                           );
    } else {
      this._usuariosService.updateUser(this._usuario)
          .subscribe(
            res => {
              this._usuario = res.usuario;
              this.mensaje = res.message;
              this.ocultarMensaje(this.mensaje);
            },
            error =>{
              this.errorMensaje = <string>error.error.split('<br>')[0];
              this.ocultarMensaje(this.errorMensaje);
            }
          );
    }
  }

  ocultarMensaje(mensaje: any){
    setTimeout( () => {
      this.mensaje = undefined;
    }, 2000);
  }

}
