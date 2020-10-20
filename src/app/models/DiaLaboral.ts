import { Pagination } from '../modulos/Pagination.model';

export class DiaLaboral extends Pagination {
  public idDiaLaboral: number;
  public numDia: number;
  public descripcion: string;

  public accion?: string;
  public estado?: number;
}
