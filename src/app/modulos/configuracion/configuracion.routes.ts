import { Routes, RouterModule } from '@angular/router';
import { LoginGuardGuard } from '../../services/guards/login-guard.guard';
// import { GestionColegioComponent } from './pages/gestion-colegio/gestion-colegio.component';
import { GestionParametroComponent } from './pages/gestion-parametro/gestion-parametro.component';


const configuracionRoutes: Routes = [
  { path: 'gestionparametros', component: GestionParametroComponent, data: { titulo: 'Parametros', icono: '../../assets/images/icon/svg/paginaSVG/icon-parametros.svg' }, canActivate: [LoginGuardGuard] },
];

export const CONFIGURACION_ROUTES = RouterModule.forChild(configuracionRoutes);
