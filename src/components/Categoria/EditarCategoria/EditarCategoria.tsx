import { useState } from "react";
import styles from "../Categoria.module.css";

interface EditarCategoriaProps {
  id: number;
  nombreInicial: string;
  onCategoriaEditada: (nuevoNombre: string) => void;
  onCancelar: () => void;
}

function EditarCategoria({
  nombreInicial,
  onCategoriaEditada,
  onCancelar,
}: EditarCategoriaProps) {
  const [nombre, setNombre] = useState<string>(nombreInicial);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleEdit = () => {
    if (!nombre.trim()) {
      setMensaje("El nombre no puede estar vacío.");
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
        placeholder="Nuevo nombre de la categoría"
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
