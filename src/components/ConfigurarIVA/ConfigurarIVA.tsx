// import { useState, useEffect } from "react";
// import styles from "./ConfigurarIVA.module.css";
// import Button from "../Button/Button";
// import { NAMES } from "../../utils/Constants/text";
// import { ConfigurarIVAProps } from "../../utils/ConfigurarIVAProps";

// // interface ConfigurarIVAProps {
// //   onGuardado: (nuevoIva: number) => Promise<void>;
// //   ivaActual: number | null;
// //   onCancelar: () => void;
// //   errorExterno?: string | null;
// // }

// function ConfigurarIVA({
//   onGuardado,
//   ivaActual,
//   onCancelar,
//   errorExterno,
// }: ConfigurarIVAProps) {
//   const [ivaInput, setIvaInput] = useState<string>("");
//   const [mensajeLocal, setMensajeLocal] = useState<string | null>(null);
//   const [errorLocal, setErrorLocal] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     setIvaInput(ivaActual !== null ? ivaActual.toString() : "0.21");
//   }, [ivaActual]);

//   const handleGuardarClick = async () => {
//     setMensajeLocal(null);
//     setErrorLocal(null);

//     const ivaNumero = parseFloat(ivaInput);
//     if (isNaN(ivaNumero) || ivaNumero < 0 || ivaNumero > 1) {
//       setErrorLocal(NAMES.IVA_VALOR);
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       await onGuardado(ivaNumero);
//     } catch (e: any) {
//       console.error(NAMES.IVA_ERROR, e);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className={styles.modalBackdrop}>
//       {" "}
//       <div className={styles.modalContent}>
//         {" "}
//         <h2>{NAMES.IVA_LABEL}</h2>
//         {errorExterno && !errorLocal && (
//           <p className={styles.errorMessage}>{errorExterno}</p>
//         )}
//         {errorLocal && <p className={styles.errorMessage}>{errorLocal}</p>}
//         {mensajeLocal && (
//           <p className={styles.successMessage}>{mensajeLocal}</p>
//         )}
//         <div className={styles.inputGroup}>
//           <label htmlFor="ivaInput">
//             {NAMES.IVA_APLICADO} (ej: 0.21 para 21%)
//           </label>
//           <input
//             type="number"
//             id="ivaInput"
//             value={ivaInput}
//             onChange={(e) => {
//               setIvaInput(e.target.value);
//               setErrorLocal(null);
//             }}
//             placeholder="0.21"
//             step="0.01"
//             min="0"
//             max="1"
//             className={styles.input}
//             disabled={isSubmitting}
//           />
//         </div>
//         <div className={styles.buttonGroup}>
//           {" "}
//           <Button
//             onClick={handleGuardarClick}
//             disabled={isSubmitting}
//             text={isSubmitting ? NAMES.CARGANDO : NAMES.GUARDAR_IVA}
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

// export default ConfigurarIVA;
// src/components/ConfigurarIVA/ConfigurarIVA.tsx

import { useState, useEffect } from "react";
import styles from "./ConfigurarIVA.module.css";
import Button from "../Button/Button";
import { NAMES } from "../../utils/Constants/text";
// CAMBIO NECESARIO: Importar ConfigurarIVAProps desde la ubicación centralizada
import { ConfigurarIVAProps } from "../../utils/types/CommonTypes"; // <--- ¡CAMBIO AQUI!
// Asegúrate de que esta ruta sea correcta para tu estructura de carpetas.

function ConfigurarIVA({
  onGuardado,
  ivaActual,
  onCancelar,
  errorExterno,
}: ConfigurarIVAProps) {
  const [ivaInput, setIvaInput] = useState<string>("");
  const [mensajeLocal, setMensajeLocal] = useState<string | null>(null); // Añadido para mensajes de éxito
  const [errorLocal, setErrorLocal] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Establece el valor inicial del input con el IVA actual o un valor por defecto (ej: 0.21)
    setIvaInput(ivaActual !== null ? ivaActual.toString() : "0.21");
  }, [ivaActual]); // Ejecutar cuando ivaActual cambie

  const handleGuardarClick = async () => {
    setMensajeLocal(null); // Limpiar mensajes al intentar guardar
    setErrorLocal(null);

    const ivaNumero = parseFloat(ivaInput);

    // Validación: debe ser un número entre 0 y 1
    if (isNaN(ivaNumero) || ivaNumero < 0 || ivaNumero > 1) {
      setErrorLocal(NAMES.IVA_VALOR);
      return;
    }

    setIsSubmitting(true);
    try {
      await onGuardado(ivaNumero);
      setMensajeLocal(NAMES.IVA_EXITO); // Mensaje de éxito
      // Opcional: setTimeout para borrar el mensaje de éxito
      // setTimeout(() => setMensajeLocal(null), 3000);
    } catch (e: any) {
      // Se usa 'any' porque el tipo de 'e' puede ser desconocido.
      console.error(NAMES.IVA_ERROR, e);
      setErrorLocal(e.message || NAMES.IVA_ERROR); // Mostrar error específico o genérico
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      {" "}
      <div className={styles.modalContent}>
        {" "}
        <h2>{NAMES.IVA_LABEL}</h2>
        {/* Mostrar error externo si existe y no hay error local */}
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
          <label htmlFor="ivaInput">
            {NAMES.IVA_APLICADO} (ej: 0.21 para 21%)
          </label>
          <input
            type="number"
            id="ivaInput"
            value={ivaInput}
            onChange={(e) => {
              setIvaInput(e.target.value);
              setErrorLocal(null); // Limpiar error al cambiar el input
              setMensajeLocal(null); // Limpiar mensaje de éxito
            }}
            placeholder="0.21"
            step="0.01"
            min="0"
            max="1"
            className={styles.input}
            disabled={isSubmitting} // Deshabilita el input mientras se guarda
          />
        </div>
        <div className={styles.buttonGroup}>
          {" "}
          <Button
            onClick={handleGuardarClick}
            disabled={isSubmitting} // Deshabilita el botón mientras se guarda
            text={isSubmitting ? NAMES.CARGANDO : NAMES.GUARDAR_IVA}
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

export default ConfigurarIVA;
