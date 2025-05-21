import styles from "../../Comanda/Comandas.module.css";
import { ProductoSelectorListProps } from "../../../utils/Producto/ProductoSelectorListProps";

function ProductoSelectorList({
  productos,
  onProductoClick,
}: ProductoSelectorListProps) {
  if (productos.length === 0) {
    return <p className={styles.message}>No hay productos disponibles.</p>;
  }

  return (
    <ul className={styles.productosGrid}>
      {productos.map((producto) => (
        <li
          key={producto.id}
          className={styles.productItem}
          onClick={() => onProductoClick(producto)}
        >
          <span className={styles.productName}>
            {producto.nombre} - ${producto.precio.toFixed(2)}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default ProductoSelectorList;
