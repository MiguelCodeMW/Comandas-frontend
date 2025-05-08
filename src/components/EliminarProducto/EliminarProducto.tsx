import React from "react";

interface EliminarProductoProps {
  id: number;
  onDelete: (id: number) => void;
}

const EliminarProducto = ({ id, onDelete }: EliminarProductoProps) => {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Detiene la propagación del evento al elemento padre
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (confirmDelete) {
      onDelete(id);
    }
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        backgroundColor: "red",
        color: "white",
        border: "none",
        padding: "0.3rem 0.6rem",
        cursor: "pointer",
      }}
    >
      Eliminar
    </button>
  );
};

export default EliminarProducto;
