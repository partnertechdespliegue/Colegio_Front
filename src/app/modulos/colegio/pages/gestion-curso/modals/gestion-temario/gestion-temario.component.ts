import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ColegioService } from '../../../../services/colegio/colegio.service';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Constantes from '../../../../../../models/Constantes';
import { Curso } from '../../../../../../models/Curso';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

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
    public colegioService: ColegioService,
    public toast: ToastrService
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
          this.toast.info("El tema ya fue agregado", Constantes.INFO)
          return;
        }
      }
      this.nuevoTemario()
    } else {
      this.toast.info("Debe escoger un tema primero", Constantes.INFO)
    }
  }

  nuevoTemario() {
    var dto = {
      "curso": this.curso,
      "tema": { "idTema": this.idTema }
    }
    this.colegioService.registrarTemario(dto).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.toast.success(resp.msg, Constantes.SUCCESS)
        this.listarTemario();
      } else { this.toast.error(resp.msg, Constantes.ERROR); }
    },
      (err) => {
        this.toast.error(err.status + " " + err.error.error, Constantes.ERROR);
      });
  }

  eliminarTemario(temario) {
    this.colegioService.eliminarTemario(temario.idTemario).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.toast.success(resp.msg, Constantes.SUCCESS)
        this.listarTemario();
      } else { this.toast.error(resp.msg, Constantes.ERROR); }
    },
      (err) => {
        this.toast.error(err.status + " " + err.error.error, Constantes.ERROR);
      });
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
