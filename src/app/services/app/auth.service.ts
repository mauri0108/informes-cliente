import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) { }

  loggedIn() {
    const token: string = this.jwtHelperService.tokenGetter()

    if (!token) {
      return false
    }

    const tokenExpired: boolean = this.jwtHelperService.isTokenExpired(token)
    //console.log(this.jwtHelperService.getTokenExpirationDate(token));
    return !tokenExpired
  }

}
