import { Pagination } from '../modulos/Pagination.model';

export class Salon extends Pagination {
  public idSalon: number;
  public descripcion: string;
  public tipoSalon: number;
  public capacidad: number;

  public accion?: string;
  public estado?: number;
}
