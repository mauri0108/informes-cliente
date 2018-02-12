import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Usuario } from '../../models/usuario';
import { UsuariosService  } from '../../services/service.index';

import * as moment from 'moment'

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
    //console.log( moment().format('DD-MM-YYYY hh:mm:ss') );
    this._activatedRoute.params
        .subscribe(
          params => {
            this._id = params['id'];
            if (this._id !== 'nuevo') {
                this.nuevo = false;
                this._usuariosService.getUsuario( this._id )
                    .subscribe( res => {
                      this._usuario = res.usuario;
                      //console.log(this._usuario)
                    },
                    error => {
                      swal('Error al buscar usuario', `${error.error.message}` , 'error');
                    });
            }
          });
  }

  setLowDate() {
    if (this._usuario.fechaBaja) {
      swal({
        title: "Esta seguro?",
        text: "Desea reactivar este usuario",
        icon: "warning",
        buttons: ["Cancelar", true],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this._usuario.fechaBaja = null;
  
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
      });
    } else {
      swal({
        title: "Esta seguro?",
        text: "Desea dar de baja este usuario",
        icon: "warning",
        buttons: ["Cancelar", true],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this._usuario.fechaBaja = moment().format('DD-MM-YYYY hh:mm:ss');
  
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
      });
    }
  }

  resetPass() {
    swal({
      title: "Esta seguro?",
      text: "Desea resetear la pass de este usuario",
      icon: "warning",
      buttons: ["Cancelar", true],
      dangerMode: true,
    })
    .then((willReset) => {
      if (willReset) {
      

        this._usuariosService.defaultPass(this._usuario)
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
    });
  }

  saveUser() {
    //console.log(this._usuario)
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
