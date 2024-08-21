import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-poliza',
  standalone: true,
  imports: [],
  templateUrl: './poliza.component.html',
  styleUrl: './poliza.component.css'
})
export class PolizaComponent implements OnInit {

  constructor(private apiService: BackendService, private router: Router) { }

  public polizas: any[] = [];

  ngOnInit() {
    this.apiService.getMisPolizas().subscribe((response) => {
      this.polizas = response;
      console.log(this.polizas);
    });
  }
  crearSiniestro($id_poliza: number) {
    console.log("id_poliza -> ", $id_poliza);
    this.router.navigate(['siniestros', $id_poliza])
  }
}
