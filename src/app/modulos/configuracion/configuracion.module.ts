import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CONFIGURACION_ROUTES } from './configuracion.routes';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TimePickerModule, DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from '../../material.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { GlobalInterceptor } from '../../global.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GestionParametroComponent } from './pages/gestion-parametro/gestion-parametro.component';
import { NuevoParametroComponent } from './pages/gestion-parametro/modals/nuevo-parametro/nuevo-parametro.component';
import { ConfirmarParametroComponent } from './pages/gestion-parametro/modals/confirmar-parametro/confirmar-parametro.component';

@NgModule({
  imports: [
    CommonModule,
    CONFIGURACION_ROUTES,
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
    GestionParametroComponent,
    NuevoParametroComponent,
    ConfirmarParametroComponent
  ],
  entryComponents: [
    NuevoParametroComponent,
    ConfirmarParametroComponent],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalInterceptor,
      multi: true,
    },
    DatePipe,
  ]
})
export class ConfiguracionModule { }
