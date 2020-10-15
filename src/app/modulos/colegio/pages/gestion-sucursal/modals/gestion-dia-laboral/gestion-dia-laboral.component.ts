import { ColegioService } from './../../../../services/colegio/colegio.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Sucursal } from '../../../../../../models/Sucursal';
import { ConfirmarDiaLaboralComponent } from '../confirmar-dia-laboral/confirmar-dia-laboral.component';

@Component({
  selector: 'app-gestion-dia-laboral',
  templateUrl: './gestion-dia-laboral.component.html',
  styles: []
})
export class GestionDiaLaboralComponent implements OnInit {

  @Input() input_sucursal;

  sucursal = new Sucursal();
  lsDiaLaborar: any[] = [];
  modalRef: NgbModalRef;

  lunes: boolean = false;
  martes: boolean = false;
  miercoles: boolean = false;
  jueves: boolean = false;
  viernes: boolean = false;
  sabado: boolean = false;
  domingo: boolean = false;

  constructor(
    public activemodal: NgbActiveModal,
    private modalService: NgbModal,
    public colegioService: ColegioService) { }

  ngOnInit() {
    this.sucursal = this.input_sucursal;
    this.listarDias();
  }

  listarDias() {
    this.colegioService.listarDiaLaboral(this.sucursal).subscribe((resp: any) => {
      this.lsDiaLaborar = resp.aaData;
      for (const dia of this.lsDiaLaborar) {
        switch (dia.numDia) {
          case 1:
            this.lunes = true;
            break;
          case 2:
            this.martes = true;
            break;
          case 3:
            this.miercoles = true;
            break;
          case 4:
            this.jueves = true;
            break;
          case 5:
            this.viernes = true;
            break;
          case 6:
            this.sabado = true;
            break;
          case 7:
            this.domingo = true;
            break;
        }
      }
    })
  }

  gestionDia(estado, numDia) {
    if (estado) {
      var diaLaboralDTO = {
        "diaLaboral": {
          "numDia": numDia
        },
        "sucursal": this.sucursal
      }
      this.colegioService.registrarDiaLaboral(diaLaboralDTO).subscribe((resp: any) => {
        this.listarDias()
      })
    } else {
      for (const dia of this.lsDiaLaborar) {
        if (dia.numDia == numDia) {
          this.modalRef = this.modalService.open(ConfirmarDiaLaboralComponent,
            {
              backdrop: 'static',
              keyboard: false,
              size: 'sm'
            })
          this.modalRef.componentInstance.input_diaLaboral = dia;
          this.modalRef.result.then((result) => {
            this.listarDias()
          }, (reason) => {
          });
          break;
        }
      }
    }
  }

  close() {
    this.activemodal.dismiss('Cancelado');
  }
}
