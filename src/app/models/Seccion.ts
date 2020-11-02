import { Pagination } from '../modulos/Pagination.model';

export class Seccion extends Pagination {
  public idSeccion: number;
  public descripcion: string;
  public capacidadSalon: number;

  public accion?: string;
  public estado?: number;
}
