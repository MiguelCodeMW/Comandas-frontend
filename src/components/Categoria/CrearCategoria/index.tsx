import { useState, useEffect } from "react";
import api from "../../../api/axio";
import { Categoria } from "../../../utils/Categoria";
import { ROUTES } from "../../../utils/Constants/routes";
import Button from "../../Button/Button";
import CategoriaList from "../CategoriaList/CategoriaList";
import styles from "../Categoria.module.css"; // Cambiado para usar Categoria.module.css
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
      if (editandoId) {
        await api.put(
          ROUTES.CATEGORY_DETAIL.replace(":id", editandoId.toString()),
          {
            nombre,
          }
        );
        setCategorias((prev) =>
          prev.map((cat) => (cat.id === editandoId ? { ...cat, nombre } : cat))
        );
        setMensaje("Categoría actualizada con éxito.");
      } else {
        const response = await api.post(ROUTES.CATEGORY, { nombre });
        setCategorias((prev) => [...prev, response.data.categoria]);
        setMensaje("Categoría creada con éxito.");
      }
      setNombre("");
      setEditandoId(null);
    } catch (error) {
      setMensaje("Error al guardar la categoría. Inténtalo de nuevo.");
      console.error("Error al guardar la categoría:", error);
    }
  };

  const handleEdit = (id: number) => {
    const categoria = categorias.find((cat) => cat.id === id);
    if (categoria) {
      setNombre(categoria.nombre);
      setEditandoId(id);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta categoría?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(ROUTES.CATEGORY_DETAIL.replace(":id", id.toString()));
      setCategorias((prev) => prev.filter((cat) => cat.id !== id));
      setMensaje("Categoría eliminada con éxito.");
    } catch (error) {
      setMensaje("Error al eliminar la categoría. Inténtalo de nuevo.");
      console.error("Error al eliminar la categoría:", error);
    }
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
          text={editandoId ? "Guardar Cambios" : "Añadir Categoría"}
          type="submit"
          className={styles.button}
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
        onEdit={handleEdit}
        onDelete={handleDelete}
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
