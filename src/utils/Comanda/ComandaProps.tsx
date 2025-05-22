import { ComandaDetalleProps } from "./ComandaDetalleProps";

export type ComandaProps = {
  id: number;
  fecha: string;
  estado: string;
  user_id: number;
  detalles: ComandaDetalleProps[];
  subtotal?: number;
  iva?: number;
  total_con_iva?: number;
};
