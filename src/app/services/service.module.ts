import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    AuthService
  ],
  declarations: []
})
export class ServiceModule { }
