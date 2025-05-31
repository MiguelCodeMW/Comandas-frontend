// // src/components/ConfigurarMoneda/ConfigurarMoneda.tsx

// import { useState, useEffect } from "react";
// import styles from "./ConfigurarMoneda.module.css";
// import Button from "../Button/Button";
// import { NAMES } from "../../utils/Constants/text";
// import { ConfigurarMonedaProps } from "../../utils/ConfigurarMonedaProps";

// // interface ConfigurarMonedaProps {
// //   onGuardado: (nuevaMoneda: string) => Promise<void>;
// //   monedaActual: string | null;
// //   onCancelar: () => void;
// //   errorExterno?: string | null;
// // }

// function ConfigurarMoneda({
//   onGuardado,
//   monedaActual,
//   onCancelar,
//   errorExterno,
// }: ConfigurarMonedaProps) {
//   const [monedaInput, setMonedaInput] = useState<string>("");
//   const [mensajeLocal, setMensajeLocal] = useState<string | null>(null);
//   const [errorLocal, setErrorLocal] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     // Establece el valor inicial del input con la moneda actual o un valor por defecto (ej: EUR)
//     setMonedaInput(monedaActual !== null ? monedaActual.toUpperCase() : "EUR");
//   }, [monedaActual]);

//   const handleGuardarClick = async () => {
//     setMensajeLocal(null);
//     setErrorLocal(null);

//     const monedaValue = monedaInput.trim().toUpperCase();

//     // Validación básica para código ISO de 3 letras
//     if (!/^[A-Z]{3}$/.test(monedaValue)) {
//       setErrorLocal(NAMES.MONEDA_VALOR_INVALIDO);
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       await onGuardado(monedaValue);
//       setMensajeLocal(NAMES.MONEDA_GUARDADA_EXITO); // Mensaje de éxito tras guardar
//     } catch (e: any) {
//       console.error(NAMES.MONEDA_ERROR, e);
//       setErrorLocal(e.message || NAMES.MONEDA_ERROR);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className={styles.modalBackdrop}>
//       <div className={styles.modalContent}>
//         <h2>{NAMES.MONEDA_LABEL}</h2>
//         {errorExterno && !errorLocal && (
//           <p className={styles.errorMessage}>{errorExterno}</p>
//         )}
//         {errorLocal && <p className={styles.errorMessage}>{errorLocal}</p>}
//         {mensajeLocal && (
//           <p className={styles.successMessage}>{mensajeLocal}</p>
//         )}
//         <div className={styles.inputGroup}>
//           <label htmlFor="monedaInput">{NAMES.MONEDA_APLICADA}</label>
//           <input
//             type="text"
//             id="monedaInput"
//             value={monedaInput}
//             onChange={(e) => {
//               setMonedaInput(e.target.value);
//               setErrorLocal(null); // Limpiar error al cambiar el input
//               setMensajeLocal(null); // Limpiar mensaje de éxito
//             }}
//             placeholder="EUR"
//             maxLength={3} // Limita a 3 caracteres para el código ISO
//             className={styles.input}
//             disabled={isSubmitting}
//           />
//         </div>
//         <div className={styles.buttonGroup}>
//           <Button
//             onClick={handleGuardarClick}
//             disabled={isSubmitting}
//             text={isSubmitting ? NAMES.CARGANDO : NAMES.GUARDAR_MONEDA}
//             className={styles.button}
//           />
//           <Button
//             onClick={onCancelar}
//             disabled={isSubmitting}
//             text={NAMES.CANCELAR}
//             className={`${styles.button} ${styles.cancelButton}`}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ConfigurarMoneda;
// src/components/ConfigurarMoneda/ConfigurarMoneda.tsx

import { useState, useEffect } from "react";
import styles from "./ConfigurarMoneda.module.css";
import Button from "../Button/Button";
import { NAMES } from "../../utils/Constants/text";
// CAMBIO NECESARIO: Importar ConfigurarMonedaProps desde la ubicación centralizada
import { ConfigurarMonedaProps } from "../../utils/types/CommonTypes"; // <--- ¡CAMBIO AQUI!
// Asegúrate de que esta ruta sea correcta para tu estructura de carpetas.

function ConfigurarMoneda({
  onGuardado,
  monedaActual,
  onCancelar,
  errorExterno,
}: ConfigurarMonedaProps) {
  const [monedaInput, setMonedaInput] = useState<string>("");
  const [mensajeLocal, setMensajeLocal] = useState<string | null>(null);
  const [errorLocal, setErrorLocal] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Establece el valor inicial del input con la moneda actual o un valor por defecto (ej: EUR)
    // Es buena práctica asegurarse de que `monedaActual` no sea undefined o null antes de usarlo.
    setMonedaInput(monedaActual !== null ? monedaActual.toUpperCase() : "EUR");
  }, [monedaActual]); // Ejecutar cuando monedaActual cambie

  const handleGuardarClick = async () => {
    setMensajeLocal(null);
    setErrorLocal(null);

    const monedaValue = monedaInput.trim().toUpperCase();

    // Validación básica para código ISO de 3 letras
    if (!/^[A-Z]{3}$/.test(monedaValue)) {
      setErrorLocal(NAMES.MONEDA_VALOR_INVALIDO);
      return;
    }

    setIsSubmitting(true);
    try {
      await onGuardado(monedaValue);
      setMensajeLocal(NAMES.MONEDA_GUARDADA_EXITO); // Mensaje de éxito tras guardar
      // Podrías añadir un setTimeout para que el mensaje desaparezca después de un tiempo
      // setTimeout(() => setMensajeLocal(null), 3000);
    } catch (e: any) {
      // Se usa 'any' porque el tipo de 'e' puede ser desconocido.
      console.error(NAMES.MONEDA_ERROR, e);
      // Asegúrate de que 'e' tenga una propiedad 'message' o proporciona un mensaje por defecto
      setErrorLocal(e.message || NAMES.MONEDA_ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>{NAMES.MONEDA_LABEL}</h2>
        {/* Mostrar error externo si existe y no hay error local (para evitar duplicidad) */}
        {errorExterno && !errorLocal && (
          <p className={styles.errorMessage}>{errorExterno}</p>
        )}
        {/* Mostrar error local si existe */}
        {errorLocal && <p className={styles.errorMessage}>{errorLocal}</p>}
        {/* Mostrar mensaje de éxito local si existe */}
        {mensajeLocal && (
          <p className={styles.successMessage}>{mensajeLocal}</p>
        )}
        <div className={styles.inputGroup}>
          <label htmlFor="monedaInput">{NAMES.MONEDA_APLICADA}</label>
          <input
            type="text"
            id="monedaInput"
            value={monedaInput}
            onChange={(e) => {
              setMonedaInput(e.target.value);
              setErrorLocal(null); // Limpiar error al cambiar el input
              setMensajeLocal(null); // Limpiar mensaje de éxito
            }}
            placeholder="EUR"
            maxLength={3} // Limita a 3 caracteres para el código ISO
            className={styles.input}
            disabled={isSubmitting} // Deshabilita el input mientras se guarda
          />
        </div>
        <div className={styles.buttonGroup}>
          <Button
            onClick={handleGuardarClick}
            disabled={isSubmitting} // Deshabilita el botón mientras se guarda
            text={isSubmitting ? NAMES.CARGANDO : NAMES.GUARDAR_MONEDA}
            className={styles.button}
          />
          <Button
            onClick={onCancelar}
            disabled={isSubmitting} // Deshabilita el botón mientras se guarda
            text={NAMES.CANCELAR}
            className={`${styles.button} ${styles.cancelButton}`}
          />
        </div>
      </div>
    </div>
  );
}

export default ConfigurarMoneda;
