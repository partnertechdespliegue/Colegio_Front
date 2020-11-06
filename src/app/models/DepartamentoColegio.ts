import { Pagination } from '../modulos/Pagination.model';

export class DepartamentoColegio extends Pagination {
  public idDepartamentoColegio: number;
  public descripcion: string;
  public codPuesto: number;

  public accion?: String;
  public estado?: number;
}
