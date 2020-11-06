import { Pagination } from '../modulos/Pagination.model';

export class Parametro extends Pagination {
  public idParametro: number;
  public descripcion: string;
  public codigo: string;
  public valor: string;
  public grupo: string;

  public accion?: string;
  public estado?: number;
}
