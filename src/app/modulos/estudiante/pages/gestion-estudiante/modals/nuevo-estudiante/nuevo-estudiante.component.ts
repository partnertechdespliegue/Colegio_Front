import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { EstudianteService } from '../../../../services/estudiante/estudiante.service';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ColegioService } from '../../../../../colegio/services/colegio/colegio.service';
import Constantes from '../../../../../../models/Constantes';
import { Estudiante } from '../../../../../../models/Estudiante';
import { Pais } from '../../../../../../models/Pais';
import { TipoDoc } from '../../../../../../models/TipoDoc';
import { TipoZona } from '../../../../../../models/TipoZona';
import { Departamento } from '../../../../../../models/Departamento';
import { Provincia } from '../../../../../../models/Provincia';
import { Distrito } from '../../../../../../models/Distrito';
import { ConfirmarEstudianteComponent } from '../confirmar-estudiante/confirmar-estudiante.component';
import { URL_SERVICIOSBACK } from '../../../../../../config/config';
import { Sucursal } from '../../../../../../models/Sucursal';
import { Colegio } from '../../../../../../models/Colegio';
import { ToastrService } from 'ngx-toastr';
import { UbigeoService } from '../../../../services/ubigeo/ubigeo.service';
import { Grado } from '../../../../../../models/Grado';
import { NivelEducativo } from '../../../../../../models/NivelEducativo';

@Component({
  selector: 'app-nuevo-estudiante',
  templateUrl: './nuevo-estudiante.component.html',
  styles: []
})
export class NuevoEstudianteComponent implements OnInit, OnDestroy {

  @Input() input_estudiante;

  tecla: any;
  modalRef: NgbModalRef;

  imgURL: any;
  tieneFoto: boolean;
  public fotoSeleccionada: File = null;

  estudiante: any = new Estudiante();
  colegio: Colegio = new Colegio();
  sucursal: Sucursal = new Sucursal();
  tipoDoc: TipoDoc = new TipoDoc();
  pais: Pais = new Pais();
  verPais = false;
  departamento: Departamento = new Departamento();
  provincia: Provincia = new Provincia();
  distrito: Distrito = new Distrito();
  tipoZona: TipoZona = new TipoZona();
  nivelEduc: NivelEducativo = new NivelEducativo();
  grado: Grado = new Grado();

  lsSucursal: any[] = [];
  lsNivelEduc: any[] = [];
  lsGrado: any[] = [];
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
    if (this.input_estudiante != null) {
      this.estudiante = this.input_estudiante;
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
    this.listarNivelEducativo();
  }

  llenarInformacion() {
    this.sucursal = Object.assign({}, this.estudiante.sucursal);
    this.nivelEduc = Object.assign({}, this.estudiante.nivelEducativo);
    this.listarGrado(this.nivelEduc.idNivelEducativo);
    this.grado = Object.assign({}, this.estudiante.grado);
    this.tipoDoc = Object.assign({}, this.estudiante.tipoDoc);
    this.revisarTipoDoc(this.tipoDoc.idTipoDoc);
    if (this.estudiante.pais != null) {
      this.pais = Object.assign({}, this.estudiante.pais);
    }
    this.departamento = Object.assign({}, this.estudiante.departamento);
    this.listarProvincias(this.departamento.idDepartamento);
    this.provincia = Object.assign({}, this.estudiante.provincia);
    this.listarDistrito(this.provincia.idProvincia);
    this.distrito = Object.assign({}, this.estudiante.distrito);
    if (this.estudiante.tipoZona != null) {
      this.tipoZona = Object.assign({}, this.estudiante.tipoZona);
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
    this.modalRef = this.modalService.open(ConfirmarEstudianteComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_estudianteDTO = this.armarDTO();
    this.modalRef.componentInstance.input_fotoSeleccionada = this.fotoSeleccionada;
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

  armarDTO(): any {
    return {
      "estudiante": this.estudiante,
      "colegio": this.colegio,
      "sucursal": this.sucursal,
      "nivelEducativo":this.nivelEduc,
      "grado":this.grado,
      "tipoZona": this.tipoZona.idTipoZona == null ? null : this.tipoZona,
      "pais": this.pais.idPais == null ? null : this.pais,
      "tipoDoc": this.tipoDoc,
      "departamento": this.departamento,
      "provincia": this.provincia,
      "distrito": this.distrito,
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
    this.estudianteService.eliminarFotoEstudiante(this.estudiante.idEstudiante).subscribe((resp:any) => {
      if (resp.estado == 1) {
        this.toast.success(resp.msg, Constantes.SUCCESS)
        this.estudiante = resp.defaultObj;
        this.cargarImgDefault()
      }
    })
  }

  cargarImgDefault() {
    this.cargarFoto();
    this.fotoSeleccionada = null;
  }

  cargarFoto() {
    if (this.estudiante.foto != null) {
      this.imgURL = URL_SERVICIOSBACK + 'estudiante/conseguirFoto/' + this.estudiante.foto
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
          case 'dni': if (this.cantidadDigitos(this.estudiante.nroDoc) == 8) {
            Swal.fire({ title: "El DNI no puede exceder de 8 digitos", timer: 2000, showConfirmButton: false });
            return false;
          } else { return true; }
          case 'cel': if (this.cantidadDigitos(this.estudiante.nroCelular) == 9) {
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
        var cant_dig = this.cantidadDigitos(this.estudiante.nroDoc);
        if (cant_dig < 8 && this.estudiante.nroDoc != null) {
          Swal.fire({ title: "DNI debe contener 8 digitos", timer: 2000, showConfirmButton: false });
          return false;
        }
        break;
      case 'cel': var cont = 0; var cant_dig = this.cantidadDigitos(this.estudiante.nroCelular);
        if (cant_dig < 9 && this.estudiante.nroCelular != null) {
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
    if (!patron.test(valor) && this.estudiante.correo != "" && this.estudiante.correo != null) {
      Swal.fire({ title: "Correo inválido, formato de ejemlo: name@dir.do", timer: 2000, showConfirmButton: false });
    }
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
