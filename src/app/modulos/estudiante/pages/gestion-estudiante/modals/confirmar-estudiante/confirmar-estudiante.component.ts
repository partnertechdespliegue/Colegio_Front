import { Estudiante } from './../../../../../../models/Estudiante';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { EstudianteService } from '../../../../services/estudiante/estudiante.service';
import Constantes from '../../../../../../models/Constantes';
// import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirmar-estudiante',
  templateUrl: './confirmar-estudiante.component.html',
  styles: []
})
export class ConfirmarEstudianteComponent implements OnInit {

  @Input() input_estudianteDTO;
  @Input() input_fotoSeleccionada;

  estudianteDTO: any;
  estudiante: any = new Estudiante();
  fotoSeleccionada: File = null;

  constructor(
    public activemodal: NgbActiveModal,
    public estudianteService: EstudianteService,
    public router: Router,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    this.estudiante = this.input_estudianteDTO.estudiante;
    this.estudianteDTO = this.input_estudianteDTO;
    this.fotoSeleccionada = this.input_fotoSeleccionada
  }

  crud() {
    switch (this.estudiante.accion) {
      case Constantes.ACTUALIZAR: this.actualizarEstudiante();
        break;
      case Constantes.ELIMINAR: this.eliminarEstudiante();
        break;
      default: this.registrarEstudiante();
    }
  }

  registrarEstudiante() {
    this.estudianteService.registrarEstudiante(this.estudianteDTO).subscribe((resp: any) => {
      if (resp.estado == 1) {
        if (this.fotoSeleccionada != null) {
          this.estudianteService.asignarFotoEstudiante(this.fotoSeleccionada, resp.defaultObj.idEstudiante).subscribe((rsp: any) => {
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

  actualizarEstudiante() {
    this.estudianteService.actualizarEstudiante(this.estudianteDTO).subscribe((resp: any) => {
      if (resp.estado == 1) {
        if (this.fotoSeleccionada != null) {
          this.estudianteService.asignarFotoEstudiante(this.fotoSeleccionada, resp.defaultObj.idEstudiante).subscribe((rsp: any) => {
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

  eliminarEstudiante() {
    this.estudianteService.eliminarEstudiante(this.estudiante.idEstudiante).subscribe((resp: any) => {
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
