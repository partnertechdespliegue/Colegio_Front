import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Colegio } from '../../../../models/Colegio';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrganigramaService } from '../../services/organigrama/organigrama.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Constantes from '../../../../models/Constantes';
import { NuevoDepartamentoComponent } from './modals/nuevo-departamento/nuevo-departamento.component';
import { ConfirmarDepartamentoComponent } from './modals/confirmar-departamento/confirmar-departamento.component';
import { NuevoPuestoComponent } from './modals/nuevo-puesto/nuevo-puesto.component';
import { ConfirmarPuestoComponent } from './modals/confirmar-puesto/confirmar-puesto.component';

@Component({
  selector: 'app-gestion-organigrama',
  templateUrl: './gestion-organigrama.component.html',
  styles: []
})
export class GestionOrganigramaComponent implements OnInit, OnDestroy {
  @ViewChild('paglsPuesto', { static: true }) paglsPuesto: MatPaginator;
  @ViewChild('paglsDepartamento', { static: true }) paglsDepartamento: MatPaginator;

  modalRef: NgbModalRef;
  colegio : any = new Colegio();

  lsPuesto = null;
  lsPuestoFilter: any[] = [];
  lsDepartamento = null;
  lsDepartamentoFilter: any[] = [];

  displayedColumns: string[] = [
    'descripcion',
    'departamento',
    'actualizar',
    'eliminar',
  ];

  displayed2Columns: string[] = [
    'descripcion',
    'actualizar',
    'eliminar',
  ];

  constructor(
    public modalService: NgbModal,
    public organigramaService: OrganigramaService
  ) { }

  ngOnInit() {
    this.colegio = JSON.parse(localStorage.getItem('colegioSeleccion'));
    if (this.colegio != null) {
      this.listarPuesto();
      this.listarDepartamento();
    }
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarPuesto(){
    this.organigramaService.listarPuesto(this.colegio).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsPuestoFilter = resp.aaData;
        this.lsPuestoFilter.map((x) => {
          x.datos = x.departamentoColegio.descripcion;
        });
        this.lsPuesto = new MatTableDataSource<any>(this.lsPuestoFilter);
        this.lsPuesto.paginator = this.paglsPuesto;
      }
    })
  }

  listarDepartamento(){
    this.organigramaService.listarDepartamento(this.colegio).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsDepartamentoFilter = resp.aaData;
        this.lsDepartamento = new MatTableDataSource<any>(this.lsDepartamentoFilter);
        this.lsDepartamento.paginator = this.paglsDepartamento;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsPuesto.filter = filterValue.trim().toLowerCase();
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsDepartamento.filter = filterValue.trim().toLowerCase();
  }

  nuevoDepartamento() {
    let indice = null;
    this.openModalDepartamento(indice);
  }

  actualizarDepartamento(departamento) {
    var tmp = Object.assign({}, departamento);
    tmp.accion = Constantes.ACTUALIZAR;
    this.openModalDepartamento(tmp);
  }

  eliminarDepartamento(departamento) {
    var tmp = Object.assign({}, departamento);
    tmp.accion = Constantes.ELIMINAR;
    this.openModalDepartamento(tmp);
  }

  public openModalDepartamento(indice) {
    if (indice == null || indice.accion == Constantes.ACTUALIZAR) {
      this.modalRef = this.modalService.open(NuevoDepartamentoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_departamento = indice;
    } else {
      this.modalRef = this.modalService.open(ConfirmarDepartamentoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_departamento = indice;
    }
  }

  nuevoPuesto() {
    let indice = null;
    this.openModalPuesto(indice);
  }

  actualizarPuesto(puesto) {
    var tmp = Object.assign({}, puesto);
    tmp.accion = Constantes.ACTUALIZAR;
    this.openModalPuesto(tmp);
  }

  eliminarPuesto(puesto) {
    var tmp = Object.assign({}, puesto);
    tmp.accion = Constantes.ELIMINAR;
    this.openModalPuesto(tmp);
  }

  public openModalPuesto(indice) {
    if (indice == null || indice.accion == Constantes.ACTUALIZAR) {
      this.modalRef = this.modalService.open(NuevoPuestoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_puesto = indice;
    } else {
      this.modalRef = this.modalService.open(ConfirmarPuestoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_puesto = indice;
    }
  }

}
