export interface Cotizacion {
    id_cotizacion: number,
    id_cliente: number,
    id_distrito: number,
    id_ramo_tipo: number,
    id_estado: number,
    valor_asegurado: number,
    tasa: number,
    prima: number,
    f_cotizacion: string,
    created_at: string,
    updated_at: string,
}