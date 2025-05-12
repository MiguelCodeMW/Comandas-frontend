/*import React, { useState, useEffect } from "react";
import api from "../../api/axio";
import { useParams } from "react-router-dom";

const EditarCategoria = () => {
  const { id } = useParams<{ id: string }>(); // Tipado explícito para el parámetro de la URL
  const [nombre, setNombre] = useState<string>(""); // Estado para el nombre de la categoría
  const [mensaje, setMensaje] = useState<string | null>(null); // Estado para mostrar mensajes de éxito o error

  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const response = await api.get(`/categorias/${id}`);
        setNombre(response.data.nombre);
      } catch (error) {
        setMensaje("Error al cargar la categoría.");
        console.error("Error al cargar la categoría:", error);
      }
    };

    fetchCategoria();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensaje(null); // Reinicia el mensaje

    if (!nombre.trim()) {
      setMensaje("El nombre de la categoría no puede estar vacío.");
      return;
    }

    try {
      await api.put(`/categorias/${id}`, { nombre });
      setMensaje("Categoría actualizada con éxito.");
    } catch (error) {
      setMensaje("Error al actualizar la categoría. Inténtalo de nuevo.");
      console.error("Error al actualizar la categoría:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Editar Categoría</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de la categoría"
            required
          />
        </label>
        <br />
        <button type="submit">Actualizar</button>
      </form>
      {mensaje && (
        <p style={{ color: mensaje.includes("éxito") ? "green" : "red" }}>
          {mensaje}
        </p>
      )}
    </div>
  );
};

export default EditarCategoria;*/

import React, { useState } from "react";
import api from "../../../api/axio";

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
      await api.put(`/categorias/${id}`, { nombre });
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
