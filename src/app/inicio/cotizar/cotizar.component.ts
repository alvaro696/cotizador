import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import { Distrito } from '../../interfaces/distrito.interface';
import { Ramo } from '../../interfaces/ramo.interface';
import { RamoTipo } from '../../interfaces/ramotipo.interface';
@Component({
  selector: 'app-cotizar',
  standalone: true,
  imports: [],
  templateUrl: './cotizar.component.html',
  styleUrl: './cotizar.component.css'
})
export class CotizarComponent implements OnInit {
  public distritos: Distrito[] = [];
  public ramos: Ramo[] = [];
  public tipos: RamoTipo[] = [];
  public res: any[] = [];
  public apiResponsePrima: number | null = null;

  public selectedRamo: string | null = null;
  public selectedTipo: string | null = null;
  public selectedDistrito: string | null = null;
  public valorAsegurado: number | null = null;
  public prima: number | null = null;
  public nombreCompleto: string | null = null;
  public celular: number | null = null;


  constructor(private apiService: BackendService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.getlistDistritos().subscribe((distritos: Distrito[]) => {
      this.distritos = distritos;
      //console.log(this.data);
    });
    this.apiService.getListRamo().subscribe((ramo: Ramo[]) => {
      this.ramos = ramo;
      //console.log(this.data);
    });
  }
  navLogin() {
    this.router.navigateByUrl('login');
  }
  onRamoChange(event: Event): void {
    console.log("cambio de select");
    //const id_ramo = (event.target as HTMLSelectElement)?.value;
    const elemento = event.target as HTMLSelectElement;
    const id_ramo = elemento.value;
    this.selectedRamo = id_ramo;
    if (id_ramo) {
      this.apiService.getListRamoTipos(id_ramo).subscribe((tipos: RamoTipo[]) => {
        this.tipos = tipos;
        console.log(this.tipos);
      });
    }
  }
  onTipoChange(event: Event): void {
    const elemento = event.target as HTMLSelectElement;
    const ramo_tipo = elemento.value;
    this.selectedTipo = ramo_tipo;
  }
  onDistritoChange(event: Event): void {
    const elemento = event.target as HTMLSelectElement;
    const distrito = elemento.value;
    this.selectedDistrito = distrito;
  }
  onValorAseguradoChange(event: Event): void {
    const elemento = event.target as HTMLSelectElement;
    const valor_asegurado = elemento.value;
    this.valorAsegurado = parseFloat(valor_asegurado);
  }
  submitData() {
    console.log("click cotizar");
    const formData = {
      ramo_tipo: this.selectedTipo,
      distrito: this.selectedDistrito,
      valor_asegurado: this.valorAsegurado,
    };
    console.log(formData);
    this.apiService.postCotizar(formData).subscribe((response) => {
      this.apiResponsePrima = response.data.prima.toFixed(2);
      console.log(response.data.prima);
    }, (error) => {
      console.error('Error al enviar los datos', error);
    });
  }

  onNombreCompleto(event: Event): void {
    const elemento = event.target as HTMLSelectElement;
    const nombre = elemento.value;
    this.nombreCompleto = nombre;
  }
  onCelular(event: Event): void {
    const elemento = event.target as HTMLSelectElement;
    const celular = elemento.value;
    this.celular = parseInt(celular);
  }
  submitForm() {
    console.log("click crear cotizacion");
    const formData = {
      id_ramo_tipo: this.selectedTipo,
      id_distrito: this.selectedDistrito,
      valor_asegurado: this.valorAsegurado,
      prima: this.apiResponsePrima,
      nombreCompleto: this.nombreCompleto,
      celular: this.celular,
    };
    console.log(formData);
    this.apiService.postCrear(formData).subscribe((response) => {
      this.res = response;
      console.log(this.res);
      console.log(response.data.id_cotizacion);
      this.router.navigate(['continuar_cotizacion', this.apiResponsePrima, response.data.id_cotizacion]);
    }, (error) => {
      console.error('Error al enviar los datos', error);
    });

  }
}
