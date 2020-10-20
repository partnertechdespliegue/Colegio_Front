import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ColegioService } from '../../../../services/colegio/colegio.service';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Constantes from '../../../../../../models/Constantes';
import { Curso } from '../../../../../../models/Curso';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-temario',
  templateUrl: './gestion-temario.component.html',
  styles: []
})
export class GestionTemarioComponent implements OnInit, OnDestroy {

  @Input() input_curso;

  curso: any = new Curso();
  modalRef: NgbModalRef;
  lsTemario: any[] = [];
  lsTema: any[] = [];

  idTema;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public colegioService: ColegioService
  ) { }

  ngOnInit() {
    this.curso = this.input_curso;
    this.listarTemario();
    this.listarTema();
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarTema() {
    this.colegioService.listarTemaPorTipoCurso(this.curso.tipoCurso).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTema = resp.aaData;
      }
    })
  }

  listarTemario() {
    this.colegioService.listarTemario(this.curso).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTemario = resp.aaData;
      }
    })
  }

  validarNuevoTemario() {
    if (this.idTema != null) {
      for (const tmr of this.lsTemario) {
        if (tmr.tema.idTema == this.idTema) {
          Swal.fire({ title: "El tema ya fue agregado", timer: 1500, showConfirmButton: false });
          return;
        }
      }
      this.nuevoTemario()
    } else {
      Swal.fire({ title: "Debe escoger un tema primero", timer: 1500, showConfirmButton: false });
    }
  }

  nuevoTemario() {
    var dto = {
      "curso": this.curso,
      "tema": { "idTema": this.idTema }
    }
    this.colegioService.registrarTemario(dto).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.listarTemario();
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
  }

  eliminarTemario(temario) {
    this.colegioService.eliminarTemario(temario.idTemario).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        this.listarTemario();
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
      });
  }

  openModal(indice) {
    // this.modalRef = this.modalService.open(ConfirmarTurnoComponent,
    //   {
    //     backdrop: 'static',
    //     keyboard: false,
    //     size: 'sm'
    //   })
    // this.modalRef.componentInstance.input_curso = indice;
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
