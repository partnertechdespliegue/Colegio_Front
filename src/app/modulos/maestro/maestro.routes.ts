import { Routes, RouterModule } from '@angular/router';
import { LoginGuardGuard } from '../../services/guards/login-guard.guard';
import { GestionMaestroComponent } from './pages/gestion-maestro/gestion-maestro.component';
import { HorarioMaestroComponent } from './pages/horario-maestro/horario-maestro.component';

const maestroteRoutes: Routes = [
  { path: 'gestionmaestro', component: GestionMaestroComponent, data: { titulo: 'Maestro', icono: '../../assets/images/icon/svg/paginaSVG/icon-maestro.svg' }, canActivate: [LoginGuardGuard] },
  { path: 'horariomaestro', component: HorarioMaestroComponent, data: { titulo: 'Horario Maestro', icono: '../../assets/images/icon/svg/paginaSVG/icon-horario-maestro.svg' }, canActivate: [LoginGuardGuard] },
];

export const MAESTRO_ROUTES = RouterModule.forChild(maestroteRoutes);
