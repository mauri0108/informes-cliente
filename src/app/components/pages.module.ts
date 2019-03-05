//Core
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Routes
import { PAGES_ROUTES } from './pages.routes';

//modulos
import { SharedModule } from "../shared/shared.module";

//Components
import { InicioComponent } from './inicio/inicio.component';
import { InformeComponent } from './informe/informe.component';
import { AdminComponent } from './admin/admin.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { ProtocolosComponent } from './protocolos/protocolos.component';
import { ProtocoloComponent } from './protocolos/protocolo.component';
import { InformesUsuarioComponent } from './informe/informes-usuario.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PipesModule } from 'app/pipes/pipes.module';

@NgModule({
  declarations: [
    InicioComponent,
    InformeComponent,
    AdminComponent,
    UsuariosComponent,
    UsuarioComponent,
    ProtocolosComponent,
    ProtocoloComponent,
    InformesUsuarioComponent,
    PerfilComponent
  ],
  exports: [
    InicioComponent,
    InformeComponent,
    AdminComponent,
    UsuariosComponent,
    UsuarioComponent,
    ProtocolosComponent,
    ProtocoloComponent,
    InformesUsuarioComponent,
    PerfilComponent
  ],
  imports: [
    PAGES_ROUTES,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})

export class PagesModule { }