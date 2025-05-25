// import React from "react";
// import styles from "./ComandaDetalle.module.css";

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
//   return (
//     <div className={styles.totalesBox}>
//       <p className={styles.detalleInfo}>Subtotal: ${subtotal.toFixed(2)}</p>
//       <p className={styles.detalleInfo}>
//         IVA ({(ivaPorcentaje * 100).toFixed(0)}%): $
//         {(subtotal * ivaPorcentaje).toFixed(2)}
//       </p>
//       <p className={styles.detalleInfo}>
//         <strong>Total con IVA: ${totalConIva.toFixed(2)}</strong>
//       </p>
//     </div>
//   );
// }

// export default ComandaResumenTotales;
import React from "react";
import styles from "./ComandaDetalle.module.css";

interface ComandaResumenTotalesProps {
  subtotal: number;
  ivaPorcentaje: number; // ej: 0.21
  totalConIva: number;
}

function ComandaResumenTotales({
  subtotal,
  ivaPorcentaje,
  totalConIva,
}: ComandaResumenTotalesProps) {
  return (
    <div className={styles.totalesBox}>
      <p className={styles.detalleInfo}>Subtotal: ${subtotal.toFixed(2)}</p>
      <p className={styles.detalleInfo}>
        IVA ({(ivaPorcentaje * 100).toFixed(0)}%): $
        {(subtotal * ivaPorcentaje).toFixed(2)}
      </p>
      <p className={styles.detalleInfo}>
        <strong>Total con IVA: ${totalConIva.toFixed(2)}</strong>
      </p>
    </div>
  );
}

export default ComandaResumenTotales;
