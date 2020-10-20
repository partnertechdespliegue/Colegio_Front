import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ColegioService } from '../../../../services/colegio/colegio.service';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DiaLaboral } from '../../../../../../models/DiaLaboral';
import { HorarioSalon } from '../../../../../../models/HorarioSalon';
import { ConfirmarHorarioSalonComponent } from '../confirmar-horario-salon/confirmar-horario-salon.component';
import { Salon } from '../../../../../../models/Salon';
import { Curso } from '../../../../../../models/Curso';
import { NivelEducativo } from '../../../../../../models/NivelEducativo';
import { Grado } from '../../../../../../models/Grado';
import { Colegio } from '../../../../../../models/Colegio';
import { TipoCurso } from '../../../../../../models/TipoCurso';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';

@Component({
  selector: 'app-nuevo-horario-salon',
  templateUrl: './nuevo-horario-salon.component.html',
  styles: []
})
export class NuevoHorarioSalonComponent implements OnInit, OnDestroy {

  @Input() input_horarioSalon;
  @Input() input_diaLaboral;
  @Input() input_salon;

  modalRef: NgbModalRef;

  horarioSalon: any = new HorarioSalon();
  diaLaboral: any = new DiaLaboral();
  salon: any = new Salon();
  curso: Curso = new Curso();
  lsCurso: any[] = [];

  lsTipoCurso: any[] = [];
  tipoCurso: TipoCurso = new TipoCurso();
  lsNivelEduc: any[] = [];
  nivelEduc: NivelEducativo = new NivelEducativo();
  lsGrado: any[] = [];
  grado: Grado = new Grado();
  colegio: any = new Colegio();

  horaInicio: string;
  horaIni: string;
  horaFin: string;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public colegioService: ColegioService
  ) { }

  ngOnInit() {
    this.colegio = JSON.parse(localStorage.getItem('colegioSeleccion'));
    this.listarTipoCurso()
    this.listarNivelEducativo();
    if (this.input_horarioSalon != null) {
      this.horarioSalon = this.input_horarioSalon
    }
    this.diaLaboral = this.input_diaLaboral
    this.salon = this.input_salon

    this.settearRangoHora();
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  settearRangoHora() {
    this.horaIni = this.retornarHora(this.salon.sucursal.horaInicioAtencion);
    this.horaFin = this.retornarHora(this.salon.sucursal.horaFinAtencion);
  }

  retornarHora(hora){
    var hr = new Date(hora);
    var h: number = hr.getHours();
    var m: string = "" + hr.getMinutes();
    return (h > 12 ? (h - 12) : h) + ":" + (m.length == 1 ? "0" + m : m) + (h > 12 ? " PM" : " AM");
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

  listarNivelEducativo() {
    this.colegioService.listarNivelEducativo(this.colegio).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsNivelEduc = resp.aaData;
      }
    })
  }

  listarGrado(idNivEdu) {
    if (idNivEdu != null) {
      this.grado.idGrado = null;
      var nivEdu = { "idNivelEducativo": idNivEdu }
      this.colegioService.listarGrado(nivEdu).subscribe((resp: any) => {
        if (resp.estado == 1) {
          this.lsGrado = resp.aaData;
        }
      })
    } else {
      this.grado.idGrado = null;
      this.lsGrado = [];
    }
  }

  iniciarFiltro(){
    if (this.tipoCurso.idTipoCurso != null && this.grado.idGrado != null) {
      console.log("hola");
      this.listarCursoPorTipoCursoYGrado();
    }else {
      this.lsCurso = []
      console.log("hola");
    }
  }

  listarCursoPorTipoCursoYGrado() {
    var dto = {
      "tipoCurso": this.tipoCurso,
      "grado":this.grado
    }
    this.colegioService.listarCursoPorTipoCursoYGrado(dto).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsCurso = resp.aaData;
        if (this.lsCurso.length == 0) {
          Swal.fire(Constantes.INFO, "No hay ningún curso registrado con las caracteristicas seleccionadas", "info");
        }
      }
    })
  }

  openModalConfirmar() {
    this.horarioSalon.horaInicio = this.retornarDate(this.horaInicio);

    this.modalRef = this.modalService.open(ConfirmarHorarioSalonComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_horarioSalon = this.horarioSalon;
    this.modalRef.componentInstance.input_diaLaboral = this.diaLaboral;
      this.modalRef.componentInstance.input_salon = this.salon;
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
