// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "../../Button/Button";
// import styles from "./ComandaDetalle.module.css";
// import { ROUTES } from "../../../utils/Constants/routes";
// import { NAMES } from "../../../utils/Constants/text";
// import { ComandaData } from "../../../hooks/useComandaDetalle"; // Asumiendo que UserType está definido

// interface User {
//   // Define una interfaz básica para user si no la tienes global
//   role: string;
//   // otras propiedades del usuario
// }
// interface ComandaAccionesButtonsProps {
//   comanda: ComandaData | null;
//   user: User | null;
//   onEditar: () => void;
//   onPagar: () => void;
//   onBorrar: () => void;
// }

// function ComandaAccionesButtons({
//   comanda,
//   user,
//   onEditar,
//   onPagar,
//   onBorrar,
// }: ComandaAccionesButtonsProps) {
//   const navigate = useNavigate();

//   if (!comanda) return null;

//   return (
//     <div className={styles.accionesContainer}>
//       {" "}
//       {/* Necesitarás esta clase en CSS */}
//       <Button
//         text="Volver"
//         onClick={() => navigate(ROUTES.DASHBOARD)}
//         className={styles.dashboardButton}
//       />
//       {comanda.estado !== "cerrada" && (
//         <Button
//           text={NAMES.ID_COMANDA_EDITAR}
//           onClick={onEditar}
//           className={styles.editarButton}
//         />
//       )}
//       {comanda.estado !== "cerrada" && (
//         <Button
//           text={NAMES.COMANDA_PAGAR}
//           onClick={onPagar}
//           className={styles.pagarButton}
//         />
//       )}
//       {user?.role === "admin" && (
//         <Button
//           text="Borrar Comanda"
//           onClick={onBorrar}
//           className={styles.borrarButton}
//         />
//       )}
//     </div>
//   );
// }

// export default ComandaAccionesButtons;
// import { MouseEvent } from "react"; // Necesario para ButtonProps
// import { useNavigate } from "react-router-dom";
// import Button from "../../Button/Button";
// import styles from "./ComandaDetalle.module.css";
// import { ROUTES } from "../../../utils/Constants/routes";
// import { NAMES } from "../../../utils/Constants/text";
// import { ComandaData } from "../../../hooks/useComandaDetalle";

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

// function ComandaAccionesButtons({
//   comanda,
//   user,
//   onEditar,
//   onPagar,
//   onBorrar,
// }: ComandaAccionesButtonsProps) {
//   const navigate = useNavigate();

//   if (!comanda) return null;

//   return (
//     <div className={styles.accionesContainer}>
//       <Button
//         text="Volver"
//         onClick={() => navigate(ROUTES.DASHBOARD)}
//         className={styles.dashboardButton} // Usa la clase específica de este módulo
//       />
//       {comanda.estado !== "cerrada" && (
//         <Button
//           text={NAMES.ID_COMANDA_EDITAR}
//           onClick={onEditar}
//           className={styles.editarButton} // Usa la clase específica
//         />
//       )}
//       {comanda.estado !== "cerrada" && (
//         <Button
//           text={NAMES.COMANDA_PAGAR}
//           onClick={onPagar}
//           className={styles.pagarButton} // Usa la clase específica
//         />
//       )}
//       {user?.role === "admin" && (
//         <Button
//           text="Borrar Comanda"
//           onClick={onBorrar}
//           className={styles.borrarButton} // Usa la clase específica
//         />
//       )}
//     </div>
//   );
// }

// export default ComandaAccionesButtons;
// components/Comanda/ComandaDetalle/ComandaAccionesButtons.tsx
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Button/Button";
import styles from "./ComandaDetalle.module.css";
import { ROUTES } from "../../../utils/Constants/routes";
import { NAMES } from "../../../utils/Constants/text";
import { ComandaData } from "../../../hooks/useComandaDetalle";

interface User {
  role: string;
}
interface ComandaAccionesButtonsProps {
  comanda: ComandaData | null;
  user: User | null;
  onEditar: () => void;
  onPagar: () => void;
  onBorrar: () => void;
}

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
        text="Volver"
        onClick={() => navigate(ROUTES.DASHBOARD)}
        // Aquí se combinan las clases base y específica
        className={`${styles.button} ${styles.dashboardButton}`}
      />
      {comanda.estado !== "cerrada" && (
        <Button
          text={NAMES.ID_COMANDA_EDITAR}
          onClick={onEditar}
          // Aquí se combinan las clases base y específica
          className={`${styles.button} ${styles.editarButton}`}
        />
      )}
      {comanda.estado !== "cerrada" && (
        <Button
          text={NAMES.COMANDA_PAGAR}
          onClick={onPagar}
          // Aquí se combinan las clases base y específica
          className={`${styles.button} ${styles.pagarButton}`}
        />
      )}
      {user?.role === "admin" && comanda.estado !== "cerrada" && (
        <Button
          text="Borrar Comanda"
          onClick={onBorrar}
          // Aquí se combinan las clases base y específica
          className={`${styles.button} ${styles.borrarButton}`}
        />
      )}
    </div>
  );
}

export default ComandaAccionesButtons;
