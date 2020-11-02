import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Apoderado } from '../../../../../../models/Apoderado';
import { Estudiante } from '../../../../../../models/Estudiante';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Colegio } from '../../../../../../models/Colegio';
import { EstudianteService } from '../../../../services/estudiante/estudiante.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TipoRelacion } from '../../../../../../models/TipoRelacion';
import { ConfirmarRelacionComponent } from '../confirmar-relacion/confirmar-relacion.component';

@Component({
  selector: 'app-nueva-relacion',
  templateUrl: './nueva-relacion.component.html',
  styles: []
})
export class NuevaRelacionComponent implements OnInit, OnDestroy {
  @ViewChild('paglsEstudiante', { static: true }) paglsEstudiante: MatPaginator;
  @ViewChild('paglsApoderado', { static: true }) paglsApoderado: MatPaginator;

  @Input() input_estudiante;
  @Input() input_apoderado;

  modalRef: NgbModalRef;
  displayedColumns: string[] = [
    'nomApe',
    'nroDoc',
    'asignar',
  ];

  colegio: Colegio = new Colegio();
  lsEstudiante = null;
  lsEstudianteFilter: any[] = [];
  lsApoderado = null;
  lsApoderadoFilter: any[] = [];
  lsTipoRelacion: any[] = [];

  estudiante: any = new Estudiante();
  apoderado: any = new Apoderado();
  tipoRelacion: TipoRelacion = new TipoRelacion();

  estudianteEscogido: any = new Estudiante();
  apoderadoEscogido: any = new Apoderado();

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public estudianteService: EstudianteService,
  ) { }

  ngOnInit() {
    this.colegio = JSON.parse(localStorage.getItem('colegioSeleccion'));
    this.listarTipoRelacion();
    if (this.input_estudiante != null) {
      this.estudiante = this.input_estudiante
      this.listarApoderado()
    }

    if (this.input_apoderado != null) {
      this.apoderado = this.input_apoderado
      this.listarEstudiante()
    }
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarEstudiante() {
    this.estudianteService.listarEstudiantePorColegio(this.colegio).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsEstudianteFilter = resp.aaData;
        this.lsEstudianteFilter.map((x) => {
          x.datos = x.nombres + ' ' + x.apePaterno + ' ' + x.apeMaterno;
        });
        this.lsEstudiante = new MatTableDataSource<any>(this.lsEstudianteFilter);
        this.lsEstudiante.paginator = this.paglsEstudiante;
      }
    })
  }

  listarApoderado() {
    this.estudianteService.listarApoderadoPorColegio(this.colegio).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsApoderadoFilter = resp.aaData;
        this.lsApoderadoFilter.map((x) => {
          x.datos = x.nombres + ' ' + x.apePaterno + ' ' + x.apeMaterno;
        });
        this.lsApoderado = new MatTableDataSource<any>(this.lsApoderadoFilter);
        this.lsApoderado.paginator = this.paglsApoderado;
      }
    })
  }

  listarTipoRelacion(){
    this.estudianteService.listarTipoRelacion(this.colegio).subscribe((resp: any) => {
      this.lsTipoRelacion = resp.aaData;
    })
  }

  applyFilter(event: Event) {
    if (this.estudiante.idEstudiante != null) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.lsApoderado.filter = filterValue.trim().toLowerCase();
    } else {
      const filterValue = (event.target as HTMLInputElement).value;
      this.lsEstudiante.filter = filterValue.trim().toLowerCase();
    }
  }

  asignarEstudiante(est) {
    this.estudianteEscogido = est
  }

  asignarApoderado(apo) {
    this.apoderadoEscogido = apo
  }

  openModalConfirmar() {
    this.modalRef = this.modalService.open(ConfirmarRelacionComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_relacionDTO = this.armarDTO();
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

  armarDTO(){
    return {
      "tipoRelacion": this.tipoRelacion,
      "estudiante": this.estudiante.idEstudiante != null ? this.estudiante : this.estudianteEscogido,
      "apoderado": this.apoderado.idApoderado != null ? this.apoderado : this.apoderadoEscogido,
      "accion": this.estudiante.idEstudiante != null ? "A" : "E"
    }
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }
}
