import { Empleado } from './../../../../../../models/Empleado';
import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ColegioService } from '../../../../services/colegio/colegio.service';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmarCursoComponent } from '../confirmar-curso/confirmar-curso.component';
import { Curso } from '../../../../../../models/Curso';
import { Colegio } from '../../../../../../models/Colegio';
import { TipoCurso } from '../../../../../../models/TipoCurso';
import { NivelEducativo } from '../../../../../../models/NivelEducativo';
import { Grado } from '../../../../../../models/Grado';
import { Tema } from '../../../../../../models/Tema';
import { ToastrService } from 'ngx-toastr';
import Constantes from '../../../../../../models/Constantes';
import { EmpleadoService } from '../../../../../empleado/services/empleado/empleado.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-curso',
  templateUrl: './nuevo-curso.component.html',
  styles: []
})
export class NuevoCursoComponent implements OnInit, OnDestroy {
  @ViewChild('paglsMaestro', { static: true }) paglsMaestro: MatPaginator;
  @ViewChild('paglsTemario', { static: true }) paglsTemario: MatPaginator;

  @Input() input_curso;
  modalRef: NgbModalRef;

  curso: any = new Curso();
  maestro: any = new Empleado();
  colegio: any = new Colegio();
  lsTipoCurso: any[] = [];
  tipoCurso: TipoCurso = new TipoCurso();
  lsNivelEduc: any[] = [];
  nivelEduc: NivelEducativo = new NivelEducativo();
  lsGrado: any[] = [];
  grado: Grado = new Grado();
  tema: Tema = new Tema();

  lsTemaTipoCurso: Tema[] = [];
  idTemaTipCu = null;
  lsTemaAgregado: Tema[] = [];
  lsMaestro = null;
  lsMaestroFilter: any[] = [];

  displayedColumns: string[] = [
    'nomApe',
    'nroDoc',
    'asignar',
  ];

  lsTemario = null;
  lsTemarioFilter: any[] = [];
  idTema;

  displayed2Columns: string[] = [
    'tema',
    'eliminar'
  ];

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public colegioService: ColegioService,
    public empleadoService: EmpleadoService,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    this.colegio = JSON.parse(localStorage.getItem('colegioSeleccion'));
    this.listarTipoCurso();
    this.listarNivelEducativo();
    this.listarMaestro();
    if (this.input_curso != null) {
      this.curso = this.input_curso;
      this.tipoCurso = this.curso.tipoCurso;
      this.nivelEduc = this.curso.nivelEducativo;
      this.listarTemario();
      this.listarTemaPorTipoCurso(this.tipoCurso.idTipoCurso)
      this.listarGrado(this.nivelEduc.idNivelEducativo);
      this.grado = this.curso.grado;
      this.curso.empleado.datos =   this.curso.empleado.nombres + ' ' +  this.curso.empleado.apePaterno + ' ' +  this.curso.empleado.apeMaterno;
      this.maestro = this.curso.empleado
    }
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarMaestro() {
    this.empleadoService.listarMaestroPorColegio(this.colegio).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsMaestroFilter = resp.aaData;
        this.lsMaestroFilter.map((x) => {
          x.datos = x.nombres + ' ' + x.apePaterno + ' ' + x.apeMaterno;
        });
        this.lsMaestro = new MatTableDataSource<any>(this.lsMaestroFilter);
        this.lsMaestro.paginator = this.paglsMaestro;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsMaestro.filter = filterValue.trim().toLowerCase();
  }

  listarTipoCurso() {
    this.colegioService.listarTipoCurso(this.colegio).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTipoCurso = resp.aaData;
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
    this.modalRef.componentInstance.input_maestro = this.maestro;
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

  asignarMaestro(mae){
    this.maestro = mae;
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
        Swal.fire({ title: "Solo se permiten caracteres numéricos", timer: 2000, showConfirmButton: false });
        // this.toast.info("Solo se permiten caracteres numéricos", Constantes.INFO)
        return false;
      }
    }
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  listarTemario() {
    this.colegioService.listarTemario(this.curso).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTemarioFilter = resp.aaData;
        this.lsTemario = new MatTableDataSource<any>(this.lsTemarioFilter);
        this.lsTemario.paginator = this.paglsTemario;
      }
    })
  }

  validarNuevoTemario() {
    if (this.idTema != null) {
      for (const tmr of this.lsTemarioFilter) {
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

  validarTipoCurso(){
    if (this.tipoCurso.idTipoCurso == null) {
      this.toast.info("Debe seleccionar un tipo de curso primero", Constantes.INFO)
    }
  }
}
