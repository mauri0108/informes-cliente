import { Component, OnInit } from '@angular/core';

import { UsuariosService } from '../../services/service.index';

import { Usuario } from '../../models/usuario';

declare var swal: any;
import * as moment from 'moment'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  
  public _usuarios: Usuario[];
  public loading = false;

  constructor( private _usuarioService: UsuariosService) { }

  ngOnInit() {
    this.loading = true;
    this._usuarioService.getUsuarios()
                        .subscribe( res => {
                             this._usuarios = res.usuarios; 
                             this.loading = false;
                             //console.log(this._usuarios)
                            },
                          error => {
                             console.log(error);
                             this.loading = false;
                          }

    );
  }

  resetPass(index: number) {
    swal({
      title: "Esta seguro?",
      text: "Desea resetear la pass de este usuario",
      icon: "warning",
      buttons: ["Cancelar", true],
      dangerMode: true,
    })
    .then((willReset) => {
      if (willReset) {
        this._usuarioService.defaultPass(this._usuarios[index])
          .subscribe(
          res => {
            swal('Perfecto!', res.message , 'success');
          },
          error => {
            swal('Error al actualizar el  usuario', `${error.error.message}` , 'error');
          }
        );
      } 
    });
  }

  setLowDate(index: number) {
    if (this._usuarios[index].fechaBaja) {
      swal({
        title: "Esta seguro?",
        text: "Desea reactivar este usuario",
        icon: "warning",
        buttons: ["Cancelar", true],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this._usuarios[index].fechaBaja = null;
  
          this._usuarioService.updateUser(this._usuarios[index])
            .subscribe(
            res => {
              this._usuarios[index] = res.usuario;
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
          this._usuarios[index].fechaBaja = moment().format('DD-MM-YYYY hh:mm:ss');
  
          this._usuarioService.updateUser(this._usuarios[index])
            .subscribe(
            res => {
              this._usuarios[index] = res.usuario;
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
}
