import { Pagination } from '../modulos/Pagination.model';

export class Distrito extends Pagination {
  public idDistrito: number;
  public descripcion: string;

  public accion?: string;
  public estado?: number;
}
