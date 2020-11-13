import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { EstudianteService } from '../../services/estudiante/estudiante.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Colegio } from '../../../../models/Colegio';
import { MatTableDataSource } from '@angular/material/table';
import Constantes from '../../../../models/Constantes';
import { Sucursal } from '../../../../models/Sucursal';
import { NuevoEstudianteComponent } from './modals/nuevo-estudiante/nuevo-estudiante.component';
import { ConfirmarEstudianteComponent } from './modals/confirmar-estudiante/confirmar-estudiante.component';
import { ApoderadoGestionComponent } from './modals/apoderado-gestion/apoderado-gestion.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-estudiante',
  templateUrl: './gestion-estudiante.component.html',
  styles: []
})
export class GestionEstudianteComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  modalRef: NgbModalRef;
  lsEstudiante = null;
  lsEstudianteFilter: any[] = [];
  colegio: any = new Colegio()
  sucursal: any = new Sucursal()

  displayedColumns: string[] = [
    'nomApe',
    'nroDoc',
    'sexo',
    'fechaNac',
    'apoderado',
    'actualizar',
    'eliminar',
  ];

  constructor(
    public modalService: NgbModal,
    public estudianteService: EstudianteService,
    public router: Router
  ) { }

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
    this.estudianteService.listarEstudiantePorColegio(this.colegio).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsEstudianteFilter = resp.aaData;
        this.lsEstudianteFilter.map((x) => {
          x.datos = x.nombres + ' ' + x.apePaterno + ' ' + x.apeMaterno;
        });
        this.lsEstudiante = new MatTableDataSource<any>(this.lsEstudianteFilter);
        this.lsEstudiante.paginator = this.paginator;
      }
    })
  }

  listarEstudiantePorSucursal() {
    this.estudianteService.listarEstudiantePorSucursal(this.sucursal).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsEstudianteFilter = resp.aaData;
        this.lsEstudianteFilter.map((x) => {
          x.datos = x.nombres + ' ' + x.apePaterno + ' ' + x.apeMaterno;
        });
        this.lsEstudiante = new MatTableDataSource<any>(this.lsEstudianteFilter);
        this.lsEstudiante.paginator = this.paginator;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsEstudiante.filter = filterValue.trim().toLowerCase();
  }

  nuevoEstudiante() {
    let indice = null;
    this.openModal(indice);
  }

  actualizarEstudiante(estudiante) {
    var tmp = Object.assign({}, estudiante);
    tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(tmp);
  }

  eliminarEstudiante(estudiante) {
    var tmp = Object.assign({}, estudiante);
    tmp.accion = Constantes.ELIMINAR;
    this.openModal(tmp);
  }

  gestionApoderado(estudiante) {
    var tmp = Object.assign({}, estudiante);
    tmp.accion = "GA";
    this.openModal(tmp);
  }

  public openModal(indice) {
    if (indice == null || indice.accion == Constantes.ACTUALIZAR) {
      this.modalRef = this.modalService.open(NuevoEstudianteComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'lg'
        })
      this.modalRef.componentInstance.input_estudiante = indice;
    } else if (indice.accion == "GA") {
      this.modalRef = this.modalService.open(ApoderadoGestionComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMDD'
        })
      this.modalRef.componentInstance.input_estudiante = indice;
    } else {
      this.modalRef = this.modalService.open(ConfirmarEstudianteComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_estudianteDTO = { "estudiante": indice };
    }
  }

  videoLlamada(){
    this.router.navigate(["/videollamadaestudiante"])
  }
}
