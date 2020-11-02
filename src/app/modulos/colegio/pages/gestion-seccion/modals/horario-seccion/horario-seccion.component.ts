import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbModalRef, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Seccion } from '../../../../../../models/Seccion';
import { EstudianteService } from '../../../../../estudiante/services/estudiante/estudiante.service';
import { ColegioService } from '../../../../services/colegio/colegio.service';
import Constantes from '../../../../../../models/Constantes';
import { NuevoHorarioSeccionComponent } from '../nuevo-horario-seccion/nuevo-horario-seccion.component';
import { ConfirmarHorarioSeccionComponent } from '../confirmar-horario-seccion/confirmar-horario-seccion.component';

@Component({
  selector: 'app-horario-seccion',
  templateUrl: './horario-seccion.component.html',
  styles: []
})
export class HorarioSeccionComponent implements OnInit, OnDestroy {

  @Input() input_seccion;

  modalRef: NgbModalRef;

  seccion: any = new Seccion();
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
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public estudianteService: EstudianteService,
    public colegioService: ColegioService
  ) { }

  ngOnInit() {
    this.seccion = this.input_seccion;
    this.listarDiasLaboral();
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarDiasLaboral() {
    this.colegioService.listarDiaLaboral(this.seccion.sucursal).subscribe((resp: any) => {
      this.lsDiaLaboral = resp.aaData;
      for (const dia of this.lsDiaLaboral) {
        var dto = {
          "seccion": this.seccion,
          "diaLaboral": dia
        }
        switch (dia.numDia) {
          case 1:
            this.estudianteService.listarHorarioSeccion(dto).subscribe((resp: any) => this.lsLunes = resp.aaData);
            this.lunes = true;
            break;
          case 2:
            this.estudianteService.listarHorarioSeccion(dto).subscribe((resp: any) => this.lsMartes = resp.aaData);
            this.martes = true;
            break;
          case 3:
            this.estudianteService.listarHorarioSeccion(dto).subscribe((resp: any) => this.lsMiercoles = resp.aaData);
            this.miercoles = true;
            break;
          case 4:
            this.estudianteService.listarHorarioSeccion(dto).subscribe((resp: any) => this.lsJueves = resp.aaData);
            this.jueves = true;
            break;
          case 5:
            this.estudianteService.listarHorarioSeccion(dto).subscribe((resp: any) => this.lsViernes = resp.aaData);
            this.viernes = true;
            break;
          case 6:
            this.estudianteService.listarHorarioSeccion(dto).subscribe((resp: any) => this.lsSabado = resp.aaData);
            this.sabado = true;
            break;
          case 7:
            this.estudianteService.listarHorarioSeccion(dto).subscribe((resp: any) => this.lsDomingo = resp.aaData);
            this.domingo = true;
            break;
        }
      }
    })
  }

  nuevoHorarioSeccion(numDia: number) {
    let indice = null;
    var diaLaboral: any = this.retornarDiaLab(numDia);
    this.openModal(indice, diaLaboral);
  }

  retornarDiaLab(numDia: number): any {
    for (const dia of this.lsDiaLaboral) {
      if (dia.numDia == numDia) {
        return dia;
      }
    }
  }

  eliminarHorarioSeccion(horarioSeccion) {
    var tmp = Object.assign({}, horarioSeccion);
    tmp.accion = Constantes.ELIMINAR;
    this.openModal(tmp, null);
  }

  public openModal(indice, diaLaboral) {
    if (indice == null || indice.accion == Constantes.ACTUALIZAR) {
      this.modalRef = this.modalService.open(NuevoHorarioSeccionComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMDD'
        })
      this.modalRef.componentInstance.input_horarioSeccion = indice;
      this.modalRef.componentInstance.input_diaLaboral = diaLaboral;
      this.modalRef.componentInstance.input_seccion = this.seccion;
    } else {
      this.modalRef = this.modalService.open(ConfirmarHorarioSeccionComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_horarioSeccion = indice;
    }
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
