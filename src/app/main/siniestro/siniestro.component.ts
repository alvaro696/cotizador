import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-siniestro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './siniestro.component.html',
  styleUrl: './siniestro.component.css'
})
export class SiniestroComponent implements OnInit {
  imagenes: File[] = [];
  public id_poliza: number = 0;
  public ramo: String = '';
  public cod_poliza: String = '';
  public f_ini: String = '';
  public f_fin: String = '';
  public placa: String = '';
  public foto_frontal: String = '';
  public prima: number = 0;
  public valor_asegurado: number = 0;
  public poliza: any[] = [];

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private apiService: BackendService, private router: Router) { }

  miFormulario = new FormGroup({
    f_siniestro: new FormControl('', Validators.required),
    f_denuncia: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    lugar_siniestro: new FormControl('', Validators.required),
    foto_siniesto: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id_poliza = params['id_poliza'];
      console.log('llega id poliza -> ' + this.id_poliza);
    });
    this.apiService.getMiPoliza(this.id_poliza).subscribe((response => {
      this.poliza = response;
      this.valor_asegurado = response.valor_asegurado;
      this.prima = response.prima;
      this.ramo = response.ramo;
      this.f_ini = response.f_ini;
      this.f_fin = response.f_fin;
      this.cod_poliza = response.cod_poliza;
      this.placa = response.items[0].placa;
      this.foto_frontal = response.items[0].foto_frontal;
      console.log(this.foto_frontal);
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
      formData.append('f_siniestro', this.miFormulario.get('f_siniestro')?.value || '');
      formData.append('f_denuncia', this.miFormulario.get('f_denuncia')?.value || '');
      formData.append('descripcion', this.miFormulario.get('descripcion')?.value || '');
      formData.append('lugar_siniestro', this.miFormulario.get('lugar_siniestro')?.value || '');

      formData.append('foto_siniesto', this.imagenes[0] || '');

      console.log(formData);
      this.apiService.postCrearSiniestro(formData, this.id_poliza).subscribe((response) => {
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
