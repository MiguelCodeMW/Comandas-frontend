import { ProductoProps } from "./ProductoProps";

export type ProductoSelectorListProps = {
  productos: ProductoProps[];
  onProductoClick: (producto: ProductoProps) => void;
};
