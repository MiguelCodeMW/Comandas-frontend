// import React, { useEffect, useState } from "react";
// import api from "../../api/axio";
// import { useNavigate } from "react-router-dom";
// import Button from "../Button/Button";
// import { ROUTES } from "../../utils/Constants/routes";
// import styles from "./Dashboard.module.css";

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
//   const [mostrarPagadas, setMostrarPagadas] = useState<boolean>(false); // Estado para alternar entre abiertas y cerradas
//   const navigate = useNavigate();

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
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate(ROUTES.LOGIN);
//   };

//   // Filtrar comandas según el estado
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
//          {user?.role === "admin" && (
//   <>
//     <Button
//       text="Añadir Categoría"
//       onClick={() => navigate(ROUTES.CREATE_CATEGORY)}
//     />
//     <Button
//       text="Gestionar Productos"
//       onClick={() => navigate(ROUTES.CREATE_PRODUCT)}
//     />
//   </>
// )}
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
//               className={`${styles.item} ${styles[comanda.estado]}`} // Aplica la clase según el estado
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
  const navigate = useNavigate();

  // Obtener usuario del localStorage (ajusta según tu lógica de autenticación)
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
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate(ROUTES.LOGIN);
  };

  const comandasFiltradas = mostrarPagadas
    ? comandas.filter((comanda) => comanda.estado === "cerrada")
    : comandas.filter((comanda) => comanda.estado === "abierta");

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
          {user?.role === "admin" && (
            <>
              <Button
                text="Añadir Categoría"
                onClick={() => navigate(ROUTES.CREATE_CATEGORY)}
              />
              <Button
                text="Gestionar Productos"
                onClick={() => navigate(ROUTES.CREATE_PRODUCT)}
              />
            </>
          )}
          <Button
            text="Crear Comanda"
            onClick={() => navigate(ROUTES.CREATE_COMANDA)}
          />
          <Button
            text={mostrarPagadas ? "Ver Pendientes" : "Ver Pagadas"}
            onClick={() => setMostrarPagadas(!mostrarPagadas)}
          />
          <Button text="Cerrar Sesión" onClick={handleLogout} />
        </div>
      </div>

      {comandasFiltradas.length === 0 ? (
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
      )}
    </div>
  );
}

export default Dashboard;
