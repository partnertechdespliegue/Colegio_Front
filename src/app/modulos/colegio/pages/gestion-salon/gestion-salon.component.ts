import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ColegioService } from '../../services/colegio/colegio.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Sucursal } from '../../../../models/Sucursal';
import Constantes from '../../../../models/Constantes';
import { NuevoSalonComponent } from './modals/nuevo-salon/nuevo-salon.component';
import { ConfirmarSalonComponent } from './modals/confirmar-salon/confirmar-salon.component';
import { HorarioSalonComponent } from './modals/horario-salon/horario-salon.component';

@Component({
  selector: 'app-gestion-salon',
  templateUrl: './gestion-salon.component.html',
  styles: []
})
export class GestionSalonComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  lsSalon = null;
  lsSalonFilter: any[] = [];
  sucursal:any = new Sucursal();
  modalRef: NgbModalRef;

  displayedColumns: string[] = [
    'descripcion',
    'tipoSalon',
    'capacidad',
    'gestionHorario',
    'actualizar',
    'eliminar',
  ];

  constructor(
    public modalService: NgbModal,
    public colegioService: ColegioService
  ) { }

  ngOnInit() {
    this.sucursal = JSON.parse(localStorage.getItem('sucursalSeleccion'));
    if (this.sucursal != null) {
      this.listarSalon();
    }
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarSalon() {
    this.colegioService.listarSalon(this.sucursal).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsSalonFilter = resp.aaData;
        this.lsSalon = new MatTableDataSource<any>(this.lsSalonFilter);
        this.lsSalon.paginator = this.paginator;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsSalon.filter = filterValue.trim().toLowerCase();
  }

  nuevoSalon() {
    let indice = null;
    this.openModal(indice);
  }

  actualizarSalon(salon) {
    var tmp = Object.assign({}, salon);
    tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(tmp);
  }

  eliminarSalon(salon) {
    var tmp = Object.assign({}, salon);
    tmp.accion = Constantes.ELIMINAR;
    this.openModal(tmp);
  }

  gestionHorarioSalon(salon) {
    var tmp = Object.assign({}, salon);
    tmp.accion = "HS";
    this.openModal(tmp);
  }

  public openModal(indice) {
    if (indice == null || indice.accion == Constantes.ACTUALIZAR) {
      this.modalRef = this.modalService.open(NuevoSalonComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_salon = indice;
    } else if (indice.accion == "HS") {
      this.modalRef = this.modalService.open(HorarioSalonComponent,
        {
          backdrop: 'static',
          keyboard: false,
         windowClass: 'modalLG'
        })
      this.modalRef.componentInstance.input_salon = indice;
    } else {
      this.modalRef = this.modalService.open(ConfirmarSalonComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_salon = indice;
    }
  }

}
