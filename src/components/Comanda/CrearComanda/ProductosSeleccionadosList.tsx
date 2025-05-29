import styles from "./Comandas.module.css";
import { ProductoSeleccionado } from "../../../hooks/useCrearComanda";
import { useDashboard } from "../../../hooks/useDashboard"; // Importa useDashboard

interface ProductosSeleccionadosListProps {
  productos: ProductoSeleccionado[];
  onAumentar: (id: number) => void;
  onDisminuir: (id: number) => void;
}

function ProductosSeleccionadosList({
  productos,
  onAumentar,
  onDisminuir,
}: ProductosSeleccionadosListProps) {
  const { moneda } = useDashboard(); // Obtén la moneda del hook

  if (productos.length === 0) {
    return <p className={styles.message}>No hay productos seleccionados.</p>;
  }

  return (
    <ul className={styles.seleccionadosLista}>
      {productos.map((producto) => (
        <li key={producto.id} className={styles.seleccionadoItem}>
          <div className={styles.selectableWrapper}>
            <span className={styles.seleccionadoInfo}>
              {producto.nombre} - Cantidad: {producto.cantidad} - Precio Total:
              {producto.nombre} - Cantidad: {producto.cantidad} - Precio Total:{" "}
              {moneda || "$"}
              {(producto.precio * producto.cantidad).toFixed(2)}{" "}
              {/* Usa la moneda */}{" "}
            </span>
            <div className={styles.seleccionadoControles}>
              <button
                className={styles.controlBtn}
                onClick={() => onAumentar(producto.id)}
              >
                +
              </button>
              <button
                className={styles.controlBtn}
                onClick={() => onDisminuir(producto.id)}
              >
                −
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProductosSeleccionadosList;
