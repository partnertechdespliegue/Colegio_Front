import { Routes, RouterModule } from '@angular/router';
import { LoginGuardGuard } from '../../services/guards/login-guard.guard';
import { GestionColegioComponent } from './pages/gestion-colegio/gestion-colegio.component';
import { GestionSucursalComponent } from './pages/gestion-sucursal/gestion-sucursal.component';
import { GestionSalonComponent } from './pages/gestion-salon/gestion-salon.component';
import { GestionCursoComponent } from './pages/gestion-curso/gestion-curso.component';
import { GestionSeccionComponent } from './pages/gestion-seccion/gestion-seccion.component';

const colegioRoutes: Routes = [
  { path: 'gestioncolegio', component: GestionColegioComponent, data: { titulo: 'Colegio', icono: '../../assets/images/icon/svg/paginaSVG/icon-colegio.svg' }, canActivate: [LoginGuardGuard] },
  { path: 'gestionsucursal', component: GestionSucursalComponent, data: { titulo: 'Sucursal', icono: '../../assets/images/icon/svg/paginaSVG/icon-sucursal.svg' }, canActivate: [LoginGuardGuard] },
  { path: 'gestionsalon', component: GestionSalonComponent, data: { titulo: 'Salon', icono: '../../assets/images/icon/svg/paginaSVG/icon-salon-clases.svg' }, canActivate: [LoginGuardGuard] },
  { path: 'gestionseccion', component: GestionSeccionComponent, data: { titulo: 'Seccion', icono: '../../assets/images/icon/svg/paginaSVG/icon-seccion.svg' }, canActivate: [LoginGuardGuard] },
  { path: 'gestioncurso', component: GestionCursoComponent, data: { titulo: 'Curso', icono: '../../assets/images/icon/svg/paginaSVG/icon-curso.svg' }, canActivate: [LoginGuardGuard] },
];

export const COLEGIO_ROUTES = RouterModule.forChild(colegioRoutes);
