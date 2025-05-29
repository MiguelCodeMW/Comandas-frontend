export type ComandaResumenTotalesProps = {
  subtotal: number;
  ivaPorcentaje: number; // ej: 0.21
  totalConIva: number;
  monedaComanda: string | null; // Moneda específica para esta comanda
};
