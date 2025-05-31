// // // src/hooks/useComandaDetalle.ts

// // import { useState, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import api from "../api/axio"; // Asegúrate de que esta ruta es correcta
// // import { ComandaData } from "../utils/types/ComandaTypes";
// // import { User } from "../utils/types/UserTypes";
// // import { NAMES } from "../utils/Constants/text";
// // import { ROUTES } from "../utils/Constants/routes";

// // export function useComandaDetalle() {
// //   const { id } = useParams<{ id: string }>();
// //   const navigate = useNavigate();
// //   const [comanda, setComanda] = useState<ComandaData | null>(null);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [mensaje, setMensaje] = useState<string | null>(null);
// //   const [user, setUser] = useState<User | null>(null);

// //   // Estados para los cálculos de totales
// //   const [subtotal, setSubtotal] = useState<number>(0);
// //   const [ivaPorcentaje, setIvaPorcentaje] = useState<number>(0.21); // Ejemplo, ajusta tu IVA por defecto
// //   const [totalConIva, setTotalConIva] = useState<number>(0);

// //   const limpiarMensajes = () => {
// //     setMensaje(null);
// //     setError(null);
// //   };

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       setLoading(true);
// //       limpiarMensajes();
// //       try {
// //         // Cargar datos de la comanda
// //         const comandaResponse = await api.get(
// //           ROUTES.COMANDA_DETAIL.replace(":id", id || "")
// //         );
// //         const fetchedComanda: ComandaData = comandaResponse.data.comanda;
// //         setComanda(fetchedComanda);

// //         // Cargar datos del usuario
// //         const userResponse = await api.get(ROUTES.USER);
// //         // Ajusta según la estructura exacta de tu respuesta de /user
// //         setUser(userResponse.data.user || userResponse.data);

// //         // Calcular totales si los datos de la comanda están presentes
// //         if (fetchedComanda && fetchedComanda.detalles) {
// //           const calculatedSubtotal = fetchedComanda.detalles.reduce(
// //             (sum, detalle) => sum + detalle.cantidad * detalle.producto.precio,
// //             0
// //           );
// //           setSubtotal(calculatedSubtotal);

// //           // Si la comanda tiene un IVA específico, úsalo, de lo contrario usa el por defecto
// //           const currentIva =
// //             fetchedComanda.iva !== undefined
// //               ? fetchedComanda.iva
// //               : ivaPorcentaje;
// //           setIvaPorcentaje(currentIva);

// //           setTotalConIva(calculatedSubtotal * (1 + currentIva));
// //         }
// //       } catch (err: any) {
// //         console.error(NAMES.ERROR_CARGA_DETALLE_COMANDA, err);
// //         setError(NAMES.ERROR_CARGA_DETALLE_COMANDA);
// //         setComanda(null);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (id) {
// //       fetchData();
// //     } else {
// //       setLoading(false);
// //       setError(NAMES.COMANDA_ID_NO_PROPORCIONADO);
// //     }
// //   }, [id, ivaPorcentaje]);

// //   const handleEditarComanda = () => {
// //     // ¡Aquí está el cambio clave! Usamos CREATE_COMANDA como base y añadimos el query param
// //     navigate(`${ROUTES.CREATE_COMANDA}?id=${id}`);
// //   };

// //   const handlePagarComanda = async () => {
// //     limpiarMensajes();
// //     if (!comanda) {
// //       setError(NAMES.COMANDA_NO_ENCONTRADA_PAGAR);
// //       return;
// //     }
// //     try {
// //       await api.put(ROUTES.COMANDA_DETAIL.replace(":id", id || ""), {
// //         estado: "cerrada",
// //       });
// //       setMensaje(NAMES.COMANDA_EXITOSA);
// //       setComanda((prev) => (prev ? { ...prev, estado: "cerrada" } : null));
// //     } catch (err) {
// //       console.error(NAMES.ERROR_PAGAR_COMANDA, err);
// //       setError(NAMES.ERROR_PAGAR_COMANDA);
// //     }
// //   };

// //   const handleBorrarComanda = async () => {
// //     limpiarMensajes();
// //     if (!comanda) {
// //       setError(NAMES.COMANDA_NO_ENCONTRADA_BORRAR);
// //       return;
// //     }
// //     const confirmDelete = window.confirm(NAMES.CONFIRM_BORRAR_COMANDA);
// //     if (!confirmDelete) return;

// //     try {
// //       await api.delete(ROUTES.COMANDA_DETAIL.replace(":id", id || ""));
// //       setMensaje(NAMES.COMANDA_BORRADA_EXITO);
// //       setTimeout(() => navigate(ROUTES.DASHBOARD), 1500);
// //     } catch (err) {
// //       console.error(NAMES.ERROR_BORRAR_COMANDA, err);
// //       setError(NAMES.ERROR_BORRAR_COMANDA);
// //     }
// //   };

// //   return {
// //     comanda,
// //     subtotal,
// //     ivaPorcentaje,
// //     totalConIva,
// //     mensaje,
// //     error,
// //     loading,
// //     user,
// //     handleEditarComanda,
// //     handlePagarComanda,
// //     handleBorrarComanda,
// //     limpiarMensajes,
// //   };
// // }
// // src/hooks/useComandaDetalle.ts

// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axio";
// import { ComandaData } from "../utils/types/ComandaTypes";
// import { User } from "../utils/types/UserTypes";
// import { NAMES } from "../utils/Constants/text";
// import { ROUTES } from "../utils/Constants/routes";

// export function useComandaDetalle() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [comanda, setComanda] = useState<ComandaData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [mensaje, setMensaje] = useState<string | null>(null);
//   const [user, setUser] = useState<User | null>(null);

//   const [subtotal, setSubtotal] = useState<number>(0);
//   const [ivaPorcentaje, setIvaPorcentaje] = useState<number>(0.21); // Valor por defecto del IVA
//   const [totalConIva, setTotalConIva] = useState<number>(0);

//   const limpiarMensajes = () => {
//     setMensaje(null);
//     setError(null);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       limpiarMensajes();
//       try {
//         const comandaResponse = await api.get(
//           ROUTES.COMANDA_DETAIL.replace(":id", id || "")
//         );
//         const fetchedComanda: ComandaData = comandaResponse.data.comanda;
//         setComanda(fetchedComanda);

//         const userResponse = await api.get(ROUTES.USER);
//         setUser(userResponse.data.user || userResponse.data);

//         if (fetchedComanda && fetchedComanda.detalles) {
//           const calculatedSubtotal = fetchedComanda.detalles.reduce(
//             (sum, detalle) => sum + detalle.cantidad * detalle.producto.precio,
//             0
//           );
//           setSubtotal(calculatedSubtotal);

//           // Si la comanda ya tiene un IVA guardado, úsalo. Si no, usa el valor por defecto del hook.
//           // El IVA en la comanda puede ser null, por eso verificamos undefined para tomar el default.
//           const currentIva =
//             fetchedComanda.iva !== null && fetchedComanda.iva !== undefined
//               ? fetchedComanda.iva
//               : ivaPorcentaje; // Usa ivaPorcentaje si no hay IVA en la comanda
//           setIvaPorcentaje(currentIva);

//           setTotalConIva(calculatedSubtotal * (1 + currentIva));
//         }
//       } catch (err: any) {
//         console.error(NAMES.ERROR_CARGA_DETALLE_COMANDA, err);
//         setError(NAMES.ERROR_CARGA_DETALLE_COMANDA);
//         setComanda(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchData();
//     } else {
//       setLoading(false);
//       setError(NAMES.COMANDA_ID_NO_PROPORCIONADO);
//     }
//   }, [id]); // Asegúrate de que ivaPorcentaje no esté aquí, o creará un bucle si se actualiza dentro del effect.

//   const handleEditarComanda = () => {
//     navigate(`${ROUTES.CREATE_COMANDA}?id=${id}`);
//   };

//   const handlePagarComanda = async () => {
//     limpiarMensajes();
//     if (!comanda) {
//       setError(NAMES.COMANDA_NO_ENCONTRADA_PAGAR);
//       return;
//     }

//     // Si la comanda ya está cerrada, no permitimos volver a pagarla
//     if (comanda.estado === "cerrada") {
//       setMensaje("MIERDA EN UN TARRO"); // Asegúrate de definir NAMES.COMANDA_YA_CERRADA
//       return;
//     }

//     try {
//       setLoading(true); // Mostrar loading al iniciar la operación

//       // **¡CAMBIO CRÍTICO AQUÍ!**
//       // Enviar el 'iva' que el backend está esperando.
//       // Usamos el 'ivaPorcentaje' actual del hook, que se actualiza al cargar la comanda.
//       const response = await api.put(
//         ROUTES.COMANDA_PAGAR.replace(":id", id || ""), // Usa la ruta específica para pagar
//         { iva: ivaPorcentaje } // Envía el campo 'iva'
//       );

//       // Actualizar el estado con los datos de la respuesta del backend
//       setComanda(response.data.comanda);
//       setSubtotal(response.data.subtotal);
//       setIvaPorcentaje(response.data.iva); // Laravel devuelve el porcentaje de IVA aplicado
//       setTotalConIva(response.data.total_con_iva);
//       setMensaje(response.data.message);
//       setError(null); // Limpiar cualquier error previo
//     } catch (err: any) {
//       console.error(NAMES.ERROR_PAGAR_COMANDA, err);
//       // Extraer el mensaje de error de validación de Laravel si está disponible
//       const backendErrorMessage = err.response?.data?.message || err.message;
//       setError(`${NAMES.ERROR_PAGAR_COMANDA}: ${backendErrorMessage}`);
//       setMensaje(null); // Limpiar mensaje de éxito
//     } finally {
//       setLoading(false); // Ocultar loading al finalizar la operación
//     }
//   };

//   const handleBorrarComanda = async () => {
//     limpiarMensajes();
//     if (!comanda) {
//       setError(NAMES.COMANDA_NO_ENCONTRADA_BORRAR);
//       return;
//     }
//     const confirmDelete = window.confirm(NAMES.CONFIRM_BORRAR_COMANDA);
//     if (!confirmDelete) return;

//     try {
//       setLoading(true); // Mostrar loading
//       await api.delete(ROUTES.COMANDA_DETAIL.replace(":id", id || ""));
//       setMensaje(NAMES.COMANDA_BORRADA_EXITO);
//       setTimeout(() => navigate(ROUTES.DASHBOARD), 1500);
//     } catch (err: any) {
//       console.error(NAMES.ERROR_BORRAR_COMANDA, err);
//       setError(NAMES.ERROR_BORRAR_COMANDA);
//     } finally {
//       setLoading(false); // Ocultar loading
//     }
//   };

//   return {
//     comanda,
//     subtotal,
//     ivaPorcentaje,
//     totalConIva,
//     mensaje,
//     error,
//     loading,
//     user,
//     handleEditarComanda,
//     handlePagarComanda,
//     handleBorrarComanda,
//     limpiarMensajes,
//   };
// }
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
