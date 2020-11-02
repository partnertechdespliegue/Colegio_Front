import { ColegioService } from './../../../../services/colegio/colegio.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Turno } from '../../../../../../models/Turno';
import { Receso } from '../../../../../../models/Receso';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirmar-receso',
  templateUrl: './confirmar-receso.component.html',
  styles: []
})
export class ConfirmarRecesoComponent implements OnInit {

  @Input() input_receso;
  @Input() input_turno;

  turno: any = new Turno();
  receso: any = new Receso();

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public router: Router,
    public colegioService: ColegioService,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    this.turno = this.input_turno;
    this.receso = this.input_receso;
  }

  close() {
    this.activemodal.close();
  }

  crud() {
    switch (this.input_receso.accion) {
      case Constantes.ACTUALIZAR: this.actualizarReceso();
        break;
      case Constantes.ELIMINAR: this.eliminarReceso();
        break;
      default: this.registrarReceso();
    }
  }

  registrarReceso() {
    var dto = {
      "turno": this.turno,
      "receso": this.receso
    }
    this.colegioService.registrarReceso(dto).subscribe((resp: any) => {
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

  actualizarReceso() {
    this.colegioService.actualizarReceso(this.receso).subscribe((resp: any) => {
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

  eliminarReceso() {
    this.colegioService.eliminarReceso(this.receso.idReceso).subscribe((resp: any) => {
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
