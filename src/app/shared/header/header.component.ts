import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/service.index';

import { Router } from '@angular/router';

import Constantes from '../../models/Constantes';
import Swal from 'sweetalert2';
import { SidebarService } from '../../services/shared/sidebar.service';
import { Colegio } from '../../models/Colegio';
import { Sucursal } from '../../models/Sucursal';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(
    public _headerService: HeaderService,
    public _siderService: SidebarService,
    public router: Router
  ) { }

  public colegio: Colegio = new Colegio();
  public sucursal: Sucursal = new Sucursal();

  public lsColegio: any[] = [];
  public lsSucursal: any[] = [];

  token: any;

  ngOnInit() {
    this.token = JSON.parse(localStorage.getItem("InfoToken")) || '';
    this.listarColegios();
    this.iniciarValores();
  }

  listarColegios(): any {
    this._headerService.listarColegio().subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsColegio = resp.aaData;
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
    });
  }

  setColegio(event) {
    if (event != null) {
      for (let cole of this.lsColegio) {
        if (cole.idColegio == event) {
          localStorage.setItem('colegioSeleccion', JSON.stringify(cole));
          localStorage.removeItem('sucursalSeleccion');
          this.refrescar(this.router.url)
          break;
        }
      }
    } else {
      localStorage.removeItem('colegioSeleccion');
      localStorage.removeItem('sucursalSeleccion');
      this.refrescar(this.router.url)
    }
  }

  listarSucursal() {
    this._headerService.listarSucursal(this.colegio).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsSucursal = resp.aaData;
      } else {
        Swal.fire(Constantes.ERROR, resp.msg, 'error');
      }
    });
  }

  setSucursal(event) {
    if (event != null) {
      for (let suc of this.lsSucursal) {
        if (suc.idSucursal == event) {
          localStorage.setItem('sucursalSeleccion', JSON.stringify(suc));
          this.refrescar(this.router.url)
          break;
        }
      }
    } else {
      localStorage.removeItem('sucursalSeleccion');
      this.refrescar(this.router.url)
    }
  }

  iniciarValores() {
    var cole = JSON.parse(localStorage.getItem('colegioSeleccion'));
    if (cole != null) {
      this.colegio.idColegio = cole.idColegio;
      this.listarSucursal();
      var suc = JSON.parse(localStorage.getItem('sucursalSeleccion'));
      if (suc != null) {
        this.sucursal.idSucursal = suc.idSucursal;
      }
    }
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  buscar(termino: string) {
    this.router.navigate(['/busqueda', termino]);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
