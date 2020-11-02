import { EstudianteService } from './../../../../services/estudiante/estudiante.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { ConfirmarApoderadoComponent } from '../confirmar-apoderado/confirmar-apoderado.component';
import { Colegio } from '../../../../../../models/Colegio';
import { Sucursal } from '../../../../../../models/Sucursal';
import { TipoDoc } from '../../../../../../models/TipoDoc';
import { Pais } from '../../../../../../models/Pais';
import { Departamento } from '../../../../../../models/Departamento';
import { NgbModalRef, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Provincia } from '../../../../../../models/Provincia';
import { Distrito } from '../../../../../../models/Distrito';
import { TipoZona } from '../../../../../../models/TipoZona';
import { ColegioService } from '../../../../../colegio/services/colegio/colegio.service';
import { UbigeoService } from '../../../../services/ubigeo/ubigeo.service';
import { ToastrService } from 'ngx-toastr';
import { URL_SERVICIOSBACK } from '../../../../../../config/config';
import { Apoderado } from '../../../../../../models/Apoderado';

@Component({
  selector: 'app-nuevo-apoderado',
  templateUrl: './nuevo-apoderado.component.html',
  styles: []
})
export class NuevoApoderadoComponent implements OnInit, OnDestroy {

  @Input() input_apoderado;

  tecla: any;
  modalRef: NgbModalRef;

  imgURL: any;
  tieneFoto: boolean;
  public fotoSeleccionada: File = null;

  apoderado: any = new Apoderado();
  colegio: Colegio = new Colegio();
  sucursal: Sucursal = new Sucursal();
  tipoDoc: TipoDoc = new TipoDoc();
  pais: Pais = new Pais();
  verPais = false;
  departamento: Departamento = new Departamento();
  provincia: Provincia = new Provincia();
  distrito: Distrito = new Distrito();
  tipoZona: TipoZona = new TipoZona();

  lsSucursal: any[] = [];
  lsPais: any[] = [];
  lsDepartamento: any[] = [];
  lsProvincia: any[] = [];
  lsDistrito: any[] = [];
  lsTipoZona: any[] = [];
  lsTipoDoc: any[] = [];
  lsSexo: any[] = Constantes.sexo;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public estudianteService: EstudianteService,
    public colegioService: ColegioService,
    public ubigeoService: UbigeoService,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    this.colegio = JSON.parse(localStorage.getItem('colegioSeleccion'));
    this.iniciarValores();
    if (this.input_apoderado != null) {
      this.apoderado = this.input_apoderado;
      this.llenarInformacion();
    } else {
      var scs = JSON.parse(localStorage.getItem('sucursalSeleccion'));
      if (scs != null) {this.sucursal = scs;}
    }
    this.cargarFoto();
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  iniciarValores() {
    this.listarTipoDocSinRuc();
    this.listarPais()
    this.listarDepartamento();
    this.listarTipoZona();
    this.listarSucursal();
  }

  llenarInformacion() {
    this.sucursal = Object.assign({}, this.apoderado.sucursal);
    this.tipoDoc = Object.assign({}, this.apoderado.tipoDoc);
    this.revisarTipoDoc(this.tipoDoc.idTipoDoc);
    if (this.apoderado.pais != null) {
      this.pais = Object.assign({}, this.apoderado.pais);
    }
    this.departamento = Object.assign({}, this.apoderado.departamento);
    this.listarProvincias(this.departamento.idDepartamento);
    this.provincia = Object.assign({}, this.apoderado.provincia);
    this.listarDistrito(this.provincia.idProvincia);
    this.distrito = Object.assign({}, this.apoderado.distrito);
    if (this.apoderado.tipoZona != null) {
      this.tipoZona = Object.assign({}, this.apoderado.tipoZona);
    }
  }

  listarSucursal() {
    this.colegioService.listarSucursal(this.colegio).subscribe((resp:any) => {
      this.lsSucursal = resp.aaData;
    })
  }

  revisarTipoDoc(idTipoDoc) {
    if (idTipoDoc == 3) {
      this.verPais = true;
    } else {
      this.verPais = false;
    }
  }

  listarDepartamento() {
    this.ubigeoService.listarDepartamento().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsDepartamento = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  listarProvincias(idDepartamento) {
    if (idDepartamento == null) {
      this.provincia.idProvincia = null;
      this.distrito.idDistrito = null;
    } else {
      var tmp_depa = {
        "idDepartamento": idDepartamento
      };
      this.ubigeoService.listarProvincia(tmp_depa).subscribe((resp: any) => {
        if (resp.estado == 1) {
          this.lsProvincia = resp.aaData;
        }
      },
        (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
    }
  }

  listarDistrito(idProvincia) {
    if (idProvincia == null) {
      this.distrito.idDistrito = null;
    } else {
      var tmp_prov = {
        "idProvincia": idProvincia
      }
      this.ubigeoService.listarDistrito(tmp_prov).subscribe((resp: any) => {
        if (resp.estado == 1) {
          this.lsDistrito = resp.aaData;
        }
      },
        (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
    }
  }

  listarTipoZona() {
    this.ubigeoService.listarTipoZona().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTipoZona = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  listarPais() {
    this.ubigeoService.listarPais().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsPais = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  listarTipoDocSinRuc() {
    this.estudianteService.listarTipoDocSinRuc().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTipoDoc = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  openModalConfirmar() {
    this.modalRef = this.modalService.open(ConfirmarApoderadoComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_apoderadoDTO = this.armarDTO();
    this.modalRef.componentInstance.input_fotoSeleccionada = this.fotoSeleccionada;
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

  armarDTO(): any {
    return {
      "apoderado": this.apoderado,
      "colegio": this.colegio,
      "sucursal": this.sucursal,
      "tipoZona": this.tipoZona.idTipoZona == null ? null : this.tipoZona,
      "pais": this.pais.idPais == null ? null : this.pais,
      "tipoDoc": this.tipoDoc,
      "departamento": this.departamento,
      "provincia": this.provincia,
      "distrito": this.distrito
    }
  }

  escogerFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.fotoSeleccionada);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  eliminarFoto(){
    this.estudianteService.eliminarFotoEstudiante(this.apoderado.idEstudiante).subscribe((resp:any) => {
      if (resp.estado == 1) {
        this.toast.success(resp.msg, Constantes.SUCCESS)
        this.apoderado = resp.defaultObj;
        this.cargarImgDefault()
      }
    })
  }

  cargarImgDefault() {
    this.cargarFoto();
    this.fotoSeleccionada = null;
  }

  cargarFoto() {
    if (this.apoderado.foto != null) {
      this.imgURL = URL_SERVICIOSBACK + 'apoderado/conseguirFoto/' + this.apoderado.foto
      this.tieneFoto = true;
    } else {
      this.imgURL = "/assets/images/user-default.png";
      this.tieneFoto = false;
    }
  }

  verificarString(valor) {
    this.tecla = (document.all) ? valor.keyCode : valor.which;
    if (this.tecla == 8 || this.tecla == 32) {
      return true;
    } else {
      var patron = /[A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙñÑ]/;
      var tecla_final = String.fromCharCode(this.tecla);
      if (!patron.test(tecla_final)) {
        Swal.fire({ title: "Valor inválido, no ingrese caracteres especiales", timer: 2000, showConfirmButton: false });
        return false;
      } else {
        return true;
      }
    }
  }

  verificarNumero(valor, campo) {
    this.tecla = (document.all) ? valor.keyCode : valor.which;
    if (this.tecla == 8) {
      return true;
    } else {
      var patron = /[0-9]/;
      var tecla_final = String.fromCharCode(this.tecla);

      if (!patron.test(tecla_final)) {
        Swal.fire({ title: "Valor inválido, ingrese solo números del 0 al 9", timer: 2000, showConfirmButton: false });
        return false;
      } else {  //limites
        switch (campo) {
          case 'dni': if (this.cantidadDigitos(this.apoderado.nroDoc) == 8) {
            Swal.fire({ title: "El DNI no puede exceder de 8 digitos", timer: 2000, showConfirmButton: false });
            return false;
          } else { return true; }
          case 'cel': if (this.cantidadDigitos(this.apoderado.nroCelular) == 9) {
            Swal.fire({ title: "El numero celular no puede exceder de 9 digitos", timer: 2000, showConfirmButton: false });
            return false;
          } else { return true; }
        }
      }
    }
  }

  validarData(campo) {
    switch (campo) {
      case 'dni':
        var cont = 0;
        var cant_dig = this.cantidadDigitos(this.apoderado.nroDoc);
        if (cant_dig < 8 && this.apoderado.nroDoc != null) {
          Swal.fire({ title: "DNI debe contener 8 digitos", timer: 2000, showConfirmButton: false });
          return false;
        }
        break;
      case 'cel': var cont = 0; var cant_dig = this.cantidadDigitos(this.apoderado.nroCelular);
        if (cant_dig < 9 && this.apoderado.nroCelular != null) {
          Swal.fire({ title: "Numero celular debe contener 9 digitos", timer: 2000, showConfirmButton: false });
          return false;
        } break;
    }
  }

  cantidadDigitos(valor): number {
    var cont = 0;
    while (valor >= 1) {
      valor = valor / 10;
      cont++;
    }
    return cont;
  }

  verificarCorreo(valor) {
    var patron = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})/
    if (!patron.test(valor) && this.apoderado.correo != "" && this.apoderado.correo != null) {
      Swal.fire({ title: "Correo inválido, formato de ejemlo: name@dir.do", timer: 2000, showConfirmButton: false });
    }
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
