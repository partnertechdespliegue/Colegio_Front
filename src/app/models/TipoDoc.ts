import { Pagination } from '../modulos/Pagination.model';

export class TipoDoc extends Pagination {
  public idTipoDoc: number;
  public descripcion: string;

  public accion?: string;
  public estado?: number;
}
