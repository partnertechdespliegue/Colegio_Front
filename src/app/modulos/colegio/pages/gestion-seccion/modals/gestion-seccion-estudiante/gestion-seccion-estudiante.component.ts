import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Seccion } from '../../../../../../models/Seccion';
import { EstudianteService } from '../../../../../estudiante/services/estudiante/estudiante.service';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Sucursal } from '../../../../../../models/Sucursal';
import { ToastrService } from 'ngx-toastr';
import Constantes from '../../../../../../models/Constantes';
import { ConfirmarSeccionEstudianteComponent } from '../confirmar-seccion-estudiante/confirmar-seccion-estudiante.component';

@Component({
  selector: 'app-gestion-seccion-estudiante',
  templateUrl: './gestion-seccion-estudiante.component.html',
  styles: []
})
export class GestionSeccionEstudianteComponent implements OnInit, OnDestroy {
  @ViewChild('paglsEstudiantesSinAsig', { static: true }) paglsEstudiantesSinAsig: MatPaginator;
  @ViewChild('paglsEstudiantesAsig', { static: true }) paglsEstudiantesAsig: MatPaginator;

  @Input() input_seccion;

  modalRef: NgbModalRef;
  seccion: any = new Seccion();
  sucursal: any = new Sucursal();

  pagSinAsig: boolean = true;
  pagAsig: boolean = false;

  lsEstudiantesAsig = null;
  lsEstudiantesAsigFilter: any[] = [];
  lsEstudiantesSinAsig = null;
  lsEstudiantesSinAsigFilter: any[] = [];

  lsEstudiante: any[] = [];
  lsSeccionEstudiante: any[] = [];

  displayedColumns: string[] = [
    'nomApe',
    'nroDoc',
    'opcion'
  ];

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public estudianteService: EstudianteService
  ) { }

  ngOnInit() {
    this.sucursal = JSON.parse(localStorage.getItem('sucursalSeleccion'));
    this.seccion = this.input_seccion

    this.listarEstudianteSinAsigSeccion();
    this.listarEstudianteAsigSeccion();
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarEstudianteSinAsigSeccion() {
    var dto = {
      "sucursal": this.sucursal,
      "seccion": this.seccion
    }

    this.estudianteService.listarEstudianteSinAsigSeccion(dto).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsEstudiantesSinAsigFilter = resp.aaData;
        this.lsEstudiantesSinAsigFilter.map((x) => {
          x.datos = x.nombres + ' ' + x.apePaterno + ' ' + x.apeMaterno;
        });
        this.lsEstudiantesSinAsig = new MatTableDataSource<any>(this.lsEstudiantesSinAsigFilter);
        this.lsEstudiantesSinAsig.paginator = this.paglsEstudiantesSinAsig;
      }
    })
  }

  listarEstudianteAsigSeccion() {
    this.estudianteService.listarEstudianteAsigSeccion(this.seccion).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsEstudiantesAsigFilter = resp.aaData;
        this.lsEstudiantesAsigFilter.map((x) => {
          x.datos = x.estudiante.nombres + ' ' + x.estudiante.apePaterno + ' ' + x.estudiante.apeMaterno;
          x.nroDoc = x.estudiante.nroDoc;
        });
        this.lsEstudiantesAsig = new MatTableDataSource<any>(this.lsEstudiantesAsigFilter);
        this.lsEstudiantesAsig.paginator = this.paglsEstudiantesAsig;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsEstudiantesSinAsig.filter = filterValue.trim().toLowerCase();
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsEstudiantesAsig.filter = filterValue.trim().toLowerCase();
  }

  gestionEstudiante(estado, estudiante) {
    if (estado) {
      this.lsEstudiante.push(estudiante)
    } else {
      var i = this.lsEstudiante.indexOf(estudiante);
      this.lsEstudiante.splice(i, 1);
    }
  }

  gestionSeccionEstudiante(estado, seccionEstudiante) {
    if (estado) {
      this.lsSeccionEstudiante.push(seccionEstudiante)
    } else {
      var i = this.lsSeccionEstudiante.indexOf(seccionEstudiante);
      this.lsSeccionEstudiante.splice(i, 1);
    }
  }

  registrarEstudianteSeccion() {
    var dto = {
      "seccion": this.seccion,
      "lsEstudiante": this.lsEstudiante,
      "accion": Constantes.REGISTRAR
    }
    this.openModalConfirmar(dto);
  }

  eliminarEstudianteSeccion() {
    var dto = {
      "lsSeccionEstudiante": this.lsSeccionEstudiante,
      "accion": Constantes.ELIMINAR
    }
    this.openModalConfirmar(dto);
  }

  openModalConfirmar(indice) {
    this.modalRef = this.modalService.open(ConfirmarSeccionEstudianteComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_seccionDTO = indice;
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }
}
