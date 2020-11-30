import { Pagination } from '../modulos/Pagination.model';

export class AsistenciaEstudiante extends Pagination{
  public idAsistenciaEstudiante: number;
  public descripcion: string;
  public fechaAsistencia: Date;

  public accion?: string;
  public estado?: number;
}
