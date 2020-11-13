import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EmpleadoComponent } from './empleado.component';
import { EMPLEADO_ROUTES } from './empleado.routes';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TimePickerModule, DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from '../../material.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalInterceptor } from '../../global.interceptor';
import { GestionOrganigramaComponent } from './pages/gestion-organigrama/gestion-organigrama.component';
import { GestionEmpleadoComponent } from './pages/gestion-empleado/gestion-empleado.component';
import { NuevoDepartamentoComponent } from './pages/gestion-organigrama/modals/nuevo-departamento/nuevo-departamento.component';
import { ConfirmarDepartamentoComponent } from './pages/gestion-organigrama/modals/confirmar-departamento/confirmar-departamento.component';
import { ConfirmarPuestoComponent } from './pages/gestion-organigrama/modals/confirmar-puesto/confirmar-puesto.component';
import { NuevoPuestoComponent } from './pages/gestion-organigrama/modals/nuevo-puesto/nuevo-puesto.component';
import { NuevoEmpleadoComponent } from './pages/gestion-empleado/modals/nuevo-empleado/nuevo-empleado.component';
import { ConfirmarEmpleadoComponent } from './pages/gestion-empleado/modals/confirmar-empleado/confirmar-empleado.component';

@NgModule({
  imports: [
    CommonModule,
    EMPLEADO_ROUTES,
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
    GestionOrganigramaComponent,
    GestionEmpleadoComponent,
    NuevoDepartamentoComponent,
    ConfirmarDepartamentoComponent,
    ConfirmarPuestoComponent,
    NuevoPuestoComponent,
    NuevoEmpleadoComponent,
    ConfirmarEmpleadoComponent],

  entryComponents: [
    NuevoDepartamentoComponent,
    ConfirmarDepartamentoComponent,
    ConfirmarPuestoComponent,
    NuevoPuestoComponent,
    NuevoEmpleadoComponent,
    ConfirmarEmpleadoComponent
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalInterceptor,
      multi: true,
    },
    DatePipe,
  ]
})
export class EmpleadoModule { }
