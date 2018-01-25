import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuariosService } from '../usuarios.service';
import { Usuario } from '../../models/usuario';

@Injectable()
export class AdminGuard implements CanActivate {
  
  constructor(
    public _usuarioService: UsuariosService
  ) {}

  canActivate() {
  
    let usuario: Usuario;
    
    this._usuarioService.getUsuario( this._usuarioService.id )
                        .subscribe( res => {
                          usuario = res.usuario
                        },
                        error => {

                        });

    if ( usuario.role === "ADMIN") {
      console.log("paso el admin guard");
      return true;
    } else {
      console.log("no paso el admin guard");
      return false;
    }
  }
}
