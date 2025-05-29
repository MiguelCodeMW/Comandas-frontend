import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axio";
import { ROUTES } from "../utils/Constants/routes";
import { NAMES } from "../utils/Constants/text";
import { ComandaData } from "../utils/ComandaData";

export function useComandaDetalle() {
  const { id: comandaId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [comanda, setComanda] = useState<ComandaData | null>(null);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [ivaPorcentaje, setIvaPorcentaje] = useState<number>(0); // IVA como porcentaje (ej: 0.21)
  const [totalConIva, setTotalConIva] = useState<number>(0);
  const [mensaje, setMensaje] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const limpiarMensajes = () => {
    setMensaje("");
    setError(null);
  };

  const fetchComandaDetails = useCallback(async () => {
    if (!comandaId) return;
    setLoading(true);
    limpiarMensajes();
    try {
      const ivaGuardado = Number(localStorage.getItem("iva") || "0.21"); // Default si no hay IVA
      let url = ROUTES.COMANDA_DETAIL.replace(":id", comandaId);
      // El backend debería calcular el IVA si la comanda está abierta y se le pasa el %
      // Si la comanda ya está cerrada, el backend debería devolver los valores con los que se cerró.
      // Para este ejemplo, asumimos que si está abierta, el backend puede recalcular con el IVA actual.
      // Si la comanda está 'abierta', podrías pasar el IVA actual para el cálculo.
      // if (comanda?.estado === 'abierta' || !comanda) { // Si no tenemos comanda aún, o está abierta
      //   url += `?iva=${ivaGuardado}`;
      // }
      // Simplificación: el backend siempre devuelve subtotal, iva_aplicado, total_con_iva
      const res = await api.get(url);
      setComanda(res.data.comanda);
      setSubtotal(res.data.subtotal);
      setIvaPorcentaje(res.data.iva); // Asumiendo que el backend devuelve el IVA que se aplicó o se debe aplicar
      setTotalConIva(res.data.total_con_iva);
    } catch (err: any) {
      setError(
        err.response?.data?.message || NAMES.ALERTA_COMANDA_CARGAR_DETALLE
      );
      console.error(NAMES.ALERTA_COMANDA_CARGAR_DETALLE, err);
    } finally {
      setLoading(false);
    }
  }, [comandaId]);

  useEffect(() => {
    fetchComandaDetails();
  }, [fetchComandaDetails]);

  const handleEditarComanda = () => {
    if (comandaId) {
      navigate(`${ROUTES.CREATE_COMANDA}?id=${comandaId}`);
    }
  };

  const handlePagarComanda = async () => {
    if (!comandaId) return;
    limpiarMensajes();
    try {
      const ivaParaPagar = Number(localStorage.getItem("iva") || "0.21"); // Usar el IVA actual al momento de pagar
      await api.put(ROUTES.COMANDA_PAGAR.replace(":id", comandaId), {
        iva: ivaParaPagar, // Enviar el IVA con el que se va a cerrar/pagar
      });
      setMensaje(NAMES.COMANDA_PAGADA_EXITOSA);
      // Volver a cargar los detalles para reflejar el estado "cerrada" y los totales finales
      fetchComandaDetails();
    } catch (err: any) {
      setError(err.response?.data?.message || NAMES.ALERTA_COMANDA_PAGAR);
      console.error(NAMES.ALERTA_COMANDA_PAGAR, err);
    }
  };

  const handleBorrarComanda = async () => {
    if (!comandaId || !window.confirm(NAMES.COMANDA_BORRAR_CONFIRMACION))
      return;
    limpiarMensajes();
    try {
      await api.delete(ROUTES.COMANDA_DETAIL.replace(":id", comandaId));
      setMensaje(NAMES.COMANDA_BORRADA_EXITO);
      setTimeout(() => navigate(ROUTES.DASHBOARD), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || NAMES.ALERTA_COMANDA_BORRAR);
      console.error(NAMES.ALERTA_COMANDA_BORRAR, err);
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
    fetchComandaDetails, // Exponer por si se necesita re-fetch manual
    handleEditarComanda,
    handlePagarComanda,
    handleBorrarComanda,
    limpiarMensajes,
  };
}
