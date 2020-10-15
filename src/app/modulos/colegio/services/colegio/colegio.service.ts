import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';
import { Sucursal } from '../../../../models/Sucursal';

@Injectable({
  providedIn: 'root'
})
export class ColegioService {

  constructor(
    public http: HttpClient) { }

  listarColegio() {
    return this.http.get(URL_SERVICIOSBACK + 'colegio/listar')
  }

  registrarColegio(colegio) {
    return this.http.post(URL_SERVICIOSBACK + 'colegio/registrar', colegio)
  }

  actualizarColegio(colegio) {
    return this.http.put(URL_SERVICIOSBACK + 'colegio/actualizar', colegio)
  }

  eliminarColegio(idColegio) {
    return this.http.delete(URL_SERVICIOSBACK + 'colegio/' + idColegio)
  }

  listarSucursal(colegio) {
    return this.http.post(URL_SERVICIOSBACK + 'sucursal/listar', colegio)
  }

  registrarSucursal(sucursal) {
    return this.http.post(URL_SERVICIOSBACK + 'sucursal/registrar', sucursal)
  }

  actualizarSucursal(sucursal) {
    return this.http.put(URL_SERVICIOSBACK + 'sucursal/actualizar', sucursal)
  }

  eliminarSucursal(idSucursal) {
    return this.http.delete(URL_SERVICIOSBACK + 'sucursal/' + idSucursal)
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

  listarDiaLaboral(sucursal) {
    return this.http.post(URL_SERVICIOSBACK + 'diaLaboral/listar', sucursal)
  }

  registrarDiaLaboral(diaLaboralDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'diaLaboral/registrar', diaLaboralDTO)
  }

  eliminarDiaLaboral(idDiaLab) {
    return this.http.delete(URL_SERVICIOSBACK + 'diaLaboral/' + idDiaLab)
  }

  listarTurno(sucursal) {
    return this.http.post(URL_SERVICIOSBACK + 'turno/listar', sucursal)
  }

  registrarTurno(turnoDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'turno/registrar', turnoDTO)
  }

  actualizarTurno(turno) {
    return this.http.put(URL_SERVICIOSBACK + 'turno/actualizar', turno)
  }

  eliminarTurno(idTurno) {
    return this.http.delete(URL_SERVICIOSBACK + 'turno/' + idTurno)
  }

  listarReceso(turno) {
    return this.http.post(URL_SERVICIOSBACK + 'receso/listar', turno)
  }
  registrarReceso(turnoDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'receso/registrar', turnoDTO)
  }

  actualizarReceso(receso) {
    return this.http.put(URL_SERVICIOSBACK + 'receso/actualizar', receso)
  }

  eliminarReceso(idReceso) {
    return this.http.delete(URL_SERVICIOSBACK + 'receso/' + idReceso)
  }


}
