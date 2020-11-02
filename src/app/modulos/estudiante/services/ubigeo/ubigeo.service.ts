import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  constructor(
    public http: HttpClient
  ) { }

  listarPais() {
    return this.http.get(URL_SERVICIOSBACK + 'ubigeo/listarPais')
  }

  listarDepartamento() {
    return this.http.get(URL_SERVICIOSBACK + 'ubigeo/listar')
  }

  listarProvincia(departamento) {
    return this.http.post(URL_SERVICIOSBACK + 'ubigeo/porDepartamento', departamento)
  }

  listarDistrito(provincia) {
    return this.http.post(URL_SERVICIOSBACK + 'ubigeo/porProvincia', provincia)
  }

  listarTipoZona() {
    return this.http.get(URL_SERVICIOSBACK + 'ubigeo/listarTipoZona')
  }
}
