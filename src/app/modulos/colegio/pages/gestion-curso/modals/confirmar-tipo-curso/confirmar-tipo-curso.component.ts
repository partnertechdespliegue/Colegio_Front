import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { ColegioService } from '../../../../services/colegio/colegio.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { TipoCurso } from '../../../../../../models/TipoCurso';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirmar-tipo-curso',
  templateUrl: './confirmar-tipo-curso.component.html',
  styles: []
})
export class ConfirmarTipoCursoComponent implements OnInit {

  @Input() input_tipoCurso;

  tipoCurso: any = new TipoCurso();

  constructor(
    public activemodal: NgbActiveModal,
    public colegioService: ColegioService,
    public router: Router,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    this.tipoCurso = this.input_tipoCurso;
  }

  close() {
    this.activemodal.close();
  }

  crud() {
    switch (this.tipoCurso.accion) {
      case Constantes.ACTUALIZAR: this.actualizarTipoCurso();
        break;
      case Constantes.ELIMINAR: this.eliminarTipoCurso();
        break;
      default: this.registrarTipoCurso();
    }
  }

  registrarTipoCurso() {
    var colegio = JSON.parse(localStorage.getItem('colegioSeleccion'));
    var dto = {
      "tipoCurso": this.tipoCurso,
      "colegio": colegio
    }
    this.colegioService.registrarTipoCurso(dto).subscribe((resp: any) => {
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

  actualizarTipoCurso() {
    this.colegioService.actualizarTipoCurso(this.tipoCurso).subscribe((resp: any) => {
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

  eliminarTipoCurso() {
    this.colegioService.eliminarTipoCurso(this.tipoCurso.idTipoCurso).subscribe((resp: any) => {
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
