import { ColegioService } from './../../../../services/colegio/colegio.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import Constantes from '../../../../../../models/Constantes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmar-dia-laboral',
  templateUrl: './confirmar-dia-laboral.component.html',
  styles: []
})
export class ConfirmarDiaLaboralComponent implements OnInit {

  @Input() input_diaLaboral;

  diaLaboral: any;
  constructor(
    public activemodal: NgbActiveModal,
    public colegioService: ColegioService,
    public router: Router
  ) { }

  ngOnInit() {
    this.diaLaboral = this.input_diaLaboral;
  }

  eliminarSucursal() {
    this.colegioService.eliminarDiaLaboral(this.diaLaboral.idDiaLaboral).subscribe((resp: any) => {
      if (resp.estado == 1) {
        Swal.fire(Constantes.SUCCESS, resp.msg, 'success');
        // this.refrescar(this.router.url);
      } else { Swal.fire(Constantes.ERROR, resp.msg, 'error'); }
    },
      (err) => {
        Swal.fire(Constantes.ERROR, err.status + " " + err.error.error, 'error');
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
