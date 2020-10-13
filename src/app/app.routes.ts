import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { InicioComponent } from './shared/Inicio/inicio.component';
import { AdministracionComponent } from './modulos/administracion/administracion.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent, data: { titulo: 'Inicio', icono: '../../assets/images/icon/svg/icon-inicio.svg' } },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: AdministracionComponent,
    loadChildren: './modulos/administracion/administracion.module#AdministracionModule'
  },
  { path: '**', component: NopagefoundComponent }
];


export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
