// import Button from "../Button/Button";
// import styles from "./ErrorMessage.module.css";
// import { NAMES } from "../../utils/Constants/text";
// import { ErrorMessageProps } from "../../utils/ErrorMessageProps";

// // interface ErrorMessageProps {
// //   message: string;
// //   onRetry?: () => void;
// // }

// const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
//   return (
//     <div className={styles.errorContainer}>
//       <p className={styles.errorMessage}>{message}</p>
//       {onRetry && <Button onClick={onRetry} text={NAMES.REINTENTAR} />}
//     </div>
//   );
// };

// export default ErrorMessage;
// src/components/ErrorMessage/ErrorMessage.tsx

import Button from "../Button/Button";
import styles from "./ErrorMessage.module.css";
import { NAMES } from "../../utils/Constants/text";
// CAMBIO NECESARIO: Ajusta la ruta de importación de ErrorMessageProps
// Dependiendo de dónde la hayas centralizado.
// Opción 1: Si la moviste a utils/types/CommonTypes.ts
import { ErrorMessageProps } from "../../utils/types/CommonTypes";
// Opción 2: Si la moviste a utils/types/ComandaTypes.ts (menos probable para un error genérico, pero posible)
// import { ErrorMessageProps } from "../../utils/types/ComandaTypes";

// La interfaz comentada no es necesaria si ya la tienes en el archivo de tipos
// interface ErrorMessageProps {
//   message: string;
//   onRetry?: () => void;
// }

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorMessage}>{message}</p>
      {onRetry && <Button onClick={onRetry} text={NAMES.REINTENTAR} />}
    </div>
  );
};

export default ErrorMessage;
