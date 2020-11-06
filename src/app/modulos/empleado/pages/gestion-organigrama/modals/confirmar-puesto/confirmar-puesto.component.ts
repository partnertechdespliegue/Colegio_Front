import { Component, Input, OnInit } from '@angular/core';
import { PuestoColegio } from '../../../../../../models/PuestoColegio';
import { DepartamentoColegio } from '../../../../../../models/DepartamentoColegio';
import Constantes from '../../../../../../models/Constantes';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrganigramaService } from '../../../../services/organigrama/organigrama.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirmar-puesto',
  templateUrl: './confirmar-puesto.component.html',
  styles: []
})
export class ConfirmarPuestoComponent implements OnInit {

  @Input() input_puesto;
  @Input() input_departamento;

  puesto: any = new PuestoColegio();
  departamento: any = new DepartamentoColegio();

  constructor(
    public activemodal: NgbActiveModal,
    public organigramaService: OrganigramaService,
    public router: Router,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    this.puesto = this.input_puesto;
    this.departamento = this.input_departamento;
  }

  crud() {
    switch (this.puesto.accion) {
      case Constantes.ACTUALIZAR: this.actualizarPuesto();
        break;
      case Constantes.ELIMINAR: this.eliminarPuesto();
        break;
      default: this.registrarPuesto();
    }
  }

  registrarPuesto() {
    var dto = {
      "puestoColegio": this.puesto,
      "departamentoColegio": this.departamento
    }
    this.organigramaService.registrarPuesto(dto).subscribe((resp: any) => {
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

  actualizarPuesto() {
    this.puesto.departamentoColegio = this.departamento;
    this.organigramaService.actualizarPuesto(this.puesto).subscribe((resp: any) => {
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

  eliminarPuesto() {
    this.organigramaService.eliminarPuesto(this.puesto.idPuestoColegio).subscribe((resp: any) => {
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
    this.activemodal.close();
  }

}
