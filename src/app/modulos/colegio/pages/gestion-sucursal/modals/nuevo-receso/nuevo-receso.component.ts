import { ColegioService } from './../../../../services/colegio/colegio.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmarRecesoComponent } from '../confirmar-receso/confirmar-receso.component';
import { Turno } from '../../../../../../models/Turno';
import { Receso } from '../../../../../../models/Receso';

@Component({
  selector: 'app-nuevo-receso',
  templateUrl: './nuevo-receso.component.html',
  styles: []
})
export class NuevoRecesoComponent implements OnInit, OnDestroy {

  @Input() input_receso;
  @Input() input_turno;

  modalRef: NgbModalRef;
  turno: any = new Turno();
  receso: any = new Receso();
  horaIni: string;
  horaFin: string;

  horaIniTur: string;
  horaFinTur: string;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public colegioService: ColegioService
  ) { }

  ngOnInit() {
    this.turno = this.input_turno;
    if (this.input_receso != null) {
      this.receso = this.input_receso
      this.settearValores();
    }
    this.settearRangoHora();
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  settearValores() {
    this.horaIni = this.retornarHora(this.receso.horaInicio);
    this.horaFin = this.retornarHora(this.receso.horaFin);
  }

  settearRangoHora() {
    this.horaIniTur = this.retornarHora(this.turno.horaInicio);
    this.horaFinTur = this.retornarHora(this.turno.horaFin);
  }

  retornarHora(hora) {
    var hr = new Date(hora);
    var h: number = hr.getHours() == 0 ? 24 : hr.getHours();
    var m: string = "" + hr.getMinutes();
    return (h > 12 ? (h - 12) : h) + ":" + (m.length == 1 ? "0" + m : m) + ((h >= 12 && h != 24) ? " PM" : " AM");
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  armarReceso() {
    this.receso.horaInicio = this.retornarDate(this.horaIni)
    this.receso.horaFin = this.retornarDate(this.horaFin)
    return this.receso;
  }

  retornarDate(horaDate: string): Date {
    if (horaDate.length < 8) {
      horaDate = "0" + horaDate
    }
    var date: Date = new Date(2020, 0, 1);
    var hora: number = +horaDate.substr(0, 2);
    var minuto: number = +horaDate.substr(3, 2);
    if (horaDate.includes("12")) {
      if (horaDate.includes("AM")) {
        date.setHours(hora + 12, minuto, 0);
      } else {
        date.setHours(hora, minuto, 0);
      }
    } else if (horaDate.includes("AM")) {
      date.setHours(hora, minuto, 0);
    } else {
      date.setHours(hora + 12, minuto, 0);
    }
    return date;
  }

  openModalConfirmar() {
    this.modalRef = this.modalService.open(ConfirmarRecesoComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_receso = this.armarReceso();
    this.modalRef.componentInstance.input_turno = this.turno;
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

}
