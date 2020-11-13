import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalInterceptor } from '../../global.interceptor';
import { MAESTRO_ROUTES } from './maestro.routes';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TimePickerModule, DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from '../../material.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { GestionMaestroComponent } from './pages/gestion-maestro/gestion-maestro.component';

@NgModule({
  imports: [
    CommonModule,
    MAESTRO_ROUTES,
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
    GestionMaestroComponent
  ],

  entryComponents: [

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
export class MaestroModule { }
