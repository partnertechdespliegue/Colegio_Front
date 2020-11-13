import { Pagination } from '../modulos/Pagination.model';

export class Contrato extends Pagination {
  public idContrato: number;
  public fechaInicio: Date;
  public fechaFin?: Date;
  public fechaFirma?: Date;
	public sueldoBase: number;
	public tipoPago: number;
  public nroCta: string;
  public nroCtaInter: string;
	public tipoCuenta: number;
	public tipoMoneda: number;

  public accion?: string;
  public estado?: number;
}
