// import styles from "./ComandaDetalle.module.css";
// import { useDashboard } from "../../../hooks/useDashboard"; // Importa useDashboard
// import { NAMES } from "../../../utils/Constants/text";

// interface ComandaResumenTotalesProps {
//   subtotal: number;
//   ivaPorcentaje: number; // ej: 0.21
//   totalConIva: number;
// }

// function ComandaResumenTotales({
//   subtotal,
//   ivaPorcentaje,
//   totalConIva,
// }: ComandaResumenTotalesProps) {
//   const { moneda } = useDashboard(); // Obtén la moneda del hook

//   // return (
//   //   <div className={styles.totalesBox}>
//   //     <p className={styles.detalleInfo}>Subtotal: ${subtotal.toFixed(2)}</p>
//   //     <p className={styles.detalleInfo}>
//   //       IVA ({(ivaPorcentaje * 100).toFixed(0)}%): $
//   //       {(subtotal * ivaPorcentaje).toFixed(2)}
//   //     </p>
//   //     <p className={styles.detalleInfo}>
//   //       <strong>Total con IVA: ${totalConIva.toFixed(2)}</strong>
//   //     </p>
//   //   </div>
//   // );
//   return (
//     <div className={styles.totalesBox}>
//       <p className={styles.detalleInfo}>
//         {NAMES.SUBTOTAL} {moneda || "$"}
//         {subtotal.toFixed(2)} {/* Usa la moneda */}
//       </p>
//       <p className={styles.detalleInfo}>
//         IVA ({(ivaPorcentaje * 100).toFixed(0)}%): {moneda || "$"}
//         {(subtotal * ivaPorcentaje).toFixed(2)} {/* Usa la moneda */}
//       </p>
//       <p className={styles.detalleInfo}>
//         <strong>
//           {NAMES.TOTAL_CON_IVA} {moneda || "$"}
//           {totalConIva.toFixed(2)} {/* Usa la moneda */}
//         </strong>
//       </p>
//     </div>
//   );
// }

// export default ComandaResumenTotales;
import styles from "./ComandaDetalle.module.css";
import { NAMES } from "../../../utils/Constants/text";

interface ComandaResumenTotalesProps {
  subtotal: number;
  ivaPorcentaje: number; // ej: 0.21
  totalConIva: number;
  monedaComanda: string | null; // Moneda específica para esta comanda
}

function ComandaResumenTotales({
  subtotal,
  ivaPorcentaje,
  totalConIva,
  monedaComanda,
}: ComandaResumenTotalesProps) {
  return (
    <div className={styles.totalesBox}>
      <p className={styles.detalleInfo}>
        {NAMES.SUBTOTAL} {monedaComanda || "$"}
        {subtotal.toFixed(2)}
      </p>
      <p className={styles.detalleInfo}>
        IVA ({(ivaPorcentaje * 100).toFixed(0)}%): {monedaComanda || "$"}
        {(subtotal * ivaPorcentaje).toFixed(2)}
      </p>
      <p className={styles.detalleInfo}>
        <strong>
          {NAMES.TOTAL_CON_IVA} {monedaComanda || "$"}
          {totalConIva.toFixed(2)}
        </strong>
      </p>
    </div>
  );
}

export default ComandaResumenTotales;
