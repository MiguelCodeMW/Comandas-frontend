import styles from "../Producto.module.css"; // Importa el archivo CSS centralizado
import EliminarProducto from "../EliminarProducto/EliminarProducto";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria_id: number;
}

interface Categoria {
  id: number;
  nombre: string;
}

interface ProductoListProps {
  productos: Producto[];
  categorias: Categoria[];
  onEditProducto: (id: number) => void;
  onDeleteProducto: (id: number) => void;
}

function ProductoList({
  productos,
  categorias,
  onEditProducto,
  onDeleteProducto,
}: ProductoListProps) {
  return (
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
            <button
              onClick={() => onEditProducto(producto.id)}
              className={`${styles.button} ${styles.edit}`}
            >
              Editar
            </button>
            <EliminarProducto
              id={producto.id}
              onProductoEliminado={onDeleteProducto} // Pasa la función correctamente
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProductoList;
