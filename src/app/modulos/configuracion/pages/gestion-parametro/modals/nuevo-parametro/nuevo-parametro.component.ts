import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgbModalRef, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmarParametroComponent } from '../confirmar-parametro/confirmar-parametro.component';
import { ParametroService } from '../../../../services/parametro/parametro.service';
import { Parametro } from '../../../../../../models/Parametro';

@Component({
  selector: 'app-nuevo-parametro',
  templateUrl: './nuevo-parametro.component.html',
  styles: []
})
export class NuevoParametroComponent implements OnInit, OnDestroy {

  @Input() input_parametro;

  modalRef: NgbModalRef;

  parametro: any = new Parametro();

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    if (this.input_parametro != null) {
      this.parametro = this.input_parametro;
    }
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  openModalConfirmar() {
    this.modalRef = this.modalService.open(ConfirmarParametroComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_parametro = this.parametro;
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
