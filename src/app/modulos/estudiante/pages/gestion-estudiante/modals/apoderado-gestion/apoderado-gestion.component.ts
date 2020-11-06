import { EstudianteService } from './../../../../services/estudiante/estudiante.service';
import { Estudiante } from './../../../../../../models/Estudiante';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbModalRef, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Constantes from '../../../../../../models/Constantes';
import { Apoderado } from '../../../../../../models/Apoderado';
import { NuevaRelacionComponent } from '../nueva-relacion/nueva-relacion.component';
import { ConfirmarRelacionComponent } from '../confirmar-relacion/confirmar-relacion.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-apoderado-gestion',
  templateUrl: './apoderado-gestion.component.html',
  styles: []
})
export class ApoderadoGestionComponent implements OnInit, OnDestroy {

  @Input() input_estudiante;
  @Input() input_apoderado;

  modalRef: NgbModalRef;

  lsRelacion = null;
  lsRelacionFilter: any[] = [];
  estudiante: any = new Estudiante();
  apoderado: any = new Apoderado();

  displayedColumns: string[] = [
    'tipRelacion',
    'nomApe',
    'nroDoc',
    'nroCelular',
    'eliminar'
  ];

  displayed2Columns: string[] = [
    'tipRelacion',
    'nomApe',
    'nroDoc',
    'eliminar'
  ];

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public estudianteService: EstudianteService
  ) { }

  ngOnInit() {
    if (this.input_estudiante != null) {
      this.estudiante = this.input_estudiante;
      this.listarRelacionPorEstudiante();
    }

    if (this.input_apoderado != null) {
      this.apoderado = this.input_apoderado;
      this.listarRelacionPorApoderado();
    }
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarRelacionPorEstudiante() {
    this.estudianteService.listarRelacionPorEstudiante(this.estudiante).subscribe((resp: any) => {
      this.lsRelacionFilter = resp.aaData;
      this.lsRelacion = new MatTableDataSource<any>(this.lsRelacionFilter);
    })
  }

  listarRelacionPorApoderado() {
    this.estudianteService.listarRelacionPorApoderado(this.apoderado).subscribe((resp: any) => {
      this.lsRelacionFilter = resp.aaData;
      this.lsRelacion = new MatTableDataSource<any>(this.lsRelacionFilter);
    })
  }

  nuevoRelacion() {
    let indice = null;
    this.openModal(indice);
  }

  eliminarRelacion(relacion) {
    var tmp = Object.assign({}, relacion);
    tmp.accion = Constantes.ELIMINAR;
    this.openModal(tmp);
  }

  openModal(indice) {
    if (indice == null) {
      this.modalRef = this.modalService.open(NuevaRelacionComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMD'
        })
      if (this.input_estudiante != null) {
        this.modalRef.componentInstance.input_estudiante = this.estudiante;
      } else {
        this.modalRef.componentInstance.input_apoderado = this.apoderado;
      }
    } else {
      this.modalRef = this.modalService.open(ConfirmarRelacionComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
        this.modalRef.componentInstance.input_relacionDTO = indice;

    }
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }
}
