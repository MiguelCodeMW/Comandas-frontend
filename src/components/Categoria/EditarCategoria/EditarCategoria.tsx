import { useState } from "react";
import api from "../../../api/axio";
import { ROUTES } from "../../../utils/Constants/routes";
import styles from "../Categoria.module.css"; // Importa el archivo CSS centralizado

interface EditarCategoriaProps {
  id: number;
  nombreInicial: string;
  onCategoriaEditada: () => void;
}

function EditarCategoria({
  id,
  nombreInicial,
  onCategoriaEditada,
}: EditarCategoriaProps) {
  const [nombre, setNombre] = useState<string>(nombreInicial);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleEdit = async () => {
    try {
      await api.put(ROUTES.CATEGORY_DETAIL.replace(":id", id.toString()), {
        nombre,
      });
      setMensaje("Categoría actualizada con éxito.");
      onCategoriaEditada();
    } catch (error) {
      setMensaje("Error al actualizar la categoría. Inténtalo de nuevo.");
      console.error("Error al actualizar la categoría:", error);
    }
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
          className={`${styles.button} ${styles.save}`}
        >
          Guardar
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
