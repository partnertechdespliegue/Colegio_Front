import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Usuario } from "../models/usuario.model";
import Swal from "sweetalert2";
import Constantes from "../models/Constantes";
import { UsuarioService } from "../modulos/administracion/services/usuarios/usuario.service";
import { Empresa } from "../models/Empresa";

declare function init_plugins();
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  usuario: Usuario = new Usuario();
  token: any;
  error: string;
  loadRegister: boolean;
  ipPublica: string;
  mostrarPassword: false;

  constructor(public router: Router, public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.token = localStorage.getItem("token");
    this.loadRegister = false;

    if (this.token) {
      this.router.navigate(["/inicio"]);
    }
  }

  login() {
    this._usuarioService.login(this.usuario).subscribe((data: any) => {
      localStorage.setItem("InfoToken", JSON.stringify(data));
      this.router.navigate(["/inicio"]);
    },
      (err) => {
        if (err.status == 400) {
          Swal.fire(Constantes.ERROR, err.error.Descripcion_del_error, "error");
        }
      }
    );
  }

  // tipoPerfil(data) {
  //   if (data.id_perfil != 1 || data.empresa != null) {
  //     localStorage.setItem("objEmpresaSeleccion", JSON.stringify(data.empresa));
  //     if (data.id_perfil == 2) {
  //       this.asociarHuellero(data.empresa);
  //     }
  //   }
  // }

  asociarHuellero(empresa: Empresa) {
    empresa.ruc = this.ipPublica;
    this._usuarioService.asignarHuellero(empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, "success");
      }
    });
  }
}
