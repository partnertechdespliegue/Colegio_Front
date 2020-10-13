import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NuevoUsuarioComponent } from './modals/nuevo-usuario/nuevo-usuario.component';
import { UsuarioService } from '../../services/usuarios/usuario.service';
import { NuevoPasswordComponent } from './modals/nuevo-password/nuevo-password.component';
import Constantes from '../../../../models/Constantes';
import { Usuario } from '../../../../models/usuario.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.component.html',
  styles: []
})

export class GestionUsuariosComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  lsUsuarios = null;
  modalRef: NgbModalRef;

  displayedColumns: string[] = [
    'nomusu',
    'correo',
    'rol',
    'estado',
    'actualizar',
    'cambcontra',
    // 'eliminar'
  ];

  constructor(
    public modalService: NgbModal,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() { debugger
    var idPerfil = JSON.parse(localStorage.getItem("InfoToken")).id_perfil;
    if (idPerfil == 1) {
      this.listarUsuarios();
    } else {
this.listarUsuariosPorEmpresa();
    }
  }

  ngOnDestroy(): void {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarUsuarios() {
    this._usuarioService.listarUsuarios().subscribe((resp: any) => {
      if (resp.estado == 1) {
        let lsUsuariosFilter: Usuario[] = [];
        lsUsuariosFilter = resp.aaData;
        this.lsUsuarios = new MatTableDataSource<Usuario>(lsUsuariosFilter);
        this.lsUsuarios.paginator = this.paginator;
      }
    })
  }

  listarUsuariosPorEmpresa() {
    var empresa =  JSON.parse(localStorage.getItem('objEmpresaSeleccion'));
    this._usuarioService.listarUsuariosPorEmpresa(empresa).subscribe((resp: any) => {
      if (resp.estado == 1) {
        let lsUsuariosFilter: Usuario[] = [];
        lsUsuariosFilter = resp.aaData;
        this.lsUsuarios = new MatTableDataSource<Usuario>(lsUsuariosFilter);
        this.lsUsuarios.paginator = this.paginator;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lsUsuarios.filter = filterValue.trim().toLowerCase();
  }

  nuevoUsuario() {
    let indice = null;
    this.openModal(indice);
  }

  public actualizarUsuario(user) {
    var tmp = Object.assign({}, user);
    tmp.accion = Constantes.ACTUALIZAR;
    this.openModal(tmp);
  }

  public actualizarContra(user) {
    this.modalRef = this.modalService.open(NuevoPasswordComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_usuario = user;
  }

  public openModal(indice) {

    this.modalRef = this.modalService.open(NuevoUsuarioComponent,
      {
        backdrop: 'static',
        keyboard: false,
        windowClass: 'modalMD'
      })
    this.modalRef.componentInstance.input_usuario_final = indice;
  }
}
