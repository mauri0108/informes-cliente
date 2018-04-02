import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ChangepassComponent } from './changepass/changepass.component';
import { PagesComponent } from './components/pages.component';
import { NotfoundComponent } from './notfound/notfound.component';


import { LoginGuard } from './services/guards/login.guard';
import { AdminGuard } from './services/guards/admin.guard';
import { LoggedGuard } from './services/guards/logged.guard';

const APP_ROUTES: Routes = [
  { path: 'login', 
    component: LoginComponent, 
    canActivate: [ LoggedGuard ]
  },
  { path: 'nueva-pass', 
    component: ChangepassComponent
  },
  {
     path: '',
     component: PagesComponent,
     canActivate : [ LoginGuard ],
     loadChildren: './components/pages.module#PagesModule'
  },
  { path: '**', component: NotfoundComponent, canActivate: [ LoginGuard ]  }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });
