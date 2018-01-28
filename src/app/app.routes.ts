import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './components/inicio/inicio.component';
import { InformeComponent } from './components/informe/informe.component';
import { InformesUsuarioComponent } from './components/informe/informes-usuario.component';

import { AdminComponent } from './components/admin/admin.component';
import { ProtocolosComponent } from './components/protocolos/protocolos.component';
import { ProtocoloComponent } from './components/protocolos/protocolo.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioComponent } from './components/usuarios/usuario.component';

import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PagesComponent } from './components/pages.component';

import { LoginGuard } from './services/guards/login.guard';
import { AdminGuard } from './services/guards/admin.guard';
import { LoggedGuard } from './services/guards/logged.guard';

const APP_ROUTES: Routes = [
  { path: '', 
    component: PagesComponent,
    canActivate: [ LoginGuard ],
    children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'modelo/:idModelo/informe/:idInforme', component: InformeComponent },
      { path: 'informes/usuario/:id', component: InformesUsuarioComponent },
      { path: 'admin',
        component: AdminComponent,
        canActivate: [ AdminGuard ],
        children : [
          { path: 'protocolos', component: ProtocolosComponent },
          { path: 'protocolo/:id', component: ProtocoloComponent },
          { path: 'usuarios', component: UsuariosComponent },
          { path: 'usuario/:id', component: UsuarioComponent },
          { path: '**', pathMatch: 'full', redirectTo: 'protocolos' }
        ]
      },
      { path: '', pathMatch: 'full', redirectTo: 'inicio' }
    ]
  },
  { path: 'login', 
    component: LoginComponent, 
    canActivate: [ LoggedGuard ]
  },
  { path: '**', component: NotfoundComponent }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });
