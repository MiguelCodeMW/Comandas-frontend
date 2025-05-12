/*import React, { useState } from "react";
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

export default CrearCategoria;*/

/*import React, { useState } from "react";
import CategoriaList from "../CategoriaList/CategoriaList";
import EditarCategoria from "../EditarCategoria/EditarCategoria";
import EliminarCategoria from "../EliminarCategoria/EliminarCategoria";
import api from "../../api/axio";

const CrearCategoria = () => {
  const [nombre, setNombre] = useState<string>(""); // Estado para el nombre de la categoría
  const [mensaje, setMensaje] = useState<string | null>(null); // Mensajes de éxito o error
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<
    number | null
  >(null); // ID de la categoría seleccionada para editar

  // Manejar el envío del formulario para añadir una nueva categoría
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensaje(null);

    if (!nombre.trim()) {
      setMensaje("El nombre de la categoría no puede estar vacío.");
      return;
    }

    try {
      await api.post("/categorias", { nombre });
      setMensaje("Categoría creada con éxito.");
      setNombre(""); // Limpiar el input
    } catch (error) {
      setMensaje("Error al guardar la categoría. Inténtalo de nuevo.");
      console.error("Error al guardar la categoría:", error);
    }
  };

  // Manejar la selección de una categoría para editar
  const handleSelectCategoria = (id: number, nombre: string) => {
    setCategoriaSeleccionada(id);
    setNombre(nombre);
  };

  // Manejar la actualización de una categoría
  const handleUpdateCategoria = async (id: number, nuevoNombre: string) => {
    try {
      await api.put(`/categorias/${id}`, { nombre: nuevoNombre });
      setMensaje("Categoría actualizada con éxito.");
      setCategoriaSeleccionada(null); // Desseleccionar la categoría
      setNombre(""); // Limpiar el input
    } catch (error) {
      setMensaje("Error al actualizar la categoría. Inténtalo de nuevo.");
      console.error("Error al actualizar la categoría:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Gestionar Categorías</h1>
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
        <button type="submit">
          {categoriaSeleccionada ? "Actualizar Categoría" : "Añadir Categoría"}
        </button>
      </form>
      {mensaje && (
        <p style={{ color: mensaje.includes("éxito") ? "green" : "red" }}>
          {mensaje}
        </p>
      )}
      <h2>Lista de Categorías</h2>
      <CategoriaList
        onSelectCategoria={handleSelectCategoria}
        onDeleteCategoria={(id) => {
          setCategoriaSeleccionada(null); // Desseleccionar si se elimina la categoría seleccionada
          setNombre(""); // Limpiar el input
        }}
      />
      {categoriaSeleccionada && (
        <EditarCategoria
          id={categoriaSeleccionada}
          onUpdateCategoria={handleUpdateCategoria}
        />
      )}
    </div>
  );
};

export default CrearCategoria;*/

import React, { useState, useEffect } from "react";
import api from "../../../api/axio";

interface Categoria {
  id: number;
  nombre: string;
}

const CrearCategoria = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]); // Lista de categorías
  const [nombre, setNombre] = useState<string>(""); // Estado para el nombre de la nueva categoría
  const [mensaje, setMensaje] = useState<string | null>(null); // Mensajes de éxito o error
  const [editandoId, setEditandoId] = useState<number | null>(null); // ID de la categoría que se está editando

  // Cargar las categorías al montar el componente
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get("/categorias");
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  // Manejar el envío del formulario para añadir una nueva categoría
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensaje(null);

    if (!nombre.trim()) {
      setMensaje("El nombre de la categoría no puede estar vacío.");
      return;
    }

    try {
      const response = await api.post("/categorias", { nombre });
      setCategorias((prev) => [...prev, response.data.categoria]);
      setMensaje("Categoría creada con éxito.");
      setNombre(""); // Limpiar el input
    } catch (error) {
      setMensaje("Error al guardar la categoría. Inténtalo de nuevo.");
      console.error("Error al guardar la categoría:", error);
    }
  };

  // Manejar la edición de una categoría
  const handleEdit = async (id: number, nuevoNombre: string) => {
    if (!nuevoNombre.trim()) {
      setMensaje("El nombre de la categoría no puede estar vacío.");
      return;
    }

    try {
      await api.put(`/categorias/${id}`, { nombre: nuevoNombre });
      setCategorias((prev) =>
        prev.map((cat) =>
          cat.id === id ? { ...cat, nombre: nuevoNombre } : cat
        )
      );
      setMensaje("Categoría actualizada con éxito.");
      setEditandoId(null); // Salir del modo de edición
    } catch (error) {
      setMensaje("Error al actualizar la categoría. Inténtalo de nuevo.");
      console.error("Error al actualizar la categoría:", error);
    }
  };

  // Manejar la eliminación de una categoría
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta categoría?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/categorias/${id}`);
      setCategorias((prev) => prev.filter((cat) => cat.id !== id));
      setMensaje("Categoría eliminada con éxito.");
    } catch (error) {
      setMensaje("Error al eliminar la categoría. Inténtalo de nuevo.");
      console.error("Error al eliminar la categoría:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Gestionar Categorías</h1>
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
        <button type="submit">Añadir Categoría</button>
      </form>
      {mensaje && (
        <p style={{ color: mensaje.includes("éxito") ? "green" : "red" }}>
          {mensaje}
        </p>
      )}
      <h2>Lista de Categorías</h2>
      <ul>
        {categorias.map((categoria) => (
          <li
            key={categoria.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.5rem",
            }}
          >
            {editandoId === categoria.id ? (
              <>
                <input
                  type="text"
                  value={categoria.nombre}
                  onChange={(e) =>
                    setCategorias((prev) =>
                      prev.map((cat) =>
                        cat.id === categoria.id
                          ? { ...cat, nombre: e.target.value }
                          : cat
                      )
                    )
                  }
                />
                <button
                  onClick={() => handleEdit(categoria.id, categoria.nombre)}
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    border: "none",
                    padding: "0.3rem 0.6rem",
                    cursor: "pointer",
                  }}
                >
                  Guardar
                </button>
                <button
                  onClick={() => setEditandoId(null)}
                  style={{
                    backgroundColor: "gray",
                    color: "white",
                    border: "none",
                    padding: "0.3rem 0.6rem",
                    cursor: "pointer",
                  }}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <span>{categoria.nombre}</span>
                <button
                  onClick={() => setEditandoId(categoria.id)}
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    border: "none",
                    padding: "0.3rem 0.6rem",
                    cursor: "pointer",
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(categoria.id)}
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
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrearCategoria;
