import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axio";
import { ROUTES } from "../utils/Constants/routes";

const API_ROUTES = {
  DASHBOARD: "/dashboard",
  GET_IVA: "/configuracion/iva",
  SET_IVA: "/configuracion/iva",
};

export interface ComandaDashboard {
  id: number;
  fecha: string;
  estado: "abierta" | "cerrada";
  user_id: number;
  usuario?: {
    id: number;
    name: string;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "mesero" | "cajero";
}

export function useDashboard() {
  const [comandas, setComandas] = useState<ComandaDashboard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingIva, setLoadingIva] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [errorIva, setErrorIva] = useState<string | null>(null);
  const [mostrarPagadas, setMostrarPagadas] = useState<boolean>(false);
  const [showModalIva, setShowModalIva] = useState(false);
  const [iva, setIva] = useState<number | null>(null);
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Error parsing user from localStorage", e);
      return null;
    }
  });

  const fetchComandas = useCallback(async () => {
    setError(null);
    try {
      const res = await api.get(API_ROUTES.DASHBOARD);
      setComandas(
        Array.isArray(res.data.comandas)
          ? res.data.comandas
          : Array.isArray(res.data)
          ? res.data
          : []
      );
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Error al cargar comandas"
      );
      console.error("Error al cargar comandas:", err);
    }
  }, []);

  const fetchIvaGlobal = useCallback(async () => {
    setLoadingIva(true);
    setErrorIva(null);
    try {
      const res = await api.get(API_ROUTES.GET_IVA);
      setIva(
        res.data.iva !== undefined && res.data.iva !== null
          ? Number(res.data.iva)
          : null
      );
    } catch (err: any) {
      setErrorIva(
        err.response?.data?.message || err.message || "Error al cargar IVA"
      );
      console.error("Error al cargar IVA global:", err);
    } finally {
      setLoadingIva(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchComandas(), fetchIvaGlobal()])
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [fetchComandas, fetchIvaGlobal]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("iva");
    setUser(null);
    setIva(null);
    navigate(ROUTES.LOGIN);
  };

  const handleIvaGuardado = async (nuevoIva: number) => {
    setErrorIva(null);
    try {
      await api.post(API_ROUTES.SET_IVA, { iva: nuevoIva });
      setIva(nuevoIva);
      localStorage.setItem("iva", nuevoIva.toString());
      setShowModalIva(false);
    } catch (error: any) {
      console.error("Error al guardar el IVA en el backend:", error);
      setErrorIva(
        error.response?.data?.message ||
          error.response?.data?.errors?.iva?.[0] ||
          error.message ||
          "Error al guardar IVA"
      );
    }
  };

  const comandasFiltradas = mostrarPagadas
    ? comandas.filter((comanda) => comanda.estado === "cerrada")
    : comandas.filter((comanda) => comanda.estado === "abierta");

  return {
    comandas,
    comandasFiltradas,
    loading: loading || loadingIva,
    error,
    errorIva,
    mostrarPagadas,
    setMostrarPagadas,
    showModalIva,
    setShowModalIva,
    iva,
    user,
    handleLogout,
    handleIvaGuardado,
    fetchComandas,
    fetchIvaGlobal,
  };
}
