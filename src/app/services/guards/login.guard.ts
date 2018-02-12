import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


import { AuthService } from "../service.index";


@Injectable()
export class LoginGuard implements CanActivate {
  
  constructor( 
    private auth: AuthService,
    private _router: Router
   ) {}

  canActivate() {
    if (this.auth.loggedIn()) {
      return true
    } else {
      localStorage.removeItem('token');
      this._router.navigate(['/login']);
      return false;
    }  
  }
}
