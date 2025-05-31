// src/pages/Comanda/CrearComanda/ProductosSeleccionadosList.tsx

import styles from "./Comandas.module.css";
import { NAMES } from "../../../utils/Constants/text";
import {
  ProductosSeleccionadosListProps,
  ProductoSeleccionado,
} from "../../../utils/types/ComandaTypes";
// Asumo que useDashboard es un hook que te da la moneda global.
// Si no existe, deberías crearlo o pasar la moneda como prop desde un componente padre.
import { useDashboard } from "../../../hooks/useDashboard";

function ProductosSeleccionadosList({
  productos,
  onAumentar,
  onDisminuir,
}: ProductosSeleccionadosListProps) {
  // Asegúrate de que useDashboard devuelve 'moneda'.
  // Si no lo hace, necesitarás ajustarlo o pasar la moneda de otra forma.
  const { moneda } = useDashboard();

  if (productos.length === 0) {
    return <p className={styles.message}>No hay productos seleccionados.</p>;
  }

  return (
    <ul className={styles.seleccionadosLista}>
      {productos.map((producto: ProductoSeleccionado) => (
        <li key={producto.id} className={styles.seleccionadoItem}>
          <div className={styles.selectableWrapper}>
            <span className={styles.seleccionadoInfo}>
              {producto.nombre} - {NAMES.DETALLES_CANTIDAD} {producto.cantidad}{" "}
              - {NAMES.LABEL_PRECIO} {moneda} {producto.precio.toFixed(2)} -{" "}
              {NAMES.COMANDA_PRECIO_TOTAL} {moneda}
              {(producto.precio * producto.cantidad).toFixed(2)}{" "}
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
