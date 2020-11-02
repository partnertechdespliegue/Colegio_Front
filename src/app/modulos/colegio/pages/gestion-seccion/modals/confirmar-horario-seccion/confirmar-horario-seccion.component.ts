import { Component, Input, OnInit } from '@angular/core';
import { Curso } from '../../../../../../models/Curso';
import { Colegio } from '../../../../../../models/Colegio';
import { DiaLaboral } from '../../../../../../models/DiaLaboral';
import { Seccion } from '../../../../../../models/Seccion';
import { HorarioSeccion } from '../../../../../../models/HorarioSeccion';
import { EstudianteService } from '../../../../../estudiante/services/estudiante/estudiante.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Constantes from '../../../../../../models/Constantes';

@Component({
  selector: 'app-confirmar-horario-seccion',
  templateUrl: './confirmar-horario-seccion.component.html',
  styles: []
})
export class ConfirmarHorarioSeccionComponent implements OnInit {


  @Input() input_horarioSeccion;
  @Input() input_diaLaboral;
  @Input() input_seccion;
  @Input() input_curso;

  colegio: any = new Colegio();
  horarioSeccion: any = new HorarioSeccion();
  diaLaboral: DiaLaboral = new DiaLaboral();
  seccion: Seccion = new Seccion();
  curso: Curso = new Curso();

  constructor(
    public activemodal: NgbActiveModal,
    public estudianteService: EstudianteService,
    public router: Router,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    this.colegio = JSON.parse(localStorage.getItem('colegioSeleccion'));
    this.horarioSeccion = this.input_horarioSeccion;
    this.diaLaboral = this.input_diaLaboral
    this.seccion = this.input_seccion
    this.curso = this.input_curso
  }

  close() {
    this.activemodal.close();
  }

  crud() {
    switch (this.horarioSeccion.accion) {
      case Constantes.ELIMINAR: this.eliminarHorarioSeccion();
        break;
      default: this.registrarHorarioSeccion();
    }
  }

  registrarHorarioSeccion() {
    var dto = {
      "horarioSeccion": this.horarioSeccion,
      "seccion": this.seccion,
      "curso": this.curso,
      "diaLaboral": this.diaLaboral,
      "colegio": this.colegio
    }
    this.estudianteService.registrarHorarioSeccion(dto).subscribe((resp: any) => {
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

  eliminarHorarioSeccion() {
    this.estudianteService.eliminarHorarioSeccion(this.horarioSeccion.idHorarioSeccion).subscribe((resp: any) => {
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
