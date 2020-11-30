import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Colegio } from '../../../../../../models/Colegio';
import { Sucursal } from '../../../../../../models/Sucursal';
import { NgbModalRef, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpleadoService } from '../../../../services/empleado/empleado.service';
import { ColegioService } from '../../../../../colegio/services/colegio/colegio.service';
import { UbigeoService } from '../../../../../estudiante/services/ubigeo/ubigeo.service';
import { ToastrService } from 'ngx-toastr';
import { TipoDoc } from '../../../../../../models/TipoDoc';
import { Distrito } from '../../../../../../models/Distrito';
import { Provincia } from '../../../../../../models/Provincia';
import { Departamento } from '../../../../../../models/Departamento';
import { Pais } from '../../../../../../models/Pais';
import { TipoZona } from '../../../../../../models/TipoZona';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { URL_SERVICIOSBACK } from '../../../../../../config/config';
import { ConfirmarEmpleadoComponent } from '../confirmar-empleado/confirmar-empleado.component';
import { Empleado } from '../../../../../../models/Empleado';
import { PuestoColegio } from '../../../../../../models/PuestoColegio';
import { DepartamentoColegio } from '../../../../../../models/DepartamentoColegio';
import { OrganigramaService } from '../../../../services/organigrama/organigrama.service';
import { Contrato } from '../../../../../../models/Contrato';
import { Banco } from '../../../../../../models/Banco';

@Component({
  selector: 'app-nuevo-empleado',
  templateUrl: './nuevo-empleado.component.html',
  styles: []
})
export class NuevoEmpleadoComponent implements OnInit, OnDestroy {

  @Input() input_empleado;

  tecla: any;
  modalRef: NgbModalRef;

  imgURL: any;
  tieneFoto: boolean;
  public fotoSeleccionada: File = null;

  empleado: any = new Empleado();
  contrato: any = new Contrato();
  colegio: Colegio = new Colegio();
  sucursal: Sucursal = new Sucursal();

  tipoDoc: TipoDoc = new TipoDoc();
  pais: Pais = new Pais();
  verPais = false;
  departamento: Departamento = new Departamento();
  provincia: Provincia = new Provincia();
  distrito: Distrito = new Distrito();
  tipoZona: TipoZona = new TipoZona();
  departamentoCole: DepartamentoColegio = new DepartamentoColegio();
  puestoCole: PuestoColegio = new PuestoColegio();
  banco: Banco = new Banco();

  minFecFin: any;
  fecFinDis = true;

  lsSucursal: any[] = [];
  // lsNivelEduc: any[] = [];
  // lsGrado: any[] = [];
  lsPais: any[] = [];
  lsDepartamento: any[] = [];
  lsProvincia: any[] = [];
  lsDistrito: any[] = [];
  lsTipoZona: any[] = [];
  lsTipoDoc: any[] = [];
  lsSexo: any[] = Constantes.sexo;
  lsDepartamentoCole: any[] = [];
  lsPuestoCole: any[] = [];
  lsTipoPago: any[] = Constantes.tipoPago
  lsBancoSueldo: any[] = []
  lsTipoCuenta: any[] = Constantes.tipoCuenta
  lsTipoMoneda: any[] = Constantes.tipoModena

  nroDocOk: number = 3;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public empleadoService: EmpleadoService,
    public colegioService: ColegioService,
    public ubigeoService: UbigeoService,
    public organigramaService: OrganigramaService,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    this.colegio = JSON.parse(localStorage.getItem('colegioSeleccion'));
    this.iniciarValores();
    if (this.input_empleado != null) {
      this.empleado = this.input_empleado;
      this.llenarInformacion();
    } else {
      this.empleado.nroHijo = 0;
      var scs = JSON.parse(localStorage.getItem('sucursalSeleccion'));
      if (scs != null) { this.sucursal = scs; }
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
    this.listarDepartamentoColegio();
    this.listarBanco();
    // this.listarNivelEducativo();
  }

  llenarInformacion() {
    this.sucursal = Object.assign({}, this.empleado.sucursal);
    this.tipoDoc = Object.assign({}, this.empleado.tipoDoc);
    this.revisarTipoDoc(this.tipoDoc.idTipoDoc);
    if (this.empleado.pais != null) {
      this.pais = Object.assign({}, this.empleado.pais);
    }
    this.departamento = Object.assign({}, this.empleado.departamento);
    this.listarProvincias(this.departamento.idDepartamento);
    this.provincia = Object.assign({}, this.empleado.provincia);
    this.listarDistrito(this.provincia.idProvincia);
    this.distrito = Object.assign({}, this.empleado.distrito);
    if (this.empleado.tipoZona != null) {
      this.tipoZona = Object.assign({}, this.empleado.tipoZona);
    }

    this.contrato = Object.assign({}, this.empleado.contrato);
    this.listarDepartamentoColegio();
    this.departamentoCole = Object.assign({}, this.contrato.departamentoColegio);
    this.listarPuestoColegio(this.departamentoCole.idDepartamentoColegio)
    this.puestoCole = Object.assign({}, this.contrato.puestoColegio);
    this.banco = Object.assign({}, this.contrato.bancoSueldo);
    this.fecFinDis = false;
  }

  listarSucursal() {
    this.colegioService.listarSucursal(this.colegio).subscribe((resp: any) => {
      this.lsSucursal = resp.aaData;
      if (this.lsSucursal.length == 0) {
        this.toast.info("El colegio no cuenta con ninguna sucursal registrada", Constantes.INFO)
      }
    })
  }

  listarTipoDocSinRuc() {
    this.empleadoService.listarTipoDocSinRuc().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTipoDoc = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
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
    this.provincia.idProvincia = null;
    this.distrito.idDistrito = null;
    // this.lsDistrito = [];
    if (idDepartamento != null) {
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
    this.distrito.idDistrito = null;
    if (idProvincia != null) {
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

  listarDepartamentoColegio() {
    this.organigramaService.listarDepartamento(this.colegio).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsDepartamentoCole = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  listarPuestoColegio(idDepartamento) {
    this.puestoCole.idPuestoColegio = null;
    if (idDepartamento != null) {
      var tmp_depa = {
        "idDepartamentoColegio": idDepartamento
      }
      this.organigramaService.listarPuestoPorDepartamento(tmp_depa).subscribe((resp: any) => {
        if (resp.estado == 1) {
          this.lsPuestoCole = resp.aaData;
          if (this.lsPuestoCole.length == 0) {
            this.toast.info("El departamento no cuenta con ningún puesto registrado", Constantes.INFO);
          }
        }
      },
        (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
    }
  }

  listarBanco() {
    this.empleadoService.listarBanco().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsBancoSueldo = resp.aaData;
      }
    },
      (err) => { Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error'); });
  }

  openModalConfirmar() {
    this.modalRef = this.modalService.open(ConfirmarEmpleadoComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_empleadoDTO = this.armarDTO();
    this.modalRef.componentInstance.input_fotoSeleccionada = this.fotoSeleccionada;
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

  armarDTO(): any {
    return {
      "empleado": this.empleado,
      "contrato": this.contrato,
      "colegio": this.colegio,
      "sucursal": this.sucursal,
      "tipoZona": this.tipoZona.idTipoZona == null ? null : this.tipoZona,
      "pais": this.pais.idPais == null ? null : this.pais,
      "tipoDoc": this.tipoDoc,
      "departamento": this.departamento,
      "provincia": this.provincia,
      "distrito": this.distrito,
      "departamentoColegio": this.departamentoCole,
      "puestoColegio": this.puestoCole,
      "bancoSueldo": this.banco
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

  eliminarFoto() {
    this.empleadoService.eliminarFotoEmpleado(this.empleado.idEmpleado).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.toast.success(resp.msg, Constantes.SUCCESS)
        this.empleado = resp.defaultObj
        this.empleado.accion = Constantes.ACTUALIZAR;
        this.cargarImgDefault()
      }
    })
  }

  cargarImgDefault() {
    this.cargarFoto();
    this.fotoSeleccionada = null;
  }

  cargarFoto() {
    if (this.empleado.foto != null) {
      this.imgURL = URL_SERVICIOSBACK + 'empleado/conseguirFoto/' + this.empleado.foto
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
          case 'dni': if (this.cantidadDigitos(this.empleado.nroDoc) == 8) {
            Swal.fire({ title: "El DNI no puede exceder de 8 digitos", timer: 2000, showConfirmButton: false });
            return false;
          } else { return true; }
          case 'cel': if (this.cantidadDigitos(this.empleado.nroCelular) == 9) {
            Swal.fire({ title: "El numero celular no puede exceder de 9 digitos", timer: 2000, showConfirmButton: false });
            return false;
          } else { return true; }
          case 'nrocta':
            if (this.contrato.nroCta.length == 4 || this.contrato.nroCta.length == 9 || this.contrato.nroCta.length == 14) {
              this.contrato.nroCta += "-"
            } else if (this.contrato.nroCta.length == 19) {
              Swal.fire({ title: "El numero de cuenta no puede exceder de 16 digitos", timer: 2000, showConfirmButton: false });
            } else { return true; }
        }
      }
    }
  }

  verificarDecimal(valor, campo) {
    this.tecla = (document.all) ? valor.keyCode : valor.which;
    if (this.tecla == 8) {
      return true;
    } else {
      var patron = /[0.0-9.0]/;
      var tecla_final = String.fromCharCode(this.tecla);

      if (!patron.test(tecla_final)) {
        Swal.fire({ title: "Valor inválido, ingrese solo números del 0 al 9", timer: 2000, showConfirmButton: false });
        return false;
      }
      // else {  //limites
      //   switch (campo) {
      //     case 'dni': if (this.cantidadDigitos(this.empleado.nroDoc) == 8) {
      //       Swal.fire({ title: "El DNI no puede exceder de 8 digitos", timer: 2000, showConfirmButton: false });
      //       return false;
      //     } else { return true; }
      //   }
      // }
    }
  }

  validarData(campo) {
    switch (campo) {
      case 'dni':
        var cant_dig = this.cantidadDigitos(this.empleado.nroDoc);
        if (cant_dig < 8 && this.empleado.nroDoc != null) {
          Swal.fire({ title: "DNI debe contener 8 digitos", timer: 2000, showConfirmButton: false });
          this.nroDocOk = 3;
          return false;
        } else if (cant_dig == 8) {
          this.empleadoService.existeEmpleadoPorNroDoc(this.empleado.nroDoc).subscribe((resp: boolean) => {
            if (resp) { this.nroDocOk = 2; return false;
            } else { this.nroDocOk = 1; return true; }
          });
        }
        break;

      case 'cel':
        var cant_dig = this.cantidadDigitos(this.empleado.nroCelular);
        if (cant_dig < 9 && this.empleado.nroCelular != null) {
          Swal.fire({ title: "Numero celular debe contener 9 digitos", timer: 2000, showConfirmButton: false });
          return false;
        } break;

      default:
        this.empleadoService.existeEmpleadoPorNroDoc(this.empleado.nroDoc).subscribe((resp: boolean) => {
          if (resp) {
            this.nroDocOk = 2; return false;
          } else { this.nroDocOk = 1; return true; }
        });
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
    if (!patron.test(valor) && this.empleado.correo != "" && this.empleado.correo != null) {
      Swal.fire({ title: "Correo inválido, formato de ejemlo: name@dir.do", timer: 2000, showConfirmButton: false });
    }
  }

  validarFechaFin(event) {
    if (event != null) {
      var mes = event.getMonth() + 1;
      this.minFecFin = `${event.getFullYear()}-${mes}-${event.getUTCDate()}`;
      this.fecFinDis = false;
    } else {
      this.fecFinDis = true;
    }
    this.contrato.fechaFin = null;
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
