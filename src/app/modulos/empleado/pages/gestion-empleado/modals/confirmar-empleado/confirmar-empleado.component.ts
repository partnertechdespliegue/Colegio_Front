import { Component, Input, OnInit } from '@angular/core';
import { Empleado } from '../../../../../../models/Empleado';
import { EmpleadoService } from '../../../../services/empleado/empleado.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Constantes from '../../../../../../models/Constantes';

@Component({
  selector: 'app-confirmar-empleado',
  templateUrl: './confirmar-empleado.component.html',
  styles: []
})
export class ConfirmarEmpleadoComponent implements OnInit {

  @Input() input_empleadoDTO;
  @Input() input_fotoSeleccionada;

  empleadoDTO: any;
  empleado: any = new Empleado();
  fotoSeleccionada: File = null;

  constructor(
    public activemodal: NgbActiveModal,
    public empleadoService: EmpleadoService,
    public router: Router,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    this.empleado = this.input_empleadoDTO.empleado;
    this.empleadoDTO = this.input_empleadoDTO;
    this.fotoSeleccionada = this.input_fotoSeleccionada
  }

  crud() {
    switch (this.empleado.accion) {
      case Constantes.ACTUALIZAR: this.actualizarEmpleado();
        break;
      case Constantes.ELIMINAR: this.eliminarEmpleado();
        break;
      default: this.registrarEmpleado();
    }
  }

  registrarEmpleado() {
    this.empleadoService.registrarEmpleado(this.empleadoDTO).subscribe((resp: any) => {
      if (resp.estado == 1) {
        if (this.fotoSeleccionada != null) {
          this.empleadoService.asignarFotoEmpleado(this.fotoSeleccionada, resp.defaultObj.idEmpleado).subscribe((rsp: any) => {
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

  actualizarEmpleado() {
    this.empleadoService.actualizarEmpleado(this.empleadoDTO).subscribe((resp: any) => {
      if (resp.estado == 1) {
        if (this.fotoSeleccionada != null) {
          this.empleadoService.asignarFotoEmpleado(this.fotoSeleccionada, resp.defaultObj.idEmpleado).subscribe((rsp: any) => {
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

  eliminarEmpleado() {
    this.empleadoService.eliminarEmpleado(this.empleado.idEmpleado).subscribe((resp: any) => {
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
