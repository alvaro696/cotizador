export interface Pago {
    f_pago: string;
    cuota: number;
    monto: string;
    estado: string;
}

export interface PolizaPago {
    id_cotizacion: number;
    poliza: string;
    tipo_pago: string;
    pagos: Pago[];
}

export interface ApiResponse {
    data: PolizaPago[];
}
