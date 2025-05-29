import { useState, useEffect, useCallback } from "react";
import api from "../api/axio"; // Tu instancia de Axios
import { CategoriaProps } from "../utils/Categoria/CategoriaProps";
import { ROUTES } from "../utils/Constants/routes";
import { NAMES } from "../utils/Constants/text";
import axios, { AxiosError } from "axios"; // Importar AxiosError y axios para isAxiosError

export function useGestionCategorias() {
  const [categorias, setCategorias] = useState<CategoriaProps[]>([]);
  const [nombreNuevaCategoria, setNombreNuevaCategoria] = useState<string>(""); // Manteniendo este estado como en tu archivo original
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [categoriaEnEdicion, setCategoriaEnEdicion] =
    useState<CategoriaProps | null>(null);

  const fetchCategorias = useCallback(async () => {
    try {
      setMensaje(null);
      setError(null);
      const response = await api.get(ROUTES.CATEGORY);
      setCategorias(response.data.categorias || response.data);
    } catch (err) {
      console.error(NAMES.ALERTA_CATEGORIA_CARGAR, err);
      setError(NAMES.ALERTA_CATEGORIA_CARGAR);
    }
  }, []);

  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]);

  const limpiarMensajes = () => {
    setMensaje(null);
    setError(null);
  };

  const handleCrearCategoria = async (
    nombreCategoria: string
  ): Promise<boolean> => {
    limpiarMensajes();
    if (!nombreCategoria.trim()) {
      setError(NAMES.ALERTA_CATEGORIA_NOMBRE);
      return false;
    }

    if (
      categorias.some(
        (cat) =>
          cat.nombre.toLowerCase() === nombreCategoria.toLowerCase().trim()
      )
    ) {
      setError(NAMES.ALERTA_CATEGORIA_DUPLICADA);
      return false;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Usuario no autenticado."); // Considera usar una constante de NAMES si tienes una para esto
        return false;
      }

      await api.post(
        ROUTES.CATEGORY,
        { nombre: nombreCategoria },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMensaje(NAMES.CATEGORIA_EXITOSA);
      await fetchCategorias();
      return true;
    } catch (err) {
      console.error("Error al crear categoría:", err);
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<any>;
        setError(
          axiosError.response?.data?.message || NAMES.ALERTA_CATEGORIA_GUARDAR
        );
      } else {
        setError(NAMES.ERROR_INESPERADO);
      }
      return false;
    }
  };

  const iniciarEdicion = (id: number) => {
    limpiarMensajes();
    const categoria = categorias.find((cat) => cat.id === id);
    if (categoria) {
      setEditandoId(id);
      setCategoriaEnEdicion(categoria);
    }
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setCategoriaEnEdicion(null);
    limpiarMensajes();
  };

  const handleEditarCategoria = async (
    id: number,
    nuevoNombre: string
  ): Promise<boolean> => {
    limpiarMensajes();
    if (!nuevoNombre.trim()) {
      setError(NAMES.ALERTA_NOMBRE);
      return false;
    }

    const otraCategoriaExistente = categorias.some(
      (cat) =>
        cat.id !== id &&
        cat.nombre.toLowerCase() === nuevoNombre.trim().toLowerCase()
    );
    if (otraCategoriaExistente) {
      setError(NAMES.ALERTA_CATEGORIA_DUPLICADA);
      return false;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Usuario no autenticado."); // Considera usar una constante de NAMES
        return false;
      }
      await api.put(
        ROUTES.CATEGORY_DETAIL.replace(":id", id.toString()),
        { nombre: nuevoNombre },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Actualización optimista local antes de re-fetch o confiar en el re-fetch de fetchCategorias si se llama
      setCategorias((prev) =>
        prev.map((cat) =>
          cat.id === id ? { ...cat, nombre: nuevoNombre.trim() } : cat
        )
      );
      setMensaje(NAMES.CATEGORIA_ACTUALIZADA);
      cancelarEdicion(); // Cierra el formulario de edición
      // Opcionalmente, podrías llamar a fetchCategorias() aquí si quieres asegurar la data del servidor
      return true;
    } catch (err) {
      console.error(NAMES.ALERTA_CATEGORIA_ACTUALIZAR, err);
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<any>;
        setError(
          axiosError.response?.data?.message ||
            NAMES.ALERTA_CATEGORIA_ACTUALIZAR
        );
      } else {
        setError(NAMES.ERROR_INESPERADO);
      }
      return false;
    }
  };

  const handleEliminarCategoriaCallback = (
    id: number,
    errorMessage: string | null
  ) => {
    limpiarMensajes();
    if (errorMessage) {
      setError(errorMessage);
    } else {
      // Actualización optimista local
      setCategorias((prev) => prev.filter((cat) => cat.id !== id));
      setMensaje(NAMES.CATEGORIA_ELIMINAR_EXITOSA); // Asumiendo que es CATEGORIA_ELIMINAR_EXITOSA
      // No es necesario llamar a fetchCategorias() aquí si EliminarCategoria ya hizo la llamada API
      // y este callback es solo para actualizar el estado local y mostrar mensajes.
    }
  };

  return {
    categorias,
    nombreNuevaCategoria, // Manteniendo como en tu archivo original
    setNombreNuevaCategoria, // Manteniendo como en tu archivo original
    mensaje,
    error,
    editandoId,
    categoriaEnEdicion,
    fetchCategorias,
    handleCrearCategoria,
    iniciarEdicion,
    cancelarEdicion,
    handleEditarCategoria,
    handleEliminarCategoriaCallback,
    limpiarMensajes,
  };
}
