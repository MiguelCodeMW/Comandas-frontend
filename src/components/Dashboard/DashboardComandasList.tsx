import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
// import { ComandaDashboard } from "../../hooks/useDashboard";
import { ROUTES } from "../../utils/Constants/routes";
import { NAMES } from "../../utils/Constants/text";
import { DashboardComandasListProps } from "../../utils/Dashboard/DashboardComandasList";

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
      {comandas.map((comanda) => (
        <li
          key={comanda.id}
          className={`${styles.item} ${styles[comanda.estado]}`}
          onClick={() =>
            navigate(
              ROUTES.COMANDA_DETAIL.replace(":id", comanda.id.toString())
            )
          }
        >
          <h3 className={styles.itemTitle}>Comanda #{comanda.id}</h3>
          <p className={styles.itemText}>Estado: {comanda.estado}</p>
          <p className={styles.itemText}>
            Fecha: {new Date(comanda.fecha).toLocaleString()}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default DashboardComandasList;
