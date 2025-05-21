import { Producto } from "../Producto";

export type EditarProductoProps = {
  id: number;
  nombreInicial: string;
  precioInicial: number;
  categoriaIdInicial: number | null;
  categorias: { id: number; nombre: string }[];
  onProductoEditado: (productoEditado: Producto) => void; // Ahora acepta un argumento
};
