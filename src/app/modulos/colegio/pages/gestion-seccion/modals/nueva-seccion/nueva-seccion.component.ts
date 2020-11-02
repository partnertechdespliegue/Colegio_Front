import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Seccion } from '../../../../../../models/Seccion';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EstudianteService } from '../../../../../estudiante/services/estudiante/estudiante.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmarSeccionComponent } from '../confirmar-seccion/confirmar-seccion.component';
import { NivelEducativo } from '../../../../../../models/NivelEducativo';
import { Grado } from '../../../../../../models/Grado';
import { ColegioService } from '../../../../services/colegio/colegio.service';
import { Colegio } from '../../../../../../models/Colegio';
import { Sucursal } from '../../../../../../models/Sucursal';
import { Turno } from '../../../../../../models/Turno';
import { Salon } from '../../../../../../models/Salon';
import Constantes from '../../../../../../models/Constantes';

@Component({
  selector: 'app-nueva-seccion',
  templateUrl: './nueva-seccion.component.html',
  styles: []
})
export class NuevaSeccionComponent implements OnInit, OnDestroy {

  @Input() input_seccion;

  modalRef: NgbModalRef;

  colegio: any = new Colegio();
  sucursal: any = new Sucursal()

  lsTurno: any[] = [];
  turno: Turno = new Turno();
  lsSalon: any[] = [];
  salon: Salon = new Salon();
  lsNivelEduc: any[] = [];
  seccion: any = new Seccion();
  nivelEduc: NivelEducativo = new NivelEducativo();
  lsGrado: any[] = [];
  grado: Grado = new Grado();

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public estudianteService: EstudianteService,
    public colegioService: ColegioService,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    this.colegio = JSON.parse(localStorage.getItem('colegioSeleccion'));
    this.sucursal = JSON.parse(localStorage.getItem('sucursalSeleccion'));

    this.listarTurno();
    this.listarSalon();
    this.listarNivelEducativo();

    if (this.input_seccion != null) {
      this.seccion = this.input_seccion;
      this.turno = this.seccion.turno;
      this.salon = this.seccion.salon;
      this.nivelEduc = this.seccion.nivelEducativo;
      this.listarGrado(this.nivelEduc.idNivelEducativo)
      this.grado = this.seccion.grado;
    }
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarTurno() {
    this.colegioService.listarTurno(this.sucursal).subscribe((resp: any) => {
      this.lsTurno = resp.aaData;
      if (this.lsTurno.length == 0) {
        this.toast.info("La sucursal no cuenta con turnos registrados", Constantes.INFO)
      }
    })
  }

  listarSalon() {
    this.colegioService.listarSalonPorTipo(this.sucursal, 2).subscribe((resp: any) => {
      this.lsSalon = resp.aaData;
      if (this.lsSalon.length == 0) {
        this.toast.info("La sucursal no cuenta con salones registrados", Constantes.INFO)
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

  openModalConfirmar() {
    this.modalRef = this.modalService.open(ConfirmarSeccionComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_seccionDTO = this.armarDTO();
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

  armarDTO(): any {
    return {
      "seccion": this.seccion,
      "sucursal" : this.sucursal,
      "turno":this.turno,
      "salon":this.salon,
      "nivelEducativo":this.nivelEduc,
      "grado":this.grado,
      "accion": this.seccion.accion
    };
  }

  asignarCapacidadSalon(idSalon){
    if (idSalon != null) {
      for (const sln of this.lsSalon) {
        if (sln.idSalon == idSalon) {
          this.seccion.capacidadSalon = sln.capacidad
          break;
        }
      }
    } else {
      this.seccion.capacidadSalon = null
    }
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
