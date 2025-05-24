// import React, { useEffect, useState } from "react";
// import api from "../../api/axio";
// import { useNavigate } from "react-router-dom";
// import Button from "../Button/Button";
// import { ROUTES } from "../../utils/Constants/routes";
// import styles from "./Dashboard.module.css";
// import ConfigurarIVA from "../ConfigurarIVA/ConfigurarIVA";

// interface Comanda {
//   id: number;
//   fecha: string;
//   estado: string;
//   user_id: number;
// }

// function Dashboard() {
//   const [comandas, setComandas] = useState<Comanda[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [mostrarPagadas, setMostrarPagadas] = useState<boolean>(false);
//   const [showModalIva, setShowModalIva] = useState(false);
//   const [iva, setIva] = useState<number | null>(null);
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user") || "null");

//   useEffect(() => {
//     async function fetchComandas() {
//       try {
//         const res = await api.get(ROUTES.DASHBOARD);
//         setComandas(res.data.comandas);
//       } catch (err: any) {
//         setError(err.message || "Error al cargar comandas");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchComandas();
//     // Cargar IVA guardado
//     const ivaGuardado = localStorage.getItem("iva");
//     setIva(ivaGuardado ? Number(ivaGuardado) : null);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate(ROUTES.LOGIN);
//   };

//   const comandasFiltradas = mostrarPagadas
//     ? comandas.filter((comanda) => comanda.estado === "cerrada")
//     : comandas.filter((comanda) => comanda.estado === "abierta");

//   if (loading) {
//     return <div className={styles.message}>Cargando comandas...</div>;
//   }

//   if (error) {
//     return <div className={styles.message}>Error: {error}</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1>Comandas</h1>
//         <div className={styles.headerButtons}>
//           {user?.role === "admin" && iva === null && (
//             <>
//               <div className={styles.alert}>
//                 Debes configurar el IVA antes de operar.
//               </div>
//               <Button
//                 text="Configurar IVA"
//                 onClick={() => setShowModalIva(true)}
//               />
//             </>
//           )}
//           {user?.role === "admin" && iva !== null && (
//             <>
//               <Button
//                 text="Añadir Categoría"
//                 onClick={() => navigate(ROUTES.CREATE_CATEGORY)}
//               />
//               <Button
//                 text="Gestionar Productos"
//                 onClick={() => navigate(ROUTES.CREATE_PRODUCT)}
//               />
//               <Button
//                 text="Configurar IVA"
//                 onClick={() => setShowModalIva(true)}
//               />
//             </>
//           )}
//           <Button
//             text="Crear Comanda"
//             onClick={() => navigate(ROUTES.CREATE_COMANDA)}
//           />
//           <Button
//             text={mostrarPagadas ? "Ver Pendientes" : "Ver Pagadas"}
//             onClick={() => setMostrarPagadas(!mostrarPagadas)}
//           />
//           <Button text="Cerrar Sesión" onClick={handleLogout} />
//         </div>
//       </div>

//       {showModalIva && (
//         <ConfigurarIVA
//           ivaActual={iva}
//           onGuardado={(nuevoIva) => {
//             setIva(nuevoIva);
//             setShowModalIva(false);
//           }}
//         />
//       )}

//       {comandasFiltradas.length === 0 ? (
//         <p className={styles.message}>
//           {mostrarPagadas
//             ? "No hay comandas pagadas."
//             : "No hay comandas pendientes de pago."}
//         </p>
//       ) : (
//         <ul className={styles.list}>
//           {comandasFiltradas.map((comanda) => (
//             <li
//               key={comanda.id}
//               className={`${styles.item} ${styles[comanda.estado]}`}
//               onClick={() =>
//                 navigate(
//                   ROUTES.COMANDA_DETAIL.replace(":id", comanda.id.toString())
//                 )
//               }
//             >
//               <h3 className={styles.itemTitle}>Comanda #{comanda.id}</h3>
//               <p className={styles.itemText}>Estado: {comanda.estado}</p>
//               <p className={styles.itemText}>
//                 Fecha: {new Date(comanda.fecha).toLocaleString()}
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default Dashboard;
import React, { useEffect, useState } from "react";
import api from "../../api/axio";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { ROUTES } from "../../utils/Constants/routes";
import styles from "./Dashboard.module.css";
import ConfigurarIVA from "../ConfigurarIVA/ConfigurarIVA";

interface Comanda {
  id: number;
  fecha: string;
  estado: string;
  user_id: number;
}

function Dashboard() {
  const [comandas, setComandas] = useState<Comanda[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mostrarPagadas, setMostrarPagadas] = useState<boolean>(false);
  const [showModalIva, setShowModalIva] = useState(false);
  const [iva, setIva] = useState<number | null>(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    async function fetchComandas() {
      try {
        const res = await api.get(ROUTES.DASHBOARD);
        setComandas(res.data.comandas);
      } catch (err: any) {
        setError(err.message || "Error al cargar comandas");
      } finally {
        setLoading(false);
      }
    }
    fetchComandas();
    // Cargar IVA guardado
    const ivaGuardado = localStorage.getItem("iva");
    setIva(ivaGuardado ? Number(ivaGuardado) : null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    //localStorage.removeItem("iva"); // También limpiar el IVA al cerrar sesión si se desea
    navigate(ROUTES.LOGIN);
  };

  const comandasFiltradas = mostrarPagadas
    ? comandas.filter((comanda) => comanda.estado === "cerrada")
    : comandas.filter((comanda) => comanda.estado === "abierta");

  if (loading && !user) {
    // Ajuste para evitar el flash de "Cargando" si el usuario no está y redirige
    return null; // O un spinner más discreto si la redirección no es inmediata
  }

  if (loading) {
    return <div className={styles.message}>Cargando comandas...</div>;
  }

  if (error) {
    return <div className={styles.message}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Comandas</h1>
        <div className={styles.headerButtons}>
          {/* --- Lógica específica para ADMIN --- */}
          {user?.role === "admin" && (
            <>
              {iva === null ? (
                // Admin y SIN IVA configurado: Obligar a configurar
                <>
                  <div className={styles.alert}>
                    Debes configurar el IVA antes de operar.
                  </div>
                  <Button
                    text="Configurar IVA"
                    onClick={() => setShowModalIva(true)}
                    className={styles.configIvaButton}
                  />
                  {/* No se muestran otros botones de gestión */}
                </>
              ) : (
                // Admin y CON IVA configurado: Funcionalidad completa de admin
                <>
                  <Button
                    text="Añadir Categoría"
                    onClick={() => navigate(ROUTES.CREATE_CATEGORY)}
                  />
                  <Button
                    text="Gestionar Productos"
                    onClick={() => navigate(ROUTES.CREATE_PRODUCT)}
                  />
                  <Button // Botón para modificar IVA si ya está configurado
                    text="Configurar IVA"
                    onClick={() => setShowModalIva(true)}
                    className={styles.configIvaButton}
                  />
                </>
              )}
            </>
          )}

          {/* --- Botón "Crear Comanda": Visible para todos si el IVA está configurado --- */}
          {/* Para el admin, este botón aparecerá aquí si iva !== null. */}
          {/* Para usuarios no-admin, solo aparecerá si iva !== null. */}
          {iva !== null && (
            <Button
              text="Crear Comanda"
              onClick={() => navigate(ROUTES.CREATE_COMANDA)}
            />
          )}

          {/* --- Botones comunes siempre visibles (o con su propia lógica de visibilidad) --- */}
          {/* Solo mostrar botones de gestión de comandas si el IVA está configurado o si no es admin */}
          {(iva !== null || user?.role !== "admin") && (
            <Button
              text={mostrarPagadas ? "Ver Pendientes" : "Ver Pagadas"}
              onClick={() => setMostrarPagadas(!mostrarPagadas)}
            />
          )}
          <Button text="Cerrar Sesión" onClick={handleLogout} />
        </div>
      </div>

      {showModalIva && user?.role === "admin" && (
        <ConfigurarIVA
          ivaActual={iva}
          onGuardado={(nuevoIva) => {
            setIva(nuevoIva);
            setShowModalIva(false);
            // Opcional: Recargar datos o realizar otras acciones tras guardar IVA
          }}
          onCancelar={() => setShowModalIva(false)} // Añadir un callback para cancelar/cerrar el modal
        />
      )}

      {/* Mostrar lista de comandas solo si el IVA está configurado o si el usuario no es admin */}
      {/* Si es admin y el IVA no está configurado, ya se muestra el mensaje de alerta */}
      {iva !== null || user?.role !== "admin" ? (
        comandasFiltradas.length === 0 ? (
          <p className={styles.message}>
            {mostrarPagadas
              ? "No hay comandas pagadas."
              : "No hay comandas pendientes de pago."}
          </p>
        ) : (
          <ul className={styles.list}>
            {comandasFiltradas.map((comanda) => (
              <li
                key={comanda.id}
                className={`${styles.item} ${styles[comanda.estado]}`}
                onClick={() =>
                  navigate(
                    ROUTES.COMANDA_DETAIL.replace(":id", comanda.id.toString())
                  )
                }
              >
                <h3 className={styles.itemTitle}>Comanda #{comanda.id}</h3>
                <p className={styles.itemText}>Estado: {comanda.estado}</p>
                <p className={styles.itemText}>
                  Fecha: {new Date(comanda.fecha).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )
      ) : user?.role === "admin" && iva === null ? (
        // Mensaje específico si es admin y el IVA no está configurado,
        // aunque el mensaje de alerta ya está en la cabecera.
        // Podrías poner un placeholder más grande aquí o nada.
        <p className={styles.message}>
          Por favor, configura el IVA para continuar.
        </p>
      ) : null}
    </div>
  );
}

export default Dashboard;
