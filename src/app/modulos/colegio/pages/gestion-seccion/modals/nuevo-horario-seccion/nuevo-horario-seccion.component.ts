import { Component, Input, OnInit } from '@angular/core';
import { HorarioSeccion } from '../../../../../../models/HorarioSeccion';
import { DiaLaboral } from '../../../../../../models/DiaLaboral';
import { Seccion } from '../../../../../../models/Seccion';
import { Curso } from '../../../../../../models/Curso';
import { TipoCurso } from '../../../../../../models/TipoCurso';
import { NivelEducativo } from '../../../../../../models/NivelEducativo';
import { Grado } from '../../../../../../models/Grado';
import { Colegio } from '../../../../../../models/Colegio';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ColegioService } from '../../../../services/colegio/colegio.service';
import { ConfirmarHorarioSeccionComponent } from '../confirmar-horario-seccion/confirmar-horario-seccion.component';
import Constantes from '../../../../../../models/Constantes';

@Component({
  selector: 'app-nuevo-horario-seccion',
  templateUrl: './nuevo-horario-seccion.component.html',
  styles: []
})
export class NuevoHorarioSeccionComponent implements OnInit {

  @Input() input_horarioSeccion;
  @Input() input_diaLaboral;
  @Input() input_seccion;

  modalRef: NgbModalRef;

  horarioSeccion: any = new HorarioSeccion();
  diaLaboral: any = new DiaLaboral();
  seccion: any = new Seccion();
  curso: Curso = new Curso();

  lsHoras = Constantes.horas;
  lsMinutos = Constantes.minutos;

  lsCurso: any[] = [];
  lsTipoCurso: any[] = [];
  tipoCurso: TipoCurso = new TipoCurso();
  colegio: any = new Colegio();

  horaInicio: string;
  horaIni: string;
  horaFin: string;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public colegioService: ColegioService,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    this.colegio = JSON.parse(localStorage.getItem('colegioSeleccion'));
    this.listarTipoCurso()
    if (this.input_horarioSeccion != null) {
      this.horarioSeccion = this.input_horarioSeccion
    }
    this.diaLaboral = this.input_diaLaboral
    this.seccion = this.input_seccion

    this.settearRangoHora();
  }

  settearRangoHora() {
    this.horaIni = this.retornarHora(this.seccion.turno.horaInicio);
    this.horaFin = this.retornarHora(this.seccion.turno.horaFin);
  }

  retornarHora(hora) {
    var hr = new Date(hora);
    var h: number = hr.getHours() == 0 ? 24 : hr.getHours();
    var m: string = "" + hr.getMinutes();
    return (h > 12 ? (h - 12) : h) + ":" + (m.length == 1 ? "0" + m : m) + ((h >= 12 && h != 24) ? " PM" : " AM");
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

  listarTipoCurso() {
    this.colegioService.listarTipoCurso(this.colegio).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTipoCurso = resp.aaData;
      }
    })
  }

  iniciarFiltro() {
    if (this.tipoCurso.idTipoCurso != null) {
      this.listarCursoPorTipoCursoYGrado();
    } else {
      this.lsCurso = []
    }
  }

  listarCursoPorTipoCursoYGrado() {
    var dto = {
      "tipoCurso": this.tipoCurso,
      "grado": this.seccion.grado
    }
    this.colegioService.listarCursoPorTipoCursoYGrado(dto).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsCurso = resp.aaData;
        if (this.lsCurso.length == 0) {
          this.toast.info("No hay ningún curso registrado con las caracteristicas seleccionadas", Constantes.INFO)
        }
      }
    })
  }

  openModalConfirmar() {
    this.horarioSeccion.horaInicio = this.retornarDate(this.horaInicio);
    this.modalRef = this.modalService.open(ConfirmarHorarioSeccionComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_horarioSeccion = this.horarioSeccion;
    this.modalRef.componentInstance.input_diaLaboral = this.diaLaboral;
    this.modalRef.componentInstance.input_seccion = this.seccion;
    this.modalRef.componentInstance.input_curso = this.curso;
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
