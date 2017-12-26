import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Informe } from '../models/informe';
import { Usuario } from '../models/usuario';
import { GLOBAL } from '../global';

import { InformeResponse } from '../models/response';

@Injectable()
export class InformesService {

  constructor(private _http : HttpClient) { }

  getInformes(){
    return this._http.get< InformeResponse >(GLOBAL.informes);
  }

  getInforme(id:string){
    let uri =  `${GLOBAL.informe}${id}` ;
    return this._http.get< InformeResponse >(uri);
  }

  saveInforme( informe : Informe){
    let uri = `${GLOBAL.crearInforme}`;

    //let headers: HttpHeaders = new HttpHeaders({"Content-Type": "application/json" }); , { headers}

    return this._http.post< InformeResponse >( uri, informe);
  }

  updateInforme( informe : Informe){
    let uri = `${GLOBAL.editarInforme}`;

    return this._http.post< InformeResponse >( uri, informe);
  }

  register( usuario : Usuario ){
    let uri = `${GLOBAL.registrarse}`;
    let body = JSON.stringify( usuario );

    //console.log(body);
    let headers: HttpHeaders = new HttpHeaders({"Content-Type": "application/json" });

    return this._http.post( uri, body, { headers} );
  }

  login( email : string, pass : string){
    let uri = `${GLOBAL.login}`;
    let dataLogin = { email : email, pass : pass};
    let body = JSON.stringify( dataLogin );

    return this._http.post( uri, body);
  }

}
