import { useState, useEffect } from "react";
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

          // Si la comanda ya tiene un IVA guardado, úsalo.
          // Si no, busca el IVA global en localStorage o usa 0.21 por defecto.
          let currentIva: number;
          if (fetchedComanda.iva !== null && fetchedComanda.iva !== undefined) {
            currentIva = fetchedComanda.iva;
          } else {
            currentIva = parseFloat(localStorage.getItem("iva") || "0.21");
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
  }, [id]);

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
      setMensaje("MIERDA EN UN TARRO"); // Cambia esto por un mensaje adecuado
      return;
    }

    try {
      setLoading(true);

      // Siempre usamos el ivaPorcentaje actual (que puede venir de la comanda o del localStorage)
      const response = await api.put(
        ROUTES.COMANDA_PAGAR.replace(":id", id || ""),
        { iva: ivaPorcentaje }
      );

      setComanda(response.data.comanda);
      setSubtotal(response.data.subtotal);
      setIvaPorcentaje(response.data.iva);
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
