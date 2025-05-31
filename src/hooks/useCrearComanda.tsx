import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import api from "../api/axio";
import {
  ProductoProps,
  ProductoSeleccionado,
  MesaData,
  ComandaData,
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
  const location = useLocation(); // ¡Este es el hook para acceder al estado de la URL y navegación!
  const comandaIdParaEditar = searchParams.get("id");
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [ivaActualComanda, setIvaActualComanda] = useState<number | null>(null);
  const [loadingIvaComanda, setLoadingIvaComanda] = useState<boolean>(true);
  const [errorIvaComanda, setErrorIvaComanda] = useState<string | null>(null);

  // ESTADOS PARA MESAS
  const [mesasDisponibles, setMesasDisponibles] = useState<MesaData[]>([]);
  const [mesaSeleccionadaId, setMesaSeleccionadaId] = useState<number | null>(
    null
  );
  const [loadingMesas, setLoadingMesas] = useState<boolean>(true);
  const [errorMesas, setErrorMesas] = useState<string | null>(null);

  // Estado temporal para la mesa preseleccionada desde la navegación.
  // Será inicializado por el useEffect que usa useLocation.
  const [initialSelectedMesaId, setInitialSelectedMesaId] = useState<
    number | null
  >(null);

  // NUEVO: useEffect para obtener initialSelectedMesaId usando `useLocation`
  useEffect(() => {
    // location.state es el objeto que contiene el estado pasado con navigate
    const state = location.state as { selectedMesaId?: number } | undefined;

    if (state && typeof state.selectedMesaId === "number") {
      setInitialSelectedMesaId(state.selectedMesaId);
      // Opcional: Limpiar el estado de navegación para evitar que se aplique de nuevo
      // Esto es útil si quieres que la preselección solo ocurra una vez al llegar
      navigate(ROUTES.CREATE_COMANDA, { replace: true, state: {} });
    }
  }, [location.state, navigate]); // Dependencias: location.state y navigate

  const limpiarMensajes = () => {
    setMensaje(null);
    setError(null);
  };

  const fetchIvaForComanda = useCallback(async () => {
    setLoadingIvaComanda(true);
    setErrorIvaComanda(null);
    try {
      const res = await api.get(ROUTES.GET_IVA);
      const ivaObtenido = res.data.iva;

      if (ivaObtenido !== undefined && ivaObtenido !== null) {
        setIvaActualComanda(Number(ivaObtenido));
      } else {
        setIvaActualComanda(0.21); // Fallback
      }
    } catch (err: any) {
      console.error("Error al cargar IVA para comanda:", err);
      setErrorIvaComanda(NAMES.IVA_NO_CONFIGURADO);
      setIvaActualComanda(0.21); // Usa 0.21 como fallback
    } finally {
      setLoadingIvaComanda(false);
    }
  }, []);

  const fetchMesas = useCallback(async () => {
    setLoadingMesas(true);
    setErrorMesas(null);
    try {
      const response = await api.get(ROUTES.MESAS);
      const fetchedMesas: MesaData[] = response.data;
      setMesasDisponibles(fetchedMesas); // Guarda todas las mesas obtenidas
      return fetchedMesas; // Devuelve las mesas para usarlas en fetchData
    } catch (err: any) {
      console.error("Error al cargar las mesas:", err);
      setErrorMesas(NAMES.ERROR_CARGA_MESAS);
      return []; // Devuelve un array vacío en caso de error
    } finally {
      setLoadingMesas(false);
    }
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    limpiarMensajes();
    try {
      // Cargar el IVA y las mesas en paralelo
      const [_, fetchedMesas] = await Promise.all([
        fetchIvaForComanda(),
        fetchMesas(),
      ]); // Guarda las mesas devueltas por fetchMesas

      // Obtener el ID del usuario logueado
      const userResponse = await api.get(ROUTES.USER);
      setUserId(userResponse.data.id || userResponse.data.user?.id || null);

      // Obtener categorías y productos
      const [categoriasResponse, productosResponse] = await Promise.all([
        api.get(ROUTES.CATEGORY),
        api.get(ROUTES.PRODUCT),
      ]);
      setCategorias(
        categoriasResponse.data.categorias || categoriasResponse.data
      );
      setProductos(productosResponse.data.productos || productosResponse.data);

      // Lógica para establecer la mesa seleccionada
      if (comandaIdParaEditar) {
        const comandaResponse = await api.get(
          ROUTES.COMANDA_DETAIL.replace(":id", comandaIdParaEditar)
        );
        const comandaAEditar: ComandaData = comandaResponse.data.comanda;

        if (comandaAEditar) {
          if (comandaAEditar.detalles) {
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
          // Si la comanda ya tiene una mesa asignada, seleccionala
          if (
            comandaAEditar.mesa_id !== undefined &&
            comandaAEditar.mesa_id !== null
          ) {
            setMesaSeleccionadaId(comandaAEditar.mesa_id);
          } else {
            setMesaSeleccionadaId(null);
          }
          // Asegurarse de que en modo edición, las mesas disponibles incluyan la mesa actual de la comanda
          // incluso si está ocupada, para que el usuario pueda verla.
          setMesasDisponibles(
            fetchedMesas.filter(
              (mesa: MesaData) =>
                mesa.estado === "libre" || mesa.id === comandaAEditar.mesa_id
            )
          );
        }
      } else {
        // En modo creación, primero intenta usar initialSelectedMesaId
        if (
          initialSelectedMesaId !== null &&
          fetchedMesas.some(
            (mesa) =>
              mesa.id === initialSelectedMesaId && mesa.estado === "libre"
          )
        ) {
          setMesaSeleccionadaId(initialSelectedMesaId);
        } else {
          // Si no hay initialSelectedMesaId o no es válido, inicializa a null (Sin Mesa)
          setMesaSeleccionadaId(null);
        }
        // En modo creación, solo mostramos las mesas libres para seleccionar
        setMesasDisponibles(
          fetchedMesas.filter((mesa: MesaData) => mesa.estado === "libre")
        );
      }
    } catch (err: any) {
      console.error(NAMES.ERROR_CARGA, err);
      setError(NAMES.ERROR_CARGA);
      setIvaActualComanda(0.21);
    } finally {
      setLoading(false);
    }
  }, [
    comandaIdParaEditar,
    fetchIvaForComanda,
    fetchMesas,
    initialSelectedMesaId, // Añade initialSelectedMesaId a las dependencias de fetchData
  ]);

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

  const handleSeleccionarMesa = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setMesaSeleccionadaId(
      selectedValue === "null" ? null : Number(selectedValue)
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

    const ivaParaEnviar = ivaActualComanda !== null ? ivaActualComanda : 0.21;

    try {
      const payload = {
        user_id: userId,
        estado: "abierta",
        productos: productosSeleccionados.map((p) => ({
          producto_id: p.id,
          cantidad: p.cantidad,
        })),
        iva: ivaParaEnviar,
        mesa_id: mesaSeleccionadaId,
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
      setMesaSeleccionadaId(null);
      await fetchMesas(); // Vuelve a cargar las mesas para actualizar su estado
      setTimeout(() => navigate(ROUTES.DASHBOARD), 1500);
    } catch (err: any) {
      console.error("ERROR GUARDAR COMANDA", err);
      const backendErrorMessage =
        err.response?.data?.message || "Error desconocido";
      setError(`Error al guardar: ${backendErrorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    categorias,
    productos,
    productosSeleccionados,
    comandaIdParaEditar,
    mensaje,
    error,
    loading: loading || loadingIvaComanda || loadingMesas,
    ivaActualComanda,
    // La lista de mesas disponibles ahora incluye la lógica para la mesa actualmente seleccionada en modo edición
    mesasDisponibles: mesasDisponibles.filter(
      (mesa) => mesa.estado === "libre" || mesa.id === mesaSeleccionadaId
    ),
    mesaSeleccionadaId,
    handleSeleccionarProducto,
    handleAumentarCantidad,
    handleDisminuirCantidad,
    handleSeleccionarMesa,
    handleFinalizarComanda,
    limpiarMensajes,
  };
}
