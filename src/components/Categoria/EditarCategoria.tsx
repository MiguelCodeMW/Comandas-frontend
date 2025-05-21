import { useState } from "react";
import styles from "./Categoria.module.css";
import { NAMES } from "../..//utils/Constants/text";
import { EditarCategoriaProps } from "../../utils/Categoria/EditarCategoriaProps";

function EditarCategoria({
  nombreInicial,
  onCategoriaEditada,
  onCancelar,
}: EditarCategoriaProps) {
  const [nombre, setNombre] = useState<string>(nombreInicial);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleEdit = () => {
    if (!nombre.trim()) {
      setMensaje(NAMES.ALERTA_NOMBRE);
      return;
    }
    onCategoriaEditada(nombre);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Editar Categoría</h2>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder={NAMES.PLACEHOLDER_NOMBRE}
        className={styles.input}
      />
      <div className={styles.buttonGroup}>
        <button
          onClick={handleEdit}
          className={[styles.button, styles.save].join(" ")}
        >
          Guardar
        </button>
        <button
          onClick={onCancelar}
          className={[styles.button, styles.cancel].join(" ")}
          type="button"
        >
          Cancelar
        </button>
      </div>
      {mensaje && (
        <p
          className={`${styles.message} ${
            mensaje.includes("éxito") ? styles.success : styles.error
          }`}
        >
          {mensaje}
        </p>
      )}
    </div>
  );
}

export default EditarCategoria;
