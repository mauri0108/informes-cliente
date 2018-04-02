import { Injectable } from '@angular/core';
import { GLOBAL } from '../../global';


@Injectable()
export class UploadService {
  
  uploadImg(file: File, id: string, instIndex: number) {
    let headers = new Headers();
    headers.append("Authorization", localStorage.getItem('token') );

    let formData = new FormData();
    formData.append( 'image', file, file.name);

    const url = `${GLOBAL.upload}${id}?institucion=${instIndex}`; 

    return fetch( url , { method: 'POST', body: formData, headers });
  }
}
