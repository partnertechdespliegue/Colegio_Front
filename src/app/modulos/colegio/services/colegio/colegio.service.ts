import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';

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

  listarSalon(sucursal) {
    return this.http.post(URL_SERVICIOSBACK + 'salon/listar', sucursal)
  }

  listarSalonPorTipo(sucursal, tipoSalon) {
    return this.http.post(URL_SERVICIOSBACK + 'salon/listarPorTipo/' + tipoSalon, sucursal)
  }

  registrarSalon(salonDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'salon/registrar', salonDTO)
  }

  actualizarSalon(salon) {
    return this.http.put(URL_SERVICIOSBACK + 'salon/actualizar', salon)
  }

  eliminarSalon(idSalon) {
    return this.http.delete(URL_SERVICIOSBACK + 'salon/' + idSalon)
  }

  listarCurso(colegio) {
    return this.http.post(URL_SERVICIOSBACK + 'curso/listar', colegio)
  }

  listarCursoPorTipoCursoYGrado(cursoDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'curso/listarPorTipoCursoYGrado', cursoDTO)
  }

  registrarCurso(cursoDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'curso/registrar', cursoDTO)
  }

  actualizarCurso(curso) {
    return this.http.put(URL_SERVICIOSBACK + 'curso/actualizar', curso)
  }

  eliminarCurso(idCurso) {
    return this.http.delete(URL_SERVICIOSBACK + 'curso/' + idCurso)
  }

  listarTema(colegio) {
    return this.http.post(URL_SERVICIOSBACK + 'tema/listar', colegio)
  }

  listarTemaPorTipoCurso(tipoCurso) {
    return this.http.post(URL_SERVICIOSBACK + 'tema/listarPorTipoCurso', tipoCurso)
  }

  registrarTema(cursoDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'tema/registrar', cursoDTO)
  }

  actualizarTema(tema) {
    return this.http.put(URL_SERVICIOSBACK + 'tema/actualizar', tema)
  }

  eliminarTema(idTema) {
    return this.http.delete(URL_SERVICIOSBACK + 'tema/' + idTema)
  }

  listarTipoCurso(colegio) {
    return this.http.post(URL_SERVICIOSBACK + 'tipoCurso/listar', colegio)
  }

  registrarTipoCurso(cursoDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'tipoCurso/registrar', cursoDTO)
  }

  actualizarTipoCurso(tipoCurso) {
    return this.http.put(URL_SERVICIOSBACK + 'tipoCurso/actualizar', tipoCurso)
  }

  eliminarTipoCurso(idTipoCurso) {
    return this.http.delete(URL_SERVICIOSBACK + 'tipoCurso/' + idTipoCurso)
  }

  listarNivelEducativo(colegio) {
    return this.http.post(URL_SERVICIOSBACK + 'nivelEducativo/listar', colegio)
  }

  listarGrado(nivelEducativo) {
    return this.http.post(URL_SERVICIOSBACK + 'grado/listar', nivelEducativo)
  }

  listarTemario(curso) {
    return this.http.post(URL_SERVICIOSBACK + 'temario/listar', curso)
  }

  registrarTemario(cursoDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'temario/registrar', cursoDTO)
  }

  eliminarTemario(idTemario) {
    return this.http.delete(URL_SERVICIOSBACK + 'temario/'+ idTemario)
  }

  listarHorarioSalon(salonDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'horarioSalon/listarporSalonYDia', salonDTO)
  }

  registrarHorarioSalon(salonDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'horarioSalon/registrar', salonDTO)
  }

  eliminarHorarioSalon(idHorarioSalon) {
    return this.http.delete(URL_SERVICIOSBACK + 'horarioSalon/' + idHorarioSalon)
  }

}
