import { Empleado } from './../../../../../../models/Empleado';
import { Component, Input, OnInit } from '@angular/core';
import { Curso } from '../../../../../../models/Curso';
import Constantes from '../../../../../../models/Constantes';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ColegioService } from '../../../../services/colegio/colegio.service';
import { NivelEducativo } from '../../../../../../models/NivelEducativo';
import { Tema } from '../../../../../../models/Tema';
import { Grado } from '../../../../../../models/Grado';
import { TipoCurso } from '../../../../../../models/TipoCurso';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirmar-curso',
  templateUrl: './confirmar-curso.component.html',
  styles: []
})
export class ConfirmarCursoComponent implements OnInit {

  @Input() input_curso;
  @Input() input_tipoCurso;
  @Input() input_nivelEducativo
  @Input() input_grado
  @Input() input_maestro
  @Input() input_lsTema

  curso: any = new Curso();
  tipoCurso: TipoCurso = new TipoCurso();
  nivelEduc: NivelEducativo = new NivelEducativo();
  grado: Grado = new Grado();
  maestro: any = new Empleado();

  lsTemaAgregado: Tema[] = [];

  constructor(
    public activemodal: NgbActiveModal,
    public colegioService: ColegioService,
    public router: Router,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    this.curso = this.input_curso;
    this.tipoCurso = this.input_tipoCurso;
    this.nivelEduc = this.input_nivelEducativo
    this.grado = this.input_grado
    this.maestro = this.input_maestro
    this.lsTemaAgregado = this.input_lsTema
  }

  close() {
    this.activemodal.close();
  }

  crud() {
    switch (this.curso.accion) {
      case Constantes.ACTUALIZAR: this.actualizarCurso();
        break;
      case Constantes.ELIMINAR: this.eliminarCurso();
        break;
      default: this.registrarCurso();
    }
  }

  registrarCurso() {
    var dto = {
      "curso": this.curso,
      "tipoCurso": this.tipoCurso,
      "nivelEducativo": this.nivelEduc,
      "grado": this.grado,
      "empleado":this.maestro,
      "lsTema": this.lsTemaAgregado
    }
    this.colegioService.registrarCurso(dto).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.toast.success(resp.msg, Constantes.SUCCESS)
        this.refrescar(this.router.url);
      } else { this.toast.error(resp.msg, Constantes.ERROR); }
    },
      (err) => {
        this.toast.error(err.status + " " + err.error.error, Constantes.ERROR);
      });
    this.activemodal.dismiss();
  }

  actualizarCurso() {
    // this.curso = this.input_curso;
    this.curso.tipoCurso = this.tipoCurso;
    this.curso.nivelEducativo = this.nivelEduc;
    this.curso.grado = this.grado;
    this.curso.empleado = this.maestro;

    this.colegioService.actualizarCurso(this.curso).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.toast.success(resp.msg, Constantes.SUCCESS)
        this.refrescar(this.router.url);
      } else { this.toast.error(resp.msg, Constantes.ERROR); }
    },
      (err) => {
        this.toast.error(err.status + " " + err.error.error, Constantes.ERROR);
      });
    this.activemodal.dismiss();
  }

  eliminarCurso() {
    this.colegioService.eliminarCurso(this.curso.idCurso).subscribe((resp: any) => {
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
