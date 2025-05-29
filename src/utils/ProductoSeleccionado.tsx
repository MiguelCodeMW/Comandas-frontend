import { ProductoProps } from "./Producto/ProductoProps";

export type ProductoSeleccionado = ProductoProps & {
  cantidad: number;
};
