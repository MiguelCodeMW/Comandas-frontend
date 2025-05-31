import { useState, useEffect, useCallback } from "react"; // Añadir useCallback
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axio";
import { ComandaData } from "../utils/types/ComandaTypes";
import { User } from "../utils/types/UserTypes";
import { NAMES } from "../utils/Constants/text";
import { ROUTES } from "../utils/Constants/routes";

export function useComandaDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [comanda, setComanda] = useState<ComandaData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [subtotal, setSubtotal] = useState<number>(0);
  const [ivaPorcentaje, setIvaPorcentaje] = useState<number>(0.21); // Valor por defecto del IVA
  const [totalConIva, setTotalConIva] = useState<number>(0);

  const limpiarMensajes = () => {
    setMensaje(null);
    setError(null);
  };

  // NUEVA FUNCIÓN: Para obtener el IVA global del backend
  const fetchGlobalIva = useCallback(async () => {
    try {
      const res = await api.get(ROUTES.GET_IVA);
      console.log(
        "DEBUG: IVA global obtenido para detalle de comanda:",
        res.data.iva
      );
      return Number(res.data.iva);
    } catch (err) {
      console.error("Error al obtener IVA global para detalle:", err);
      return 0.21; // Fallback a 0.21 si falla la llamada al backend
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      limpiarMensajes();
      try {
        const comandaResponse = await api.get(
          ROUTES.COMANDA_DETAIL.replace(":id", id || "")
        );
        const fetchedComanda: ComandaData = comandaResponse.data.comanda;
        setComanda(fetchedComanda);

        const userResponse = await api.get(ROUTES.USER);
        setUser(userResponse.data.user || userResponse.data);

        if (fetchedComanda && fetchedComanda.detalles) {
          const calculatedSubtotal = fetchedComanda.detalles.reduce(
            (sum, detalle) => sum + detalle.cantidad * detalle.producto.precio,
            0
          );
          setSubtotal(calculatedSubtotal);

          let currentIva: number;
          if (fetchedComanda.iva !== null && fetchedComanda.iva !== undefined) {
            // Si la comanda tiene un IVA guardado (que es lo ideal), úsalo.
            currentIva = fetchedComanda.iva;
            console.log("DEBUG: Usando IVA de la comanda:", currentIva);
          } else {
            // Si la comanda NO tiene IVA guardado (ej: comanda antigua),
            // OBTENEMOS EL IVA GLOBAL ACTUAL DEL BACKEND
            currentIva = await fetchGlobalIva();
            console.log(
              "DEBUG: Comanda sin IVA, obteniendo global:",
              currentIva
            );
          }
          setIvaPorcentaje(currentIva);
          setTotalConIva(calculatedSubtotal * (1 + currentIva));
        }
      } catch (err: any) {
        console.error(NAMES.ERROR_CARGA_DETALLE_COMANDA, err);
        setError(NAMES.ERROR_CARGA_DETALLE_COMANDA);
        setComanda(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    } else {
      setLoading(false);
      setError(NAMES.COMANDA_ID_NO_PROPORCIONADO);
    }
  }, [id, fetchGlobalIva]); // Añadir fetchGlobalIva como dependencia

  const handleEditarComanda = () => {
    navigate(`${ROUTES.CREATE_COMANDA}?id=${id}`);
  };

  const handlePagarComanda = async () => {
    limpiarMensajes();
    if (!comanda) {
      setError(NAMES.COMANDA_NO_ENCONTRADA_PAGAR);
      return;
    }

    // Si la comanda ya está cerrada, no permitimos volver a pagarla
    if (comanda.estado === "cerrada") {
      setMensaje("La comanda ya está cerrada."); // Mensaje adecuado
      return;
    }

    try {
      setLoading(true);

      // Si la comanda ya tiene un IVA, lo usamos.
      // Si no, obtenemos el IVA global para calcular el pago si fuera necesario en el backend.
      // Sin embargo, el backend debería usar el IVA guardado en la comanda para el cálculo final
      // al actualizar el estado a 'cerrada'. Por seguridad, podemos enviar el IVA que ya tenemos.
      const ivaParaPagar =
        comanda.iva !== null && comanda.iva !== undefined
          ? comanda.iva
          : ivaPorcentaje; // Usa el que ya está calculado o el global

      const response = await api.put(
        ROUTES.COMANDA_PAGAR.replace(":id", id || ""),
        { iva: ivaParaPagar } // Enviamos el IVA con el que se está calculando
      );

      setComanda(response.data.comanda);
      // Ojo: los campos subtotal, iva y total_con_iva deben venir en la respuesta
      // del backend si se recalculan al pagar. Si no, quita estas líneas:
      setSubtotal(response.data.subtotal);
      setIvaPorcentaje(response.data.iva); // Actualiza con el IVA que viene del backend
      setTotalConIva(response.data.total_con_iva);
      setMensaje(response.data.message);
      setError(null);
    } catch (err: any) {
      console.error(NAMES.ERROR_PAGAR_COMANDA, err);
      const backendErrorMessage = err.response?.data?.message || err.message;
      setError(`${NAMES.ERROR_PAGAR_COMANDA}: ${backendErrorMessage}`);
      setMensaje(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBorrarComanda = async () => {
    limpiarMensajes();
    if (!comanda) {
      setError(NAMES.COMANDA_NO_ENCONTRADA_BORRAR);
      return;
    }
    const confirmDelete = window.confirm(NAMES.CONFIRM_BORRAR_COMANDA);
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await api.delete(ROUTES.COMANDA_DETAIL.replace(":id", id || ""));
      setMensaje(NAMES.COMANDA_BORRADA_EXITO);
      setTimeout(() => navigate(ROUTES.DASHBOARD), 1500);
    } catch (err: any) {
      console.error(NAMES.ERROR_BORRAR_COMANDA, err);
      setError(NAMES.ERROR_BORRAR_COMANDA);
    } finally {
      setLoading(false);
    }
  };

  return {
    comanda,
    subtotal,
    ivaPorcentaje,
    totalConIva,
    mensaje,
    error,
    loading,
    user,
    handleEditarComanda,
    handlePagarComanda,
    handleBorrarComanda,
    limpiarMensajes,
  };
}
