import { Pagination } from '../modulos/Pagination.model';

export class Sucursal extends Pagination{
  public	idSucursal:number;
  public	direccion:string;
  public	horaInicioAtencion:Date;
  public	horaFinAtencion:Date;
  public	nivelInicial:boolean;
  public	nivelPrimaria:boolean;
  public	nivelSecundaria:boolean;

  public accion: string;
  public estado: number;
}
