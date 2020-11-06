import { Component, Input, OnInit } from '@angular/core';
import { ParametroService } from '../../../../services/parametro/parametro.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Constantes from '../../../../../../models/Constantes';
import { Parametro } from '../../../../../../models/Parametro';

@Component({
  selector: 'app-confirmar-parametro',
  templateUrl: './confirmar-parametro.component.html',
  styles: []
})
export class ConfirmarParametroComponent implements OnInit {

  @Input() input_parametro;

  parametro: any = new Parametro();

  constructor(
    public activemodal: NgbActiveModal,
    public parametroService: ParametroService,
    public router: Router,
    public toast: ToastrService
    ) { }

  ngOnInit() {
    this.parametro = this.input_parametro;
  }

  crud() {
    switch (this.parametro.accion) {
      case Constantes.ACTUALIZAR: this.actualizarTema();
        break;
      default: break;
    }
  }

  actualizarTema() {
    this.parametroService.actualizarParametro(this.parametro).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.toast.success(resp.msg, Constantes.SUCCESS)
        this.refrescar(this.router.url);
      } else { this.toast.error(resp.msg, Constantes.ERROR); }
    },
      (err) => {
        this.toast.error(err.status + " " + err.error.error, Constantes.ERROR);
      });
    this.activemodal.dismiss();
  }

  close() {
    this.activemodal.close();
  }

  public refrescar(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

}
