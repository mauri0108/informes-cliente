import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { APP_ROUTING } from './app.routes';
import { InformeComponent } from './components/informe/informe.component';
import { AdminComponent } from './components/admin/admin.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioComponent } from './components/usuarios/usuario.component';
import { InformesComponent } from './components/informes/informes.component';
import { ProtocoloComponent } from './components/informes/protocolo.component';

import { InformesService } from './services/informes.service';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavbarComponent,
    InformeComponent,
    AdminComponent,
    UsuariosComponent,
    UsuarioComponent,
    InformesComponent,
    ProtocoloComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTING
  ],
  providers: [
    InformesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
