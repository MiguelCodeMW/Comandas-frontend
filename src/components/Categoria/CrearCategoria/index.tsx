import { useState, useEffect } from "react";
import api from "../../../api/axio";
import { Categoria } from "../../../utils/Categoria";
import { ROUTES } from "../../../utils/Constants/routes";
import Button from "../../Button/Button";
import CategoriaList from "../CategoriaList/CategoriaList";
import styles from "../Categoria.module.css";
import { useNavigate } from "react-router-dom";

function CrearCategoria() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nombre, setNombre] = useState<string>("");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get(ROUTES.CATEGORY);
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensaje(null);

    if (!nombre.trim()) {
      setMensaje("El nombre de la categoría no puede estar vacío.");
      return;
    }

    try {
      const response = await api.post(ROUTES.CATEGORY, { nombre });
      setCategorias((categoria) => [...categoria, response.data.categoria]);
      setMensaje("Categoría creada con éxito.");
      setNombre("");
    } catch (error) {
      setMensaje("Error al guardar la categoría. Inténtalo de nuevo.");
      console.error("Error al guardar la categoría:", error);
    }
  };

  const handleEdit = (id: number) => {
    setEditandoId(id);
  };

  const handleCategoriaEditada = async (id: number, nuevoNombre: string) => {
    if (!nuevoNombre.trim()) {
      setMensaje("El nombre no puede estar vacío.");
      return;
    }
    try {
      await api.put(ROUTES.CATEGORY_DETAIL.replace(":id", id.toString()), {
        nombre: nuevoNombre,
      });
      setCategorias((categorias) =>
        categorias.map((categoria) =>
          categoria.id === id
            ? { ...categoria, nombre: nuevoNombre }
            : categoria
        )
      );
      setMensaje("Categoría actualizada con éxito.");
    } catch (error: any) {
      setMensaje(
        error.response?.data?.message ||
          "Error al actualizar la categoría. Inténtalo de nuevo."
      );
      console.error("Error al actualizar la categoría:", error);
    }
    setEditandoId(null);
  };

  const handleEliminarCategoria = (id: number) => {
    setCategorias((categorias) =>
      categorias.filter((categoria) => categoria.id !== id)
    );
    setMensaje("Categoría eliminada con éxito.");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gestionar Categorías</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={styles.input}
            placeholder="Nombre de la categoría"
            required
          />
        </label>
        <Button
          text="Añadir Categoría"
          type="submit"
          className={[styles.button, styles.save].join(" ")}
        />
      </form>
      {mensaje && (
        <p
          className={`${styles.message} ${
            mensaje.includes("éxito") ? styles.success : styles.error
          }`}
        >
          {mensaje}
        </p>
      )}
      <h2 className={styles.title}>Lista de Categorías</h2>
      <CategoriaList
        categorias={categorias}
        editandoId={editandoId}
        onEdit={handleEdit}
        onCategoriaEditada={handleCategoriaEditada}
        onCancelar={() => setEditandoId(null)}
        onEliminar={handleEliminarCategoria}
      />
      <Button
        text="Volver"
        onClick={() => navigate(ROUTES.DASHBOARD)}
        className={styles.dashboardButton}
      />
    </div>
  );
}

export default CrearCategoria;
