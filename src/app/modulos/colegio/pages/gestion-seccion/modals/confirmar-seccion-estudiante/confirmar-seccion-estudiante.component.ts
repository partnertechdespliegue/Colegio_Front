import { Component, Input, OnInit } from '@angular/core';
import { EstudianteService } from '../../../../../estudiante/services/estudiante/estudiante.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Constantes from '../../../../../../models/Constantes';

@Component({
  selector: 'app-confirmar-seccion-estudiante',
  templateUrl: './confirmar-seccion-estudiante.component.html',
  styles: []
})
export class ConfirmarSeccionEstudianteComponent implements OnInit {

  @Input() input_seccionDTO;

  seccionDTO: any;
  constructor(
    public activemodal: NgbActiveModal,
    public estudianteService: EstudianteService,
    public router: Router,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    this.seccionDTO = this.input_seccionDTO
  }

  crud() {
    switch (this.seccionDTO.accion) {
      case Constantes.ELIMINAR: this.eliminarEstudianteSeccion();
        break;
      default: this.registrarEstudianteSeccion();
    }
  }

  registrarEstudianteSeccion() {
    this.estudianteService.registrarEstudianteSeccion(this.seccionDTO).subscribe((resp: any) => {
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

  eliminarEstudianteSeccion() {
    this.estudianteService.eliminarEstudianteSeccion(this.seccionDTO.lsSeccionEstudiante).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.toast.success(resp.msg, Constantes.SUCCESS)
      } else { this.toast.error(resp.msg, Constantes.ERROR); }
    },
      (err) => {
        this.toast.error(err.status + " " + err.error.error, Constantes.ERROR);
      });
    this.activemodal.dismiss();
  }

  close() {
    this.activemodal.close();
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

}
