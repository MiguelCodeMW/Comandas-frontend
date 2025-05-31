import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/axio"; // Asegúrate de que 'api' esté configurado correctamente con la base URL
import {
  ProductoProps,
  ProductoSeleccionado,
  MesaData,
  ComandaData,
} from "../utils/types/ComandaTypes"; // Asegúrate de que estos tipos estén correctamente definidos e importados
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
  const comandaIdParaEditar = searchParams.get("id"); // Obtiene el ID de la comanda si estamos editando
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [ivaActualComanda, setIvaActualComanda] = useState<number | null>(null);
  const [loadingIvaComanda, setLoadingIvaComanda] = useState<boolean>(true);
  const [errorIvaComanda, setErrorIvaComanda] = useState<string | null>(null);

  // NUEVOS ESTADOS PARA MESAS
  const [mesasDisponibles, setMesasDisponibles] = useState<MesaData[]>([]);
  const [mesaSeleccionadaId, setMesaSeleccionadaId] = useState<number | null>(
    null
  );
  const [loadingMesas, setLoadingMesas] = useState<boolean>(true);
  const [errorMesas, setErrorMesas] = useState<string | null>(null);

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

  // NUEVA FUNCIÓN: Para obtener las mesas
  const fetchMesas = useCallback(async () => {
    setLoadingMesas(true);
    setErrorMesas(null);
    try {
      const response = await api.get(ROUTES.MESAS);
      const fetchedMesas: MesaData[] = response.data;
      setMesasDisponibles(fetchedMesas); // Guarda todas las mesas obtenidas
    } catch (err: any) {
      console.error("Error al cargar las mesas:", err);
      setErrorMesas(NAMES.ERROR_CARGA_MESAS);
    } finally {
      setLoadingMesas(false);
    }
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    limpiarMensajes();
    try {
      // Cargar el IVA y las mesas en paralelo
      await Promise.all([fetchIvaForComanda(), fetchMesas()]);

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

      // Si es una edición, cargar los productos y la MESA de la comanda existente
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
          // SI LA COMANDA YA TIENE UNA MESA ASIGNADA, SELECCIÓNALA
          if (
            comandaAEditar.mesa_id !== undefined &&
            comandaAEditar.mesa_id !== null
          ) {
            setMesaSeleccionadaId(comandaAEditar.mesa_id);
          } else {
            setMesaSeleccionadaId(null); // Asegura que se deseleccione si no tiene mesa
          }
          // Aquí actualizamos mesasDisponibles para incluir también la mesa actual de la comanda si está ocupada
          // y asegurarnos que solo las libres y la ocupada por la comanda actual aparezcan para reasignación
          const allMesasResponse = await api.get(ROUTES.MESAS);
          setMesasDisponibles(
            allMesasResponse.data.filter(
              (mesa: MesaData) =>
                mesa.estado === "libre" || mesa.id === comandaAEditar.mesa_id
            )
          );
        }
      } else {
        // En modo creación, solo mostramos las mesas libres para seleccionar
        const initialMesas = await api.get(ROUTES.MESAS);
        setMesasDisponibles(
          initialMesas.data.filter((mesa: MesaData) => mesa.estado === "libre")
        );
        setMesaSeleccionadaId(null); // Asegura que al crear, la mesa inicial sea "Sin Mesa"
      }
    } catch (err: any) {
      console.error(NAMES.ERROR_CARGA, err);
      setError(NAMES.ERROR_CARGA);
      setIvaActualComanda(0.21); // Asegurar un fallback en caso de error general
    } finally {
      setLoading(false);
    }
  }, [comandaIdParaEditar, fetchIvaForComanda, fetchMesas]);

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

  // NUEVA FUNCIÓN: Manejar la selección de mesa
  const handleSeleccionarMesa = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    // Si el valor es "null" (nuestra opción para sin mesa), se guarda como null.
    // De lo contrario, se convierte a número.
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
        estado: "abierta", // O "cerrada" si quieres una comanda directa de pago
        productos: productosSeleccionados.map((p) => ({
          producto_id: p.id,
          cantidad: p.cantidad,
        })),
        iva: ivaParaEnviar,
        mesa_id: mesaSeleccionadaId, // AÑADIDO: Envía el ID de la mesa seleccionada (puede ser null)
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
          fecha: new Date().toISOString(), // La fecha se envía al crear
        });
        setMensaje(NAMES.COMANDA_EXITOSA);
      }
      setProductosSeleccionados([]);
      setMesaSeleccionadaId(null); // Limpiar selección de mesa después de crear/actualizar
      // Vuelve a cargar las mesas disponibles para reflejar el nuevo estado de la que acaba de ser ocupada
      await fetchMesas();
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
    loading: loading || loadingIvaComanda || loadingMesas, // Considera el loading de mesas
    ivaActualComanda,
    mesasDisponibles: mesasDisponibles.filter(
      (mesa) => mesa.estado === "libre" || mesa.id === mesaSeleccionadaId
    ), // Filtra para mostrar solo libres y la actual si está ocupada
    mesaSeleccionadaId,
    handleSeleccionarProducto,
    handleAumentarCantidad,
    handleDisminuirCantidad,
    handleSeleccionarMesa,
    handleFinalizarComanda,
    limpiarMensajes,
  };
}
