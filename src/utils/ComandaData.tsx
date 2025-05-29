import { DetalleComanda } from "./DetalleComanda";

export type ComandaData = {
  id: number;
  fecha: string;
  estado: string;
  user_id: number;
  detalles: DetalleComanda[];
  moneda_aplicada?: string;
};
