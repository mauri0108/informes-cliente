import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuariosService } from '../usuarios.service';

@Injectable()
export class LoggedGuard implements CanActivate {

  constructor( 
    private _usuarioService: UsuariosService,
    private _router: Router
   ) {}

  canActivate() {
    if ( !this._usuarioService.estaLogueado() ) {
      return true;
    } else {
      this._router.navigate(['/inicio']);
      return false;
    }
    
  }
}
