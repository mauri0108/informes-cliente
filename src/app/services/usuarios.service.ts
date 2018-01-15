import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Informe } from '../models/informe';
import { Usuario } from '../models/usuario';
import { GLOBAL } from '../global';

import { UsuarioResponse } from '../models/response';

@Injectable()
export class UsuariosService {

  constructor(private _http: HttpClient) { }

  getUsuarios() {
    return this._http.get< UsuarioResponse >(GLOBAL.usuarios);
  }

  getUsuario(id: string) {
    const uri = `${GLOBAL.usuario}${id}`;
    return this._http.get< UsuarioResponse >(uri);
  }

  saveUser(usuario: Usuario) {
    const uri = `${GLOBAL.crearUsuario}`;
    // let headers: HttpHeaders = new HttpHeaders({"Content-Type": "application/json" }); , { headers}
    return this._http.post< UsuarioResponse >( uri, usuario);
  }

  updateUser(usuario: Usuario) {
    const uri = `${GLOBAL.editarUsuario}`;
    // let headers: HttpHeaders = new HttpHeaders({"Content-Type": "application/json" }); , { headers}
    return this._http.post< UsuarioResponse >( uri, usuario);
  }


  login( email: string, pass: string) {
    const uri = `${GLOBAL.login}`;
    const dataLogin = { email : email, pass : pass};
    const body = JSON.stringify( dataLogin );

    return this._http.post( uri, body);
  }

  logOut() {
    const prueba = ``;
  }

}
