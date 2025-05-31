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

  const monedaDeComanda =
    comanda.moneda_aplicada || localStorage.getItem("moneda") || "€";

  return (
    <div className={styles.comandaDetalleContainer}>
      <h1 className={styles.comandaDetalleTitulo}>
        {NAMES.ID_COMANDA_TITULO} #{comanda.id}
      </h1>
      <p className={styles.comandaDetalleInfo}>Estado: {comanda.estado}</p>
      <p className={styles.comandaDetalleInfo}>
        Fecha: {new Date(comanda.fecha).toLocaleString()}
      </p>

      <ComandaDetallesItemsList
        detalles={comanda.detalles}
        monedaComanda={monedaDeComanda}
      />

      <ComandaResumenTotales
        subtotal={subtotal}
        ivaPorcentaje={ivaPorcentaje}
        totalConIva={totalConIva}
        monedaComanda={monedaDeComanda}
      />

      {mensaje && (
        <p
          className={`${styles.message} ${
            error ? styles.error : styles.success
          }`}
        >
          {mensaje}
        </p>
      )}

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
