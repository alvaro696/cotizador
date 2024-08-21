import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { response } from 'express';
import { Distrito } from '../interfaces/distrito.interface';
import { Ramo } from '../interfaces/ramo.interface';
import { RamoTipo } from '../interfaces/ramotipo.interface';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpClient: HttpClient) { }

  getlistDistritos(): Observable<Distrito[]> {
    let url = `${environment.API_URL}/distrito/listar`;
    //console.log(this.httpClient.get(url));
    return this.httpClient.get(url)
      .pipe(
        map((response: any) => response.data)
      )
  }
  getListRamo(): Observable<Ramo[]> {
    let url = `${environment.API_URL}/ramo/listar`;
    //console.log(this.httpClient.get(url));
    return this.httpClient.get(url)
      .pipe(
        map((response: any) => response.data)
      )
  }
  getListRamoTipos(id_ramo: string): Observable<RamoTipo[]> {
    let url = `${environment.API_URL}/ramo_tipo/listar/${id_ramo}`;
    //console.log(this.httpClient.get(url));
    return this.httpClient.get(url)
      .pipe(
        map((response: any) => response.data)
      )
  }
  postCotizar(data: any): Observable<any> {
    let url = `${environment.API_URL}/cotizacion/cotizar`;
    return this.httpClient.post<any>(url, data);
  }
  postCrear(data: any): Observable<any> {
    let url = `${environment.API_URL}/cotizacion/crear`;
    return this.httpClient.post<any>(url, data);
  }
  postRegistrarse(data: any): Observable<any> {
    let url = `${environment.API_URL}/cliente/crear`;
    return this.httpClient.post<any>(url, data);
  }
  postLogin(data: any): Observable<any> {
    let url = `${environment.API_URL}/login`;
    return this.httpClient.post<any>(url, data);
  }
  logout() {
    const token = localStorage.getItem('authToken');
    let url = `${environment.API_URL}/logout`;
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');
    return this.httpClient.get(url, { headers });
  }

  getMisPolizas(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const id_cliente = localStorage.getItem('id_cliente');

    let url = `${environment.API_URL}/mis_polizas/listar/${id_cliente}`;
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    return this.httpClient.get(url, { headers })
      .pipe(
        map((response: any) => response.data)
      )
  }

  getMisCotizaciones(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const id_cliente = localStorage.getItem('id_cliente');

    let url = `${environment.API_URL}/mis_cotizaciones/listar/${id_cliente}`;
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    return this.httpClient.get(url, { headers })
      .pipe(
        map((response: any) => response.data)
      )
  }

  getMiCotizacion(id_cotizacion: number): Observable<any> {
    const token = localStorage.getItem('authToken');

    let url = `${environment.API_URL}/mis_cotizaciones/seleccionar/${id_cotizacion}`;
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');

    return this.httpClient.get(url, { headers })
      .pipe(
        map((response: any) => response.data)
      )
  }

  postCrearPoliza(data: any, id_cotizacion: number): Observable<any> {
    const token = localStorage.getItem('authToken');

    let url = `${environment.API_URL}/mis_polizas/crear/${id_cotizacion}`;
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');
    return this.httpClient.post<any>(url, data, { headers });
  }
}
