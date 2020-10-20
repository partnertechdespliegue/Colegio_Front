import { Pagination } from '../modulos/Pagination.model';

export class TipoCurso extends Pagination {
  public idTipoCurso: number;
  public descripcion: string;

  public accion?: string;
  public estado?: number;
}
