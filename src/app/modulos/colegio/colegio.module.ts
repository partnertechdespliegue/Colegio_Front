import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TimePickerModule, DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from '../../material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalInterceptor } from '../../global.interceptor';
import { UsuarioService } from '../administracion/services/usuarios/usuario.service';
import { RolService } from '../administracion/services/roles/roles.service';
import { COLEGIO_ROUTES } from './colegio.routes';
import { GestionColegioComponent } from './pages/gestion-colegio/gestion-colegio.component';
import { NuevoColegioComponent } from './pages/gestion-colegio/modals/nuevo-colegio/nuevo-colegio.component';
import { ConfirmarColegioComponent } from './pages/gestion-colegio/modals/confirmar-colegio/confirmar-colegio.component';
import { GestionSucursalComponent } from './pages/gestion-sucursal/gestion-sucursal.component';
import { NuevaSucursalComponent } from './pages/gestion-sucursal/modals/nueva-sucursal/nueva-sucursal.component';
import { ConfirmarSucursalComponent } from './pages/gestion-sucursal/modals/confirmar-sucursal/confirmar-sucursal.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { GestionDiaLaboralComponent } from './pages/gestion-sucursal/modals/gestion-dia-laboral/gestion-dia-laboral.component';
import { ConfirmarDiaLaboralComponent } from './pages/gestion-sucursal/modals/confirmar-dia-laboral/confirmar-dia-laboral.component';
import { GestionTurnoComponent } from './pages/gestion-sucursal/modals/gestion-turno/gestion-turno.component';
import { NuevoTurnoComponent } from './pages/gestion-sucursal/modals/nuevo-turno/nuevo-turno.component';
import { ConfirmarTurnoComponent } from './pages/gestion-sucursal/modals/confirmar-turno/confirmar-turno.component';
import { NuevoRecesoComponent } from './pages/gestion-sucursal/modals/nuevo-receso/nuevo-receso.component';
import { ConfirmarRecesoComponent } from './pages/gestion-sucursal/modals/confirmar-receso/confirmar-receso.component';

@NgModule({
  imports: [
    CommonModule,
    COLEGIO_ROUTES,
    SharedModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    TimePickerModule,
    NgxPaginationModule,
    MaterialModule,
    DatePickerModule,
    NgxMaterialTimepickerModule
  ],

  declarations: [
    GestionColegioComponent,
    NuevoColegioComponent,
    ConfirmarColegioComponent,
    GestionSucursalComponent,
    NuevaSucursalComponent,
    ConfirmarSucursalComponent,
    GestionDiaLaboralComponent,
    ConfirmarDiaLaboralComponent,
    GestionTurnoComponent,
    NuevoTurnoComponent,
    ConfirmarTurnoComponent,
    NuevoRecesoComponent,
    ConfirmarRecesoComponent],

  entryComponents: [
    NuevoColegioComponent,
    ConfirmarColegioComponent,
    NuevaSucursalComponent,
    ConfirmarSucursalComponent,
    GestionDiaLaboralComponent,
    ConfirmarDiaLaboralComponent,
    GestionTurnoComponent,
    NuevoTurnoComponent,
    ConfirmarTurnoComponent,
    NuevoRecesoComponent,
    ConfirmarRecesoComponent
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalInterceptor,
      multi: true,
    },
    DatePipe,
    UsuarioService,
    RolService
  ]
})
export class ColegioModule { }
