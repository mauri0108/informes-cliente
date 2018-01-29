import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Usuario } from '../models/usuario';
import { GLOBAL } from '../global';

import { UsuarioResponse } from '../models/response';
import { Router } from '@angular/router';

//import swal from 'sweetalert';
declare var swal: any;

@Injectable()
export class UsuariosService {

  public id: string;
  public token: string;
  public nombre: string;
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
    let headers: HttpHeaders = new HttpHeaders({"Authorization": this.token }); 
    return this._http.post< UsuarioResponse >( uri, usuario, { headers });
  }

  updateUser(usuario: Usuario) {
    const uri = `${GLOBAL.crearEditarUsuario}`;
    let headers: HttpHeaders = new HttpHeaders({"Authorization": this.token }); 
    return this._http.put< UsuarioResponse >( uri, usuario, { headers });
  }


  login( usuario: Usuario, recordar: boolean) {
    const uri = `${GLOBAL.login}`;
    
    return this._http.post( uri, usuario)
                     .map( (res: any) => {
                       localStorage.setItem('id', res.usuario._id);
                       localStorage.setItem('token', res.token);
                       localStorage.setItem('nombre', `${res.usuario.nombre} ${res.usuario.apellido}`);

                       this.nombre = `${res.usuario.nombre} ${res.usuario.apellido}`;
                       this.id = res.usuario.id;
                       this.token = res.token;

                       return true;
                     }).catch ( err => {
                        console.log( err )
                        swal('Error en el ingreso', err.error.message, 'error');
                        //console.log( err.error.message )
                        return _throw ( err );
                     })
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
    //console.log("Se llamo a cargar storage")
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
    this.nombre = '';

    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('nombre');

    this._router.navigate(['/login']);
  }

}
