import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './components/inicio/inicio.component';
import { InformeComponent } from './components/informe/informe.component';
import { InformesUsuarioComponent } from './components/informe/informes-usuario.component';

import { AdminComponent } from './components/admin/admin.component';
import { ProtocolosComponent } from './components/protocolos/protocolos.component';
import { ProtocoloComponent } from './components/protocolos/protocolo.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioComponent } from './components/usuarios/usuario.component';
import { PerfilComponent } from './components/perfil/perfil.component';


import { LoginComponent } from './login/login.component';
import { ChangepassComponent } from './changepass/changepass.component';
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
    ]
  },
  { path: 'login', 
    component: LoginComponent, 
    canActivate: [ LoggedGuard ]
  },
  { path: 'nueva-pass', 
    component: ChangepassComponent
  },
  { path: '**', component: NotfoundComponent, canActivate: [ LoginGuard ]  }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });
