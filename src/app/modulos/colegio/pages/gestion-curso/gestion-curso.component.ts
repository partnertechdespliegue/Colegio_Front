import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ColegioService } from '../../services/colegio/colegio.service';
import Constantes from '../../../../models/Constantes';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Colegio } from '../../../../models/Colegio';
import { NuevoTipoCursoComponent } from './modals/nuevo-tipo-curso/nuevo-tipo-curso.component';
import { ConfirmarTipoCursoComponent } from './modals/confirmar-tipo-curso/confirmar-tipo-curso.component';
import { NuevoTemaComponent } from './modals/nuevo-tema/nuevo-tema.component';
import { ConfirmarTemaComponent } from './modals/confirmar-tema/confirmar-tema.component';
import { NuevoCursoComponent } from './modals/nuevo-curso/nuevo-curso.component';
import { ConfirmarCursoComponent } from './modals/confirmar-curso/confirmar-curso.component';
import { GestionTemarioComponent } from './modals/gestion-temario/gestion-temario.component';

@Component({
  selector: 'app-gestion-curso',
  templateUrl: './gestion-curso.component.html',
  styles: []
})
export class GestionCursoComponent implements OnInit, OnDestroy {
  @ViewChild('paglsCurso', { static: true }) paglsCurso: MatPaginator;
  @ViewChild('paglsTema', { static: true }) paglsTema: MatPaginator;
  @ViewChild('paglsTipoCurso', { static: true }) paglsTipoCurso: MatPaginator;

  modalRef: NgbModalRef;
  colegio : any = new Colegio();

  lsCurso = null;
  lsCursoFilter: any [] = [];
  lsTema = null;
  lsTemaFilter: any [] = [];
  lsTipoCurso = null;
  lsTipoCursoFilter: any [] = [];

  displayedColumns: string[] = [
    'descripcion',
    'horaSemanal',
    'nivelEducativo',
    'grado',
    'tipoCurso',
    // 'temario',
    'actualizar',
    'eliminar',
  ];

  displayed2Columns: string[] = [
    'descripcion',
    'tipoCurso',
    'actualizar',
    'eliminar',
  ];

  displayed3Columns: string[] = [
    'descripcion',
    'actualizar',
    'eliminar',
  ];

  constructor(
    public modalService: NgbModal,
    public colegioService: ColegioService
  ) { }

  ngOnInit() {
    this.colegio = JSON.parse(localStorage.getItem('colegioSeleccion'));
    if (this.colegio != null) {
      this.listarCurso();
      this.listarTema();
      this.listarTipoCurso();
    }
    // this.listarColegio();
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarCurso() {
    this.colegioService.listarCurso(this.colegio).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsCursoFilter = resp.aaData;
        this.lsCurso = new MatTableDataSource<any>(this.lsCursoFilter);
        this.lsCurso.paginator = this.paglsCurso;
      }
    })
  }

  listarTema() {
    this.colegioService.listarTema(this.colegio).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTemaFilter = resp.aaData;
        this.lsTema = new MatTableDataSource<any>(this.lsTemaFilter);
        this.lsTema.paginator = this.paglsTema;
      }
    })
  }

  listarTipoCurso() {
    this.colegioService.listarTipoCurso(this.colegio).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTipoCursoFilter = resp.aaData;
        this.lsTipoCurso = new MatTableDataSource<any>(this.lsTipoCursoFilter);
        this.lsTipoCurso.paginator = this.paglsTipoCurso;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsCurso.filter = filterValue.trim().toLowerCase();
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsTema.filter = filterValue.trim().toLowerCase();
  }

  applyFilter3(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsTipoCurso.filter = filterValue.trim().toLowerCase();
  }

  nuevoTipoCurso() {
    let indice = null;
    this.openModalTipoCurso(indice);
  }

  actualizarTipoCurso(tipoCurso) {
    var tmp = Object.assign({}, tipoCurso);
    tmp.accion = Constantes.ACTUALIZAR;
    this.openModalTipoCurso(tmp);
  }

  eliminarTipoCurso(tipoCurso) {
    var tmp = Object.assign({}, tipoCurso);
    tmp.accion = Constantes.ELIMINAR;
    this.openModalTipoCurso(tmp);
  }

  public openModalTipoCurso(indice) {
    if (indice == null || indice.accion == Constantes.ACTUALIZAR) {
      this.modalRef = this.modalService.open(NuevoTipoCursoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_tipoCurso = indice;
    } else {
      this.modalRef = this.modalService.open(ConfirmarTipoCursoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_tipoCurso = indice;
    }
  }

  nuevoTema() {
    let indice = null;
    this.openModalTema(indice);
  }

  actualizarTema(tema) {
    var tmp = Object.assign({}, tema);
    tmp.accion = Constantes.ACTUALIZAR;
    this.openModalTema(tmp);
  }

  eliminarTema(tema) {
    var tmp = Object.assign({}, tema);
    tmp.accion = Constantes.ELIMINAR;
    this.openModalTema(tmp);
  }

  public openModalTema(indice) {
    if (indice == null || indice.accion == Constantes.ACTUALIZAR) {
      this.modalRef = this.modalService.open(NuevoTemaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_tema = indice;
    } else {
      this.modalRef = this.modalService.open(ConfirmarTemaComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_tema = indice;
    }
  }

  nuevoCurso() {
    let indice = null;
    this.openModalCurso(indice);
  }

  actualizarCurso(curso) {
    var tmp = Object.assign({}, curso);
    tmp.accion = Constantes.ACTUALIZAR;
    this.openModalCurso(tmp);
  }

  eliminarCurso(curso) {
    var tmp = Object.assign({}, curso);
    tmp.accion = Constantes.ELIMINAR;
    this.openModalCurso(tmp);
  }

  gestionTemario(curso) {
    var tmp = Object.assign({}, curso);
    tmp.accion = "GT";
    this.openModalCurso(tmp);
  }

  public openModalCurso(indice) {
    if (indice == null || indice.accion == Constantes.ACTUALIZAR) {
      this.modalRef = this.modalService.open(NuevoCursoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          // windowClass: 'modalLG'
          windowClass: 'modalMD'
        })
      this.modalRef.componentInstance.input_curso = indice;
    } else if (indice.accion == "GT") {
      this.modalRef = this.modalService.open(GestionTemarioComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalSM'
        })
      this.modalRef.componentInstance.input_curso = indice;
    } else {
      this.modalRef = this.modalService.open(ConfirmarCursoComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_curso = indice;
    }
  }
}
