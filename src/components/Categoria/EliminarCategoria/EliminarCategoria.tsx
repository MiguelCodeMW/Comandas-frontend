import React, { useState } from "react";
import api from "../../../api/axio";
import { ROUTES } from "../../../utils/Constants/routes";
import { EliminarCategoriaProps } from "../../../utils/EliminarCategoriaProps";

const EliminarCategoria: React.FC<EliminarCategoriaProps> = ({ id }) => {
  const [mensaje, setMensaje] = useState<string | null>(null); // Estado para mostrar mensajes de éxito o error

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta categoría?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(ROUTES.CATEGORY_DETAIL.replace(":id", id.toString()));
      setMensaje("Categoría eliminada con éxito.");
    } catch (error) {
      setMensaje("Error al eliminar la categoría. Inténtalo de nuevo.");
      console.error("Error al eliminar la categoría:", error);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <button onClick={handleDelete}>Eliminar</button>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default EliminarCategoria;
