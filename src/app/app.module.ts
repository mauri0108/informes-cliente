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
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PagesComponent } from './components/pages.component';
import { InformesUsuarioComponent } from './components/informe/informes-usuario.component';

import { ProtocoloService } from './services/protocolos.service';
import { InformesService } from './services/informes.service';
import { UsuariosService } from './services/usuarios.service';
import { UploadService } from "./services/upload.service";
import { AuthService } from "./services/auth.service";

import { UrlPipe } from './pipes/url.pipe';

import { LoginGuard } from './services/guards/login.guard';
import { AdminGuard } from './services/guards/admin.guard';
import { LoggedGuard } from './services/guards/logged.guard';

import { GLOBAL } from "./global";
import { JwtModule } from '@auth0/angular-jwt';
import { ChangepassComponent } from './changepass/changepass.component';

export function getToken() {
  return localStorage.getItem('token');
 }

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
    PagesComponent,
    InformesUsuarioComponent,
    ChangepassComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: [`${GLOBAL.urlBase}` , 'localhost']
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING
  ],
  providers: [
    ProtocoloService,
    UsuariosService,
    UploadService,
    InformesService,
    AuthService,
    LoginGuard,
    AdminGuard,
    LoggedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
