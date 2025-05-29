import { CategoriaProps } from "../Categoria/CategoriaProps";
import { ProductoProps } from "./ProductoProps";

export type ProductoListProps = {
  // productos: ProductoProps[];
  // categorias: Categoria[];
  // onEditProducto: (id: number) => void;
  // onDeleteProducto: (id: number) => void;
  productos: ProductoProps[];
  categorias: CategoriaProps[];
  onDeleteProducto: (id: number, errorMessage: string | null) => void;
  // Nuevas props para la edición inline
  editandoProductoId: number | null;
  onSetEditandoProductoId: (id: number | null) => void;
  onProductoEditado: () => void;
  onCancelarEdicion: () => void;
};
