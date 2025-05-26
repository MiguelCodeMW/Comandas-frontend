import styles from "../Comanda/CrearComanda/Comandas.module.css";
import { ProductoSelectorListProps } from "../../utils/Producto/ProductoSelectorListProps";
import { NAMES } from "../../utils/Constants/text";

function ProductoSelectorList({
  productos,
  onProductoClick,
}: ProductoSelectorListProps) {
  if (productos.length === 0) {
    return <p className={styles.message}>{NAMES.PRODUCTOS_NO_DISPONIBLES}</p>;
  }

  return (
    <ul className={styles.productosLista}>
      {productos.map((producto) => (
        <li
          key={producto.id}
          className={styles.productoItem}
          onClick={() => onProductoClick(producto)}
        >
          <div className={styles.productoInfo}>{producto.nombre}</div>
          <div className={styles.productoPrecio}>
            ${producto.precio.toFixed(2)}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProductoSelectorList;
