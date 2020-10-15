import { Injectable} from '@angular/core';
import { URL_SERVICIOSBACK } from '../../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class HeaderService {

  constructor(
    public http: HttpClient
  ) { }

  listarColegio(){
    return this.http.get(URL_SERVICIOSBACK + 'colegio/listar')
  }

  listarSucursal(colegio){
    return this.http.post(URL_SERVICIOSBACK + 'sucursal/listar',colegio)
  }

  listarEmpresa(){
    var res:any;
    res=this.http.get(URL_SERVICIOSBACK + 'empresa/listar')
    return res;
  }

  listarAno(empresa){
    var res:any;
    res=this.http.post(URL_SERVICIOSBACK + 'anomes/listarPorEmpresa',empresa)
    return res;
  }

  listarMeses(){
    var res:any;
    res=this.http.get(URL_SERVICIOSBACK + 'anomes/listarMeses')
    return res;
  }

}
