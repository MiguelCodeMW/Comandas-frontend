import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { ComandaDashboard } from "../../utils/types/ComandaTypes"; // Asegúrate de que incluya mesa y mesa_id
import { ROUTES } from "../../utils/Constants/routes";
import { NAMES } from "../../utils/Constants/text";
import { DashboardComandasListProps } from "../../utils/types/ComandaTypes";

function DashboardComandasList({
  comandas,
  mostrarPagadas,
}: DashboardComandasListProps) {
  const navigate = useNavigate();

  if (comandas.length === 0) {
    return (
      <p className={styles.message}>
        {mostrarPagadas
          ? NAMES.DASHBOARD_NO_COMANDAS_PAGADAS
          : NAMES.DASHBOARD_NO_COMANDAS_PENDIENTES}
      </p>
    );
  }

  return (
    <ul className={styles.list}>
      {comandas.map(
        (
          comanda: ComandaDashboard // Tipar 'comanda' explícitamente
        ) => (
          <li
            key={comanda.id}
            className={`${styles.item} ${styles[comanda.estado]}`}
            onClick={() =>
              navigate(
                ROUTES.COMANDA_DETAIL.replace(":id", comanda.id.toString())
              )
            }
          >
            {/* <h3 className={styles.itemTitle}>Comanda #{comanda.id}</h3> */}
            {comanda.mesa
              ? `${NAMES.COMANDA} - ${NAMES.MESA} ${comanda.mesa.numero}` // Si tiene mesa: "Comanda - Mesa X"
              : `${NAMES.COMANDA} #${comanda.id}`}
            <p className={styles.itemText}>Estado: {comanda.estado}</p>
            <p className={styles.itemText}>
              Fecha: {new Date(comanda.fecha).toLocaleString()}
            </p>
            {comanda.usuario?.name && (
              <p className={styles.itemText}>Usuario: {comanda.usuario.name}</p>
            )}
            {/* NUEVO: Mostrar la mesa si está asignada */}
            {comanda.mesa && comanda.mesa.numero && (
              <p className={styles.itemText}>
                {NAMES.MESA}: {comanda.mesa.numero}
              </p>
            )}
            {/* Opcional: Mostrar el total si está disponible */}
            {comanda.total_con_iva !== undefined && (
              <p className={styles.itemText}>
                Total: {comanda.total_con_iva.toFixed(2)}{" "}
                {comanda.moneda_aplicada ||
                  localStorage.getItem("moneda_global") ||
                  "€"}
              </p>
            )}
          </li>
        )
      )}
    </ul>
  );
}

export default DashboardComandasList;
