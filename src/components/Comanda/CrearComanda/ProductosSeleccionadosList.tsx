import React from "react";
import styles from "./Comandas.module.css";
import { ProductoSeleccionado } from "../../../hooks/useCrearComanda";

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
              ${(producto.precio * producto.cantidad).toFixed(2)}
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
