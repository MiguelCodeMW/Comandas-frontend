import styles from "../Producto.module.css";
import EliminarProducto from "../EliminarProducto/EliminarProducto";
import { ProductoListProps } from "../../../utils/ProductoListProps";
import Button from "../../Button/Button";

function ProductoList({
  productos,
  categorias,
  onEditProducto,
  onDeleteProducto,
}: ProductoListProps) {
  return productos.length === 0 ? (
    <p className={styles.message}>No hay productos disponibles.</p>
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
              text="Editar"
              onClick={() => onEditProducto(producto.id)}
              className={[styles.button, styles.edit].join(" ")} // Concatenamos las clases correctamente
            />
            <EliminarProducto
              id={producto.id}
              onProductoEliminado={onDeleteProducto}
              className={styles.button} // Aseguramos que use los mismos estilos base
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProductoList;
