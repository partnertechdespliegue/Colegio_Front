import { Colegio } from './../../../../../../models/Colegio';
import { ColegioService } from './../../../../services/colegio/colegio.service';
import { Component, OnInit, Input } from '@angular/core';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Sucursal } from '../../../../../../models/Sucursal';

@Component({
  selector: 'app-confirmar-sucursal',
  templateUrl: './confirmar-sucursal.component.html',
  styles: []
})
export class ConfirmarSucursalComponent implements OnInit {

  @Input() input_sucursalDTO;

  constructor(
    public activemodal: NgbActiveModal,
    public colegioService: ColegioService,
    public router: Router,
  ) { }

  sucursalDTO: any;

  ngOnInit() {
    this.sucursalDTO = this.input_sucursalDTO;
  }

  close() {
    this.activemodal.close();
  }

  crud() {
    switch (this.sucursalDTO.accion) {
      case Constantes.ACTUALIZAR: this.actualizarSucursal();
        break;
      case Constantes.ELIMINAR: this.eliminarSucursal();
        break;
      default: this.registrarSucursal();
    }
  }

  registrarSucursal() {
    this.colegioService.registrarSucursal(this.sucursalDTO).subscribe((resp: any) => {
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

  actualizarSucursal() {
    this.colegioService.actualizarSucursal(this.sucursalDTO).subscribe((resp: any) => {
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

  eliminarSucursal() {
    this.colegioService.eliminarSucursal(this.sucursalDTO.idSucursal).subscribe((resp: any) => {
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
