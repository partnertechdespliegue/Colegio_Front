import { Empleado } from './../../../../models/Empleado';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmpleadoService } from '../../../empleado/services/empleado/empleado.service';
import { ColegioService } from '../../../colegio/services/colegio/colegio.service';
import { MarcarAsistenciaEstudianteComponent } from './modals/marcar-asistencia-estudiante/marcar-asistencia-estudiante.component';

@Component({
  selector: 'app-horario-maestro',
  templateUrl: './horario-maestro.component.html',
  styles: []
})
export class HorarioMaestroComponent implements OnInit, OnDestroy {

  modalRef: NgbModalRef;
  empleado: any = new Empleado();
  lsDiaLaboral: any[] = [];

  lunes = false;
  martes = false;
  miercoles = false;
  jueves = false;
  viernes = false;
  sabado = false;
  domingo = false;

  lsLunes: any[] = [];
  lsMartes: any[] = [];
  lsMiercoles: any[] = [];
  lsJueves: any[] = [];
  lsViernes: any[] = [];
  lsSabado: any[] = [];
  lsDomingo: any[] = [];

  constructor(
    private modalService: NgbModal,
    public colegioService: ColegioService,
    public empleadoService: EmpleadoService,
  ) { }

  ngOnInit() {
    this.empleado = JSON.parse(localStorage.getItem("InfoToken")).empleado;
    this.listarDiasLaboral();
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  marcarAsistencia(horarioMaestro) {
    var tmp = Object.assign({}, horarioMaestro);
    tmp.accion = "MA";
    this.openModal(tmp);
  }

  public openModal(indice) {
    if (indice.accion == "MA") {
      this.modalRef = this.modalService.open(MarcarAsistenciaEstudianteComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalLG'
        })
      this.modalRef.componentInstance.input_horarioMaestro = indice;
    }
  }

  listarDiasLaboral() {
    this.colegioService.listarDiaLaboral(this.empleado.sucursal).subscribe((resp: any) => {
      this.lsDiaLaboral = resp.aaData;
      for (const dia of this.lsDiaLaboral) {
        var dto = {
          "empleado": this.empleado,
          "diaLaboral": dia
        }
        switch (dia.numDia) {
          case 1:
            this.empleadoService.listarHorarioMaestro(dto).subscribe((resp: any) => this.lsLunes = resp.aaData);
            this.lunes = true;
            break;
          case 2:
            this.empleadoService.listarHorarioMaestro(dto).subscribe((resp: any) => this.lsMartes = resp.aaData);
            this.martes = true;
            break;
          case 3:
            this.empleadoService.listarHorarioMaestro(dto).subscribe((resp: any) => this.lsMiercoles = resp.aaData);
            this.miercoles = true;
            break;
          case 4:
            this.empleadoService.listarHorarioMaestro(dto).subscribe((resp: any) => this.lsJueves = resp.aaData);
            this.jueves = true;
            break;
          case 5:
            this.empleadoService.listarHorarioMaestro(dto).subscribe((resp: any) => this.lsViernes = resp.aaData);
            this.viernes = true;
            break;
          case 6:
            this.empleadoService.listarHorarioMaestro(dto).subscribe((resp: any) => this.lsSabado = resp.aaData);
            this.sabado = true;
            break;
          case 7:
            this.empleadoService.listarHorarioMaestro(dto).subscribe((resp: any) => this.lsDomingo = resp.aaData);
            this.domingo = true;
            break;
        }
      }
    })
  }
}
