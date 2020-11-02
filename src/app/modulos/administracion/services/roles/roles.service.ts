import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOSBACK } from '../../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  constructor(
    public http: HttpClient
  ) { }

  listarPerfiles() {
    return this.http.get(URL_SERVICIOSBACK + 'modulo/listarPerfiles')
  }
}
