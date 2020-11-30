import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EstudianteService } from '../../../../../estudiante/services/estudiante/estudiante.service';
import { ToastrService } from 'ngx-toastr';
import Constantes from '../../../../../../models/Constantes';
import { ConfirmarAsistenciaEstudianteComponent } from '../confirmar-asistencia-estudiante/confirmar-asistencia-estudiante.component';
import { AsistenciaEstudiante } from '../../../../../../models/AsistenciaEstudiante';

@Component({
  selector: 'app-marcar-asistencia-estudiante',
  templateUrl: './marcar-asistencia-estudiante.component.html',
  styles: []
})
export class MarcarAsistenciaEstudianteComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @Input() input_horarioMaestro;

  modalRef: NgbModalRef;

  lsAsistEst = null;
  lsAsistEstFilter: any[] = [];

  horarioMaestro;

  displayedColumns: string[] = [
    'nomApe',
    'presente',
    'ausente',
    'tarde',
    'tardeexc',
    'salidatem',
    'descripcion'
  ];

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    private estudianteService: EstudianteService,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    this.horarioMaestro = this.input_horarioMaestro
    this.listarCurso();
  }

  listarCurso() {
    this.estudianteService.listarAsistenciaEstudiante(this.horarioMaestro).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsAsistEstFilter = resp.aaData;
        console.log(this.lsAsistEstFilter);
        this.lsAsistEst = new MatTableDataSource<any>(this.lsAsistEstFilter);
        this.lsAsistEst.paginator = this.paginator;
      }
    })
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  asignarTipoAsistencia(asistenciaEstudiante, id) {
    asistenciaEstudiante.tipoAsistencia = {
      "idTipoAsistencia": id
    }
    return asistenciaEstudiante;
  }

  marcarAsistencia() {
    var completo = true;
    for (const ae of this.lsAsistEstFilter) {
      if (ae.tipoAsistencia == null) {
        completo = false;
        break;
      }
    }
    if (completo) { this.openModal(); }
    else { this.toast.info("Debe seleccionar un tipo de asistencia para los estudiantes", Constantes.INFO); }
  }

  public openModal() {
    // if (indice.accion == "MA") {
    this.modalRef = this.modalService.open(ConfirmarAsistenciaEstudianteComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      })
    this.modalRef.componentInstance.input_lsAsistEst = this.lsAsistEstFilter;
    // }
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }
}
