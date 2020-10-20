import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ColegioService } from '../../../../services/colegio/colegio.service';
import { ConfirmarTipoCursoComponent } from '../confirmar-tipo-curso/confirmar-tipo-curso.component';
import { TipoCurso } from '../../../../../../models/TipoCurso';

@Component({
  selector: 'app-nuevo-tipo-curso',
  templateUrl: './nuevo-tipo-curso.component.html',
  styles: []
})
export class NuevoTipoCursoComponent implements OnInit, OnDestroy {

  @Input() input_tipoCurso;

  modalRef: NgbModalRef;
  tipoCurso: any = new TipoCurso();

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public colegioService: ColegioService,
  ) { }

  ngOnInit() {
    if (this.input_tipoCurso != null) {
      this.tipoCurso = this.input_tipoCurso;
    }
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  openModalConfirmar() {
    this.modalRef = this.modalService.open(ConfirmarTipoCursoComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_tipoCurso = this.tipoCurso;
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
