import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ColegioService } from '../../../../services/colegio/colegio.service';
import { Tema } from '../../../../../../models/Tema';
import { ConfirmarTemaComponent } from '../confirmar-tema/confirmar-tema.component';

@Component({
  selector: 'app-nuevo-tema',
  templateUrl: './nuevo-tema.component.html',
  styles: []
})
export class NuevoTemaComponent implements OnInit, OnDestroy {

  @Input() input_tema;

  modalRef: NgbModalRef;
  tema: any = new Tema();
  lsTipoCurso: any [] = [];
  idTipoCurso = null;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public colegioService: ColegioService,
  ) { }

  ngOnInit() {
    this.listarTipoCurso();
    if (this.input_tema != null) {
      this.tema = this.input_tema;
      this.idTipoCurso = this.tema.tipoCurso.idTipoCurso
    }
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarTipoCurso() {
    var colegio = JSON.parse(localStorage.getItem('colegioSeleccion'));
    this.colegioService.listarTipoCurso(colegio).subscribe((resp: any) => {
      if (resp.estado == 1) {
        this.lsTipoCurso = resp.aaData;
      }
    })
  }

  openModalConfirmar() {
    this.modalRef = this.modalService.open(ConfirmarTemaComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_tema = this.tema;
    this.modalRef.componentInstance.input_tipoCurso = {"idTipoCurso":this.idTipoCurso};
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
