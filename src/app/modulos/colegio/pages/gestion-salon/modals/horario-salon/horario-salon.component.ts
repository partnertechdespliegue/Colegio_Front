import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ColegioService } from '../../../../services/colegio/colegio.service';
import { Salon } from '../../../../../../models/Salon';
import { NuevoHorarioSalonComponent } from '../nuevo-horario-salon/nuevo-horario-salon.component';
import { ConfirmarHorarioSalonComponent } from '../confirmar-horario-salon/confirmar-horario-salon.component';
import Constantes from '../../../../../../models/Constantes';

@Component({
  selector: 'app-horario-salon',
  templateUrl: './horario-salon.component.html',
  styles: []
})
export class HorarioSalonComponent implements OnInit, OnDestroy {

  @Input() input_salon;

  lsDiaLaboral: any[] = [];

  modalRef: NgbModalRef;
  salon: any = new Salon();

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
    public colegioService: ColegioService,
  ) { }

  ngOnInit() {
    this.salon = this.input_salon;
    this.listarDiasLaboral();
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  nuevoHorarioSalon(numDia:number) {
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

  eliminarHorarioSalon(horarioSalon) {
    var tmp = Object.assign({}, horarioSalon);
    tmp.accion = Constantes.ELIMINAR;
    this.openModal(tmp, null);
  }

  public openModal(indice, diaLaboral) {
    if (indice == null || indice.accion == Constantes.ACTUALIZAR) {
      this.modalRef = this.modalService.open(NuevoHorarioSalonComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass:'modalMDD'
        })
      this.modalRef.componentInstance.input_horarioSalon = indice;
      this.modalRef.componentInstance.input_diaLaboral = diaLaboral;
      this.modalRef.componentInstance.input_salon = this.salon;
    } else {
      this.modalRef = this.modalService.open(ConfirmarHorarioSalonComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_horarioSalon = indice;
    }
  }

  listarDiasLaboral() {
    this.colegioService.listarDiaLaboral(this.salon.sucursal).subscribe((resp: any) => {
      this.lsDiaLaboral = resp.aaData;
      for (const dia of this.lsDiaLaboral) {
        var dto = {
          "salon": this.salon,
          "diaLaboral": dia
        }
        switch (dia.numDia) {
          case 1:
            this.colegioService.listarHorarioSalon(dto).subscribe((resp: any) => this.lsLunes = resp.aaData);
            this.lunes = true;
            break;
          case 2:
            this.colegioService.listarHorarioSalon(dto).subscribe((resp: any) => this.lsMartes = resp.aaData);
            this.martes = true;
            break;
          case 3:
            this.colegioService.listarHorarioSalon(dto).subscribe((resp: any) => this.lsMiercoles = resp.aaData);
            this.miercoles = true;
            break;
          case 4:
            this.colegioService.listarHorarioSalon(dto).subscribe((resp: any) => this.lsJueves = resp.aaData);
            this.jueves = true;
            break;
          case 5:
            this.colegioService.listarHorarioSalon(dto).subscribe((resp: any) => this.lsViernes = resp.aaData);
            this.viernes = true;
            break;
          case 6:
            this.colegioService.listarHorarioSalon(dto).subscribe((resp: any) => this.lsSabado = resp.aaData);
            this.sabado = true;
            break;
          case 7:
            this.colegioService.listarHorarioSalon(dto).subscribe((resp: any) => this.lsDomingo = resp.aaData);
            this.domingo = true;
            break;
        }
      }
    })
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }


}
