import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/axio";
import {
  ProductoProps,
  ProductoSeleccionado,
} from "../utils/types/ComandaTypes";
import { CategoriaProps } from "../utils/types/CategoriaTypes";
import { ROUTES } from "../utils/Constants/routes";
import { NAMES } from "../utils/Constants/text";

export function useCrearComanda() {
  const [categorias, setCategorias] = useState<CategoriaProps[]>([]);
  const [productos, setProductos] = useState<ProductoProps[]>([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState<
    ProductoSeleccionado[]
  >([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const comandaIdParaEditar = searchParams.get("id");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const globalIva = parseFloat(localStorage.getItem("iva") || "0.21");
  const limpiarMensajes = () => {
    setMensaje(null);
    setError(null);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    limpiarMensajes();
    try {
      // Obtener el ID del usuario logueado
      const userResponse = await api.get(ROUTES.USER);
      // Ajusta según la estructura exacta de tu respuesta de /user (ej: { user: { id: 1 } } o { id: 1 })
      setUserId(userResponse.data.id || userResponse.data.user?.id || null);

      // Obtener categorías
      const categoriasResponse = await api.get(ROUTES.CATEGORY);
      setCategorias(
        categoriasResponse.data.categorias || categoriasResponse.data
      );

      // Obtener productos
      const productosResponse = await api.get(ROUTES.PRODUCT);
      setProductos(productosResponse.data.productos || productosResponse.data);

      // Si es una edición, cargar los productos de la comanda existente
      if (comandaIdParaEditar) {
        const comandaResponse = await api.get(
          ROUTES.COMANDA_DETAIL.replace(":id", comandaIdParaEditar)
        );
        const comandaAEditar = comandaResponse.data.comanda;
        if (comandaAEditar && comandaAEditar.detalles) {
          setProductosSeleccionados(
            comandaAEditar.detalles.map((detalle: any) => ({
              id: detalle.producto.id,
              nombre: detalle.producto.nombre,
              precio: detalle.producto.precio,
              categoria_id: detalle.producto.categoria_id,
              cantidad: detalle.cantidad,
            }))
          );
        }
      }
    } catch (err) {
      console.error(NAMES.ERROR_CARGA, err);
      setError(NAMES.ERROR_CARGA);
    } finally {
      setLoading(false);
    }
  }, [comandaIdParaEditar]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSeleccionarProducto = (producto: ProductoProps) => {
    setProductosSeleccionados((prev) => {
      const productoExistente = prev.find((p) => p.id === producto.id);
      if (productoExistente) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  const handleAumentarCantidad = (id: number) => {
    setProductosSeleccionados((prev) =>
      prev.map((p) => (p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p))
    );
  };

  const handleDisminuirCantidad = (id: number) => {
    setProductosSeleccionados((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p))
        .filter((p) => p.cantidad > 0)
    );
  };

  const handleFinalizarComanda = async () => {
    limpiarMensajes();
    if (!userId) {
      setError(NAMES.ERROR_ID);
      return;
    }
    if (productosSeleccionados.length === 0) {
      setError(NAMES.COMANDA_SIN_PRODUCTOS);
      return;
    }

    // 🔥 Añade esta línea para obtener el IVA global
    const ivaParaEnviar = parseFloat(localStorage.getItem("iva") || "0.21");

    try {
      const payload = {
        user_id: userId,
        estado: "abierta",
        productos: productosSeleccionados.map((p) => ({
          producto_id: p.id,
          cantidad: p.cantidad,
        })),
        iva: ivaParaEnviar, // 🔥 Incluye el IVA en el payload
      };

      if (comandaIdParaEditar) {
        await api.put(
          ROUTES.COMANDA_DETAIL.replace(":id", comandaIdParaEditar),
          payload
        );
        setMensaje(NAMES.COMANDA_ACTUALIZADA_EXITO);
      } else {
        await api.post(ROUTES.COMANDA, {
          ...payload,
          fecha: new Date().toISOString(),
        });
        setMensaje(NAMES.COMANDA_EXITOSA);
      }
      setProductosSeleccionados([]);
      setTimeout(() => navigate(ROUTES.DASHBOARD), 1500);
    } catch (err: any) {
      console.error("ERROR GUARDAR COMANDA", err);
      const backendErrorMessage =
        err.response?.data?.message || "Error desconocido";
      setError(`Error al guardar: ${backendErrorMessage}`);
    }
  };

  return {
    categorias,
    productos,
    productosSeleccionados,
    comandaIdParaEditar,
    mensaje,
    error,
    loading,
    handleSeleccionarProducto,
    handleAumentarCantidad,
    handleDisminuirCantidad,
    handleFinalizarComanda,
    limpiarMensajes,
  };
}
