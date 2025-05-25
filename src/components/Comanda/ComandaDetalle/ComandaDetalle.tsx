// import React from "react";
// import styles from "./ComandaDetalle.module.css";
// import { NAMES } from "../../../utils/Constants/text";
// import { useComandaDetalle } from "../../../hooks/useComandaDetalle";
// import ComandaDetallesItemsList from "./ComandaDetallesItemsList";
// import ComandaResumenTotales from "./ComandaResumenTotales";
// import ComandaAccionesButtons from "./ComandaAccionesButtons";

// function ComandaDetalle() {
//   const {
//     comanda,
//     subtotal,
//     ivaPorcentaje,
//     totalConIva,
//     mensaje,
//     error,
//     loading,
//     user,
//     handleEditarComanda,
//     handlePagarComanda,
//     handleBorrarComanda,
//   } = useComandaDetalle();

//   if (loading) {
//     return <div className={styles.message}>{NAMES.COMANDA_CARGANDO}</div>;
//   }

//   if (error || !comanda) {
//     return (
//       <div className={styles.messageContainer}>
//         {error ? `Error: ${error}` : NAMES.COMANDA_NO_ENCONTRADA}
//       </div>
//     );
//   }

//   return (
//     <div className={styles.comandaDetalleContainer}>
//       <h1 className={styles.comandaDetalleTitulo}>
//         {NAMES.ID_COMANDA_TITULO} #{comanda.id}
//       </h1>
//       <p className={styles.comandaDetalleInfo}>Estado: {comanda.estado}</p>
//       <p className={styles.comandaDetalleInfo}>
//         Fecha: {new Date(comanda.fecha).toLocaleString()}
//       </p>

//       {/* Lista de detalles */}
//       <ComandaDetallesItemsList detalles={comanda.detalles} />

//       {/* Resumen de totales */}
//       <ComandaResumenTotales
//         subtotal={subtotal}
//         ivaPorcentaje={ivaPorcentaje}
//         totalConIva={totalConIva}
//       />

//       {/* Mensaje de éxito o error */}
//       {mensaje && (
//         <p
//           className={`${styles.message} ${
//             error ? styles.error : styles.success
//           }`}
//         >
//           {mensaje}
//         </p>
//       )}

//       {/* Botones de acciones */}
//       <ComandaAccionesButtons
//         comanda={comanda}
//         user={user}
//         onEditar={handleEditarComanda}
//         onPagar={handlePagarComanda}
//         onBorrar={handleBorrarComanda}
//       />
//     </div>
//   );
// }

// export default ComandaDetalle;
import React from "react";
import styles from "./ComandaDetalle.module.css";
import { NAMES } from "../../../utils/Constants/text";
import { useComandaDetalle } from "../../../hooks/useComandaDetalle";
import ComandaDetallesItemsList from "./ComandaDetallesItemsList";
import ComandaResumenTotales from "./ComandaResumenTotales";
import ComandaAccionesButtons from "./ComandaAccionesButtons";

function ComandaDetalle() {
  const {
    comanda,
    subtotal,
    ivaPorcentaje,
    totalConIva,
    mensaje,
    error,
    loading,
    user,
    handleEditarComanda,
    handlePagarComanda,
    handleBorrarComanda,
  } = useComandaDetalle();

  if (loading) {
    return <div className={styles.message}>{NAMES.COMANDA_CARGANDO}</div>;
  }

  if (error || !comanda) {
    return (
      <div className={styles.messageContainer}>
        {error ? `Error: ${error}` : NAMES.COMANDA_NO_ENCONTRADA}
      </div>
    );
  }

  return (
    <div className={styles.comandaDetalleContainer}>
      <h1 className={styles.comandaDetalleTitulo}>
        {NAMES.ID_COMANDA_TITULO} #{comanda.id}
      </h1>
      <p className={styles.comandaDetalleInfo}>Estado: {comanda.estado}</p>
      <p className={styles.comandaDetalleInfo}>
        Fecha: {new Date(comanda.fecha).toLocaleString()}
      </p>

      {/* Lista de detalles */}
      <ComandaDetallesItemsList detalles={comanda.detalles} />

      {/* Resumen de totales */}
      <ComandaResumenTotales
        subtotal={subtotal}
        ivaPorcentaje={ivaPorcentaje}
        totalConIva={totalConIva}
      />

      {/* Mensaje de éxito o error */}
      {mensaje && (
        <p
          className={`${styles.message} ${
            error ? styles.error : styles.success
          }`}
        >
          {mensaje}
        </p>
      )}

      {/* Botones de acciones */}
      <ComandaAccionesButtons
        comanda={comanda}
        user={user}
        onEditar={handleEditarComanda}
        onPagar={handlePagarComanda}
        onBorrar={handleBorrarComanda}
      />
    </div>
  );
}

export default ComandaDetalle;
