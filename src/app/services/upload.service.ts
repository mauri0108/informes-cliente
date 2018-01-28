import { Injectable } from '@angular/core';
import { GLOBAL } from '../global';


@Injectable()
export class UploadService {
  public token: string;

  constructor() {
    this.token = localStorage.getItem('token') ;
   }

  uploadImg(file: File, id: string) {
    let headers = new Headers();
    headers.append("Authorization", this.token);

    let formData = new FormData();
    formData.append( 'image', file, file.name);

    const url = `${GLOBAL.upload}${id}`; 

    return fetch( url , { method: 'POST', body: formData, headers });
  }
}
