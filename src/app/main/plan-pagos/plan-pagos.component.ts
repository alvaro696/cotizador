import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import { ApiResponse, PolizaPago } from '../../interfaces/poliza-pago.interface';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-plan-pagos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan-pagos.component.html',
  styleUrl: './plan-pagos.component.css'
})
export class PlanPagosComponent implements OnInit {
  constructor(private apiService: BackendService, private router: Router) { }

 plan: PolizaPago[] = [];

  public id_cliente = localStorage.getItem('id_cliente');
  ngOnInit() {
    console.log("--> " + this.id_cliente);
    this.apiService.getMisPagos(this.id_cliente).subscribe((response: ApiResponse) => {
      this.plan = response.data;
      console.log(this.plan);
    });
  }

}
