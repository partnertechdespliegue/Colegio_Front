import { Pagination } from '../modulos/Pagination.model';

export class Pais extends Pagination {
  public idPais: number;
  public descripcion: string;

  public accion?: string;
  public estado?: number;
}
