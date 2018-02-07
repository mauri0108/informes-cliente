import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Usuario } from '../../models/usuario';
import { UsuariosService  } from '../../services/usuarios.service';

declare var swal: any;

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {
  public _usuario: Usuario = new Usuario('', '', '', '', null , '', 'USER', '', '');
  public _id: string;
  public nuevo = true;

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
                    },
                    error => {
                      swal('Error al buscar usuario', `${error.error.message}` , 'error');
                    });
            }
          });
  }

  saveUser() {
    if (this.nuevo) {
      this._usuariosService.saveUser(this._usuario)
                           .subscribe(
                            res => {
                              console.log(res);
                              this._usuario = res.usuario;
                              this._router.navigate(['/admin/usuario', this._usuario._id ]);
                              swal('Perfecto!', res.message , 'success');
                            },
                            error => {
                              swal('Error al insertar el  usuario', `${error.error.message}` , 'error');
                            }

                           );
    } else {
      this._usuariosService.updateUser(this._usuario)
          .subscribe(
            res => {
              console.log(res);
              this._usuario = res.usuario;
              swal('Perfecto!', res.message , 'success');
            },
            error => {
              swal('Error al actualizar el  usuario', `${error.error.message}` , 'error');
            }
          );
    }
  }
}
