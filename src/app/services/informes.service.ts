import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Informe } from '../models/protocolo-informe';
import { GLOBAL } from '../global';

import { InformeResponse } from '../models/response';


@Injectable()
export class InformesService {

  constructor(private _http: HttpClient) { }

  getInforme ( id: string) {
    const uri = `${GLOBAL.informe}${id}`;
    return this._http.get< InformeResponse >(uri);
  }

  saveInforme( informe: Informe) {
    const uri = `${GLOBAL.crearEditarInforme}`
    return this._http.post< InformeResponse >( uri, informe);
  }

  updateInforme( informe: Informe) {
    const uri = `${GLOBAL.crearEditarInforme}`
    return this._http.put< InformeResponse >( uri, informe);
  }


     

  



}
