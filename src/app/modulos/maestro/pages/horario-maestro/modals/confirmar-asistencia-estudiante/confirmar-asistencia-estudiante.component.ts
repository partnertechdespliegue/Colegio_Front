import { Component, Input, OnInit } from '@angular/core';
import { EstudianteService } from '../../../../../estudiante/services/estudiante/estudiante.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Constantes from '../../../../../../models/Constantes';

@Component({
  selector: 'app-confirmar-asistencia-estudiante',
  templateUrl: './confirmar-asistencia-estudiante.component.html',
  styles: []
})
export class ConfirmarAsistenciaEstudianteComponent implements OnInit {

  @Input() input_lsAsistEst;

  lsAsistenciaEst: any[] = [];

  constructor(
    public activemodal: NgbActiveModal,
    public router: Router,
    public toast: ToastrService,
    private estudianteService: EstudianteService,
  ) { }

  ngOnInit() {
    this.lsAsistenciaEst = this.input_lsAsistEst;
  }

  crud() {
    // switch (this.tema.accion) {
    //   case Constantes.ACTUALIZAR: this.actualizarTema();
    //     break;
    //   case Constantes.ELIMINAR: this.eliminarTema();
    //     break;
    //   default: this.registrarTema();
    // }
  }

  registrarAsistenciaMasiva() {
    this.estudianteService.registrarAsistenciaMasivaEstudiante(this.lsAsistenciaEst).subscribe((resp: any) => {
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

  close() {
    this.activemodal.close();
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }
}
