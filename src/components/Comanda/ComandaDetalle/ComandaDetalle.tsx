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
    // Asegúrate de que useComandaDetalle devuelva la moneda de la comanda
    // Si tu useComandaDetalle no la devuelve, tendrás que añadirla allí.
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

  // Obtenemos la moneda de la comanda. Si no está definida, usamos un valor por defecto, por ejemplo, "€" o "EUR".
  // Idealmente, el backend ya devolvería la moneda_aplicada de la comanda.
  const monedaDeComanda =
    // comanda.moneda_aplicada || localStorage.getItem("moneda") || "€"; // Si el backend no la devuelve, usa la de localStorage o un default
    comanda.moneda_aplicada || localStorage.getItem("moneda");
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
      <ComandaDetallesItemsList
        detalles={comanda.detalles}
        monedaComanda={monedaDeComanda}
      />

      {/* Resumen de totales */}
      <ComandaResumenTotales
        subtotal={subtotal}
        ivaPorcentaje={ivaPorcentaje}
        totalConIva={totalConIva}
        monedaComanda={monedaDeComanda}
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
