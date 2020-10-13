import { Routes, RouterModule } from '@angular/router';
import { LoginGuardGuard } from '../../services/guards/login-guard.guard';


const colegioRoutes: Routes = [
];

export const COLEGIO_ROUTES = RouterModule.forChild( colegioRoutes );
