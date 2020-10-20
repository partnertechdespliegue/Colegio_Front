import { Pagination } from '../modulos/Pagination.model';

export class NivelEducativo extends Pagination {
  public idNivelEducativo: number;
  public descripcion: string;

  public accion?: string;
  public estado?: number;
}
