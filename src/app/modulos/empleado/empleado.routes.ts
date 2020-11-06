import { Routes, RouterModule } from '@angular/router';
import { LoginGuardGuard } from '../../services/guards/login-guard.guard';
import { GestionOrganigramaComponent } from './pages/gestion-organigrama/gestion-organigrama.component';
import { GestionEmpleadoComponent } from './pages/gestion-empleado/gestion-empleado.component';


const empleadoRoutes: Routes = [
  { path: 'gestionempleado', component: GestionEmpleadoComponent, data: { titulo: 'Empleado', icono: '../../assets/images/icon/svg/paginaSVG/icon-empleado.svg' }, canActivate: [LoginGuardGuard] },
  { path: 'gestionorganigrama', component: GestionOrganigramaComponent, data: { titulo: 'Organigrama', icono: '../../assets/images/icon/svg/paginaSVG/icon-organigrama.svg' }, canActivate: [LoginGuardGuard] },
];

export const EMPLEADO_ROUTES = RouterModule.forChild(empleadoRoutes);
