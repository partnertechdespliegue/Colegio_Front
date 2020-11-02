import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ColegioService } from '../../../../services/colegio/colegio.service';
import { ConfirmarSalonComponent } from '../confirmar-salon/confirmar-salon.component';
import { Salon } from '../../../../../../models/Salon';
import Constantes from '../../../../../../models/Constantes';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nuevo-salon',
  templateUrl: './nuevo-salon.component.html',
  styles: []
})
export class NuevoSalonComponent implements OnInit, OnDestroy {

  @Input() input_salon;

  salon: Salon = new Salon();
  lsTipoSalon = Constantes.tipoSalon;
  modalRef: NgbModalRef;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public router: Router,
    public colegioService: ColegioService,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    if (this.input_salon != null) {
      this.salon = this.input_salon;
    }
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

  openModalConfirmar() {
    this.modalRef = this.modalService.open(ConfirmarSalonComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_salon = this.salon;
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

  verificarNumero(valor): boolean {
    var tecla = (document.all) ? valor.keyCode : valor.which;
    if (tecla == 4) {
      return true;
    } else {
      var patron = /[0-9]/;
      var tecla_final = String.fromCharCode(tecla);
      if (!patron.test(tecla_final)) {
        this.toast.info("Solo se permiten caracteres numéricos", Constantes.INFO)
        return false;
      }
    }
  }

}
