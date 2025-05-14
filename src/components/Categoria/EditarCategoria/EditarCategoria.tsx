import React, { useState } from "react";
import api from "../../../api/axio";
import { ROUTES } from "../../../utils/Constants/routes";

interface EditarCategoriaProps {
  id: number;
  onUpdateCategoria: (id: number, nuevoNombre: string) => void;
}

const EditarCategoria: React.FC<EditarCategoriaProps> = ({
  id,
  onUpdateCategoria,
}) => {
  const [nombre, setNombre] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nombre.trim()) {
      alert("El nombre de la categoría no puede estar vacío.");
      return;
    }

    try {
      await api.put(ROUTES.CATEGORY_DETAIL.replace(":id", id.toString()), {
        nombre,
      });
      onUpdateCategoria(id, nombre); // Notifica al componente padre
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Editar Nombre:
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nuevo nombre de la categoría"
          required
        />
      </label>
      <br />
      <button type="submit">Actualizar</button>
    </form>
  );
};

export default EditarCategoria;
