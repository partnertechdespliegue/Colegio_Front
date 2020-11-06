import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ParametroService } from '../../services/parametro/parametro.service';
import { Colegio } from '../../../../models/Colegio';
import { MatTableDataSource } from '@angular/material/table';
import Constantes from '../../../../models/Constantes';
import { NuevoParametroComponent } from './modals/nuevo-parametro/nuevo-parametro.component';

@Component({
  selector: 'app-gestion-parametro',
  templateUrl: './gestion-parametro.component.html',
  styles: []
})
export class GestionParametroComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  modalRef: NgbModalRef;

  lsParamatro = null;
  lsParamatroFilter: any[] = [];
  colegio: any = new Colegio();

  displayedColumns: string[] = [
    'descripcion',
    'valor',
    'actualizar',
  ];

  constructor(
    public modalService: NgbModal,
    public parametroService: ParametroService) { }

  ngOnInit() {
    this.colegio = JSON.parse(localStorage.getItem('colegioSeleccion'));
    if (this.colegio != null) {
      this.listarParametro();
    }
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarParametro() {
    this.parametroService.listarParametro(this.colegio).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsParamatroFilter = resp.aaData;
        this.lsParamatro = new MatTableDataSource<any>(this.lsParamatroFilter);
        this.lsParamatro.paginator = this.paginator;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsParamatro.filter = filterValue.trim().toLowerCase();
  }

  actualizarParametro(parametro) {
    var tmp = Object.assign({}, parametro);
    tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(tmp);
  }

  public openModal(indice) {
    if (indice == null || indice.accion == Constantes.ACTUALIZAR) {
      this.modalRef = this.modalService.open(NuevoParametroComponent,
        {
          backdrop: 'static',
          keyboard: false,
          size: 'sm'
        })
      this.modalRef.componentInstance.input_parametro = indice;
    }
  }
}
