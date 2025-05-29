import { useNavigate } from "react-router-dom";
import Button from "../../Button/Button";
import styles from "./ComandaDetalle.module.css";
import { ROUTES } from "../../../utils/Constants/routes";
import { NAMES } from "../../../utils/Constants/text";
// import { ComandaData } from "../../../hooks/useComandaDetalle";
import { ComandaAccionesButtonsProps } from "../../../utils/Comanda/ComandaAccionesButtonsProps";

// interface User {
//   role: string;
// }
// interface ComandaAccionesButtonsProps {
//   comanda: ComandaData | null;
//   user: User | null;
//   onEditar: () => void;
//   onPagar: () => void;
//   onBorrar: () => void;
// }

function ComandaAccionesButtons({
  comanda,
  user,
  onEditar,
  onPagar,
  onBorrar,
}: ComandaAccionesButtonsProps) {
  const navigate = useNavigate();

  if (!comanda) return null;

  return (
    <div className={styles.accionesContainer}>
      <Button
        text={NAMES.VOLVER}
        onClick={() => navigate(ROUTES.DASHBOARD)}
        className={`${styles.button} ${styles.dashboardButton}`}
      />
      {comanda.estado !== "cerrada" && (
        <Button
          text={NAMES.ID_COMANDA_EDITAR}
          onClick={onEditar}
          className={`${styles.button} ${styles.editarButton}`}
        />
      )}
      {comanda.estado !== "cerrada" && (
        <Button
          text={NAMES.COMANDA_PAGAR}
          onClick={onPagar}
          className={`${styles.button} ${styles.pagarButton}`}
        />
      )}
      {user?.role === NAMES.ROL_ADMIN && comanda.estado !== "cerrada" && (
        <Button
          text={NAMES.COMANDA_BUTTON_BORRAR}
          onClick={onBorrar}
          className={`${styles.button} ${styles.borrarButton}`}
        />
      )}
    </div>
  );
}

export default ComandaAccionesButtons;
