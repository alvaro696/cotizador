import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: BackendService, private router: Router) { }

  miFormulario = new FormGroup({
    nombres: new FormControl('', Validators.required),
    primer_apellido: new FormControl('', Validators.required),
    segundo_apellido: new FormControl(''),
    direccion: new FormControl('', Validators.required),
    nro_documento: new FormControl('', Validators.required),
    complemento: new FormControl(''),
    lugar_expedicion: new FormControl(''),
    celular: new FormControl('', Validators.required),
    celular_referencia: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  prima: String = '';
  id_cotizacion: String = '';
  public name: string | null = null;
  public nro_documento: string | null = null;

  onNombres(event: Event): void {
    const elemento = event.target as HTMLSelectElement;
    const nombre = elemento.value;
    this.name = nombre;
  }
  onNroDocumento(event: Event): void {
    const elemento = event.target as HTMLSelectElement;
    const nro_documento = elemento.value;
    this.nro_documento = nro_documento;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.prima = params['prima'];
      this.id_cotizacion = params['id_cotizacion'];
      console.log('esta es la prima-> ' + this.prima);
      console.log('esta es el id cotizacion-> ' + this.id_cotizacion);
    });
  }

  onSubmit() {
    if (this.miFormulario.valid) {
      const formularioData = this.miFormulario.value;
      const jsonData = {
        ...formularioData,
        id_cotizacion: this.id_cotizacion,
        name: this.name,
        password: this.nro_documento,
      };
      console.log(jsonData);
      this.apiService.postRegistrarse(jsonData).subscribe((response) => {
        const res = response;
        console.log(response);
        //console.log(response.data.id_cotizacion);
        //this.router.navigate(['login', response.success]);
        this.router.navigateByUrl('login');
      }, (error) => {
        console.error('Error al enviar los datos', error);
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}
