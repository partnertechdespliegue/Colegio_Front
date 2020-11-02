import { GestionApoderadoComponent } from './pages/gestion-apoderado/gestion-apoderado.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalInterceptor } from '../../global.interceptor';
import { ESTUDIANTE_ROUTES } from './estudiante.routes';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TimePickerModule, DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from '../../material.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { GestionEstudianteComponent } from './pages/gestion-estudiante/gestion-estudiante.component';
import { NuevoEstudianteComponent } from './pages/gestion-estudiante/modals/nuevo-estudiante/nuevo-estudiante.component';
import { ConfirmarEstudianteComponent } from './pages/gestion-estudiante/modals/confirmar-estudiante/confirmar-estudiante.component';
import { NuevoApoderadoComponent } from './pages/gestion-apoderado/modals/nuevo-apoderado/nuevo-apoderado.component';
import { ConfirmarApoderadoComponent } from './pages/gestion-apoderado/modals/confirmar-apoderado/confirmar-apoderado.component';
import { ApoderadoGestionComponent } from './pages/gestion-estudiante/modals/apoderado-gestion/apoderado-gestion.component';
import { NuevaRelacionComponent } from './pages/gestion-estudiante/modals/nueva-relacion/nueva-relacion.component';
import { ConfirmarRelacionComponent } from './pages/gestion-estudiante/modals/confirmar-relacion/confirmar-relacion.component';

@NgModule({
  imports: [
    CommonModule,
    ESTUDIANTE_ROUTES,
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
    GestionEstudianteComponent,
    NuevoEstudianteComponent,
    ConfirmarEstudianteComponent,
    GestionApoderadoComponent,
    NuevoApoderadoComponent,
    ConfirmarApoderadoComponent,
    ApoderadoGestionComponent,
    NuevaRelacionComponent,
    ConfirmarRelacionComponent],

  entryComponents: [
    NuevoEstudianteComponent,
    ConfirmarEstudianteComponent,
    NuevoApoderadoComponent,
    ConfirmarApoderadoComponent,
    ApoderadoGestionComponent,
    NuevaRelacionComponent,
    ConfirmarRelacionComponent
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
export class EstudianteModule { }
