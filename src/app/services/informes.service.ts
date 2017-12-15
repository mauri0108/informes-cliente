import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Informe } from '../models/informe';
import { Usuario } from '../models/usuario';
import { GLOBAL } from '../global';

@Injectable()
export class InformesService {

  constructor(private _http : HttpClient) { }

  getInformes(){
    return this._http.get<Informe[]>(GLOBAL.informes);
  }

  getInforme(id:string){
    let uri =  `${GLOBAL.informe}${id}` ;
    return this._http.get<Informe>(uri);
  }

  saveInforme( informe : Informe){
    let uri = `${GLOBAL.crearInforme}`;
    let body = JSON.stringify( informe );

    //console.log(body);
    let headers: HttpHeaders = new HttpHeaders({"Content-Type": "application/json" });

    return this._http.post( uri, body, { headers} );
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
