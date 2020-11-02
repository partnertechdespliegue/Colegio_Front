import { Routes, RouterModule } from '@angular/router';
import { LoginGuardGuard } from '../../services/guards/login-guard.guard';
import { GestionEstudianteComponent } from './pages/gestion-estudiante/gestion-estudiante.component';
import { GestionApoderadoComponent } from './pages/gestion-apoderado/gestion-apoderado.component';

const estudianteRoutes: Routes = [
  { path: 'gestionestudiante', component: GestionEstudianteComponent, data: { titulo: 'Estudiante', icono: '../../assets/images/icon/svg/paginaSVG/icon-estudiantes.svg' }, canActivate: [LoginGuardGuard] },
  { path: 'gestionapoderado', component: GestionApoderadoComponent, data: { titulo: 'Apoderado', icono: '../../assets/images/icon/svg/paginaSVG/icon-apoderado.svg' }, canActivate: [LoginGuardGuard] },
];

export const ESTUDIANTE_ROUTES = RouterModule.forChild(estudianteRoutes);
