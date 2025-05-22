import React, { useState } from "react";
import styles from "./ConfigurarIVA.module.css";
import Button from "../Button/Button";

interface ConfigurarIVAProps {
  onGuardado: (iva: number) => void;
  ivaActual: number | null;
}

function ConfigurarIVA({ onGuardado, ivaActual }: ConfigurarIVAProps) {
  const [iva, setIva] = useState<number>(ivaActual ?? 0.21);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleGuardar = () => {
    if (iva < 0 || iva > 1) {
      setMensaje("El IVA debe estar entre 0 y 1 (ejemplo: 0.21 para 21%)");
      return;
    }
    localStorage.setItem("iva", iva.toString());
    setMensaje("IVA guardado correctamente");
    onGuardado(iva);
  };

  return (
    <div className={styles.modal}>
      <h2>Configurar IVA</h2>
      <input
        type="number"
        step="0.01"
        min="0"
        max="1"
        value={iva}
        onChange={(e) => setIva(Number(e.target.value))}
        className={styles.input}
        placeholder="IVA (ej: 0.21)"
      />
      <Button
        text="Guardar IVA"
        onClick={handleGuardar}
        className={styles.button}
      />
      {mensaje && <p className={styles.message}>{mensaje}</p>}
    </div>
  );
}

export default ConfigurarIVA;
