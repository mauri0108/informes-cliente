import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './components/inicio/inicio.component';
import { InformeComponent } from './components/informe/informe.component';
import { AdminComponent} from './components/admin/admin.component';
import { InformesComponent } from './components/informes/informes.component';
import { ProtocoloComponent } from './components/informes/protocolo.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioComponent } from './components/usuarios/usuario.component';

const APP_ROUTES: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'informe/:id', component: InformeComponent },
  { path: 'admin',
    component: AdminComponent,
    children : [
      { path: 'informes', component: InformesComponent },
      { path: 'protocolo/:id', component: ProtocoloComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'usuario/:id', component: UsuarioComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'informes' }
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
