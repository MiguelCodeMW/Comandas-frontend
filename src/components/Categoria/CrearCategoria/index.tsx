import { useState, useEffect } from "react";
import api from "../../../api/axio";
import { Categoria } from "../../../utils/Categoria";
import { ROUTES } from "../../../utils/Constants/routes";
import Button from "../../Button/Button";
import CategoriaList from "../CategoriaList/CategoriaList";
import styles from "../Categoria.module.css";
import { useNavigate } from "react-router-dom";
import { NAMES } from "../../../utils/Constants/text";

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
        console.error(NAMES.ALERTA_CATEGORIA_CARGAR, error);
      }
    };

    fetchCategorias();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensaje(null);

    if (!nombre.trim()) {
      setMensaje(NAMES.ALERTA_CATEGORIA_NOMBRE);
      return;
    }

    try {
      const response = await api.post(ROUTES.CATEGORY, { nombre });
      setCategorias((categoria) => [...categoria, response.data.categoria]);
      setMensaje(NAMES.CATEGORIA_EXITOSA);
      setNombre("");
    } catch (error) {
      setMensaje(NAMES.ALERTA_CATEGORIA_GUARDAR);
      console.error(NAMES.ALERTA_CATEGORIA_GUARDAR, error);
    }
  };

  const handleEdit = (id: number) => {
    setEditandoId(id);
  };

  const handleCategoriaEditada = async (id: number, nuevoNombre: string) => {
    if (!nuevoNombre.trim()) {
      setMensaje(NAMES.ALERTA_NOMBRE);
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
      setMensaje(NAMES.CATEGORIA_ACTUALIZADA);
    } catch (error: any) {
      setMensaje(
        error.response?.data?.message || NAMES.ALERTA_CATEGORIA_ACTUALIZAR
      );
      console.error(NAMES.ALERTA_CATEGORIA_ACTUALIZAR, error);
    }
    setEditandoId(null);
  };

  const handleEliminarCategoria = (id: number) => {
    setCategorias((categorias) =>
      categorias.filter((categoria) => categoria.id !== id)
    );
    setMensaje(NAMES.CATEGORIA_ELIMAR_EXISTOSA);
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
            placeholder={NAMES.PLACEHOLDER_NOMBRE}
            required
          />
        </label>
        <Button
          text={NAMES.CATEGORIA_GUARDAR}
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
