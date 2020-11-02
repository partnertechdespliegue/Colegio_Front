import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ColegioService } from '../../../../services/colegio/colegio.service';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmarCursoComponent } from '../confirmar-curso/confirmar-curso.component';
import { Curso } from '../../../../../../models/Curso';
import Swal from 'sweetalert2';
import { Colegio } from '../../../../../../models/Colegio';
import { TipoCurso } from '../../../../../../models/TipoCurso';
import { NivelEducativo } from '../../../../../../models/NivelEducativo';
import { Grado } from '../../../../../../models/Grado';
import { Tema } from '../../../../../../models/Tema';
import { ToastrService } from 'ngx-toastr';
import Constantes from '../../../../../../models/Constantes';

@Component({
  selector: 'app-nuevo-curso',
  templateUrl: './nuevo-curso.component.html',
  styles: []
})
export class NuevoCursoComponent implements OnInit, OnDestroy {

  @Input() input_curso;
  modalRef: NgbModalRef;

  curso: any = new Curso();
  colegio: any = new Colegio();
  lsTipoCurso: any[] = [];
  tipoCurso: TipoCurso = new TipoCurso();
  lsNivelEduc: any[] = [];
  nivelEduc: NivelEducativo = new NivelEducativo();
  lsGrado: any[] = [];
  grado: Grado = new Grado();
  lsTema: any[] = [];
  tema: Tema = new Tema();


  lsTemaTipoCurso: Tema[] = [];
  idTemaTipCu = null;
  lsTemaAgregado: Tema[] = [];
  lsProfesor = [{ "id": 1, "nombre": "El pepe" }, { "id": 2, "nombre": "Ete Sech" }]

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public colegioService: ColegioService,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    this.colegio = JSON.parse(localStorage.getItem('colegioSeleccion'));
    this.listarTipoCurso();
    this.listarNivelEducativo();
    if (this.input_curso != null) {
      this.curso = this.input_curso;
      this.tipoCurso = this.curso.tipoCurso;
      this.nivelEduc = this.curso.nivelEducativo;
      this.listarGrado(this.nivelEduc.idNivelEducativo);
      this.grado = this.curso.grado;
    }
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarTipoCurso() {
    this.colegioService.listarTipoCurso(this.colegio).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTipoCurso = resp.aaData;
      }
    })
  }

  listarTema() {
    this.colegioService.listarTema(this.colegio).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTema = resp.aaData;
      }
    })
  }

  listarNivelEducativo() {
    this.colegioService.listarNivelEducativo(this.colegio).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsNivelEduc = resp.aaData;
      }
    })
  }

  listarGrado(idNivEdu) {
    if (idNivEdu != null) {
      this.grado.idGrado = null;
      var nivEdu = { "idNivelEducativo": idNivEdu }
      this.colegioService.listarGrado(nivEdu).subscribe((resp: any) => {
        if (resp.estado == 1) {
          this.lsGrado = resp.aaData;
        }
      })
    } else {
      this.grado.idGrado = null;
      this.lsGrado = null;
    }
  }

  listarTemaPorTipoCurso(idTipCur) {
    if (idTipCur != null) {
      this.idTemaTipCu = null
      var tipoCurso = { "idTipoCurso": +idTipCur }
      this.colegioService.listarTemaPorTipoCurso(tipoCurso).subscribe((resp: any) => {
        if (resp.estado == 1) {
          this.lsTemaTipoCurso = resp.aaData;
        }
      })
    } else {
      this.idTemaTipCu = null
      this.lsTemaTipoCurso = []
      this.lsTemaAgregado = []
    }
  }

  openModalConfirmar() {
    this.modalRef = this.modalService.open(ConfirmarCursoComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_curso = this.curso;
    this.modalRef.componentInstance.input_tipoCurso = this.tipoCurso;
    this.modalRef.componentInstance.input_nivelEducativo = this.nivelEduc;
    this.modalRef.componentInstance.input_grado = this.grado;
    this.modalRef.componentInstance.input_lsTema = this.lsTemaAgregado;
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

  agregarTema() {
    if (this.idTemaTipCu != null) {
      for (let ta of this.lsTemaAgregado) {
        if (ta.idTema == this.idTemaTipCu) {
          this.toast.info("El tema ya fue agregado", Constantes.INFO)
          return;
        }
      }

      for (let t of this.lsTemaTipoCurso) {
        if (t.idTema == this.idTemaTipCu) {
          this.lsTemaAgregado.push(t)
          return;
        }
      }
    }
  }

  quitarTema(index) {
    this.lsTemaAgregado.splice(index, 1)
  }

  verificarNumero(valor): boolean {
    var tecla = (document.all) ? valor.keyCode : valor.which;
    if (tecla == 4) {
      return true;
    } else {
      var patron = /[0-9]/;
      var tecla_final = String.fromCharCode(tecla);
      if (!patron.test(tecla_final)) {
        this.toast.info("Solo se permiten caracteres numéricos", Constantes.INFO)
        return false;
      }
    }
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
