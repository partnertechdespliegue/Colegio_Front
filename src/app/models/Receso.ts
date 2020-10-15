import { Pagination } from '../modulos/Pagination.model';

export class Receso extends Pagination {
  public idReceso: number;
  public descripcion: string;
  public horaInicio: Date;
  public horaFin: Date;

  public accion?: String;
  public estado?: number;
}
