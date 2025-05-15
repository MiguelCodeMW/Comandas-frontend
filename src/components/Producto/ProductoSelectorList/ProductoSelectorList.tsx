import styles from "../Producto.module.css";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria_id: number;
}

interface ProductoSelectorListProps {
  productos: Producto[];
  onProductoClick: (producto: Producto) => void;
}

function ProductoSelectorList({
  productos,
  onProductoClick,
}: ProductoSelectorListProps) {
  if (productos.length === 0) {
    return <p className={styles.message}>No hay productos disponibles.</p>;
  }

  return (
    <ul className={styles.productList}>
      {productos.map((producto) => (
        <li
          key={producto.id}
          className={styles.productItem}
          onClick={() => onProductoClick(producto)}
          style={{ cursor: "pointer" }}
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
