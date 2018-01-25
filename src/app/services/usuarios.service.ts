import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Usuario } from '../models/usuario';
import { GLOBAL } from '../global';

import { UsuarioResponse } from '../models/response';
import { Router } from '@angular/router';

@Injectable()
export class UsuariosService {

  public id: string;
  public token: string;
  public rol: string;

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { 
    this.cargarStorage();
    //this.cargarRol();
  }

  getUsuarios() {
    return this._http.get< UsuarioResponse >(GLOBAL.usuarios);
  }

  getUsuario(id: string) {
    const uri = `${GLOBAL.usuario}${id}`;
    return this._http.get< UsuarioResponse >(uri);
  }

  saveUser(usuario: Usuario) {
    const uri = `${GLOBAL.crearEditarUsuario}`;
    // let headers: HttpHeaders = new HttpHeaders({"Content-Type": "application/json" }); , { headers}
    return this._http.post< UsuarioResponse >( uri, usuario);
  }

  updateUser(usuario: Usuario) {
    const uri = `${GLOBAL.crearEditarUsuario}`;
    // let headers: HttpHeaders = new HttpHeaders({"Content-Type": "application/json" }); , { headers}
    return this._http.put< UsuarioResponse >( uri, usuario);
  }


  login( usuario: Usuario, recordar: boolean) {
    const uri = `${GLOBAL.login}`;
    
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    }else {
      localStorage.removeItem('email');
    }

    return this._http.post( uri, usuario)
                     .map( (res: any) => {
                       localStorage.setItem('id', res.usuario._id);
                       localStorage.setItem('token', res.token);
                       //localStorage.setItem('usuario', JSON.stringify( res.usuario) );
                       
                       this.id = res.usuario.id;
                       this.token = res.token;

                       return true;
                     });
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false ;
  }

  cargarRol() {
    //console.log("Se llamo a cargar el rol");
    this.getUsuario( localStorage.getItem('id'))
        .subscribe( res => {
          this.rol = res.usuario.role
        },
        error => {
        
        });
  }

  isAdmin() {
    //this.cargarRol();
    // console.log("rol", this.rol )
    // console.log("admin service", (this.rol == 'ADMIN') ? true : false)
    return  (this.rol === "ADMIN") ? true : false;
  }

  cargarStorage() {
    console.log("Se llamo a cargar storage")
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.id = localStorage.getItem('id');
    } else {
      this.token = '';
      this.id = '';
    }
  }

  logout() {
    this.id = '';
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('id');

    this._router.navigate(['/login']);
  }

}
