import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbModalRef, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PuestoColegio } from '../../../../../../models/PuestoColegio';
import { OrganigramaService } from '../../../../services/organigrama/organigrama.service';
import { ConfirmarPuestoComponent } from '../confirmar-puesto/confirmar-puesto.component';
import { DepartamentoColegio } from '../../../../../../models/DepartamentoColegio';
import { Colegio } from '../../../../../../models/Colegio';

@Component({
  selector: 'app-nuevo-puesto',
  templateUrl: './nuevo-puesto.component.html',
  styles: []
})
export class NuevoPuestoComponent implements OnInit, OnDestroy {

  @Input() input_puesto;

  modalRef: NgbModalRef;

  puesto: any = new PuestoColegio();
  departamento: DepartamentoColegio = new DepartamentoColegio();
  colegio: any = new Colegio();

  lsDepartamento: any[] = [];

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public organigramaService: OrganigramaService
  ) { }

  ngOnInit() {
    this.colegio = JSON.parse(localStorage.getItem('colegioSeleccion'));
    this.listarDepartamento();
    if (this.input_puesto != null) {
      this.puesto = this.input_puesto;
      this.departamento = this.puesto.departamentoColegio;
    }
  }

  ngOnDestroy() {
    if (this.modalRef != null) {
      this.modalRef.close();
    }
  }

  listarDepartamento(){
    this.organigramaService.listarDepartamento(this.colegio).subscribe((resp: any) => {
      this.lsDepartamento = resp.aaData;
    })
  }

  openModalConfirmar() {
    this.modalRef = this.modalService.open(ConfirmarPuestoComponent,
      {
        backdrop: 'static',
        keyboard: false,
        size: 'sm'
      }
    );
    this.modalRef.componentInstance.input_puesto = this.puesto;
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
