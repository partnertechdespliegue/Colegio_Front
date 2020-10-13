import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Usuario } from '../../../../../../models/usuario.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Constantes from '../../../../../../models/Constantes';
import { Router } from '@angular/router';
import { NuevoUsuarioConfirmarComponent } from '../nuevo-usuario-confirmar/nuevo-usuario-confirmar.component';
import { RolService } from '../../../../services/roles/roles.service';
import { UsuarioService } from '../../../../services/usuarios/usuario.service';
import { URL_SERVICIOSBACK } from '../../../../../../config/config';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styles: []
})
export class NuevoUsuarioComponent implements OnInit {

  @Input() input_usuario_final;

  usuario: any = new Usuario();
  oldpass: string = "";
  confirm: string = "";
  lsPerfiles = [];
  lsEstado = []
  objUsuario_final = null;
  validar: boolean = true;
  rol: number = null;
  // public imagePath;
  // imgURL: any;
  // public fotoSeleccionada: File = null;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public router: Router,
    public _userService: UsuarioService,
    public _rolService: RolService
  ) { }

  ngOnInit() {
    this.listarValores();
    // this.porDefecto()
    if (this.input_usuario_final != null) {
      this.llenarValores();
      // if (this.input_usuario_final.foto != null) {
      //   this.imgURL = URL_SERVICIOSBACK + 'usuario/uploadImage/img/' + this.usuario.foto
      // } else {
      //   this.imgURL = "../../../../../../../assets/images/user-default.png";
      // }
    }
  }

  listarValores() {
    this.lsEstado = Constantes.ESTADO;
    this._rolService.listarPerfiles().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsPerfiles = resp.aaData;
      }
    })
  }

  llenarValores() {
    this.usuario = this.input_usuario_final;
    this.rol = this.input_usuario_final.perfil.idPerfil;
  }

  // porDefecto() {
  //   this.usuario.estado = true;
  //   this.fotoSeleccionada = new File([], 'default.jpg');
  // }

  // subirFoto(event) {
  //   var reader = new FileReader();
  //   this.fotoSeleccionada = event.target.files[0];
  //   this.imagePath = event.target.files;
  //   reader.readAsDataURL(this.fotoSeleccionada);
  //   reader.onload = (_event) => {
  //     this.imgURL = reader.result;
  //   }

  // }

  verificarContrasena(event) {
    if (event) {
      if (this.usuario.password == this.confirm) {
        this.validar = true;
      } else {
        this.validar = false;
      }
    } else {
      this.confirm = "";
      this.usuario.password = "";
      this.validar = true;
    }
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  confirmarNuevoUsuario() {
    this.openModalConfirmar();
  }

  public openModalConfirmar() {
    this.asignandoObjetos();
    const modalRef = this.modalService.open(NuevoUsuarioConfirmarComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    modalRef.componentInstance.input_usuario_final = this.objUsuario_final;
    // modalRef.componentInstance.input_foto = this.fotoSeleccionada;
    modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

  asignandoObjetos() {
    this.objUsuario_final = {
      "usuario": this.usuario,
      "perfil": {
        "idPerfil": this.rol
      }
    }
  }
}
