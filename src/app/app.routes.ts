import { Routes } from '@angular/router';
import { ClienteComponent } from './main/cliente/cliente.component';
import { CotizaComponent } from './main/cotiza/cotiza.component';
import { ProductosComponent } from './inicio/productos/productos.component';
import { TalleresComponent } from './inicio/talleres/talleres.component';
import { ContactosComponent } from './inicio/contactos/contactos.component';
import { PolizaComponent } from './main/poliza/poliza.component';
import { SiniestroComponent } from './main/siniestro/siniestro.component';
import { PlanPagosComponent } from './main/plan-pagos/plan-pagos.component';
import { CotizacionesComponent } from './main/cotizaciones/cotizaciones.component';
import { CotizarComponent } from './inicio/cotizar/cotizar.component';
import { LoginComponent } from './auth/login/login.component';
import { CotizacionComponent } from './main/cotizacion/cotizacion.component';

export const routes: Routes = [
    {
        path: 'inicio', component: CotizarComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'cliente', component: ClienteComponent
    },
    {
        path: 'continuar_cotizacion/:prima/:id_cotizacion', component: ClienteComponent
    },
    {
        path: 'cotizar', component: CotizaComponent
    },
    {
        path: 'cotizacion/:id_cotizacion', component: CotizacionComponent
    },
    /*     {
            path: '**', redirectTo: 'inicio'
        }, */
    {
        path: 'productos', component: ProductosComponent
    },
    {
        path: 'talleres', component: TalleresComponent
    },
    {
        path: 'contactanos', component: ContactosComponent
    },
    {
        path: 'polizas', component: PolizaComponent
    },
    {
        path: 'siniestros/:id_poliza', component: SiniestroComponent
    },
    {
        path: 'plan_pagos', component: PlanPagosComponent
    },
    {
        path: 'cotizaciones', component: CotizacionesComponent
    }
];
