import { ColegioService } from './../../../../services/colegio/colegio.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Colegio } from '../../../../../../models/Colegio';
import { ConfirmarColegioComponent } from '../confirmar-colegio/confirmar-colegio.component';

@Component({
  selector: 'app-nuevo-colegio',
  templateUrl: './nuevo-colegio.component.html',
  styles: []
})
export class NuevoColegioComponent implements OnInit, OnDestroy {

  @Input() input_colegio;

  colegio: Colegio = new Colegio();

  modalRef:NgbModalRef;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public router: Router,
    public colegioService: ColegioService,
  ) { }

  ngOnInit() {
    if (this.input_colegio != null) {
      this.colegio = this.input_colegio;
    }
  }

  ngOnDestroy(){
    if(this.modalRef!=null){
      this.modalRef.close();
    }
  }


  close() {
    this.activemodal.dismiss('Cancelado');
  }

   openModalConfirmar() {
   this.modalRef = this.modalService.open(ConfirmarColegioComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_colegio = this.colegio;
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

}
