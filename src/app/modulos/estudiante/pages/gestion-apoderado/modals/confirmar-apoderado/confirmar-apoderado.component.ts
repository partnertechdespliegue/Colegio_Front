import { EstudianteService } from './../../../../services/estudiante/estudiante.service';
import { Component, Input, OnInit } from '@angular/core';
import Constantes from '../../../../../../models/Constantes';
import { ToastrService } from 'ngx-toastr';
import { Apoderado } from '../../../../../../models/Apoderado';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmar-apoderado',
  templateUrl: './confirmar-apoderado.component.html',
  styles: []
})
export class ConfirmarApoderadoComponent implements OnInit {

  @Input() input_apoderadoDTO;
  @Input() input_fotoSeleccionada;

  apoderadoDTO: any;
  apoderado: any = new Apoderado();
  fotoSeleccionada: File = null;

  constructor(
    public activemodal: NgbActiveModal,
    public estudianteService: EstudianteService,
    public router: Router,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    this.apoderado = this.input_apoderadoDTO.apoderado;
    this.apoderadoDTO = this.input_apoderadoDTO;
    this.fotoSeleccionada = this.input_fotoSeleccionada
  }

  crud() {
    switch (this.apoderado.accion) {
      case Constantes.ACTUALIZAR: this.actualizarApoderado();
        break;
      case Constantes.ELIMINAR: this.eliminarApoderado();
        break;
      default: this.registrarApoderado();
    }
  }

  registrarApoderado() {
    this.estudianteService.registrarApoderado(this.apoderadoDTO).subscribe((resp: any) => {
      if (resp.estado == 1) {
        if (this.fotoSeleccionada != null) {
          this.estudianteService.asignarFotoApoderado(this.fotoSeleccionada, resp.defaultObj.idApoderado).subscribe((rsp: any) => {
            if (rsp.estado == 1) { this.toast.success(rsp.msg, Constantes.SUCCESS) }
            else { this.toast.error(rsp.msg, Constantes.ERROR) }
          })
        }
        this.toast.success(resp.msg, Constantes.SUCCESS)
        this.refrescar(this.router.url);
      } else { this.toast.error(resp.msg, Constantes.ERROR) }
    },
      (err) => { this.toast.error(err.status + " " + err.error.error, Constantes.ERROR) });
    this.activemodal.dismiss();
  }

  actualizarApoderado() {
    this.estudianteService.actualizarApoderado(this.apoderadoDTO).subscribe((resp: any) => {
      if (resp.estado == 1) {
        if (this.fotoSeleccionada != null) {
          this.estudianteService.asignarFotoApoderado(this.fotoSeleccionada, resp.defaultObj.idApoderado).subscribe((rsp: any) => {
            if (rsp.estado == 1) { this.toast.success(rsp.msg, Constantes.SUCCESS) }
            else { this.toast.error(rsp.msg, Constantes.ERROR) }
          })
        }
        this.toast.success(resp.msg, Constantes.SUCCESS)
        this.refrescar(this.router.url);
      } else { this.toast.error(resp.msg, Constantes.ERROR) }
    },
      (err) => { this.toast.error(err.status + " " + err.error.error, Constantes.ERROR); });
    this.activemodal.dismiss();
  }

  eliminarApoderado() {
    this.estudianteService.eliminarApoderado(this.apoderado.idApoderado).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.toast.success(resp.msg, Constantes.SUCCESS);
        this.refrescar(this.router.url)
      } else { this.toast.error(resp.msg, Constantes.ERROR); }
    },
      (err) => { this.toast.error(err.status + " " + err.error.error, Constantes.ERROR); });
    this.activemodal.dismiss();
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  close() {
    this.activemodal.close();
  }
}
