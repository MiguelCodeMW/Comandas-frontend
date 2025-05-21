import styles from "../Producto.module.css";
import EliminarProducto from "../EliminarProducto/EliminarProducto";
import { ProductoListProps } from "../../../utils/Producto/ProductoListProps";
import Button from "../../Button/Button";
import { NAMES } from "../../../utils/Constants/text";

function ProductoList({
  productos,
  categorias,
  onEditProducto,
  onDeleteProducto,
}: ProductoListProps) {
  return productos.length === 0 ? (
    <p className={styles.message}>{NAMES.PRODUCTOS_NO_DISPONIBLES}</p>
  ) : (
    <ul className={styles.productList}>
      {productos.map((producto) => (
        <li key={producto.id} className={styles.productItem}>
          <span className={styles.productName}>
            {producto.nombre} - ${producto.precio.toFixed(2)} -{" "}
            {
              categorias.find(
                (categoria) => categoria.id === producto.categoria_id
              )?.nombre
            }
          </span>
          <div className={styles.buttonGroup}>
            <Button
              text={NAMES.EDITAR}
              onClick={() => onEditProducto(producto.id)}
              className={[styles.button, styles.edit].join(" ")}
            />
            <EliminarProducto
              id={producto.id}
              onProductoEliminado={onDeleteProducto}
              className={styles.button}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProductoList;
