import { Pagination } from '../modulos/Pagination.model';

export class Turno extends Pagination {
  public idTurno: number;
  public descripcion: string;
  public horaInicio: Date;
  public horaFin: Date;

  public accion?: string;
  public estado?: number;
}
