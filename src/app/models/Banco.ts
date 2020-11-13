import { Pagination } from '../modulos/Pagination.model';

export class Banco extends Pagination{
  public idBanco: number;
  public descripcion: string

  public accion: string;
  public estado: number;
}
