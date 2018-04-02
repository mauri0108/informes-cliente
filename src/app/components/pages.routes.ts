import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { InicioComponent } from './inicio/inicio.component';
import { InformeComponent } from './informe/informe.component';
import { InformesUsuarioComponent } from './informe/informes-usuario.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AdminComponent } from './admin/admin.component';
import { ProtocoloComponent } from './protocolos/protocolo.component';
import { ProtocolosComponent } from './protocolos/protocolos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuarios/usuario.component';

import { LoginGuard } from '../services/guards/login.guard';
import { AdminGuard } from '../services/guards/admin.guard';



const PAGES: Routes = [
      { path: 'inicio', component: InicioComponent, canActivate: [ LoginGuard ] },
      { path: 'modelo/:idModelo/informe/:idInforme', component: InformeComponent, canActivate: [ LoginGuard ] },
      { path: 'informes/usuario/:id', component: InformesUsuarioComponent, canActivate: [ LoginGuard ] },
      { path: 'usuario/:id', component: PerfilComponent, canActivate: [ LoginGuard ] },
      { path: 'admin',
        component: AdminComponent,
        canActivate: [ AdminGuard ],
        children : [
          { path: 'protocolos', component: ProtocolosComponent,  canActivate: [ AdminGuard ] },
          { path: 'protocolo/:id', component: ProtocoloComponent,  canActivate: [ AdminGuard ] },
          { path: 'usuarios', component: UsuariosComponent,  canActivate: [ AdminGuard ] },
          { path: 'usuario/:id', component: UsuarioComponent,  canActivate: [ AdminGuard ] },
          { path: '**', pathMatch: 'full', redirectTo: 'protocolos' }
        ]
      },
      { path: '', pathMatch: 'full', redirectTo: 'inicio' }
    ];

export const PAGES_ROUTES = RouterModule.forChild( PAGES );