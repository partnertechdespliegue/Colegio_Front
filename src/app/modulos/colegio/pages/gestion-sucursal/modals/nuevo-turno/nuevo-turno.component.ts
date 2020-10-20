import { ColegioService } from './../../../../services/colegio/colegio.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Turno } from '../../../../../../models/Turno';
import { Sucursal } from '../../../../../../models/Sucursal';
import { Receso } from '../../../../../../models/Receso';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { ConfirmarTurnoComponent } from '../confirmar-turno/confirmar-turno.component';

@Component({
  selector: 'app-nuevo-turno',
  templateUrl: './nuevo-turno.component.html',
  styles: []
})
export class NuevoTurnoComponent implements OnInit, OnDestroy {

  @Input() input_sucursal;
  @Input() input_turno;

  sucursal: any = new Sucursal();
  turno: any = new Turno();

  horaIniSucu: string;
  horaFinSucu: string;

  horaIni: string;
  horaFin: string;
  modalRef: NgbModalRef;

  lsReceso: Receso [] = []

  horaIni1: string;
  horaFin1: string;
  horaIni2: string;
  horaFin2: string;
  horaIni3: string;
  horaFin3: string;
  horaIni4: string;
  horaFin4: string;
  horaIni5: string;
  horaFin5: string;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public colegioService: ColegioService
  ) { }

  ngOnInit() {
    this.sucursal = this.input_sucursal;
    if (this.input_turno != null) {
      this.turno = this.input_turno
      this.settearValores();
    }
    // this.lsReceso.push(new Receso())
    this.settearRangoHora();
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  settearValores(){
    this.horaIni = this.retornarHora(this.turno.horaInicio);
    this.horaFin = this.retornarHora(this.turno.horaFin);
  }

  settearRangoHora() {
    this.horaIniSucu = this.retornarHora(this.sucursal.horaInicioAtencion);
    this.horaFinSucu = this.retornarHora(this.sucursal.horaFinAtencion);
  }

  retornarHora(hora){
    var hr = new Date(hora);
    var h: number = hr.getHours();
    var m: string = "" + hr.getMinutes();
    return (h > 12 ? (h - 12) : h) + ":" + (m.length == 1 ? "0" + m : m) + (h > 12 ? " PM" : " AM");
  }

  agregarReceso(){
    if (this.lsReceso.length <= 4) {
      this.lsReceso.push(new Receso())
    } else {
      Swal.fire(Constantes.INFO, "El límite sin 5 recesos por turno", "info");
    }
  }

  quitarReceso(posicion) {
    this.lsReceso.splice(posicion, 1)
  }

  openModalConfirmar() {
    this.modalRef = this.modalService.open(ConfirmarTurnoComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_turnoDTO = this.input_turno==null?this.armarDTO():this.armarTurnoAct();
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

  armarDTO(): any {
    return {
      "sucursal": this.sucursal,
      "turno": this.armarTurno(),
      "lsReceso": this.armarArreglo(),
      "accion": this.input_turno==null?"R":this.turno.accion
    }
  }

  armarArreglo(){
    for (var i = 0; i < this.lsReceso.length; i++) {
      switch (i) {
        case 0:
          this.lsReceso[i].horaInicio = this.retornarDate(this.horaIni1);
          this.lsReceso[i].horaFin = this.retornarDate(this.horaFin1);
          break;
        case 1:
          this.lsReceso[i].horaInicio = this.retornarDate(this.horaIni2);
          this.lsReceso[i].horaFin = this.retornarDate(this.horaFin2);
          break;
        case 2:
          this.lsReceso[i].horaInicio = this.retornarDate(this.horaIni3);
          this.lsReceso[i].horaFin = this.retornarDate(this.horaFin3);
          break;
        case 3:
          this.lsReceso[i].horaInicio = this.retornarDate(this.horaIni4);
          this.lsReceso[i].horaFin = this.retornarDate(this.horaFin4);
          break;
        case 4:
          this.lsReceso[i].horaInicio = this.retornarDate(this.horaIni5);
          this.lsReceso[i].horaFin = this.retornarDate(this.horaFin5);
          break;
      }
    }
    return this.lsReceso;
  }

  armarTurnoAct () { debugger
    this.turno.horaInicio = this.retornarDate(this.horaIni)
    this.turno.horaFin = this.retornarDate(this.horaFin)
    return this.turno;
  }

  armarTurno() {
    return {
      // "idTurno":this.input_turno== null? null : this.input_turno.idTurno,
      "descripcion": this.turno.descripcion,
      "horaInicio": this.retornarDate(this.horaIni),
      "horaFin": this.retornarDate(this.horaFin)
    }
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

  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
