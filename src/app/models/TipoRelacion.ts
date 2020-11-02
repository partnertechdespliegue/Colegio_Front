import { Pagination } from '../modulos/Pagination.model';

export class TipoRelacion extends Pagination {
  public idTipoRelacion: number;
  public descripcion: string;

  public accion?: string;
  public estado?: number;
}
