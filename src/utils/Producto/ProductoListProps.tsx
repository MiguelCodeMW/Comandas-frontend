import { Categoria } from "../Categoria/CategoriaProps";
import { ProductoProps } from "./ProductoProps";

export type ProductoListProps = {
  productos: ProductoProps[];
  categorias: Categoria[];
  onEditProducto: (id: number) => void;
  onDeleteProducto: (id: number) => void;
};
