import { ColegioService } from './../../../../services/colegio/colegio.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirmar-turno',
  templateUrl: './confirmar-turno.component.html',
  styles: []
})
export class ConfirmarTurnoComponent implements OnInit {

  @Input() input_turnoDTO;

  turnoDTO: any;

  constructor(
    public activemodal: NgbActiveModal,
    public router: Router,
    public colegioService: ColegioService
  ) { }

  ngOnInit() {
    this.turnoDTO = this.input_turnoDTO;
  }

  close() {
    this.activemodal.close();
  }

  crud() {
    switch (this.turnoDTO.accion) {
      case Constantes.ACTUALIZAR: this.actualizarTurno();
        break;
      case Constantes.ELIMINAR: this.eliminarTurno();
        break;
      default: this.registrarTurno();
    }
  }

  registrarTurno() {
    this.colegioService.registrarTurno(this.turnoDTO).subscribe((resp: any) => {
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

  actualizarTurno() {
    this.colegioService.actualizarTurno(this.turnoDTO).subscribe((resp: any) => {
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

  eliminarTurno() {
    this.colegioService.eliminarTurno(this.turnoDTO.idTurno).subscribe((resp: any) => {
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
