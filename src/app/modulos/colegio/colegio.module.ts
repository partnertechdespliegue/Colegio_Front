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
import { GestionSalonComponent } from './pages/gestion-salon/gestion-salon.component';
import { NuevoSalonComponent } from './pages/gestion-salon/modals/nuevo-salon/nuevo-salon.component';
import { ConfirmarSalonComponent } from './pages/gestion-salon/modals/confirmar-salon/confirmar-salon.component';
import { GestionCursoComponent } from './pages/gestion-curso/gestion-curso.component';
import { NuevoTipoCursoComponent } from './pages/gestion-curso/modals/nuevo-tipo-curso/nuevo-tipo-curso.component';
import { ConfirmarTipoCursoComponent } from './pages/gestion-curso/modals/confirmar-tipo-curso/confirmar-tipo-curso.component';
import { NuevoTemaComponent } from './pages/gestion-curso/modals/nuevo-tema/nuevo-tema.component';
import { ConfirmarTemaComponent } from './pages/gestion-curso/modals/confirmar-tema/confirmar-tema.component';
import { NuevoCursoComponent } from './pages/gestion-curso/modals/nuevo-curso/nuevo-curso.component';
import { ConfirmarCursoComponent } from './pages/gestion-curso/modals/confirmar-curso/confirmar-curso.component';
import { GestionTemarioComponent } from './pages/gestion-curso/modals/gestion-temario/gestion-temario.component';
import { HorarioSalonComponent } from './pages/gestion-salon/modals/horario-salon/horario-salon.component';
import { NuevoHorarioSalonComponent } from './pages/gestion-salon/modals/nuevo-horario-salon/nuevo-horario-salon.component';
import { ConfirmarHorarioSalonComponent } from './pages/gestion-salon/modals/confirmar-horario-salon/confirmar-horario-salon.component';
import { GestionSeccionComponent } from './pages/gestion-seccion/gestion-seccion.component';
import { NuevaSeccionComponent } from './pages/gestion-seccion/modals/nueva-seccion/nueva-seccion.component';
import { ConfirmarSeccionComponent } from './pages/gestion-seccion/modals/confirmar-seccion/confirmar-seccion.component';
import { GestionSeccionEstudianteComponent } from './pages/gestion-seccion/modals/gestion-seccion-estudiante/gestion-seccion-estudiante.component';
import { ConfirmarSeccionEstudianteComponent } from './pages/gestion-seccion/modals/confirmar-seccion-estudiante/confirmar-seccion-estudiante.component';
import { HorarioSeccionComponent } from './pages/gestion-seccion/modals/horario-seccion/horario-seccion.component';
import { NuevoHorarioSeccionComponent } from './pages/gestion-seccion/modals/nuevo-horario-seccion/nuevo-horario-seccion.component';
import { ConfirmarHorarioSeccionComponent } from './pages/gestion-seccion/modals/confirmar-horario-seccion/confirmar-horario-seccion.component';

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
    ConfirmarRecesoComponent,
    GestionSalonComponent,
    NuevoSalonComponent,
    ConfirmarSalonComponent,
    GestionCursoComponent,
    NuevoTipoCursoComponent,
    ConfirmarTipoCursoComponent,
    NuevoTemaComponent,
    ConfirmarTemaComponent,
    NuevoCursoComponent,
    ConfirmarCursoComponent,
    GestionTemarioComponent,
    HorarioSalonComponent,
    NuevoHorarioSalonComponent,
    ConfirmarHorarioSalonComponent,
    GestionSeccionComponent,
    NuevaSeccionComponent,
    ConfirmarSeccionComponent,
    GestionSeccionEstudianteComponent,
    ConfirmarSeccionEstudianteComponent,
    HorarioSeccionComponent,
    NuevoHorarioSeccionComponent,
    ConfirmarHorarioSeccionComponent,],

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
    ConfirmarRecesoComponent,
    NuevoSalonComponent,
    ConfirmarSalonComponent,
    NuevoTipoCursoComponent,
    ConfirmarTipoCursoComponent,
    NuevoTemaComponent,
    ConfirmarTemaComponent,
    NuevoCursoComponent,
    ConfirmarCursoComponent,
    GestionTemarioComponent,
    HorarioSalonComponent,
    NuevoHorarioSalonComponent,
    ConfirmarHorarioSalonComponent,
    NuevaSeccionComponent,
    ConfirmarSeccionComponent,
    GestionSeccionEstudianteComponent,
    ConfirmarSeccionEstudianteComponent,
    HorarioSeccionComponent,
    NuevoHorarioSeccionComponent,
    ConfirmarHorarioSeccionComponent,],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalInterceptor,
      multi: true,
    },
    DatePipe,
  ]
})
export class ColegioModule { }
