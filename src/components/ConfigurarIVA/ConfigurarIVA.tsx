import React, { useState, useEffect } from "react";
import styles from "./ConfigurarIVA.module.css";
import Button from "../Button/Button";
import { NAMES } from "../../utils/Constants/text"; // Asegúrate que NAMES esté importado

interface ConfigurarIVAProps {
  onGuardado: (nuevoIva: number) => Promise<void>;
  ivaActual: number | null;
  onCancelar: () => void;
  errorExterno?: string | null;
}

function ConfigurarIVA({
  onGuardado,
  ivaActual,
  onCancelar,
  errorExterno,
}: ConfigurarIVAProps) {
  const [ivaInput, setIvaInput] = useState<string>("");
  const [mensajeLocal, setMensajeLocal] = useState<string | null>(null);
  const [errorLocal, setErrorLocal] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIvaInput(ivaActual !== null ? ivaActual.toString() : "0.21");
  }, [ivaActual]);

  const handleGuardarClick = async () => {
    setMensajeLocal(null);
    setErrorLocal(null);

    const ivaNumero = parseFloat(ivaInput);
    if (isNaN(ivaNumero) || ivaNumero < 0 || ivaNumero > 1) {
      setErrorLocal(
        "El valor del IVA debe ser un número entre 0 y 1 (ej: 0.21 para 21%)."
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await onGuardado(ivaNumero);
    } catch (e: any) {
      console.error("Error en onGuardado desde ConfigurarIVA:", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>{"Configurar IVA"}</h2> {/* Usando NAMES */}
        {errorExterno && !errorLocal && (
          <p className={styles.errorMessage}>{errorExterno}</p>
        )}
        {errorLocal && <p className={styles.errorMessage}>{errorLocal}</p>}
        {mensajeLocal && (
          <p className={styles.successMessage}>{mensajeLocal}</p>
        )}
        <div className={styles.inputGroup}>
          <label htmlFor="ivaInput">
            {"Valor del IVA"} (ej: 0.21 para 21%)
          </label>{" "}
          {/* Usando NAMES */}
          <input
            type="number"
            id="ivaInput"
            value={ivaInput}
            onChange={(e) => {
              setIvaInput(e.target.value);
              setErrorLocal(null);
            }}
            placeholder="0.21"
            step="0.01"
            min="0"
            max="1"
            className={styles.inputField}
            disabled={isSubmitting}
          />
        </div>
        <div className={styles.buttonGroup}>
          <Button
            onClick={handleGuardarClick}
            disabled={isSubmitting}
            text={isSubmitting ? NAMES.CARGANDO : NAMES.GUARDAR_IVA}
            className={styles.headerButton}
            // Cambiado a prop text y NAMES
          />
          <Button
            onClick={onCancelar}
            disabled={isSubmitting}
            text={NAMES.CANCELAR} // Cambiado a prop text y NAMES
            className={styles.headerButton}
          />
        </div>
      </div>
    </div>
  );
}

export default ConfigurarIVA;
