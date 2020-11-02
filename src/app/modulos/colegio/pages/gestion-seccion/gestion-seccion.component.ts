import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { EstudianteService } from '../../../estudiante/services/estudiante/estudiante.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { Sucursal } from '../../../../models/Sucursal';
import Constantes from '../../../../models/Constantes';
import { NuevaSeccionComponent } from './modals/nueva-seccion/nueva-seccion.component';
import { ConfirmarSeccionComponent } from './modals/confirmar-seccion/confirmar-seccion.component';
import { GestionSeccionEstudianteComponent } from './modals/gestion-seccion-estudiante/gestion-seccion-estudiante.component';
import { HorarioSeccionComponent } from './modals/horario-seccion/horario-seccion.component';

@Component({
  selector: 'app-gestion-seccion',
  templateUrl: './gestion-seccion.component.html',
  styles: []
})
export class GestionSeccionComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  modalRef: NgbModalRef;

  sucursal: any = new Sucursal()

  lsSeccion = null;
  lsSeccionFilter: any[] = [];

  displayedColumns: string[] = [
    'dscrp',
    'turno',
    'salon',
    'nivEdu',
    'grado',
    'estudiantes',
    'gestHorario',
    'actualizar',
    'eliminar',
  ];

  constructor(
    public modalService: NgbModal,
    public estudianteService: EstudianteService
  ) { }

  ngOnInit() {
    this.sucursal = JSON.parse(localStorage.getItem('sucursalSeleccion'));
    this.listarSeccion();
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarSeccion() {
    this.estudianteService.listarSeccion(this.sucursal).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsSeccionFilter = resp.aaData;
        this.lsSeccion = new MatTableDataSource<any>(this.lsSeccionFilter);
        this.lsSeccion.paginator = this.paginator;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsSeccion.filter = filterValue.trim().toLowerCase();
  }

  nuevaSeccion() {
    let indice = null;
    this.openModal(indice);
  }

  actualizarSeccion(seccion) {
    var tmp = Object.assign({}, seccion);
    tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(tmp);
  }

  eliminarSeccion(seccion) {
    var tmp = Object.assign({}, seccion);
    tmp.accion = Constantes.ELIMINAR;
    this.openModal(tmp);
  }

  getionEstudiante(seccion) {
    var tmp = Object.assign({}, seccion);
    tmp.accion = "GE";
    this.openModal(tmp);
  }

  gestionHorarioSeccion(seccion) {
    var tmp = Object.assign({}, seccion);
    tmp.accion = "HS";
    this.openModal(tmp);
  }

  public openModal(indice) {
    if (indice == null || indice.accion == Constantes.ACTUALIZAR) {
      this.modalRef = this.modalService.open(NuevaSeccionComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMD'
        })
      this.modalRef.componentInstance.input_seccion = indice;
    } else if (indice.accion == "GE") {
      this.modalRef = this.modalService.open(GestionSeccionEstudianteComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'lg'
        })
      this.modalRef.componentInstance.input_seccion = indice;
    } else if (indice.accion == "HS") {
      this.modalRef = this.modalService.open(HorarioSeccionComponent,
        {
          backdrop: 'static',
          keyboard: false,
         windowClass: 'modalLG'
        })
      this.modalRef.componentInstance.input_seccion = indice;
    }else {
      this.modalRef = this.modalService.open(ConfirmarSeccionComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_seccionDTO = indice;
    }
  }

}
