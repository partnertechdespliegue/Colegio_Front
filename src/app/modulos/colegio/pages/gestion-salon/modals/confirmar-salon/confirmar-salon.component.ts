import { Component, OnInit, Input } from '@angular/core';
import { Salon } from '../../../../../../models/Salon';
import { ColegioService } from '../../../../services/colegio/colegio.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirmar-salon',
  templateUrl: './confirmar-salon.component.html',
  styles: []
})
export class ConfirmarSalonComponent implements OnInit {

  @Input() input_salon;

  salon = new Salon();

  constructor(
    public activemodal: NgbActiveModal,
    public router: Router,
    public colegioService: ColegioService,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    this.salon = this.input_salon;
  }

  crud() {
    switch (this.salon.accion) {
      case Constantes.ACTUALIZAR: this.actualizarSalon();
        break;
      case Constantes.ELIMINAR: this.eliminarSalon();
        break;
      default: this.registrarSalon();
    }
  }

  registrarSalon() {
    var sucursal = JSON.parse(localStorage.getItem('sucursalSeleccion'));
    var dto = {
      "salon": this.salon,
      "sucursal": sucursal
    }
    this.colegioService.registrarSalon(dto).subscribe((resp: any) => {
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

  actualizarSalon() {
    this.colegioService.actualizarSalon(this.salon).subscribe((resp: any) => {
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

  eliminarSalon() {
    this.colegioService.eliminarSalon(this.salon.idSalon).subscribe((resp: any) => {
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

  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
