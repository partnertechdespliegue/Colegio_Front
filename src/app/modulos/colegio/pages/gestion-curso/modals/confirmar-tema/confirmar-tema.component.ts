import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ColegioService } from '../../../../services/colegio/colegio.service';
import { Router } from '@angular/router';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { Tema } from '../../../../../../models/Tema';
import { TipoCurso } from '../../../../../../models/TipoCurso';

@Component({
  selector: 'app-confirmar-tema',
  templateUrl: './confirmar-tema.component.html',
  styles: []
})
export class ConfirmarTemaComponent implements OnInit {

  @Input() input_tema;
  @Input() input_tipoCurso;

  tema: any = new Tema();
  tipoCurso: any = new TipoCurso();

  constructor(
    public activemodal: NgbActiveModal,
    public colegioService: ColegioService,
    public router: Router) { }

  ngOnInit() {
    this.tema = this.input_tema;
    this.tipoCurso = this.input_tipoCurso;
  }

  close() {
    this.activemodal.close();
  }

  crud() {
    switch (this.tema.accion) {
      case Constantes.ACTUALIZAR: this.actualizarTema();
        break;
      case Constantes.ELIMINAR: this.eliminarTema();
        break;
      default: this.registrarTema();
    }
  }

  registrarTema() {
    var dto = {
      "tipoCurso": this.tipoCurso,
      "tema": this.tema
    }
    this.colegioService.registrarTema(dto).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

  actualizarTema() {
    this.tema.tipoCurso = this.tipoCurso;
    this.colegioService.actualizarTema(this.tema).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url);
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

  eliminarTema() {
    this.colegioService.eliminarTema(this.tema.idTema).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.refrescar(this.router.url)
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
    this.activemodal.dismiss();
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }
}
