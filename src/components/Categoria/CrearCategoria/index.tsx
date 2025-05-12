import React, { useState, useEffect } from "react";
import api from "../../../api/axio";
import { Category } from "../../../utils/Category";
import { ROUTES } from "../../../utils/Constants/routes";
import Button from "../../Button/Button"; // Importa tu componente Button
import styles from "./CrearCategoria.module.css"; // Importa los estilos como módulo
import { useNavigate } from "react-router-dom";

const CrearCategoria = () => {
  const [categorias, setCategorias] = useState<Category[]>([]);
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
      setCategorias((prev) => [...prev, response.data.categoria]);
      setMensaje("Categoría creada con éxito.");
      setNombre("");
    } catch (error) {
      setMensaje("Error al guardar la categoría. Inténtalo de nuevo.");
      console.error("Error al guardar la categoría:", error);
    }
  };

  const handleEdit = async (id: number, nuevoNombre: string) => {
    if (!nuevoNombre.trim()) {
      setMensaje("El nombre de la categoría no puede estar vacío.");
      return;
    }

    try {
      await api.put(`${ROUTES.CATEGORY}/${id}`, { nombre: nuevoNombre });
      setCategorias((prev) =>
        prev.map((cat) =>
          cat.id === id ? { ...cat, nombre: nuevoNombre } : cat
        )
      );
      setMensaje("Categoría actualizada con éxito.");
      setEditandoId(null);
    } catch (error) {
      setMensaje("Error al actualizar la categoría. Inténtalo de nuevo.");
      console.error("Error al actualizar la categoría:", error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta categoría?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`${ROUTES.CATEGORY}/${id}`);
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
          text="Añadir Categoría"
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
      <ul className={styles.categoryList}>
        {categorias.map((categoria) => (
          <li key={categoria.id} className={styles.categoryItem}>
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
                  className={styles.input}
                />
                <div className={styles.buttonGroup}>
                  <Button
                    text="Guardar"
                    onClick={() => handleEdit(categoria.id, categoria.nombre)}
                    className={`${styles.button} ${styles.save}`}
                  />
                  <Button
                    text="Cancelar"
                    onClick={() => setEditandoId(null)}
                    className={`${styles.button} ${styles.cancel}`}
                  />
                </div>
              </>
            ) : (
              <>
                <span className={styles.categoryName}>{categoria.nombre}</span>
                <div className={styles.buttonGroup}>
                  <Button
                    text="Editar"
                    onClick={() => setEditandoId(categoria.id)}
                    className={styles.button}
                  />
                  <Button
                    text="Eliminar"
                    onClick={() => handleDelete(categoria.id)}
                    className={`${styles.button} ${styles.delete}`}
                  />
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <Button
        text="Volver al Dashboard"
        onClick={() => navigate("/dashboard")}
        className={styles.dashboardButton}
      />
    </div>
  );
};

export default CrearCategoria;
