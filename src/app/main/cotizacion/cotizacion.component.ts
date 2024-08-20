import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cotizacion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cotizacion.component.html',
  styleUrl: './cotizacion.component.css'
})
export class CotizacionComponent implements OnInit {

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private apiService: BackendService, private router: Router) {

  }

  public id_cotizacion: number = 0;
  public nombre: String = '';
  public ramo: String = '';
  public ramo_tipo: String = '';
  public distrito: String = '';
  public prima: number = 0;
  public valor_asegurado: number = 0;
  public cotizacion: any[] = [];

  miFormulario = new FormGroup({
    clase: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    placa: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    uso: new FormControl('', Validators.required),
    tipo_pago: new FormControl('', Validators.required),
    foto_frontal: new FormControl('', Validators.required),
    foto_lateral: new FormControl('', Validators.required),
    foto_trasera: new FormControl('', Validators.required),
  });

  imagenes: File[] = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id_cotizacion = params['id_cotizacion'];
      console.log('esta es el id cotizacion-> ' + this.id_cotizacion);
    });
    this.apiService.getMiCotizacion(this.id_cotizacion).subscribe((response => {
      this.cotizacion = response;
      this.valor_asegurado = response.valor_asegurado;
      this.prima = response.prima;
      this.ramo_tipo = response.ramo_tipo;
      this.ramo = response.ramo;
      this.nombre = response.nombres + ' ' + response.primer_apellido + ' ' + response.segundo_apellido;
      this.distrito = response.distrito;
      console.log(this.cotizacion);
    }))
  }
  onFileChange(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.imagenes[index - 1] = file;
    }
  }
  onSubmit() {
    if (this.miFormulario.valid) {
      const formData: FormData = new FormData();
      formData.append('clase', this.miFormulario.get('clase')?.value || '');
      formData.append('marca', this.miFormulario.get('marca')?.value || '');
      formData.append('modelo', this.miFormulario.get('modelo')?.value || '');
      formData.append('placa', this.miFormulario.get('placa')?.value || '');
      formData.append('uso', this.miFormulario.get('uso')?.value || '');
      formData.append('color', this.miFormulario.get('color')?.value || '');
      formData.append('tipo_pago', this.miFormulario.get('tipo_pago')?.value || '');

      formData.append('foto_frontal', this.imagenes[0] || '');
      formData.append('foto_lateral', this.imagenes[1] || '');
      formData.append('foto_trasera', this.imagenes[2] || '');

      console.log(formData);
      this.apiService.postCrearPoliza(formData, this.id_cotizacion).subscribe((response) => {
        const res = response;
        console.log(response);
        this.router.navigateByUrl('polizas');
      }, (error) => {
        console.error('Error al enviar los datos', error);
      });

    } else {
      console.log('Formulario no válido');
    }

  }

}
