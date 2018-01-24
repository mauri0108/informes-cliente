import { Injectable } from '@angular/core';
import { GLOBAL } from '../global';


@Injectable()
export class UploadService {

  constructor() { }

  uploadImg(file: File, id: string) {
    let formData = new FormData();
    formData.append( 'image', file, file.name);

    const url = `${GLOBAL.upload}${id}`; 

    return fetch( url , { method: 'POST', body: formData });
  }
}
