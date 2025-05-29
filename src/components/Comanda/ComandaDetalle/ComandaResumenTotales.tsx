import styles from "./ComandaDetalle.module.css";
import { NAMES } from "../../../utils/Constants/text";
import { ComandaResumenTotalesProps } from "../../../utils/Comanda/ComandaResumenTotalesProps";

// interface ComandaResumenTotalesProps {
//   subtotal: number;
//   ivaPorcentaje: number; // ej: 0.21
//   totalConIva: number;
//   monedaComanda: string | null; // Moneda específica para esta comanda
// }

function ComandaResumenTotales({
  subtotal,
  ivaPorcentaje,
  totalConIva,
  monedaComanda,
}: ComandaResumenTotalesProps) {
  return (
    <div className={styles.totalesBox}>
      <p className={styles.detalleInfo}>
        {NAMES.SUBTOTAL} {monedaComanda}
        {/* {NAMES.SUBTOTAL} {monedaComanda || "$"} */}
        {subtotal.toFixed(2)}
      </p>
      <p className={styles.detalleInfo}>
        IVA ({(ivaPorcentaje * 100).toFixed(0)}%): {monedaComanda}
        {(subtotal * ivaPorcentaje).toFixed(2)}
        {/* IVA ({(ivaPorcentaje * 100).toFixed(0)}%): {monedaComanda || "$"}
        {(subtotal * ivaPorcentaje).toFixed(2)} */}
      </p>
      <p className={styles.detalleInfo}>
        <strong>
          {NAMES.TOTAL_CON_IVA} {monedaComanda}
          {/* {NAMES.TOTAL_CON_IVA} {monedaComanda || "$"} */}
          {totalConIva.toFixed(2)}
        </strong>
      </p>
    </div>
  );
}

export default ComandaResumenTotales;
