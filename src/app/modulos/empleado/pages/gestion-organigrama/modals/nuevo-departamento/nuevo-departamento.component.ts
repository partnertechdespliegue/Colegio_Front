import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Departamento } from '../../../../../../models/Departamento';
import { NgbModalRef, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrganigramaService } from '../../../../services/organigrama/organigrama.service';
import { ConfirmarDepartamentoComponent } from '../confirmar-departamento/confirmar-departamento.component';
import { DepartamentoColegio } from '../../../../../../models/DepartamentoColegio';

@Component({
  selector: 'app-nuevo-departamento',
  templateUrl: './nuevo-departamento.component.html',
  styles: []
})
export class NuevoDepartamentoComponent implements OnInit, OnDestroy {

  @Input() input_departamento;

  modalRef: NgbModalRef;

  departamento: any = new DepartamentoColegio();

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public organigramaService: OrganigramaService
  ) { }

  ngOnInit() {
    if (this.input_departamento != null) {
      this.departamento = this.input_departamento;
    }
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  openModalConfirmar() {
    this.modalRef = this.modalService.open(ConfirmarDepartamentoComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_departamento = this.departamento;
    this.modalRef.result.then((result) => {
    }, (reason) => {
      this.activemodal.dismiss();
    });
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }

}
