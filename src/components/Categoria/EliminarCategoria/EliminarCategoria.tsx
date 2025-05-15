import api from "../../../api/axio";
import { ROUTES } from "../../../utils/Constants/routes";
import styles from "../Categoria.module.css";

interface EliminarCategoriaProps {
  id: number;
  onCategoriaEliminada: () => void;
}

function EliminarCategoria({
  id,
  onCategoriaEliminada,
}: EliminarCategoriaProps) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta categoría?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(ROUTES.CATEGORY_DETAIL.replace(":id", id.toString()));
      onCategoriaEliminada();
    } catch (error) {
      alert("Error al eliminar la categoría. Inténtalo de nuevo.");
      console.error("Error al eliminar la categoría:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className={[styles.button, styles.delete].join(" ")}
    >
      Eliminar
    </button>
  );
}

export default EliminarCategoria;
