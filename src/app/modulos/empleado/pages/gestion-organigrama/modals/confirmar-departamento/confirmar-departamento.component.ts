import { Component, Input, OnInit } from '@angular/core';
import { Departamento } from '../../../../../../models/Departamento';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrganigramaService } from '../../../../services/organigrama/organigrama.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Constantes from '../../../../../../models/Constantes';
import { Colegio } from '../../../../../../models/Colegio';
import { DepartamentoColegio } from '../../../../../../models/DepartamentoColegio';

@Component({
  selector: 'app-confirmar-departamento',
  templateUrl: './confirmar-departamento.component.html',
  styles: []
})
export class ConfirmarDepartamentoComponent implements OnInit {

  @Input() input_departamento;

  colegio : any = new Colegio();
  departamento: any = new DepartamentoColegio();

  constructor(
    public activemodal: NgbActiveModal,
    public organigramaService: OrganigramaService,
    public router: Router,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    this.colegio = JSON.parse(localStorage.getItem('colegioSeleccion'));
    this.departamento = this.input_departamento;
  }

  crud() {
    switch (this.departamento.accion) {
      case Constantes.ACTUALIZAR: this.actualizarDepartamento();
        break;
      case Constantes.ELIMINAR: this.eliminarDepartamento();
        break;
      default: this.registrarDepartamento();
    }
  }

  registrarDepartamento() {
    var dto = {
      "departamentoColegio": this.departamento,
      "colegio": this.colegio
    }
    this.organigramaService.registrarDepartamento(dto).subscribe((resp: any) => {
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

  actualizarDepartamento() {
    this.organigramaService.actualizarDepartamento(this.departamento).subscribe((resp: any) => {
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

  eliminarDepartamento() {
    this.organigramaService.eliminarDepartamento(this.departamento.idDepartamentoColegio).subscribe((resp: any) => {
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
