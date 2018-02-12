//Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//rutas
import { APP_ROUTING } from './app.routes';

//modulos
//import { PagesModule } from './components/pages.module';
import { SharedModule } from './shared/shared.module';

//componentes

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ChangepassComponent } from './changepass/changepass.component';

import { PagesComponent } from './components/pages.component';



//Servicios
import { ServiceModule } from './services/service.module';

//guards
import { LoginGuard } from './services/guards/login.guard';
import { AdminGuard } from './services/guards/admin.guard';
import { LoggedGuard } from './services/guards/logged.guard';

import { GLOBAL } from "./global";
import { JwtModule } from '@auth0/angular-jwt';

export function getToken() {
  return localStorage.getItem('token');
 }

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotfoundComponent,
    PagesComponent,
    ChangepassComponent,
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
    //PagesModule,
    APP_ROUTING,
    ServiceModule,
    SharedModule
  ],
  providers: [
    LoginGuard,
    AdminGuard,
    LoggedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
