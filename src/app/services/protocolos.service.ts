import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Protocolo } from '../models/protocolo-informe';
import { GLOBAL } from '../global';

import { ProtocoloResponse } from '../models/response';


@Injectable()
export class ProtocoloService {
  
  private token: string; 

  constructor(private _http: HttpClient) { 
    this.token = localStorage.getItem('token') ;
  }

  getProtocolos() {
    return this._http.get< ProtocoloResponse >(GLOBAL.protocolos);
  }

  getProtocolo(id: string) {
    const uri =  `${GLOBAL.protocolo}${id}` ;
    return this._http.get< ProtocoloResponse >(uri);
  }

  saveProtocolo( protocolo: Protocolo) {
    let headers: HttpHeaders = new HttpHeaders({"Authorization": this.token });
    const uri = `${GLOBAL.crearEditarProtocolo}`;
    return this._http.post< ProtocoloResponse >( uri, protocolo, { headers});
  }

  updateProtocolo( protocolo: Protocolo) {
    let headers: HttpHeaders = new HttpHeaders({"Authorization": this.token });
    const uri = `${GLOBAL.crearEditarProtocolo}`;
    return this._http.put< ProtocoloResponse >( uri, protocolo, { headers});
  }
}
