import { Pagination } from '../modulos/Pagination.model';

export class Provincia extends Pagination {
  public idProvincia: number;
  public descripcion: string;

  public accion?: string;
  public estado?: number;
}
