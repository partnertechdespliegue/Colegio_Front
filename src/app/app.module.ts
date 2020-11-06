import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

//ZONA HORARIA
import { registerLocaleData } from '@angular/common';
import localesPE from '@angular/common/locales/es-PE'

// Rutas
import { APP_ROUTES } from './app.routes';
// temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Servicios
import { ServiceModule } from './services/service.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalInterceptor } from './global.interceptor';
import { TreeTableModule } from "ng-treetable";
//modulos
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';
import { AdministracionComponent } from './modulos/administracion/administracion.component';
import { InicioComponent } from './shared/Inicio/inicio.component';
import { UsuarioService } from './modulos/administracion/services/usuarios/usuario.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MaterialModule } from './material.module';
import { ColegioComponent } from './modulos/colegio/colegio.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { EstudianteComponent } from './modulos/estudiante/estudiante.component';
import { ToastrModule } from 'ngx-toastr';
import { ConfiguracionComponent } from './modulos/configuracion/configuracion.component';
import { EmpleadoComponent } from './modulos/empleado/empleado.component';

registerLocaleData(localesPE, 'es-Pe');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    //modulos
    AdministracionComponent,
    ColegioComponent,
    EstudianteComponent,
    EmpleadoComponent,
    ConfiguracionComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule,
    Ng4LoadingSpinnerModule.forRoot(),
    TreeTableModule,
    Ng2SmartTableModule,
    NgbModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:4000,
      progressBar: true,
      // preventDuplicates:true,
      maxOpened:6
    }),
    MaterialModule,
    NgxMaterialTimepickerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalInterceptor,
      multi: true,

    },
    {
      provide: LOCALE_ID, useValue: 'es-Pe'
    },
    SidebarComponent,
    HeaderComponent,
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
