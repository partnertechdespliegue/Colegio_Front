import { Pagination } from '../modulos/Pagination.model';

export class HorarioSeccion extends Pagination {
  public idHorarioSeccion: number;
  public horaDuracion: number;
  public minutoDuracion: number;
  public horaInicio: Date;
  public horaFin: Date;

  public accion?: string;
  public estado?: number;
}
