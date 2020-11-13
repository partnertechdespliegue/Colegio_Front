import { Routes, RouterModule } from '@angular/router';
import { LoginGuardGuard } from '../../services/guards/login-guard.guard';
import { GestionMaestroComponent } from './pages/gestion-maestro/gestion-maestro.component';

const maestroteRoutes: Routes = [
  { path: 'gestionmaestro', component: GestionMaestroComponent, data: { titulo: 'Maestro', icono: '../../assets/images/icon/svg/paginaSVG/icon-maestro.svg' }, canActivate: [LoginGuardGuard] },
];

export const MAESTRO_ROUTES = RouterModule.forChild(maestroteRoutes);
