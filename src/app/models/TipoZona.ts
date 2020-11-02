import { Pagination } from '../modulos/Pagination.model';

export class TipoZona extends Pagination {
  public idTipoZona: number;
  public descripcion: string;

  public accion?: string;
  public estado?: number;
}
