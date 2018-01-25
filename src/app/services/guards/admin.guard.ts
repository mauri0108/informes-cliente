import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuariosService } from '../usuarios.service';
import { Usuario } from '../../models/usuario';

@Injectable()
export class AdminGuard implements CanActivate {
  
 
  constructor(
    public _usuarioService: UsuariosService,
    private _router: Router
  ) {
    this._usuarioService.cargarRol();
  }

  canActivate() {
    //console.log("admin ", this._usuarioService.isAdmin() );
    if ( this._usuarioService.isAdmin() ) {
      //console.log("paso el admin guard");
      return true;
    } else {
      //console.log("no paso el admin guard");
      this._router.navigate(['/inicio']);
      return false;
    }
  }
}
