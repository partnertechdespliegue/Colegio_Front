import { Colegio } from './../../../../models/Colegio';
import { ColegioService } from './../../services/colegio/colegio.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import Constantes from '../../../../models/Constantes';
import { NuevaSucursalComponent } from './modals/nueva-sucursal/nueva-sucursal.component';
import { ConfirmarSucursalComponent } from './modals/confirmar-sucursal/confirmar-sucursal.component';
import { GestionDiaLaboralComponent } from './modals/gestion-dia-laboral/gestion-dia-laboral.component';
import { GestionTurnoComponent } from './modals/gestion-turno/gestion-turno.component';

@Component({
  selector: 'app-gestion-sucursal',
  templateUrl: './gestion-sucursal.component.html',
  styles: []
})
export class GestionSucursalComponent implements OnInit,  OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  lsSucursal = null;
  lsSucursalFilter: any[] = [];
  modalRef: NgbModalRef;
  colegio : any = new Colegio();

  displayedColumns: string[] = [
    'direccion',
    'horaInicioAtencion',
    'horaFinAtencion',
    'gestionTurno',
    'gestionDiaLab',
    // 'nivelSecundaria',
    'actualizar',
    'eliminar'
  ];

  constructor(
    public modalService: NgbModal,
    public colegioService: ColegioService
  ) { }

  ngOnInit() {
    this.colegio = JSON.parse(localStorage.getItem('colegioSeleccion'));
    if (this.colegio != null) {
      this.listarSucursal();
    }
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarSucursal() {
    this.colegioService.listarSucursal(this.colegio).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsSucursalFilter = resp.aaData;
        this.lsSucursal = new MatTableDataSource<any>(this.lsSucursalFilter);
        this.lsSucursal.paginator = this.paginator;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsSucursal.filter = filterValue.trim().toLowerCase();
  }

  nuevaSucursal() {
    let indice = null;
    this.openModal(indice);
  }

  actualizarSucursal(sucursal) {
    var tmp = Object.assign({}, sucursal);
    tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(tmp);
  }

  eliminarSucursal(sucursal) {
    var tmp = Object.assign({}, sucursal);
    tmp.accion = Constantes.ELIMINAR;
    this.openModal(tmp);
  }

  gestionDiaLaboral(sucursal) {
    var tmp = Object.assign({}, sucursal);
    tmp.accion = "GD";
    this.openModal(tmp);
  }

  gestionTurno(sucursal) {
    var tmp = Object.assign({}, sucursal);
    tmp.accion = "GT";
    this.openModal(tmp);
  }

  public openModal(indice) {
    if (indice == null || indice.accion == Constantes.ACTUALIZAR) {
      this.modalRef = this.modalService.open(NuevaSucursalComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'lg'
        })
      this.modalRef.componentInstance.input_sucursal = indice;
    } else if (indice.accion == "GD") {
      this.modalRef = this.modalService.open(GestionDiaLaboralComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_sucursal = indice;
    } else if (indice.accion == "GT") {
      this.modalRef = this.modalService.open(GestionTurnoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'lg'
        })
      this.modalRef.componentInstance.input_sucursal = indice;
    } else {
      this.modalRef = this.modalService.open(ConfirmarSucursalComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_sucursalDTO = indice;
    }
  }
}
