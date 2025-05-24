import React from "react";
import Button from "../Button/Button"; // Asumiendo que tienes tu componente Button
import styles from "./ErrorMessage.module.css"; // Crearemos este archivo de estilos

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorMessage}>
        {message || "Ha ocurrido un error inesperado."}
      </p>
      {onRetry && <Button onClick={onRetry} text="Reintentar" />}
    </div>
  );
};

export default ErrorMessage;
