import { useState } from "react";
import api from "../../../api/axio";
import { ROUTES } from "../../../utils/Constants/routes";
import styles from "../Categoria.module.css"; // Importa el archivo CSS centralizado

interface EliminarCategoriaProps {
  id: number;
  onCategoriaEliminada: () => void;
}

function EliminarCategoria({
  id,
  onCategoriaEliminada,
}: EliminarCategoriaProps) {
  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta categoría?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(ROUTES.CATEGORY_DETAIL.replace(":id", id.toString()));
      setMensaje("Categoría eliminada con éxito.");
      onCategoriaEliminada();
    } catch (error) {
      setMensaje("Error al eliminar la categoría. Inténtalo de nuevo.");
      console.error("Error al eliminar la categoría:", error);
    }
  };

  return (
    <div className={styles.container}>
      <button
        onClick={handleDelete}
        className={`${styles.button} ${styles.delete}`}
      >
        Eliminar
      </button>
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

export default EliminarCategoria;
