import { Pagination } from '../modulos/Pagination.model';

export class Estudiante extends Pagination {
  public idEstudiante: number;
  public nombres: string;
  public apePaterno: string;
  public apeMaterno: string;
  public nroDoc: string;
  public fechaNacimiento: Date;
  public nroCelular?: string;
  public nroTelefono?: string;
  public correo?: string;
  public sexo: string;
  public direccion: string;
  public referencia?: string;
  public foto?: string;

  public accion?: string;
  public estado?: number;
}
