import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { InicioComponent } from './shared/Inicio/inicio.component';
import { AdministracionComponent } from './modulos/administracion/administracion.component';
import { GestionColegioComponent } from './modulos/colegio/pages/gestion-colegio/gestion-colegio.component';
import { ColegioComponent } from './modulos/colegio/colegio.component';
import { EstudianteComponent } from './modulos/estudiante/estudiante.component';
import { ConfiguracionComponent } from './modulos/configuracion/configuracion.component';
import { EmpleadoComponent } from './modulos/empleado/empleado.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent, data: { titulo: 'Inicio', icono: '../../assets/images/icon/svg/icon-inicio.svg' } },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: AdministracionComponent,
    loadChildren: './modulos/administracion/administracion.module#AdministracionModule'
  },
  {
    path: '',
    component: EstudianteComponent,
    loadChildren: './modulos/estudiante/estudiante.module#EstudianteModule'
  },
  {
    path: '',
    component: EmpleadoComponent,
    loadChildren: './modulos/empleado/empleado.module#EmpleadoModule'
  },
  {
    path: '',
    component: ColegioComponent,
    loadChildren: './modulos/colegio/colegio.module#ColegioModule'
  },
  {
    path: '',
    component: ConfiguracionComponent,
    loadChildren: './modulos/configuracion/configuracion.module#ConfiguracionModule'
  },
  { path: '**', component: NopagefoundComponent }
];


export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
