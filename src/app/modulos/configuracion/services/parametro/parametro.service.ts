import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {

  constructor(
    public http: HttpClient
  ) { }

  listarParametro(colegio){
    return this.http.post(URL_SERVICIOSBACK + 'parametro/listar', colegio)
  }

  actualizarParametro(parametro){
    return this.http.put(URL_SERVICIOSBACK + 'parametro/actualizar', parametro)
  }
}
