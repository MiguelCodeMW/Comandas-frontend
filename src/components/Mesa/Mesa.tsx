// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/axio"; // Asegúrate de que la ruta sea correcta
// import Button from "../Button/Button";
// import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
// import ErrorMessage from "../ErrorMessage/ErrorMessage";
// import { NAMES } from "../../utils/Constants/text";
// import { ROUTES } from "../../utils/Constants/routes";
// import { MesaData } from "../../utils/types/ComandaTypes"; // Asegúrate de importar MesaData
// import styles from "./TotalMesas.module.css"; // Importamos el archivo CSS Module

// function TotalMesas() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [mensaje, setMensaje] = useState<string | null>(null);
//   const [totalMesasInput, setTotalMesasInput] = useState<string>("");
//   const [mesasExistentes, setMesasExistentes] = useState<MesaData[]>([]);

//   const limpiarMensajes = () => {
//     setMensaje(null);
//     setError(null);
//   };

//   const fetchMesas = useCallback(async () => {
//     setLoading(true);
//     limpiarMensajes();
//     try {
//       const response = await api.get(ROUTES.MESAS);
//       const fetchedMesas: MesaData[] = response.data;
//       setMesasExistentes(fetchedMesas);
//       // Actualiza el input con el número actual de mesas solo si está vacío
//       if (totalMesasInput === "") {
//         setTotalMesasInput(fetchedMesas.length.toString());
//       }
//     } catch (err: any) {
//       console.error("Error al cargar las mesas existentes:", err);
//       setError(NAMES.ERROR_CARGA_MESAS);
//     } finally {
//       setLoading(false);
//     }
//   }, [totalMesasInput]);

//   useEffect(() => {
//     fetchMesas();
//   }, [fetchMesas]);

//   const handleTotalMesasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // Solo permitir números
//     const value = e.target.value;
//     if (/^\d*$/.test(value)) {
//       setTotalMesasInput(value);
//     }
//   };

//   const handleConfigurarMesas = async () => {
//     limpiarMensajes();
//     const newTotal = parseInt(totalMesasInput, 10);

//     if (isNaN(newTotal) || newTotal < 0) {
//       setError("Error numero total de mesas: debe ser un número positivo.");
//       return;
//     }

//     // Opcional: Confirmación antes de modificar las mesas
//     const confirmacion = window.confirm(
//       `¿Estás seguro de que quieres establecer el total de mesas a ${newTotal}? Esto podría eliminar o crear mesas.`
//     );
//     if (!confirmacion) {
//       return;
//     }

//     try {
//       setLoading(true);
//       // Envía la solicitud al backend para actualizar el número total de mesas
//       // Tu backend necesitará una ruta y lógica para manejar esto
//       const response = await api.post(ROUTES.TOTAL_MESAS, {
//         total_mesas: newTotal,
//       });
//       setMensaje(
//         response.data.message || "Número de mesas actualizado con éxito."
//       );
//       setError(null);
//       await fetchMesas(); // Vuelve a cargar las mesas para reflejar los cambios
//     } catch (err: any) {
//       console.error("Error al configurar mesas:", err);
//       setError(
//         err.response?.data?.message ||
//           err.message ||
//           "Error al configurar el número de mesas. Por favor, inténtalo de nuevo."
//       );
//       setMensaje(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const mesasLibres = mesasExistentes.filter(
//     (mesa) => mesa.estado === "libre"
//   ).length;
//   const mesasOcupadas = mesasExistentes.filter(
//     (mesa) => mesa.estado === "ocupada"
//   ).length;

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   if (error && !mesasExistentes.length) {
//     return <ErrorMessage message={error} onRetry={fetchMesas} />;
//   }

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Titulo</h1>

//       {mensaje && (
//         <p className={`${styles.message} ${styles.success}`}>{mensaje}</p>
//       )}
//       {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}

//       <div className={styles.formGroup}>
//         <label htmlFor="total-mesas-input" className={styles.label}>
//           Numero total de mesas:
//         </label>
//         <input
//           id="total-mesas-input"
//           type="number"
//           min="0"
//           value={totalMesasInput}
//           onChange={handleTotalMesasChange}
//           className={styles.input}
//           disabled={loading}
//         />
//         <Button
//           text={NAMES.ACTUALIZAR}
//           onClick={handleConfigurarMesas}
//           className={styles.button}
//           disabled={
//             loading || totalMesasInput === "" || parseInt(totalMesasInput) < 0
//           }
//         />
//       </div>

//       <div className={styles.mesaSummary}>
//         <h3>{NAMES.ESTADO_ACTUAL_MESAS}</h3>
//         <p>
//           <strong>{NAMES.TOTAL_MESAS_ACTUAL}</strong> {mesasExistentes.length}
//         </p>
//         <p>
//           <strong>{NAMES.MESAS_LIBRES}</strong> {mesasLibres}
//         </p>
//         <p>
//           <strong>{NAMES.MESAS_OCUPADAS}</strong> {mesasOcupadas}
//         </p>
//       </div>

//       <div className={styles.mesaListContainer}>
//         <h3>{NAMES.LISTADO_MESAS}</h3>
//         {mesasExistentes.length === 0 ? (
//           <p className={styles.message}>{NAMES.NO_MESAS_REGISTRADAS}</p>
//         ) : (
//           <ul className={styles.mesaList}>
//             {mesasExistentes.map((mesa) => (
//               <li
//                 key={mesa.id}
//                 className={`${styles.mesaItem} ${styles[mesa.estado]}`}
//               >
//                 {NAMES.MESA} {mesa.numero} - {NAMES.ESTADO}: {mesa.estado}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <Button
//         text={NAMES.VOLVER}
//         onClick={() => navigate(ROUTES.DASHBOARD)}
//         className={styles.backButton}
//       />
//     </div>
//   );
// }

// export default TotalMesas;
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axio"; // Asegúrate de que la ruta sea correcta
import Button from "../Button/Button";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { NAMES } from "../../utils/Constants/text";
import { ROUTES } from "../../utils/Constants/routes";
import { MesaData } from "../../utils/types/ComandaTypes"; // Asegúrate de importar MesaData
import styles from "./TotalMesas.module.css"; // Importamos el archivo CSS Module

function TotalMesas() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [totalMesasInput, setTotalMesasInput] = useState<string>("");
  const [mesasExistentes, setMesasExistentes] = useState<MesaData[]>([]);

  const limpiarMensajes = () => {
    setMensaje(null);
    setError(null);
  };

  const fetchMesas = useCallback(async () => {
    setLoading(true);
    limpiarMensajes();
    try {
      const response = await api.get(ROUTES.MESAS);
      const fetchedMesas: MesaData[] = response.data;
      setMesasExistentes(fetchedMesas);
      // Actualiza el input con el número actual de mesas solo si está vacío
      if (totalMesasInput === "") {
        setTotalMesasInput(fetchedMesas.length.toString());
      }
    } catch (err: any) {
      console.error("Error al cargar las mesas existentes:", err);
      setError(NAMES.ERROR_CARGA_MESAS);
    } finally {
      setLoading(false);
    }
  }, [totalMesasInput]);

  useEffect(() => {
    fetchMesas();
  }, [fetchMesas]);

  const handleTotalMesasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Solo permitir números
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setTotalMesasInput(value);
    }
  };

  const handleConfigurarMesas = async () => {
    limpiarMensajes();
    const newTotal = parseInt(totalMesasInput, 10);

    if (isNaN(newTotal) || newTotal < 0) {
      setError("Error numero total de mesas: debe ser un número positivo.");
      return;
    }

    // Opcional: Confirmación antes de modificar las mesas
    const confirmacion = window.confirm(
      `¿Estás seguro de que quieres establecer el total de mesas a ${newTotal}? Esto podría eliminar o crear mesas.`
    );
    if (!confirmacion) {
      return;
    }

    try {
      setLoading(true);
      // Envía la solicitud al backend para actualizar el número total de mesas
      // Tu backend necesitará una ruta y lógica para manejar esto
      const response = await api.post(ROUTES.TOTAL_MESAS, {
        total_mesas: newTotal,
      });
      setMensaje(
        response.data.message || "Número de mesas actualizado con éxito."
      );
      setError(null);
      await fetchMesas(); // Vuelve a cargar las mesas para reflejar los cambios
    } catch (err: any) {
      console.error("Error al configurar mesas:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Error al configurar el número de mesas. Por favor, inténtalo de nuevo."
      );
      setMensaje(null);
    } finally {
      setLoading(false);
    }
  };

  // NUEVA FUNCIÓN: Manejar el clic en una mesa
  const handleMesaClick = (mesa: MesaData) => {
    if (mesa.estado === "libre") {
      // Navega a la ruta de crear comanda y pasa el ID de la mesa
      navigate(ROUTES.CREATE_COMANDA, { state: { selectedMesaId: mesa.id } });
    }
    // Si la mesa está ocupada, podríamos mostrar un mensaje o simplemente no hacer nada
  };

  const mesasLibres = mesasExistentes.filter(
    (mesa) => mesa.estado === "libre"
  ).length;
  const mesasOcupadas = mesasExistentes.filter(
    (mesa) => mesa.estado === "ocupada"
  ).length;

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error && !mesasExistentes.length) {
    return <ErrorMessage message={error} onRetry={fetchMesas} />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Titulo</h1>

      {mensaje && (
        <p className={`${styles.message} ${styles.success}`}>{mensaje}</p>
      )}
      {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}

      <div className={styles.formGroup}>
        <label htmlFor="total-mesas-input" className={styles.label}>
          Numero total de mesas:
        </label>
        <input
          id="total-mesas-input"
          type="number"
          min="0"
          value={totalMesasInput}
          onChange={handleTotalMesasChange}
          className={styles.input}
          disabled={loading}
        />
        <Button
          text={NAMES.ACTUALIZAR}
          onClick={handleConfigurarMesas}
          className={`${styles.button} ${styles.pagarButton}`}
          disabled={
            loading || totalMesasInput === "" || parseInt(totalMesasInput) < 0
          }
        />
      </div>

      <div className={styles.mesaSummary}>
        <h3>{NAMES.ESTADO_ACTUAL_MESAS}</h3>
        <p>
          <strong>{NAMES.TOTAL_MESAS_ACTUAL}</strong> {mesasExistentes.length}
        </p>
        <p>
          <strong>{NAMES.MESAS_LIBRES}</strong> {mesasLibres}
        </p>
        <p>
          <strong>{NAMES.MESAS_OCUPADAS}</strong> {mesasOcupadas}
        </p>
      </div>

      <div className={styles.mesaListContainer}>
        <h3>{NAMES.LISTADO_MESAS}</h3>
        {mesasExistentes.length === 0 ? (
          <p className={styles.message}>{NAMES.NO_MESAS_REGISTRADAS}</p>
        ) : (
          <ul className={styles.mesaList}>
            {mesasExistentes.map((mesa) => (
              <li
                key={mesa.id}
                className={`${styles.mesaItem} ${styles[mesa.estado]} ${
                  mesa.estado === "libre" ? styles.clickableMesa : "" // Clase para estilos de "clicable"
                }`}
                onClick={() => handleMesaClick(mesa)} // Agregamos el evento click
              >
                {NAMES.MESA} {mesa.numero} - {NAMES.ESTADO}: {mesa.estado}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button
        text={NAMES.VOLVER}
        onClick={() => navigate(ROUTES.DASHBOARD)}
        className={`${styles.button} ${styles.dashboardButton}`}

        // className={styles.backButton}
      />
    </div>
  );
}

export default TotalMesas;
