import { Component } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { BackendService } from '../../services/backend.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router, private apiService: BackendService) {
  }
  logout() {
    const token = localStorage.getItem('authToken');
    const id_cliente = localStorage.getItem('id_cliente');

    this.apiService.logout().subscribe((response) => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('id_cliente');
      const res = response;
      console.log(response);
      this.router.navigateByUrl('inicio');
    }, (error) => {
      console.error('Error al enviar los datos', error);
    });
  }
}
