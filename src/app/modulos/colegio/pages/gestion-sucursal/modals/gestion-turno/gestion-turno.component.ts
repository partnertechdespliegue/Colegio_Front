import { ColegioService } from './../../../../services/colegio/colegio.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Sucursal } from '../../../../../../models/Sucursal';
import Constantes from '../../../../../../models/Constantes';
import { NuevoTurnoComponent } from '../nuevo-turno/nuevo-turno.component';
import { ConfirmarTurnoComponent } from '../confirmar-turno/confirmar-turno.component';
import { NuevoRecesoComponent } from '../nuevo-receso/nuevo-receso.component';
import { ConfirmarRecesoComponent } from '../confirmar-receso/confirmar-receso.component';

@Component({
  selector: 'app-gestion-turno',
  templateUrl: './gestion-turno.component.html',
  styles: []
})
export class GestionTurnoComponent implements OnInit, OnDestroy {

  @Input() input_sucursal;

  sucursal: any = new Sucursal();
  lsTurno: any[] = [];
  modalRef: NgbModalRef;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public colegioService: ColegioService
  ) { }

  ngOnInit() {
    this.sucursal = this.input_sucursal;
    this.listarTurno();
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarTurno(){
    this.colegioService.listarTurno(this.sucursal).subscribe((resp: any) => {
      this.lsTurno = resp.aaData;
    })
  }

  listarReceso(turno){
    this.colegioService.listarReceso(turno).subscribe((resp: any) => {
      turno.lsReceso=resp.aaData;
    })
  }

  nuevoTurno() {
    let indice = null;
    this.openModal(indice);
  }

  actualizarTurno(turno) {
    var tmp = Object.assign({}, turno);
    tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(tmp);
  }

  eliminarTurno(turno) {
    var tmp = Object.assign({}, turno);
    tmp.accion = Constantes.ELIMINAR;
    this.openModal(tmp);
  }

  openModal(indice) {
    if (indice == null || indice.accion == Constantes.ACTUALIZAR) {
      this.modalRef = this.modalService.open(NuevoTurnoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'lg'
        })
      this.modalRef.componentInstance.input_turno = indice;
      this.modalRef.componentInstance.input_sucursal = this.sucursal;
    } else {
      this.modalRef = this.modalService.open(ConfirmarTurnoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_turnoDTO = indice;
    }
  }

  nuevoReceso(turno) {
    let indice = null;
    this.openModalReceso(turno, indice);
  }

  actualizarReceso(turno, receso) {
    var tmp = Object.assign({}, receso);
    tmp.accion = Constantes.ACTUALIZAR;
    this.openModalReceso(turno, tmp);
  }

  eliminarReceso(receso) {
    var tmp = Object.assign({}, receso);
    tmp.accion = Constantes.ELIMINAR;
    this.openModalReceso(null, tmp);
  }

  openModalReceso(turno, indice) {
    if (indice == null || indice.accion == Constantes.ACTUALIZAR) {
      this.modalRef = this.modalService.open(NuevoRecesoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_receso = indice;
      this.modalRef.componentInstance.input_turno = turno;
    } else {
      this.modalRef = this.modalService.open(ConfirmarRecesoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_receso = indice;
    }
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
