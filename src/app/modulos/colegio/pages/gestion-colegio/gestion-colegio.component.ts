import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColegioService } from './../../services/colegio/colegio.service';
import { MatTableDataSource } from '@angular/material/table';
import Constantes from '../../../../models/Constantes';
import { NuevoColegioComponent } from './modals/nuevo-colegio/nuevo-colegio.component';
import { ConfirmarColegioComponent } from './modals/confirmar-colegio/confirmar-colegio.component';

@Component({
  selector: 'app-gestion-colegio',
  templateUrl: './gestion-colegio.component.html',
  styles: []
})
export class GestionColegioComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  lsColegio = null;
  lsColegioFilter: any[] = [];
  modalRef: NgbModalRef;

  displayedColumns: string[] = [
    'nombre',
    'codUgel',
    'actualizar',
    'eliminar',
  ];

  constructor(
    public modalService: NgbModal,
    public colegioService: ColegioService
  ) { }

  ngOnInit() {
    this.listarColegio();
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarColegio() {
    this.colegioService.listarColegio().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsColegioFilter = resp.aaData;
        this.lsColegio = new MatTableDataSource<any>(this.lsColegioFilter);
        this.lsColegio.paginator = this.paginator;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsColegio.filter = filterValue.trim().toLowerCase();
  }

  nuevoColegio() {
    let indice = null;
    this.openModal(indice);
  }

  actualizarColegio(colegio) {
    var tmp = Object.assign({}, colegio);
    tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(tmp);
  }

  eliminarColegio(colegio) {
    var tmp = Object.assign({}, colegio);
    tmp.accion = Constantes.ELIMINAR;
    this.openModal(tmp);
  }

  public openModal(indice) {
    if (indice == null || indice.accion == Constantes.ACTUALIZAR) {
      this.modalRef = this.modalService.open(NuevoColegioComponent,
        {
          backdrop: 'static',
          keyboard: false,
          windowClass: 'modalMD'
        })
      this.modalRef.componentInstance.input_colegio = indice;
    } else {
      this.modalRef = this.modalService.open(ConfirmarColegioComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_colegio = indice;
    }
  }
}
