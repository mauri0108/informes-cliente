import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Informe } from '../models/protocolo-informe';
import { GLOBAL } from '../global';

import { InformeResponse } from '../models/response';


@Injectable()
export class InformesService {
  
  private token: string; 

  constructor( private _http: HttpClient ) { 
    this.token = localStorage.getItem('token') ;
  }

  getInformesUsuario( id: string) {
    const uri = `${GLOBAL.usuarioInformes}${id}`;
    return this._http.get< InformeResponse>(uri);
  }

  getInformes() {
    return this._http.get< InformeResponse>(`${GLOBAL.informes}`);
  }

  getInformesText(id: string, text: string) {
    return this._http.get< InformeResponse >(`${GLOBAL.usuarioInformes}${id}/buscar/${text}`);
  }

  getInforme ( id: string) {
    const uri = `${GLOBAL.informe}${id}`;
    return this._http.get< InformeResponse >(uri);
  }

  saveInforme( informe: Informe) {
    let headers: HttpHeaders = new HttpHeaders({"Authorization": this.token });
    const uri = `${GLOBAL.crearEditarInforme}`
    return this._http.post< InformeResponse >( uri, informe, { headers });
  }

  updateInforme( informe: Informe) {
    let headers: HttpHeaders = new HttpHeaders({"Authorization": this.token });
    const uri = `${GLOBAL.crearEditarInforme}`
    return this._http.put< InformeResponse >( uri, informe, { headers });
  }

  printPDF( informe: Informe) {

    let uri = GLOBAL.report;

    
    

    let body = { template : { shortid: "Syi75tzSG" }, options : { preview : true },  data: informe };
    // console.log(JSON.stringify(body));
    let headers: HttpHeaders = new HttpHeaders();
    headers.append("Content-Type", "application/json");

    //const options = {headers: headers, responseType: 'blob' as 'blob'};
    const options = {headers: headers, responseType: 'arraybuffer' as 'arraybuffer'};

    return this._http.post( uri, body, options);
  }
}
