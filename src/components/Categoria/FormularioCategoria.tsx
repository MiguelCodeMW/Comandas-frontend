// import React, { useState, useEffect } from "react";
// import Button from "../Button/Button"; // Asumo que Button.tsx usa la clase global .btn
// import styles from "./Categoria.module.css"; // Importa los estilos CSS Modules
// import { NAMES } from "../../utils/Constants/text";
// // import { CategoriaProps } from "../../utils/Categoria/CategoriaProps";
// import { FormularioCategoriaProps } from "../../utils/Categoria/FormularioCategoriasProps";

// function FormularioCategoria({
//   onSubmit = async () => true,
//   onCancel,
//   categoriaInicial,
//   textoBotonSubmit = NAMES.GUARDAR,
//   placeholder = NAMES.PLACEHOLDER_NOMBRE,
//   limpiarMensajesAlCambiar,
// }: FormularioCategoriaProps = {}) {
//   const [nombre, setNombre] = useState<string>("");

//   useEffect(() => {
//     if (categoriaInicial) {
//       setNombre(categoriaInicial.nombre);
//     } else {
//       setNombre("");
//     }
//   }, [categoriaInicial]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const success = await onSubmit(nombre);
//     if (success && !categoriaInicial) {
//       setNombre("");
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNombre(e.target.value);
//     if (limpiarMensajesAlCambiar) {
//       limpiarMensajesAlCambiar();
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className={styles.form}>
//       <label>
//         {NAMES.LABEL_NOMBRE}
//         <input
//           type="text"
//           value={nombre}
//           onChange={handleInputChange}
//           className={styles.input}
//           placeholder={placeholder}
//           required
//         />
//       </label>
//       <div className={styles.buttonGroup}>
//         <Button
//           text={textoBotonSubmit}
//           type="submit"
//           className={`${styles.button} ${styles.save}`}
//         />
//         {onCancel && (
//           <Button
//             text={NAMES.CANCELAR}
//             onClick={onCancel}
//             type="button"
//             className={`${styles.button} ${styles.cancel}`}
//           />
//         )}
//       </div>
//     </form>
//   );
// }

// export default FormularioCategoria;
import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import styles from "./Categoria.module.css";
import { NAMES } from "../../utils/Constants/text";
// Importa el tipo unificado
import { FormularioCategoriaProps } from "../../utils/types/CategoriaTypes"; // Asegúrate de que la ruta sea correcta

function FormularioCategoria({
  onSubmit = async () => true,
  onCancel,
  categoriaInicial,
  textoBotonSubmit = NAMES.GUARDAR,
  placeholder = NAMES.PLACEHOLDER_NOMBRE,
  limpiarMensajesAlCambiar,
}: FormularioCategoriaProps) {
  // Usa el tipo unificado
  const [nombre, setNombre] = useState<string>("");

  useEffect(() => {
    if (categoriaInicial) {
      setNombre(categoriaInicial.nombre);
    } else {
      setNombre("");
    }
  }, [categoriaInicial]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await onSubmit(nombre);
    if (success && !categoriaInicial) {
      setNombre("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(e.target.value);
    if (limpiarMensajesAlCambiar) {
      limpiarMensajesAlCambiar();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>
        {NAMES.LABEL_NOMBRE}
        <input
          type="text"
          value={nombre}
          onChange={handleInputChange}
          className={styles.input}
          placeholder={placeholder}
          required
        />
      </label>
      <div className={styles.buttonGroup}>
        <Button
          text={textoBotonSubmit}
          type="submit"
          className={`${styles.button} ${styles.save}`}
        />
        {onCancel && (
          <Button
            text={NAMES.CANCELAR}
            onClick={onCancel}
            type="button"
            className={`${styles.button} ${styles.cancel}`}
          />
        )}
      </div>
    </form>
  );
}

export default FormularioCategoria;
