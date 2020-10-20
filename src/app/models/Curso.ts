import { Pagination } from '../modulos/Pagination.model';

export class Curso extends Pagination {
  public idCurso: number;
  public descripcion: string;
  public horaSemanal: number;

  public accion?: string;
  public estado?: number;
}
