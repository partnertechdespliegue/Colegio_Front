import { Colegio } from './../../../../../../models/Colegio';
import { ColegioService } from './../../../../services/colegio/colegio.service';
import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Constantes from '../../../../../../models/Constantes';

@Component({
  selector: 'app-confirmar-colegio',
  templateUrl: './confirmar-colegio.component.html',
  styles: []
})
export class ConfirmarColegioComponent implements OnInit {
  @Input() input_colegio;

  constructor(
    public activemodal: NgbActiveModal,
    public colegioService: ColegioService,
    public router: Router,
  ) { }

  public colegio: Colegio;

  ngOnInit() {
    this.colegio = this.input_colegio;
  }

  close() {
    this.activemodal.close();
  }

  crud() {
    switch (this.colegio.accion) {
      case Constantes.ACTUALIZAR: this.actualizarEmpresa();
        break;
      case Constantes.ELIMINAR: this.eliminarEmpresa();
        break;
      default: this.registrarEmpresa();
    }
  }

  registrarEmpresa() {
    this.colegioService.registrarColegio(this.colegio).subscribe((resp: any) => {
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

  actualizarEmpresa() {
    this.colegioService.actualizarColegio(this.colegio).subscribe((resp: any) => {
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

  eliminarEmpresa() {
    this.colegioService.eliminarColegio(this.colegio.idColegio).subscribe((resp: any) => {
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
