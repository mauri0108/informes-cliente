import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Informe } from '../models/informe';
import { Usuario } from '../models/usuario';
import { GLOBAL } from '../global';

import { InformeResponse } from '../models/response';


@Injectable()
export class InformesService {

  constructor(private _http: HttpClient) { }

  getInformes() {
    return this._http.get< InformeResponse >(GLOBAL.informes);
  }

  getInforme(id: string){
    const uri =  `${GLOBAL.informe}${id}` ;
    return this._http.get< InformeResponse >(uri);
  }

  saveInforme( informe: Informe) {
    const uri = `${GLOBAL.crearInforme}`;

    // let headers: HttpHeaders = new HttpHeaders({"Content-Type": "application/json" }); , { headers}

    return this._http.post< InformeResponse >( uri, informe);
  }

  updateInforme( informe: Informe){
    const uri = `${GLOBAL.editarInforme}`;

    return this._http.post< InformeResponse >( uri, informe);
  }
}
