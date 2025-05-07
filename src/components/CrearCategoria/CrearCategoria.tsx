import React, { useState } from "react";
import api from "../../api/axio";

const CrearCategoria = () => {
  const [nombre, setNombre] = useState<string>(""); // Estado para el nombre de la categoría
  const [mensaje, setMensaje] = useState<string | null>(null); // Estado para mostrar mensajes de éxito o error

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensaje(null); // Reinicia el mensaje

    if (!nombre.trim()) {
      setMensaje("El nombre de la categoría no puede estar vacío.");
      return;
    }

    try {
      await api.post("/categorias", { nombre });
      setMensaje("Categoría creada con éxito.");
      setNombre(""); // Limpia el campo de entrada para seguir añadiendo categorías
    } catch (error) {
      setMensaje("Error al crear la categoría. Inténtalo de nuevo.");
      console.error("Error al crear la categoría:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Crear Categoría</h1>
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
        <button type="submit">Crear</button>
      </form>
      {mensaje && (
        <p style={{ color: mensaje.includes("éxito") ? "green" : "red" }}>
          {mensaje}
        </p>
      )}
    </div>
  );
};

export default CrearCategoria;
