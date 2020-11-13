import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Colegio } from '../../../../models/Colegio';
import { Sucursal } from '../../../../models/Sucursal';
import { EmpleadoService } from '../../../empleado/services/empleado/empleado.service';

@Component({
  selector: 'app-gestion-maestro',
  templateUrl: './gestion-maestro.component.html',
  styles: []
})
export class GestionMaestroComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  modalRef: NgbModalRef;
  lsMaestro = null;
  lsMaestroFilter: any[] = [];

  colegio: any = new Colegio()
  sucursal: any = new Sucursal()

  displayedColumns: string[] = [
    'nomApe',
    'nroDoc',
    'sexo',
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
    this.empleadoService.listarMaestroPorColegio(this.colegio).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsMaestroFilter = resp.aaData;
        this.lsMaestroFilter.map((x) => {
          x.datos = x.nombres + ' ' + x.apePaterno + ' ' + x.apeMaterno;
        });
        this.lsMaestro = new MatTableDataSource<any>(this.lsMaestroFilter);
        this.lsMaestro.paginator = this.paginator;
      }
    })
  }

  listarEstudiantePorSucursal() {
    this.empleadoService.listarMaestroPorSucursal(this.sucursal).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsMaestroFilter = resp.aaData;
        this.lsMaestroFilter.map((x) => {
          x.datos = x.nombres + ' ' + x.apePaterno + ' ' + x.apeMaterno;
        });
        this.lsMaestro = new MatTableDataSource<any>(this.lsMaestroFilter);
        this.lsMaestro.paginator = this.paginator;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsMaestro.filter = filterValue.trim().toLowerCase();
  }

}
