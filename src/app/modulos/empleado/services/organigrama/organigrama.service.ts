import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';
import { DepartamentoColegio } from '../../../../models/DepartamentoColegio';

@Injectable({
  providedIn: 'root'
})
export class OrganigramaService {

  constructor(
    public http: HttpClient,
  ) { }

  listarPuesto(colegio) {
    return this.http.post(URL_SERVICIOSBACK + 'puestoColegio/listar', colegio);
  }

  listarPuestoPorDepartamento(departamentoColegio) {
    return this.http.post(URL_SERVICIOSBACK + 'puestoColegio/listarPorDepartamento', departamentoColegio);
  }

  registrarPuesto(departamentoDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'puestoColegio/registrar', departamentoDTO);
  }

  actualizarPuesto(puestoColegio) {
    return this.http.put(URL_SERVICIOSBACK + 'puestoColegio/actualizar', puestoColegio);
  }

  eliminarPuesto(idPuesto) {
    return this.http.delete(URL_SERVICIOSBACK + 'puestoColegio/' + idPuesto);
  }

  listarDepartamento(colegio) {
    return this.http.post(URL_SERVICIOSBACK + 'departamentoColegio/listar', colegio);
  }

  registrarDepartamento(departamentoDTO) {
    return this.http.post(URL_SERVICIOSBACK + 'departamentoColegio/registrar', departamentoDTO);
  }

  actualizarDepartamento(departamentoColegio) {
    return this.http.put(URL_SERVICIOSBACK + 'departamentoColegio/actualizar', departamentoColegio);
  }

  eliminarDepartamento(idDepartamento) {
    return this.http.delete(URL_SERVICIOSBACK + 'departamentoColegio/' + idDepartamento);
  }
}
