import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { APP_ROUTING } from './app.routes';

import { InformeComponent } from './components/informe/informe.component';
import { AdminComponent } from './components/admin/admin.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioComponent } from './components/usuarios/usuario.component';
import { ProtocolosComponent } from './components/protocolos/protocolos.component';
import { ProtocoloComponent } from './components/protocolos/protocolo.component';

import { ProtocoloService } from './services/protocolos.service';
import { InformesService } from './services/informes.service';
import { UsuariosService } from './services/usuarios.service';
import { UploadService } from "./services/upload.service";
import { UrlPipe } from './pipes/url.pipe';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PagesComponent } from './components/pages.component';
import { LoginGuard } from './services/guards/login.guard';
import { AdminGuard } from './services/guards/admin.guard';
import { LoggedGuard } from './services/guards/logged.guard';




@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavbarComponent,
    InformeComponent,
    AdminComponent,
    UsuariosComponent,
    UsuarioComponent,
    ProtocolosComponent,
    ProtocoloComponent,
    UrlPipe,
    LoginComponent,
    NotfoundComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING
  ],
  providers: [
    ProtocoloService,
    UsuariosService,
    UploadService,
    InformesService,
    LoginGuard,
    AdminGuard,
    LoggedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
