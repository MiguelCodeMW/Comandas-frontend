// // import { useState, useEffect, useCallback } from "react";
// // import { useNavigate } from "react-router-dom";
// // import api from "../api/axio";
// // import { ROUTES } from "../utils/Constants/routes";

// // const API_ROUTES = {
// //   DASHBOARD: "/dashboard",
// //   GET_IVA: "/configuracion/iva",
// //   SET_IVA: "/configuracion/iva",
// //   GET_MONEDA: "/configuracion/moneda", // NUEVA RUTA
// //   SET_MONEDA: "/configuracion/moneda", // NUEVA RUTA
// // };

// // export interface ComandaDashboard {
// //   id: number;
// //   fecha: string;
// //   estado: "abierta" | "cerrada";
// //   user_id: number;
// //   usuario?: {
// //     id: number;
// //     name: string;
// //   };
// // }

// // export interface User {
// //   id: number;
// //   name: string;
// //   email: string;
// //   role: "admin" | "mesero" | "cajero";
// // }

// // export function useDashboard() {
// //   const [comandas, setComandas] = useState<ComandaDashboard[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [loadingIva, setLoadingIva] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [errorIva, setErrorIva] = useState<string | null>(null);
// //   const [mostrarPagadas, setMostrarPagadas] = useState<boolean>(false);
// //   const [showModalIva, setShowModalIva] = useState(false);
// //   const [iva, setIva] = useState<number | null>(null);
// //   const navigate = useNavigate();

// //   const [user, setUser] = useState<User | null>(() => {
// //     const storedUser = localStorage.getItem("user");
// //     try {
// //       return storedUser ? JSON.parse(storedUser) : null;
// //     } catch (e) {
// //       console.error("Error parsing user from localStorage", e);
// //       return null;
// //     }
// //   });

// //   const fetchComandas = useCallback(async () => {
// //     setError(null);
// //     try {
// //       const res = await api.get(API_ROUTES.DASHBOARD);
// //       setComandas(
// //         Array.isArray(res.data.comandas)
// //           ? res.data.comandas
// //           : Array.isArray(res.data)
// //           ? res.data
// //           : []
// //       );
// //     } catch (err: any) {
// //       setError(
// //         err.response?.data?.message || err.message || "Error al cargar comandas"
// //       );
// //       console.error("Error al cargar comandas:", err);
// //     }
// //   }, []);

// //   const fetchIvaGlobal = useCallback(async () => {
// //     setLoadingIva(true);
// //     setErrorIva(null);
// //     try {
// //       const res = await api.get(API_ROUTES.GET_IVA);
// //       setIva(
// //         res.data.iva !== undefined && res.data.iva !== null
// //           ? Number(res.data.iva)
// //           : null
// //       );
// //     } catch (err: any) {
// //       setErrorIva(
// //         err.response?.data?.message || err.message || "Error al cargar IVA"
// //       );
// //       console.error("Error al cargar IVA global:", err);
// //     } finally {
// //       setLoadingIva(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     setLoading(true);
// //     Promise.all([fetchComandas(), fetchIvaGlobal()])
// //       .catch(console.error)
// //       .finally(() => setLoading(false));
// //   }, [fetchComandas, fetchIvaGlobal]);

// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("user");
// //     localStorage.removeItem("iva");
// //     setUser(null);
// //     setIva(null);
// //     navigate(ROUTES.LOGIN);
// //   };

// //   const handleIvaGuardado = async (nuevoIva: number) => {
// //     setErrorIva(null);
// //     try {
// //       await api.post(API_ROUTES.SET_IVA, { iva: nuevoIva });
// //       setIva(nuevoIva);
// //       localStorage.setItem("iva", nuevoIva.toString());
// //       setShowModalIva(false);
// //     } catch (error: any) {
// //       console.error("Error al guardar el IVA en el backend:", error);
// //       setErrorIva(
// //         error.response?.data?.message ||
// //           error.response?.data?.errors?.iva?.[0] ||
// //           error.message ||
// //           "Error al guardar IVA"
// //       );
// //     }
// //   };

// //   const comandasFiltradas = mostrarPagadas
// //     ? comandas.filter((comanda) => comanda.estado === "cerrada")
// //     : comandas.filter((comanda) => comanda.estado === "abierta");

// //   return {
// //     comandas,
// //     comandasFiltradas,
// //     loading: loading || loadingIva,
// //     error,
// //     errorIva,
// //     mostrarPagadas,
// //     setMostrarPagadas,
// //     showModalIva,
// //     setShowModalIva,
// //     iva,
// //     user,
// //     handleLogout,
// //     handleIvaGuardado,
// //     fetchComandas,
// //     fetchIvaGlobal,
// //   };
// // }
// // src/hooks/useDashboard.ts

// import { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axio"; // Asegúrate que la ruta sea correcta, axio o axios
// import { ROUTES } from "../utils/Constants/routes";
// import { NAMES } from "../utils/Constants/text"; // Asegúrate de importar NAMES

// const API_ROUTES = {
//   DASHBOARD: "/dashboard",
//   GET_IVA: "/configuracion/iva",
//   SET_IVA: "/configuracion/iva",
//   GET_MONEDA: "/configuracion/moneda", // NUEVA RUTA
//   SET_MONEDA: "/configuracion/moneda", // NUEVA RUTA
// };

// export interface ComandaDashboard {
//   id: number;
//   fecha: string;
//   estado: "abierta" | "cerrada";
//   user_id: number;
//   usuario?: {
//     id: number;
//     name: string;
//   };
// }

// export interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: "admin" | "mesero" | "cajero";
// }

// export function useDashboard() {
//   const [comandas, setComandas] = useState<ComandaDashboard[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [loadingIva, setLoadingIva] = useState<boolean>(true);
//   const [loadingMoneda, setLoadingMoneda] = useState<boolean>(true); // NUEVO ESTADO DE CARGA PARA MONEDA
//   const [error, setError] = useState<string | null>(null);
//   const [errorIva, setErrorIva] = useState<string | null>(null);
//   const [errorMoneda, setErrorMoneda] = useState<string | null>(null); // NUEVO ESTADO DE ERROR PARA MONEDA
//   const [mostrarPagadas, setMostrarPagadas] = useState<boolean>(false);
//   const [showModalIva, setShowModalIva] = useState(false);
//   const [showModalMoneda, setShowModalMoneda] = useState(false); // NUEVO ESTADO PARA MOSTRAR MODAL DE MONEDA

//   // Estado para el IVA, inicializando desde localStorage
//   const [iva, setIva] = useState<number | null>(() => {
//     const storedIva = localStorage.getItem("iva");
//     try {
//       return storedIva ? Number(storedIva) : null;
//     } catch (e) {
//       console.error("Error parsing IVA from localStorage", e);
//       return null;
//     }
//   });

//   // Estado para la moneda, inicializando desde localStorage
//   const [moneda, setMoneda] = useState<string | null>(() => {
//     const storedMoneda = localStorage.getItem("moneda_global"); // Usar una clave distinta
//     try {
//       return storedMoneda ? storedMoneda : null;
//     } catch (e) {
//       console.error("Error parsing currency from localStorage", e);
//       return null;
//     }
//   });

//   const navigate = useNavigate();

//   // Estado para el usuario, inicializando desde localStorage
//   const [user, setUser] = useState<User | null>(() => {
//     const storedUser = localStorage.getItem("user");
//     try {
//       return storedUser ? JSON.parse(storedUser) : null;
//     } catch (e) {
//       console.error("Error parsing user from localStorage", e);
//       return null;
//     }
//   });

//   const fetchComandas = useCallback(async () => {
//     setError(null);
//     try {
//       const res = await api.get(API_ROUTES.DASHBOARD);
//       setComandas(
//         Array.isArray(res.data.comandas)
//           ? res.data.comandas
//           : Array.isArray(res.data)
//           ? res.data
//           : []
//       );
//     } catch (err: any) {
//       setError(
//         err.response?.data?.message || err.message || "Error al cargar comandas"
//       );
//       console.error("Error al cargar comandas:", err);
//     }
//   }, []);

//   const fetchIvaGlobal = useCallback(async () => {
//     setLoadingIva(true);
//     setErrorIva(null);
//     try {
//       const res = await api.get(API_ROUTES.GET_IVA);
//       setIva(
//         res.data.iva !== undefined && res.data.iva !== null
//           ? Number(res.data.iva)
//           : null
//       );
//     } catch (err: any) {
//       console.error("Error al cargar IVA global:", err);
//       if (err.response && err.response.status === 404) {
//         setErrorIva(NAMES.IVA_NO_CONFIGURADO); // Asumiendo que ya definiste esto
//       } else {
//         setErrorIva(
//           err.response?.data?.message ||
//             err.message ||
//             "Error al cargar IVA global"
//         );
//       }
//       setIva(null); // Asegura que iva sea null si hay error
//     } finally {
//       setLoadingIva(false);
//     }
//   }, []);

//   // NUEVA FUNCIÓN PARA OBTENER LA MONEDA
//   const fetchGlobalCurrency = useCallback(async () => {
//     setLoadingMoneda(true); // Inicia la carga de la moneda
//     setErrorMoneda(null);
//     try {
//       const res = await api.get(API_ROUTES.GET_MONEDA);
//       setMoneda(res.data.currency || null); // Si devuelve null, lo establece como null
//     } catch (err: any) {
//       console.error("Error al cargar la moneda global:", err);
//       if (err.response && err.response.status === 404) {
//         setErrorMoneda(NAMES.MONEDA_NO_CONFIGURADA); // Asumiendo que ya definiste esto
//       } else {
//         setErrorMoneda(
//           err.response?.data?.message ||
//             err.message ||
//             "Error al cargar la moneda"
//         );
//       }
//       setMoneda(null); // Asegura que moneda sea null si hay error
//     } finally {
//       setLoadingMoneda(false); // Finaliza la carga de la moneda
//     }
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     // Ejecuta todas las peticiones iniciales en paralelo
//     Promise.all([fetchComandas(), fetchIvaGlobal(), fetchGlobalCurrency()])
//       .catch(console.error) // Puedes manejar errores de forma más granular si es necesario
//       .finally(() => setLoading(false));
//   }, [fetchComandas, fetchIvaGlobal, fetchGlobalCurrency]); // Añade fetchGlobalCurrency como dependencia

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem("iva");
//     localStorage.removeItem("moneda_global"); // Limpia la moneda del localStorage al cerrar sesión
//     setUser(null);
//     setIva(null);
//     setMoneda(null); // Limpia la moneda del estado
//     navigate(ROUTES.LOGIN);
//   };

//   const handleIvaGuardado = async (nuevoIva: number) => {
//     setErrorIva(null);
//     try {
//       await api.post(API_ROUTES.SET_IVA, { iva: nuevoIva });
//       setIva(nuevoIva);
//       localStorage.setItem("iva", nuevoIva.toString());
//       setShowModalIva(false);
//     } catch (error: any) {
//       console.error("Error al guardar el IVA en el backend:", error);
//       setErrorIva(
//         error.response?.data?.message ||
//           error.response?.data?.errors?.iva?.[0] || // Accede a errores de validación específicos
//           error.message ||
//           "Error al guardar IVA"
//       );
//       throw error; // Re-lanza el error para que el componente modal lo capture
//     }
//   };

//   // NUEVA FUNCIÓN PARA GUARDAR LA MONEDA
//   const handleMonedaGuardado = async (nuevaMoneda: string) => {
//     setErrorMoneda(null);
//     try {
//       await api.post(API_ROUTES.SET_MONEDA, { currency: nuevaMoneda });
//       setMoneda(nuevaMoneda);
//       localStorage.setItem("moneda_global", nuevaMoneda); // Guarda la moneda en localStorage
//       setShowModalMoneda(false); // Cierra el modal al guardar con éxito
//     } catch (error: any) {
//       console.error("Error al guardar la moneda en el backend:", error);
//       setErrorMoneda(
//         error.response?.data?.message ||
//           error.response?.data?.errors?.currency?.[0] || // Accede a los errores de validación específicos
//           error.message ||
//           "Error al guardar la moneda"
//       );
//       throw error; // Re-lanza el error para que el componente modal lo capture
//     }
//   };

//   const comandasFiltradas = mostrarPagadas
//     ? comandas.filter((comanda) => comanda.estado === "cerrada")
//     : comandas.filter((comanda) => comanda.estado === "abierta");

//   return {
//     comandas,
//     comandasFiltradas,
//     loading: loading || loadingIva || loadingMoneda, // Incluye loadingMoneda en el loading general
//     error,
//     errorIva,
//     errorMoneda, // Exporta el error de la moneda
//     mostrarPagadas,
//     setMostrarPagadas,
//     showModalIva,
//     setShowModalIva,
//     showModalMoneda, // Exporta el estado del modal de moneda
//     setShowModalMoneda, // Exporta la función para controlar el modal de moneda
//     iva,
//     moneda, // Exporta el valor de la moneda
//     user,
//     handleLogout,
//     handleIvaGuardado,
//     handleMonedaGuardado, // Exporta la función para guardar la moneda
//     fetchComandas,
//     fetchIvaGlobal,
//     fetchGlobalCurrency, // Exporta la función para recargar la moneda
//   };
// }
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axio";
import { ROUTES } from "../utils/Constants/routes";
import { NAMES } from "../utils/Constants/text";

const API_ROUTES = {
  DASHBOARD: "/dashboard",
  GET_IVA: "/configuracion/iva",
  SET_IVA: "/configuracion/iva",
  GET_MONEDA: "/configuracion/moneda",
  SET_MONEDA: "/configuracion/moneda",
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
  const [loadingMoneda, setLoadingMoneda] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [errorIva, setErrorIva] = useState<string | null>(null);
  const [errorMoneda, setErrorMoneda] = useState<string | null>(null);
  const [mostrarPagadas, setMostrarPagadas] = useState<boolean>(false);
  const [showModalIva, setShowModalIva] = useState(false);
  const [showModalMoneda, setShowModalMoneda] = useState(false);

  // Estado para el IVA, inicializando desde localStorage
  const [iva, setIva] = useState<number | null>(() => {
    const storedIva = localStorage.getItem("iva");
    try {
      return storedIva ? Number(storedIva) : null;
    } catch (e) {
      console.error("Error parsing IVA from localStorage", e);
      return null;
    }
  });

  // Estado para la moneda, inicializando desde localStorage
  const [moneda, setMoneda] = useState<string | null>(() => {
    const storedMoneda = localStorage.getItem("moneda_global");
    try {
      return storedMoneda ? storedMoneda : null;
    } catch (e) {
      console.error("Error parsing currency from localStorage", e);
      return null;
    }
  });

  const navigate = useNavigate();

  // Estado para el usuario, inicializando desde localStorage
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
      console.error("Error al cargar IVA global:", err);
      if (err.response && err.response.status === 404) {
        setErrorIva(NAMES.IVA_NO_CONFIGURADO);
      } else {
        setErrorIva(
          err.response?.data?.message ||
            err.message ||
            "Error al cargar IVA global"
        );
      }
      setIva(null);
    } finally {
      setLoadingIva(false);
    }
  }, []);

  const fetchGlobalCurrency = useCallback(async () => {
    setLoadingMoneda(true);
    setErrorMoneda(null);
    try {
      const res = await api.get(API_ROUTES.GET_MONEDA);
      setMoneda(res.data.currency || null);
    } catch (err: any) {
      console.error("Error al cargar la moneda global:", err);
      if (err.response && err.response.status === 404) {
        setErrorMoneda(NAMES.MONEDA_NO_CONFIGURADA);
      } else {
        setErrorMoneda(
          err.response?.data?.message ||
            err.message ||
            "Error al cargar la moneda"
        );
      }
      setMoneda(null);
    } finally {
      setLoadingMoneda(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchComandas(), fetchIvaGlobal(), fetchGlobalCurrency()])
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [fetchComandas, fetchIvaGlobal, fetchGlobalCurrency]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("iva");
    localStorage.removeItem("moneda_global");
    setUser(null);
    setIva(null);
    setMoneda(null);
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
      throw error;
    }
  };

  const handleMonedaGuardado = async (nuevaMoneda: string) => {
    setErrorMoneda(null);
    try {
      await api.post(API_ROUTES.SET_MONEDA, { currency: nuevaMoneda });
      setMoneda(nuevaMoneda);
      localStorage.setItem("moneda_global", nuevaMoneda);
      setShowModalMoneda(false);
    } catch (error: any) {
      console.error("Error al guardar la moneda en el backend:", error);
      setErrorMoneda(
        error.response?.data?.message ||
          error.response?.data?.errors?.currency?.[0] ||
          error.message ||
          "Error al guardar la moneda"
      );
      throw error;
    }
  };

  const comandasFiltradas = mostrarPagadas
    ? comandas.filter((comanda) => comanda.estado === "cerrada")
    : comandas.filter((comanda) => comanda.estado === "abierta");

  return {
    comandas,
    comandasFiltradas,
    loading: loading || loadingIva || loadingMoneda,
    error,
    errorIva,
    errorMoneda,
    mostrarPagadas,
    setMostrarPagadas,
    showModalIva,
    setShowModalIva,
    showModalMoneda,
    setShowModalMoneda,
    iva,
    moneda,
    user,
    handleLogout,
    handleIvaGuardado,
    handleMonedaGuardado,
    fetchComandas,
    fetchIvaGlobal,
    fetchGlobalCurrency,
  };
}
