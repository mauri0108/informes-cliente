import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './components/inicio/inicio.component';
import { InformeComponent } from './components/informe/informe.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProtocolosComponent } from './components/protocolos/protocolos.component';
import { ProtocoloComponent } from './components/protocolos/protocolo.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioComponent } from './components/usuarios/usuario.component';

const APP_ROUTES: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'modelo/:idModelo/informe/:idInforme', component: InformeComponent },
  { path: 'admin',
    component: AdminComponent,
    children : [
      { path: 'protocolos', component: ProtocolosComponent },
      { path: 'protocolo/:id', component: ProtocoloComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'usuario/:id', component: UsuarioComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'protocolos' }
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
