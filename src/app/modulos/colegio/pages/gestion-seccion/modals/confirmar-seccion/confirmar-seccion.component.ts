import { Component, Input, OnInit } from '@angular/core';
import Constantes from '../../../../../../models/Constantes';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EstudianteService } from '../../../../../estudiante/services/estudiante/estudiante.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirmar-seccion',
  templateUrl: './confirmar-seccion.component.html',
  styles: []
})
export class ConfirmarSeccionComponent implements OnInit {

  @Input() input_seccionDTO;

  seccionDTO: any;

  constructor(
    public activemodal: NgbActiveModal,
    public estudianteService: EstudianteService,
    public router: Router,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    this.seccionDTO = this.input_seccionDTO;
  }

  crud() {
    switch (this.seccionDTO.accion) {
      case Constantes.ACTUALIZAR: this.actualizarSeccion();
        break;
      case Constantes.ELIMINAR: this.eliminarSeccion();
        break;
      default: this.registrarSeccion();
    }
  }

  registrarSeccion() {
    this.estudianteService.registrarSeccion(this.seccionDTO).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.toast.success(resp.msg, Constantes.SUCCESS)
        this.refrescar(this.router.url);
      } else { this.toast.error(resp.msg, Constantes.ERROR) }
    },
      (err) => { this.toast.error(err.status + " " + err.error.error, Constantes.ERROR) });
    this.activemodal.dismiss();
  }

  actualizarSeccion() {
    this.estudianteService.actualizarSeccion(this.seccionDTO).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.toast.success(resp.msg, Constantes.SUCCESS)
        this.refrescar(this.router.url);
      } else { this.toast.error(resp.msg, Constantes.ERROR) }
    },
      (err) => { this.toast.error(err.status + " " + err.error.error, Constantes.ERROR); });
    this.activemodal.dismiss();
  }

  eliminarSeccion() {
    this.estudianteService.eliminarSeccion(this.seccionDTO.idSeccion).subscribe((resp: any) => {
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
