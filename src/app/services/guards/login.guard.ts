import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuariosService } from '../usuarios.service';


@Injectable()
export class LoginGuard implements CanActivate {
  
  constructor( 
    private _usuarioService: UsuariosService,
    private _router: Router
   ) {}

  canActivate() {
    if ( this._usuarioService.estaLogueado() ) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
    
  }
}
