import { DetalleComanda } from "../../hooks/useComandaDetalle";

export type ComandaDetallesItemsListProps = {
  detalles: DetalleComanda[];
  monedaComanda: string | null; // Moneda específica para esta comandadetalles: DetalleComanda[];
};
