import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalInstitucionService } from '../components/modal-institucion/modal-institucion.service';

import { UsuariosService,
         InformesService,
         ProtocoloService,
         UploadService,
         AuthService } from "./service.index";



@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    UsuariosService,
    InformesService,
    ProtocoloService,
    UploadService,
    AuthService,
    ModalInstitucionService
  ],
  declarations: []
})
export class ServiceModule { }
