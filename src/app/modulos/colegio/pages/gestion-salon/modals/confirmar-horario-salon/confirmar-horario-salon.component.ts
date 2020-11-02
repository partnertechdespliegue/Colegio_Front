import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColegioService } from '../../../../services/colegio/colegio.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { Salon } from '../../../../../../models/Salon';
import { Curso } from '../../../../../../models/Curso';
import { HorarioSalon } from '../../../../../../models/HorarioSalon';
import { DiaLaboral } from '../../../../../../models/DiaLaboral';
import { Colegio } from '../../../../../../models/Colegio';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirmar-horario-salon',
  templateUrl: './confirmar-horario-salon.component.html',
  styles: []
})
export class ConfirmarHorarioSalonComponent implements OnInit {

  @Input() input_horarioSalon;
  @Input() input_diaLaboral;
  @Input() input_salon;
  @Input() input_curso;

  colegio: any = new Colegio();
  horarioSalon: any = new HorarioSalon();
  diaLaboral: DiaLaboral = new DiaLaboral();
  salon: Salon = new Salon();
  curso: Curso = new Curso();

  constructor(
    public activemodal: NgbActiveModal,
    public colegioService: ColegioService,
    public router: Router,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    this.colegio = JSON.parse(localStorage.getItem('colegioSeleccion'));
    this.horarioSalon = this.input_horarioSalon;
    this.diaLaboral = this.input_diaLaboral
    this.salon = this.input_salon
    this.curso = this.input_curso
  }

  close() {
    this.activemodal.close();
  }

  crud() {
    switch (this.horarioSalon.accion) {
      // case Constantes.ACTUALIZAR: this.actualizarTema();
      //   break;
      case Constantes.ELIMINAR: this.eliminarHorarioSalon();
        break;
      default: this.registrarHorarioSalon();
    }
  }

  registrarHorarioSalon() {
    var dto = {
      "horarioSalon": this.horarioSalon,
      "salon": this.salon,
      "curso": this.curso,
      "diaLaboral": this.diaLaboral,
      "colegio": this.colegio
    }
    this.colegioService.registrarHorarioSalon(dto).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.toast.success(resp.msg, Constantes.SUCCESS)
        this.refrescar(this.router.url);
        this.activemodal.dismiss();
      } else if (resp.estado == 3) {
        this.toast.info(resp.msg, Constantes.INFO)
      } else { this.toast.error(resp.msg, Constantes.ERROR); }
    },
      (err) => {
        this.toast.error(err.status + " " + err.error.error, Constantes.ERROR);
      });
  }

  eliminarHorarioSalon() {
    this.colegioService.eliminarHorarioSalon(this.horarioSalon.idHorarioSalon).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.toast.success(resp.msg, Constantes.SUCCESS)
        this.refrescar(this.router.url)
      } else { this.toast.error(resp.msg, Constantes.ERROR); }
    },
      (err) => {
        this.toast.error(err.status + " " + err.error.error, Constantes.ERROR);
      });
    this.activemodal.dismiss();
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

}
