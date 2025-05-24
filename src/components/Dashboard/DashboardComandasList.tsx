import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css"; // Asumiendo estilos compartidos
import { ComandaDashboard } from "../../hooks/useDashboard";
import { ROUTES } from "../../utils/Constants/routes";

interface DashboardComandasListProps {
  comandas: ComandaDashboard[];
  mostrarPagadas: boolean; // Para el mensaje de "no hay comandas"
}

function DashboardComandasList({
  comandas,
  mostrarPagadas,
}: DashboardComandasListProps) {
  const navigate = useNavigate();

  if (comandas.length === 0) {
    return (
      <p className={styles.message}>
        {mostrarPagadas
          ? "No hay comandas pagadas."
          : "No hay comandas pendientes de pago."}
      </p>
    );
  }

  return (
    <ul className={styles.list}>
      {comandas.map((comanda) => (
        <li
          key={comanda.id}
          className={`${styles.item} ${styles[comanda.estado]}`} // Asumiendo clases .abierta y .cerrada
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
