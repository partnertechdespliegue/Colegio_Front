import { Pagination } from '../modulos/Pagination.model';

export class Grado extends Pagination {
  public idGrado: number;
  public descripcion: string;

  public accion?: string;
  public estado?: number;
}
