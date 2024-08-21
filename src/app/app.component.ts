import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { CotizarComponent } from "./inicio/cotizar/cotizar.component";
import { ClienteComponent } from "./main/cliente/cliente.component";
import { HeaderComponent } from "./estructura/header/header.component";
import { FooterComponent } from "./estructura/footer/footer.component";
import { PolizaComponent } from "./main/poliza/poliza.component";
import { SiniestroComponent } from './main/siniestro/siniestro.component';
import { CotizaComponent } from './main/cotiza/cotiza.component';
import { ProductosComponent } from './inicio/productos/productos.component';
import { TalleresComponent } from './inicio/talleres/talleres.component';
import { PlanPagosComponent } from './main/plan-pagos/plan-pagos.component';
import { CotizacionComponent } from './main/cotizacion/cotizacion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, CotizarComponent, ClienteComponent, HeaderComponent, FooterComponent, PolizaComponent, SiniestroComponent, CotizaComponent, ProductosComponent, TalleresComponent, PlanPagosComponent,CotizacionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'cotizador';
  constructor(private router: Router) { }

  setMostrar() {
    //console.log('ruta acutal -> ' + this.router.url.toString());
    if (this.router.url.toString() == '/inicio' || this.router.url.toString() == '/login' ) {
      return false;
    } else {
      return true;
    }
  }
  ngOnInit() {
    this.setMostrar();
  }
}
