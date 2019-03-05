import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../service.index';

@Injectable()
export class LoggedGuard implements CanActivate {

  constructor( 
    private auth: AuthService,
    private _router: Router
   ) {}

  canActivate() {
    if ( !this.auth.loggedIn() ) {
      return true;
    }  else {
      this._router.navigate(['']);
      return false;
    }
    
  }
}
