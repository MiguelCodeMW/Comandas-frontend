import React, { useState } from "react";
import api from "../../../api/axio";

interface EliminarCategoriaProps {
  id: number; // Tipado explícito para el ID de la categoría
}

const EliminarCategoria: React.FC<EliminarCategoriaProps> = ({ id }) => {
  const [mensaje, setMensaje] = useState<string | null>(null); // Estado para mostrar mensajes de éxito o error

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta categoría?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/categorias/${id}`);
      setMensaje("Categoría eliminada con éxito.");
    } catch (error) {
      setMensaje("Error al eliminar la categoría. Inténtalo de nuevo.");
      console.error("Error al eliminar la categoría:", error);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <button
        onClick={handleDelete}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "0.5rem 1rem",
          border: "none",
          cursor: "pointer",
        }}
      >
        Eliminar
      </button>
      {mensaje && (
        <p style={{ color: mensaje.includes("éxito") ? "green" : "red" }}>
          {mensaje}
        </p>
      )}
    </div>
  );
};

export default EliminarCategoria;
