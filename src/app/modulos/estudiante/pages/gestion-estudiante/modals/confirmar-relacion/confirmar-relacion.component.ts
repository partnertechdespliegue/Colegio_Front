import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EstudianteService } from '../../../../services/estudiante/estudiante.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Constantes from '../../../../../../models/Constantes';

@Component({
  selector: 'app-confirmar-relacion',
  templateUrl: './confirmar-relacion.component.html',
  styles: []
})
export class ConfirmarRelacionComponent implements OnInit {

  @Input() input_relacionDTO;

  relacionDTO: any;

  constructor(
    public activemodal: NgbActiveModal,
    public estudianteService: EstudianteService,
    public router: Router,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    this.relacionDTO = this.input_relacionDTO;
  }

  crud() {
    switch (this.relacionDTO.accion) {
      case Constantes.ELIMINAR: this.eliminarRelacion();
        break;
      default: this.registrarRelacion();
    }
  }

  registrarRelacion() {
    this.estudianteService.registrarRelacion(this.relacionDTO).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.toast.success(resp.msg, Constantes.SUCCESS)
        this.refrescar(this.router.url);
        this.activemodal.dismiss();
      } else if (resp.estado == 3) {
        this.toast.info(resp.msg, Constantes.INFO)
      } else { this.toast.error(resp.msg, Constantes.ERROR) }
    },
      (err) => { this.toast.error(err.status + " " + err.error.error, Constantes.ERROR) });
  }

  eliminarRelacion() {
    this.estudianteService.eliminarRelacion(this.relacionDTO.idRelacion).subscribe((resp: any) => {
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
