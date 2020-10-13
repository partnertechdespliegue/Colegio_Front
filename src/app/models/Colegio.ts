import { Pagination } from '../modulos/Pagination.model';
export class Colegio extends Pagination{

  public idColegio: number;
  public nombre: string
  public codUgel: string;

  public accion: string;
  public estado: number;
}
