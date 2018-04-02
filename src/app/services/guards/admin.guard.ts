import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuariosService } from '../service.index';
import { Usuario } from '../../models/usuario';

@Injectable()
export class AdminGuard implements CanActivate {
  
  constructor(
    public _usuarioService: UsuariosService,
    private _router: Router
  ) {

  }

  canActivate(): any {
    return this._usuarioService.getUsuario( localStorage.getItem('id'))
                               .map( res => {
                                  if ( res.usuario.role === 'ADMIN' ) {
                                    return true;
                                  }

                                  return false;
                               });
  }
}
