import { Pagination } from '../modulos/Pagination.model';

export class Tema extends Pagination {
  public idTema: number;
  public descripcion: string;

  public accion?: string;
  public estado?: number;
}
