import { Colegio } from './../../../../../../models/Colegio';
import { ColegioService } from './../../../../services/colegio/colegio.service';
import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Constantes from '../../../../../../models/Constantes';
import { ToastrService } from 'ngx-toastr';

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
    public toast: ToastrService
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
      case Constantes.ACTUALIZAR: this.actualizarColegio();
        break;
      case Constantes.ELIMINAR: this.eliminarColegio();
        break;
      default: this.registrarColegio();
    }
  }

  registrarColegio() {
    this.colegioService.registrarColegio(this.colegio).subscribe((resp: any) => {
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

  actualizarColegio() {
    this.colegioService.actualizarColegio(this.colegio).subscribe((resp: any) => {
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

  eliminarColegio() {
    this.colegioService.eliminarColegio(this.colegio.idColegio).subscribe((resp: any) => {
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
