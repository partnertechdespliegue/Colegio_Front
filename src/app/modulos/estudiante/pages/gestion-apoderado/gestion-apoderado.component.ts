import { EstudianteService } from './../../services/estudiante/estudiante.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Colegio } from '../../../../models/Colegio';
import { Sucursal } from '../../../../models/Sucursal';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import Constantes from '../../../../models/Constantes';
import { NuevoApoderadoComponent } from './modals/nuevo-apoderado/nuevo-apoderado.component';
import { ConfirmarApoderadoComponent } from './modals/confirmar-apoderado/confirmar-apoderado.component';
import { ApoderadoGestionComponent } from '../gestion-estudiante/modals/apoderado-gestion/apoderado-gestion.component';

@Component({
  selector: 'app-gestion-apoderado',
  templateUrl: './gestion-apoderado.component.html',
  styles: []
})
export class GestionApoderadoComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  modalRef: NgbModalRef;
  lsApoderado = null;
  lsApoderadoFilter: any[] = [];
  colegio: any = new Colegio()
  sucursal: any = new Sucursal()

  displayedColumns: string[] = [
    'nomApe',
    'nroDoc',
    'sexo',
    'poderdante',
    'actualizar',
    'eliminar',
  ];

  constructor(
    public modalService: NgbModal,
    public estudianteService: EstudianteService
  ) { }

  ngOnInit() {
    this.colegio = JSON.parse(localStorage.getItem('colegioSeleccion'));
    this.sucursal = JSON.parse(localStorage.getItem('sucursalSeleccion'));
    if (this.sucursal != null) {
      this.listarApoderadoPorSucursal();
    } else {
      this.listarApoderadoPorColegio();
    }
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarApoderadoPorColegio() {
    this.estudianteService.listarApoderadoPorColegio(this.colegio).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsApoderadoFilter = resp.aaData;
        this.lsApoderado = new MatTableDataSource<any>(this.lsApoderadoFilter);
        this.lsApoderado.paginator = this.paginator;
      }
    })
  }

  listarApoderadoPorSucursal() {
    this.estudianteService.listarApoderadoPorSucursal(this.sucursal).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsApoderadoFilter = resp.aaData;
        this.lsApoderado = new MatTableDataSource<any>(this.lsApoderadoFilter);
        this.lsApoderado.paginator = this.paginator;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsApoderado.filter = filterValue.trim().toLowerCase();
  }

  nuevoApoderado() {
    let indice = null;
    this.openModal(indice);
  }

  actualizarApoderado(apoderado) {
    var tmp = Object.assign({}, apoderado);
    tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(tmp);
  }

  eliminarApoderado(apoderado) {
    var tmp = Object.assign({}, apoderado);
    tmp.accion = Constantes.ELIMINAR;
    this.openModal(tmp);
  }

  gestionApoderado(apoderado) {
    var tmp = Object.assign({}, apoderado);
    tmp.accion = "GA";
    this.openModal(tmp);
  }

  public openModal(indice) {
    if (indice == null || indice.accion == Constantes.ACTUALIZAR) {
      this.modalRef = this.modalService.open(NuevoApoderadoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'lg'
        })
      this.modalRef.componentInstance.input_apoderado = indice;
    } else if (indice.accion == "GA") {
      this.modalRef = this.modalService.open(ApoderadoGestionComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMDD'
        })
      this.modalRef.componentInstance.input_apoderado = indice;
    } else {
      this.modalRef = this.modalService.open(ConfirmarApoderadoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_apoderadoDTO = { "apoderado": indice };
    }
  }

}
