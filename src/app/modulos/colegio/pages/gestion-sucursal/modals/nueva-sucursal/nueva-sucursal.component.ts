import { ColegioService } from './../../../../services/colegio/colegio.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgbModalRef, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Sucursal } from '../../../../../../models/Sucursal';
import { ConfirmarSucursalComponent } from '../confirmar-sucursal/confirmar-sucursal.component';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { min, timestamp } from 'rxjs/operators';
import { UbigeoService } from '../../../../../estudiante/services/ubigeo/ubigeo.service';

@Component({
  selector: 'app-nueva-sucursal',
  templateUrl: './nueva-sucursal.component.html',
  styles: []
})
export class NuevaSucursalComponent implements OnInit, OnDestroy {

  @Input() input_sucursal;

  sucursal: any = new Sucursal();

  horaIni: string;
  horaFin: string;

  lsDepartamento: any[] = [];
  lsProvincia: any[] = [];
  lsDistrito: any[] = [];
  departamento: number = null;
  provincia: number = null;
  distrito: number = null;

  modalRef: NgbModalRef;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public router: Router,
    public colegioService: ColegioService,
    public ubigeoService: UbigeoService
  ) { }

  ngOnInit() {
    this.obtenerDepartamento();
    if (this.input_sucursal != null) {
      this.sucursal = this.input_sucursal;
      this.settearValores();
    }
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  settearValores() {
    this.departamento = this.sucursal.departamento.idDepartamento;
    this.obtenerProvincias(this.departamento);
    this.provincia = this.sucursal.provincia.idProvincia;
    this.obtenerDistrito(this.provincia);
    this.distrito = this.sucursal.distrito.idDistrito;
    this.horaIni = this.retornarHora(this.sucursal.horaInicioAtencion);
    this.horaFin = this.retornarHora(this.sucursal.horaFinAtencion);
  }

  retornarHora(hora) {
    var hr = new Date(hora);
    var h: number = hr.getHours() == 0 ? 24 : hr.getHours();
    var m: string = "" + hr.getMinutes();
    return (h > 12 ? (h - 12) : h) + ":" + (m.length == 1 ? "0" + m : m) + ((h >= 12 && h != 24) ? " PM" : " AM");
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  openModalConfirmar() {
    this.modalRef = this.modalService.open(ConfirmarSucursalComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_sucursalDTO = this.armarDTO();
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

  obtenerDepartamento() {
    this.ubigeoService.listarDepartamento().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsDepartamento = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  obtenerProvincias(departamento) {
    if (departamento == null) {
      this.provincia = null;
      this.distrito = null;
    } else {
      var tmp_depa = {
        "idDepartamento": departamento
      };
      this.ubigeoService.listarProvincia(tmp_depa).subscribe((resp: any) => {
        if (resp.estado == 1) {
          this.lsProvincia = resp.aaData;
        }
      },
        (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
    }
  }

  obtenerDistrito(provincia) {
    if (provincia == null) {
      this.distrito = null;
    } else {
      var tmp_prov = {
        "idProvincia": provincia
      }
      this.ubigeoService.listarDistrito(tmp_prov).subscribe((resp: any) => {
        if (resp.estado == 1) {
          this.lsDistrito = resp.aaData;
        }
      },
        (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
    }
  }

  armarDTO(): any {
    var colegio = JSON.parse(localStorage.getItem('colegioSeleccion'));
    return {
      "colegio": colegio,
      "sucursal": this.armarSucural(),
      "accion": this.sucursal.accion
    }
  }

  armarSucural() {
    return {
      "idSucursal": this.input_sucursal == null ? null : this.sucursal.idSucursal,
      "direccion": this.sucursal.direccion,
      "horaInicioAtencion": this.retornarDate(this.horaIni),
      "horaFinAtencion": this.retornarDate(this.horaFin),
      "departamento": {
        "idDepartamento": this.departamento
      },
      "provincia": {
        "idProvincia": this.provincia
      },
      "distrito": {
        "idDistrito": this.distrito
      }
    }
  }

  retornarDate(horaDate: string): Date {
    if (horaDate.length < 8) {
      horaDate = "0" + horaDate
    }
    var date: Date = new Date(2020, 0, 1);
    var hora: number = +horaDate.substr(0, 2);
    var minuto: number = +horaDate.substr(3, 2);
    if (horaDate.includes("12")) {
      if (horaDate.includes("AM")) {
        date.setHours(hora + 12, minuto, 0);
      } else {
        date.setHours(hora, minuto, 0);
      }
    } else if (horaDate.includes("AM")) {
      date.setHours(hora, minuto, 0);
    } else {
      date.setHours(hora + 12, minuto, 0);
    }
    return date;
  }

}
