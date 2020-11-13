import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(
    public http: HttpClient,
  ) { }

  listarEmpleadoPorColegio(colegio) {
    return this.http.post(URL_SERVICIOSBACK + 'empleado/listarPorColegio', colegio);
  }

  listarEmpleadoPorSucursal(sucursal) {
    return this.http.post(URL_SERVICIOSBACK + 'empleado/listarPorSucursal', sucursal);
  }

  listarMaestroPorColegio(colegio) {
    return this.http.post(URL_SERVICIOSBACK + 'empleado/listarMaestroPorColegio', colegio);
  }

  listarMaestroPorSucursal(sucursal) {
    return this.http.post(URL_SERVICIOSBACK + 'empleado/listarMaestroPorSucursal', sucursal);
  }

  registrarEmpleado(empleadoDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'empleado/registrar', empleadoDTO);
  }

  actualizarEmpleado(empleadoDTO) {
    return this.http.put(URL_SERVICIOSBACK + 'empleado/actualizar', empleadoDTO);
  }

  eliminarEmpleado(idEmpleado) {
    return this.http.delete(URL_SERVICIOSBACK + 'empleado/' + idEmpleado);
  }

  asignarFotoEmpleado(archivo: File, idEmpleado) {
    let formData = new FormData();
    formData.append("file", archivo);
    formData.append("idEmpleado", idEmpleado);
    return this.http.post(URL_SERVICIOSBACK + "empleado/asignarFoto", formData);
  }

  eliminarFotoEmpleado(idEmpleado) {
    return this.http.post(URL_SERVICIOSBACK + 'empleado/eliminarFoto', idEmpleado);
  }

  listarTipoDocSinRuc() {
    return this.http.get(URL_SERVICIOSBACK + 'tipoDoc/listarSinRuc');
  }

  listarBanco() {
    return this.http.get(URL_SERVICIOSBACK + 'banco/listar');
  }
}
