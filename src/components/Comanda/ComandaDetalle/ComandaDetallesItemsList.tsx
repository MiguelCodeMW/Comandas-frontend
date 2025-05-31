// src/components/Comanda/ComandaDetallesItemsList.tsx

import styles from "./ComandaDetalle.module.css";
import { NAMES } from "../../../utils/Constants/text";
import {
  ComandaDetalle,
  ComandaDetallesItemsListProps,
} from "../../../utils/types/ComandaTypes";

function ComandaDetallesItemsList({
  detalles,
  monedaComanda,
}: ComandaDetallesItemsListProps) {
  if (detalles.length === 0) {
    return <p className={styles.message}>{NAMES.DETALLES_NO_DISPONIBLES}</p>;
  }

  return (
    <>
      <h2 className={styles.detallesTitulo}>{NAMES.DETALLES_TITULO}</h2>
      <ul className={styles.detallesLista}>
        {detalles.map((detalle: ComandaDetalle) => (
          <li key={detalle.id} className={styles.detalleItem}>
            <p className={styles.detalleInfo}>
              {NAMES.DETALLES_PRODUCTO} {detalle.producto.nombre}
            </p>
            <p className={styles.detalleInfo}>
              {NAMES.DETALLES_CANTIDAD} {detalle.cantidad}
            </p>
            <p className={styles.detalleInfo}>
              {NAMES.DETALLES_PRECIO_UNITARIO} {monedaComanda}{" "}
              {detalle.producto.precio.toFixed(2)}
            </p>
            <p className={styles.detalleInfo}>
              {NAMES.DETALLES_TOTAL} {monedaComanda}{" "}
              {(detalle.cantidad * detalle.producto.precio).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ComandaDetallesItemsList;
