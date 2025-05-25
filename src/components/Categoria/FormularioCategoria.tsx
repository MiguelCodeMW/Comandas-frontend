import React, { useState, useEffect } from "react";
import Button from "../Button/Button"; // Asumo que Button.tsx usa la clase global .btn
import styles from "./Categoria.module.css"; // Importa los estilos CSS Modules
import { NAMES } from "../../utils/Constants/text";
import { Categoria } from "../../utils/Categoria/CategoriaProps";

interface FormularioCategoriaProps {
  onSubmit?: (nombre: string) => Promise<boolean>;
  onCancel?: () => void;
  categoriaInicial?: Categoria | null;
  textoBotonSubmit?: string;
  placeholder?: string;
  limpiarMensajesAlCambiar?: () => void;
}

function FormularioCategoria({
  onSubmit = async () => true,
  onCancel,
  categoriaInicial,
  textoBotonSubmit = "Guardar",
  placeholder = NAMES.PLACEHOLDER_NOMBRE,
  limpiarMensajesAlCambiar,
}: FormularioCategoriaProps = {}) {
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
        Nombre:
        {/* Aquí se usa styles.input del CSS Module */}
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
          // Aquí se usa styles.button y styles.save del CSS Module
          className={`${styles.button} ${styles.save}`}
        />
        {onCancel && (
          <Button
            text={NAMES.CANCELAR}
            onClick={onCancel}
            type="button"
            // Aquí se usa styles.button y styles.cancel del CSS Module
            className={`${styles.button} ${styles.cancel}`}
          />
        )}
      </div>
    </form>
  );
}

export default FormularioCategoria;
