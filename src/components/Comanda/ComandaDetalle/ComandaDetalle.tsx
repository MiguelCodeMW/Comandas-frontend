// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../../../api/axio";
// import Button from "../../Button/Button";
// import styles from "./ComandaDetalle.module.css";
// import { ComandaProps } from "../../../utils/Comanda/ComandaProps";
// import { ROUTES } from "../../../utils/Constants/routes";

// import { NAMES } from "../../../utils/Constants/text";

// function ComandaDetails() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [comanda, setComanda] = useState<ComandaProps | null>(null);
//   const [mensaje, setMensaje] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchComandaDetails = async () => {
//       try {
//         const res = await api.get(ROUTES.COMANDA_DETAIL.replace(":id", id!));
//         setComanda(res.data);
//       } catch (err: any) {
//         setError(err.message || NAMES.ALERTA_COMANDA_PAGAR);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchComandaDetails();
//   }, [id]);

//   const handleEditarComanda = () => {
//     navigate(ROUTES.COMANDA_CREAR.replace(":id", id!));
//   };

//   const handlePagarComanda = async () => {
//     try {
//       await api.put(ROUTES.COMANDA_PAGAR.replace(":id", id!));
//       setMensaje(NAMES.COMANDA_PAGADA_EXITOSA);
//       const res = await api.get(ROUTES.COMANDA_DETAIL.replace(":id", id!));
//       setComanda(res.data);
//     } catch (err: any) {
//       setMensaje(err.response?.data?.message || NAMES.ALERTA_COMANDA_PAGAR);
//     }
//   };

//   if (loading) {
//     return <div className={styles.message}>{NAMES.COMANDA_CARGANDO}</div>;
//   }

//   if (error || !comanda) {
//     return (
//       <div style={{ padding: "2rem" }}>
//         {error ? `Error: ${error}` : NAMES.COMANDA_NO_ENCONTRADA}
//       </div>
//     );
//   }

//   return (
//     <div className={styles.comandaDetalleContainer}>
//       <h1 className={styles.comandaDetalleTitulo}>
//         {NAMES.ID_COMANDA_EDITAR} #{comanda.id}
//       </h1>
//       <p className={styles.comandaDetalleInfo}>Estado: {comanda.estado}</p>
//       <p className={styles.comandaDetalleInfo}>
//         Fecha: {new Date(comanda.fecha).toLocaleString()}
//       </p>
//       <h2 className={styles.detallesTitulo}>{NAMES.DETALLES_TITULO}</h2>
//       {comanda.detalles.length === 0 ? (
//         <p className={styles.message}>{NAMES.DETALLES_NO_DISPONIBLES}</p>
//       ) : (
//         <ul className={styles.detallesLista}>
//           {comanda.detalles.map((detalle) => (
//             <li key={detalle.id} className={styles.detalleItem}>
//               <p className={styles.detalleInfo}>
//                 {NAMES.DETALLES_PRODUCTO} {detalle.producto.nombre}
//               </p>
//               <p className={styles.detalleInfo}>
//                 {NAMES.DETALLES_CANTIDAD} {detalle.cantidad}
//               </p>
//               <p className={styles.detalleInfo}>
//                 {NAMES.DETALLES_PRECIO_UNITARIO} $
//                 {detalle.producto.precio.toFixed(2)}
//               </p>
//               <p className={styles.detalleInfo}>
//                 {NAMES.DETALLES_TOTAL} $
//                 {(detalle.cantidad * detalle.producto.precio).toFixed(2)}
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//       <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
//         <Button
//           text="Volver"
//           onClick={() => navigate(ROUTES.DASHBOARD)}
//           className={styles.dashboardButton}
//         />
//         {/* Mostrar el botón de editar solo si la comanda no está cerrada */}
//         {comanda.estado !== "cerrada" && (
//           <Button
//             text={NAMES.ID_COMANDA_EDITAR}
//             onClick={handleEditarComanda}
//             className={styles.editarButton}
//           />
//         )}
//         {/* Mostrar el botón de pagar solo si la comanda no está cerrada */}
//         {comanda.estado !== "cerrada" && (
//           <Button
//             text={NAMES.COMANDA_PAGAR}
//             onClick={handlePagarComanda}
//             className={styles.pagarButton}
//           />
//         )}
//       </div>
//       {mensaje && <p className={styles.message}>{mensaje}</p>}
//     </div>
//   );
// }

// export default ComandaDetails;
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../../../api/axio";
// import Button from "../../Button/Button";
// import styles from "./ComandaDetalle.module.css";
// import { ROUTES } from "../../../utils/Constants/routes";
// import { NAMES } from "../../../utils/Constants/text";

// function ComandaDetails() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [comanda, setComanda] = useState<any>(null);
//   const [subtotal, setSubtotal] = useState<number>(0);
//   const [iva, setIva] = useState<number>(0);
//   const [totalConIva, setTotalConIva] = useState<number>(0);
//   const [mensaje, setMensaje] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const user = JSON.parse(localStorage.getItem("user") || "null");

//   // useEffect(() => {
//   //   const fetchComandaDetails = async () => {
//   //     try {
//   //       const res = await api.get(ROUTES.COMANDA_DETAIL.replace(":id", id!));
//   //       setComanda(res.data.comanda);
//   //       setSubtotal(res.data.subtotal);
//   //       setIva(res.data.iva);
//   //       setTotalConIva(res.data.total_con_iva);
//   //     } catch (err: any) {
//   //       setError(err.message || NAMES.ALERTA_COMANDA_PAGAR);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };
//   //   fetchComandaDetails();
//   // }, [id]);

//   useEffect(() => {
//     const fetchComandaDetails = async () => {
//       try {
//         let url = ROUTES.COMANDA_DETAIL.replace(":id", id!);
//         // Si la comanda está abierta, añade el IVA como query param
//         const ivaValue = Number(localStorage.getItem("iva") || 0.21);
//         url += `?iva=${ivaValue}`;
//         const res = await api.get(url);
//         setComanda(res.data.comanda);
//         setSubtotal(res.data.subtotal);
//         setIva(res.data.iva);
//         setTotalConIva(res.data.total_con_iva);
//       } catch (err: any) {
//         setError(err.message || NAMES.ALERTA_COMANDA_PAGAR);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchComandaDetails();
//   }, [id]);

//   const handleEditarComanda = () => {
//     navigate(ROUTES.COMANDA_CREAR.replace(":id", id!));
//   };

//   const handlePagarComanda = async () => {
//     try {
//       const ivaValue = Number(localStorage.getItem("iva") || 0.21);
//       await api.put(ROUTES.COMANDA_PAGAR.replace(":id", id!), {
//         iva: ivaValue,
//       });
//       setMensaje(NAMES.COMANDA_PAGADA_EXITOSA);
//       const res = await api.get(ROUTES.COMANDA_DETAIL.replace(":id", id!));
//       setComanda(res.data.comanda);
//       setSubtotal(res.data.subtotal);
//       setIva(res.data.iva);
//       setTotalConIva(res.data.total_con_iva);
//     } catch (err: any) {
//       setMensaje(err.response?.data?.message || NAMES.ALERTA_COMANDA_PAGAR);
//     }
//   };

//   const handleBorrarComanda = async () => {
//     if (!window.confirm("¿Seguro que deseas borrar esta comanda?")) return;
//     try {
//       await api.delete(ROUTES.COMANDA_DETAIL.replace(":id", id!));
//       setMensaje("Comanda borrada correctamente.");
//       setTimeout(() => navigate(ROUTES.DASHBOARD), 1000);
//     } catch (err: any) {
//       setMensaje(err.response?.data?.message || "Error al borrar la comanda.");
//     }
//   };

//   if (loading) {
//     return <div className={styles.message}>{NAMES.COMANDA_CARGANDO}</div>;
//   }

//   if (error || !comanda) {
//     return (
//       <div style={{ padding: "2rem" }}>
//         {error ? `Error: ${error}` : NAMES.COMANDA_NO_ENCONTRADA}
//       </div>
//     );
//   }

//   return (
//     <div className={styles.comandaDetalleContainer}>
//       <h1 className={styles.comandaDetalleTitulo}>
//         {NAMES.ID_COMANDA_EDITAR} #{comanda.id}
//       </h1>
//       <p className={styles.comandaDetalleInfo}>Estado: {comanda.estado}</p>
//       <p className={styles.comandaDetalleInfo}>
//         Fecha: {new Date(comanda.fecha).toLocaleString()}
//       </p>
//       <h2 className={styles.detallesTitulo}>{NAMES.DETALLES_TITULO}</h2>
//       {comanda.detalles.length === 0 ? (
//         <p className={styles.message}>{NAMES.DETALLES_NO_DISPONIBLES}</p>
//       ) : (
//         <ul className={styles.detallesLista}>
//           {comanda.detalles.map((detalle: any) => (
//             <li key={detalle.id} className={styles.detalleItem}>
//               <p className={styles.detalleInfo}>
//                 {NAMES.DETALLES_PRODUCTO} {detalle.producto.nombre}
//               </p>
//               <p className={styles.detalleInfo}>
//                 {NAMES.DETALLES_CANTIDAD} {detalle.cantidad}
//               </p>
//               <p className={styles.detalleInfo}>
//                 {NAMES.DETALLES_PRECIO_UNITARIO} $
//                 {detalle.producto.precio.toFixed(2)}
//               </p>
//               <p className={styles.detalleInfo}>
//                 {NAMES.DETALLES_TOTAL} $
//                 {(detalle.cantidad * detalle.producto.precio).toFixed(2)}
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//       {/* Mostrar totales siempre */}
//       <div className={styles.totalesBox} style={{ margin: "2rem 0 1rem 0" }}>
//         <p className={styles.detalleInfo}>Subtotal: ${subtotal.toFixed(2)}</p>
//         <p className={styles.detalleInfo}>
//           IVA ({(iva * 100).toFixed(0)}%): ${(subtotal * iva).toFixed(2)}
//         </p>
//         <p className={styles.detalleInfo}>
//           <strong>Total con IVA: ${totalConIva.toFixed(2)}</strong>
//         </p>
//       </div>
//       <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
//         <Button
//           text="Volver"
//           onClick={() => navigate(ROUTES.DASHBOARD)}
//           className={styles.dashboardButton}
//         />
//         {comanda.estado !== "cerrada" && (
//           <Button
//             text={NAMES.ID_COMANDA_EDITAR}
//             onClick={handleEditarComanda}
//             className={styles.editarButton}
//           />
//         )}
//         {comanda.estado !== "cerrada" && (
//           <Button
//             text={NAMES.COMANDA_PAGAR}
//             onClick={handlePagarComanda}
//             className={styles.pagarButton}
//           />
//         )}
//         {user?.role === "admin" && (
//           <Button
//             text="Borrar Comanda"
//             onClick={handleBorrarComanda}
//             className={styles.borrarButton}
//           />
//         )}
//       </div>
//       {mensaje && <p className={styles.message}>{mensaje}</p>}
//     </div>
//   );
// }

// export default ComandaDetails;
import React from "react";
import styles from "./ComandaDetalle.module.css";
import { NAMES } from "../../../utils/Constants/text";
import { useComandaDetalle } from "../../../hooks/useComandaDetalle";
import ComandaDetallesItemsList from "./ComandaDetallesItemsList";
import ComandaResumenTotales from "./ComandaResumenTotales";
import ComandaAccionesButtons from "./ComandaAccionesButtons";

function ComandaDetalle() {
  const {
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
  } = useComandaDetalle();

  if (loading) {
    return <div className={styles.message}>{NAMES.COMANDA_CARGANDO}</div>;
  }

  if (error || !comanda) {
    return (
      <div className={styles.messageContainer}>
        {" "}
        {/* Contenedor para mensajes de error/carga */}
        {error ? `Error: ${error}` : NAMES.COMANDA_NO_ENCONTRADA}
      </div>
    );
  }

  return (
    <div className={styles.comandaDetalleContainer}>
      <h1 className={styles.comandaDetalleTitulo}>
        {NAMES.ID_COMANDA_TITULO} #{comanda.id}{" "}
        {/* Usar un nombre más genérico */}
      </h1>
      <p className={styles.comandaDetalleInfo}>Estado: {comanda.estado}</p>
      <p className={styles.comandaDetalleInfo}>
        Fecha: {new Date(comanda.fecha).toLocaleString()}
      </p>

      <ComandaDetallesItemsList detalles={comanda.detalles} />
      <ComandaResumenTotales
        subtotal={subtotal}
        ivaPorcentaje={ivaPorcentaje}
        totalConIva={totalConIva}
      />

      {mensaje && (
        <p
          className={`${styles.message} ${
            error ? styles.error : styles.success
          }`}
        >
          {mensaje}
        </p>
      )}

      <ComandaAccionesButtons
        comanda={comanda}
        user={user}
        onEditar={handleEditarComanda}
        onPagar={handlePagarComanda}
        onBorrar={handleBorrarComanda}
      />
    </div>
  );
}

export default ComandaDetalle;
