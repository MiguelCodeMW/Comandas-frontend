import { Categoria } from "./Categoria";
import { Producto } from "./Producto";

export type ProductoListProps = {
  productos: Producto[];
  categorias: Categoria[];
  onEditProducto: (id: number) => void;
  onDeleteProducto: (id: number) => void;
};
