import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocialLoginModule, SocialAuthService, FacebookLoginProvider, GoogleLoginProvider } from '@abacritt/angularx-social-login'

import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SocialLoginModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: BackendService, private router: Router) { }

  mensaje: String = '';
  id_cotizacion: String = '';

  miFormulario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.mensaje = params['success'];
      console.log('esta llega-> ' + this.mensaje);
    });
  }
  onSubmit() {
    if (this.miFormulario.valid) {
      const formularioData = this.miFormulario.value;
      console.log(formularioData);
      this.apiService.postLogin(formularioData).subscribe((response) => {
        console.log(response);
        const token = response.token;
        const id_cliente = response.id_cliente;

        localStorage.setItem('authToken', token);
        localStorage.setItem('id_cliente', id_cliente);

        console.log('Token guardado:', token);
        console.log('cliente guardado:', id_cliente);

        this.router.navigateByUrl('polizas');
      }, (error) => {
        console.error('Error al enviar los datos', error);
      });
    } else {
      console.log('Formulario no válido');
    }
  }

}
