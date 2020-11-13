import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../administracion/services/usuarios/usuario.service';

declare function init_plugins();

@Component({
  selector: 'app-maestro',
  templateUrl: './maestro.component.html',
  styles: []
})
export class MaestroComponent implements OnInit {

  constructor(
    public usuarioService: UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {
    init_plugins();
    this.refrescarToken();
  }

  refrescarToken(){
    this.usuarioService.refreshToken().subscribe((resp:any)=>{
      localStorage.setItem('InfoToken',JSON.stringify(resp));
    })
  }
}
