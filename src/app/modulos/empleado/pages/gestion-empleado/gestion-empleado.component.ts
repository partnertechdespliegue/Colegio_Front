import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator } from '@angular/material/paginator';
import { EmpleadoService } from '../../services/empleado/empleado.service';
import { Sucursal } from '../../../../models/Sucursal';
import { Colegio } from '../../../../models/Colegio';
import { MatTableDataSource } from '@angular/material/table';
import Constantes from '../../../../models/Constantes';
import { NuevoEmpleadoComponent } from './modals/nuevo-empleado/nuevo-empleado.component';
import { ConfirmarEmpleadoComponent } from './modals/confirmar-empleado/confirmar-empleado.component';

@Component({
  selector: 'app-gestion-empleado',
  templateUrl: './gestion-empleado.component.html',
  styles: []
})
export class GestionEmpleadoComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  modalRef: NgbModalRef;
  lsEmpleado = null;
  lsEmpleadoFilter: any[] = [];

  colegio: any = new Colegio()
  sucursal: any = new Sucursal()

  displayedColumns: string[] = [
    'nomApe',
    'nroDoc',
    'sexo',
    'actualizar',
    'eliminar',
  ];

  constructor(
    public modalService: NgbModal,
    public empleadoService: EmpleadoService
  ) {}

  ngOnInit() {
    this.colegio = JSON.parse(localStorage.getItem('colegioSeleccion'));
    this.sucursal = JSON.parse(localStorage.getItem('sucursalSeleccion'));
    if (this.sucursal != null) {
      this.listarEstudiantePorSucursal();
    } else {
      this.listarEstudiantePorColegio();
    }
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarEstudiantePorColegio() {
    this.empleadoService.listarEmpleadoPorColegio(this.colegio).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsEmpleadoFilter = resp.aaData;
        this.lsEmpleadoFilter.map((x) => {
          x.datos = x.nombres + ' ' + x.apePaterno + ' ' + x.apeMaterno;
        });
        this.lsEmpleado = new MatTableDataSource<any>(this.lsEmpleadoFilter);
        this.lsEmpleado.paginator = this.paginator;
      }
    })
  }

  listarEstudiantePorSucursal() {
    this.empleadoService.listarEmpleadoPorSucursal(this.sucursal).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsEmpleadoFilter = resp.aaData;
        this.lsEmpleadoFilter.map((x) => {
          x.datos = x.nombres + ' ' + x.apePaterno + ' ' + x.apeMaterno;
        });
        this.lsEmpleado = new MatTableDataSource<any>(this.lsEmpleadoFilter);
        this.lsEmpleado.paginator = this.paginator;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsEmpleado.filter = filterValue.trim().toLowerCase();
  }

  nuevoEmpleado() {
    let indice = null;
    this.openModal(indice);
  }

  actualizarEmpleado(estudiante) {
    var tmp = Object.assign({}, estudiante);
    tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(tmp);
  }

  eliminarEmpleado(estudiante) {
    var tmp = Object.assign({}, estudiante);
    tmp.accion = Constantes.ELIMINAR;
    this.openModal(tmp);
  }

  public openModal(indice) {
    if (indice == null || indice.accion == Constantes.ACTUALIZAR) {
      this.modalRef = this.modalService.open(NuevoEmpleadoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'lg'
        })
      this.modalRef.componentInstance.input_empleado = indice;
    } else {
      this.modalRef = this.modalService.open(ConfirmarEmpleadoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_empleadoDTO = { "empleado": indice };
    }
  }
}
