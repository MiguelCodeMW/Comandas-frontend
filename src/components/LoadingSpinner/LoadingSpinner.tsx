import React from "react";
import styles from "./LoadingSpinner.module.css"; // Crearemos este archivo de estilos también

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
      <p>Cargando...</p>
    </div>
  );
};

export default LoadingSpinner;
