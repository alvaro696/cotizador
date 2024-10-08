import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import { CotizarComponent } from "../../inicio/cotizar/cotizar.component";

@Component({
  selector: 'app-cotizaciones',
  standalone: true,
  imports: [CotizarComponent],
  templateUrl: './cotizaciones.component.html',
  styleUrl: './cotizaciones.component.css'
})
export class CotizacionesComponent implements OnInit {
  constructor(private apiService: BackendService, private router: Router) { }

  public cotizaciones: any[] = [];
  public id_cotizacion: number | null = null;
  public id_cliente = localStorage.getItem('id_cliente');

  ngOnInit() {
    this.apiService.getMisCotizaciones().subscribe((response) => {
      this.cotizaciones = response;
      console.log(this.cotizaciones);
    });
  }
  crearPoliza(id_cotizacion: number) {
    console.log("id_cotizacion -> ", id_cotizacion);
    this.router.navigate(['cotizacion', id_cotizacion])
  }
}
