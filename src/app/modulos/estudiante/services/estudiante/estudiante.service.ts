import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';
import { Seccion } from '../../../../models/Seccion';
import { Sucursal } from '../../../../models/Sucursal';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(
    public http: HttpClient
  ) { }

  existeEstudiantePorNroDoc(nroDoc:string) {
    return this.http.post(URL_SERVICIOSBACK + 'estudiante/existePorNroDoc', nroDoc);
  }

  listarEstudiantePorColegio(colegio) {
    return this.http.post(URL_SERVICIOSBACK + 'estudiante/listarPorColegio', colegio);
  }

  listarEstudiantePorSucursal(sucursal) {
    return this.http.post(URL_SERVICIOSBACK + 'estudiante/listarPorSucursal', sucursal);
  }

  registrarEstudiante(estudianteDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'estudiante/registrar', estudianteDTO);
  }

  actualizarEstudiante(estudianteDTO) {
    return this.http.put(URL_SERVICIOSBACK + 'estudiante/actualizar', estudianteDTO);
  }

  eliminarEstudiante(idEstudiante) {
    return this.http.delete(URL_SERVICIOSBACK + 'estudiante/' + idEstudiante);
  }

  listarTipoDoc() {
    return this.http.get(URL_SERVICIOSBACK + 'tipoDoc/listar');
  }

  listarTipoDocSinRuc() {
    return this.http.get(URL_SERVICIOSBACK + 'tipoDoc/listarSinRuc');
  }

  asignarFotoEstudiante(archivo: File, idEstudiante) {
    let formData = new FormData();
    formData.append("file", archivo);
    formData.append("idEstudiante", idEstudiante);
    return this.http.post(URL_SERVICIOSBACK + "estudiante/asignarFoto", formData);
  }

  eliminarFotoEstudiante(idEstudiante) {
    return this.http.post(URL_SERVICIOSBACK + 'estudiante/eliminarFoto', idEstudiante);
  }

  existeApoderadoPorNroDoc(nroDoc:string) {
    return this.http.post(URL_SERVICIOSBACK + 'apoderado/existePorNroDoc', nroDoc);
  }

  listarApoderadoPorColegio(colegio) {
    return this.http.post(URL_SERVICIOSBACK + 'apoderado/listarPorColegio', colegio);
  }

  listarApoderadoPorSucursal(sucursal) {
    return this.http.post(URL_SERVICIOSBACK + 'apoderado/listarPorSucursal', sucursal);
  }

  registrarApoderado(estudianteDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'apoderado/registrar', estudianteDTO);
  }

  actualizarApoderado(estudianteDTO) {
    return this.http.put(URL_SERVICIOSBACK + 'apoderado/actualizar', estudianteDTO);
  }

  eliminarApoderado(idApoderado) {
    return this.http.delete(URL_SERVICIOSBACK + 'apoderado/' + idApoderado);
  }

  asignarFotoApoderado(archivo: File, idApoderado) {
    let formData = new FormData();
    formData.append("file", archivo);
    formData.append("idApoderado", idApoderado);
    return this.http.post(URL_SERVICIOSBACK + "apoderado/asignarFoto", formData);
  }

  eliminarFotoApoderado(idApoderado) {
    return this.http.post(URL_SERVICIOSBACK + 'apoderado/eliminarFoto', idApoderado);
  }

  listarRelacionPorEstudiante(estudiante) {
    return this.http.post(URL_SERVICIOSBACK + 'relacion/listarPorEstudiante', estudiante);
  }

  listarRelacionPorApoderado(apoderado) {
    return this.http.post(URL_SERVICIOSBACK + 'relacion/listarPorApoderado', apoderado);
  }

  registrarRelacion(relacionDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'relacion/registrar', relacionDTO);
  }

  eliminarRelacion(idRelacion) {
    return this.http.delete(URL_SERVICIOSBACK + 'relacion/' + idRelacion);
  }

  listarTipoRelacion(colegio) {
    return this.http.post(URL_SERVICIOSBACK + 'tipoRelacion/listar', colegio);
  }

  listarSeccion(sucursal) {
    return this.http.post(URL_SERVICIOSBACK + 'seccion/listarPorSucursal', sucursal);
  }

  registrarSeccion(seccionDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'seccion/registrar', seccionDTO);
  }

  actualizarSeccion(seccionDTO) {
    return this.http.put(URL_SERVICIOSBACK + 'seccion/actualizar', seccionDTO);
  }

  eliminarSeccion(idSeccion) {
    return this.http.delete(URL_SERVICIOSBACK + 'seccion/' + idSeccion);
  }

  listarEstudianteAsigSeccion(seccion: Seccion) {
    return this.http.post(URL_SERVICIOSBACK + 'seccionEstudiante/listarAsignados', seccion);
  }

  listarEstudianteSinAsigSeccion(seccionDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'seccionEstudiante/listarSinAsignar', seccionDTO);
  }

  registrarEstudianteSeccion(seccionDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'seccionEstudiante/registrar', seccionDTO);
  }

  eliminarEstudianteSeccion(lsSeccionEstudiante) {
    return this.http.post(URL_SERVICIOSBACK + 'seccionEstudiante/eliminar', lsSeccionEstudiante);
  }

  listarHorarioSeccion(seccionDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'horarioSeccion/listarporSeccionYDia', seccionDTO)
  }

  registrarHorarioSeccion(seccionDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'horarioSeccion/registrar', seccionDTO)
  }

  eliminarHorarioSeccion(idHorarioSeccion) {
    return this.http.delete(URL_SERVICIOSBACK + 'horarioSeccion/'+ idHorarioSeccion)
  }

  listarAsistenciaEstudiante(horarioMaestro) {
    return this.http.post(URL_SERVICIOSBACK + 'asistenciaEstudiante/listarAsistenciaEstudiante', horarioMaestro)
  }

  registrarAsistenciaMasivaEstudiante(lsAsistenciaEstudiante: any[]) {
    return this.http.post(URL_SERVICIOSBACK + 'asistenciaEstudiante/registrarMasivo', lsAsistenciaEstudiante)
  }
}
