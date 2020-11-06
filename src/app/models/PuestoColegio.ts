import { Pagination } from '../modulos/Pagination.model';

export class PuestoColegio extends Pagination {
  public idPuestoColegio: number;
  public descripcion: string;
  public codPuesto: number;

  public accion?: String;
  public estado?: number;
}
