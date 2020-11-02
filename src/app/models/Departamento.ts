import { Pagination } from '../modulos/Pagination.model';

export class Departamento extends Pagination {
  public idDepartamento: number;
  public descripcion: string;

  public accion?: string;
  public estado?: number;
}
