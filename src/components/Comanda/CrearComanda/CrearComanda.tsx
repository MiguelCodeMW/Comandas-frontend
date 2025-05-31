// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "../../../components/Button/Button";
// import ProductoSelectorList from "../../../components/Producto/ProductoSelectorList";
// import ProductosSeleccionadosList from "./ProductosSeleccionadosList";
// import styles from "./Comandas.module.css";
// import { NAMES } from "../../../utils/Constants/text";
// import { ROUTES } from "../../../utils/Constants/routes";
// import { useCrearComanda } from "../../../hooks/useCrearComanda";
// import { CategoriaProps } from "../../../utils/types/CategoriaTypes";
// import { ProductoProps } from "../../../utils/types/ComandaTypes";

// function CrearComanda() {
//   const {
//     categorias,
//     productos,
//     productosSeleccionados,
//     comandaIdParaEditar,
//     mensaje,
//     error,
//     loading,
//     mesasDisponibles, // <-- Importa las mesas disponibles
//     mesaSeleccionadaId, // <-- Importa la mesa seleccionada actualmente
//     handleSeleccionarProducto,
//     handleAumentarCantidad,
//     handleDisminuirCantidad,
//     handleSeleccionarMesa, // <-- Importa la función para seleccionar mesa
//     handleFinalizarComanda,
//   } = useCrearComanda();
//   const navigate = useNavigate();

//   const [busqueda, setBusqueda] = useState("");
//   const [categoriaSeleccionadaId, setCategoriaSeleccionadaId] = useState<
//     number | null
//   >(null);

//   useEffect(() => {
//     if (categorias.length > 0 && categoriaSeleccionadaId === null) {
//       setCategoriaSeleccionadaId(categorias[0].id);
//     }
//   }, [categorias, categoriaSeleccionadaId]);

//   const productosMostrados: ProductoProps[] = productos.filter((p) => {
//     const coincideConBusqueda = p.nombre
//       .toLowerCase()
//       .includes(busqueda.toLowerCase());

//     if (busqueda.trim() !== "") {
//       return coincideConBusqueda;
//     }

//     const esDeCategoriaSeleccionada =
//       categoriaSeleccionadaId === null ||
//       p.categoria_id === categoriaSeleccionadaId;

//     return esDeCategoriaSeleccionada;
//   });

//   if (loading) {
//     return <div className={styles.message}>{NAMES.CARGANDO_DATOS_COMANDA}</div>;
//   }

//   return (
//     <div className={styles.comandaContainer}>
//       <h1 className={styles.comandaTitulo}>
//         {comandaIdParaEditar ? NAMES.ID_COMANDA_EDITAR : NAMES.ID_COMANDA_CREAR}
//         {comandaIdParaEditar ? ` #${comandaIdParaEditar}` : ""}
//       </h1>

//       {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
//       {mensaje && (
//         <p className={`${styles.message} ${styles.success}`}>{mensaje}</p>
//       )}

//       {/* NUEVO: Selector de Mesas */}
//       <div className={styles.mesaSelectorContainer}>
//         <label htmlFor="mesa-select" className={styles.label}>
//           {NAMES.SELECCIONAR_MESA}:
//         </label>
//         <select
//           id="mesa-select"
//           // Importante: Si mesaSeleccionadaId es null, el value debe ser "null" para que la opción "Sin Mesa" funcione.
//           value={mesaSeleccionadaId === null ? "null" : mesaSeleccionadaId}
//           onChange={handleSeleccionarMesa}
//           className={styles.select}
//           disabled={loading} // Deshabilita mientras carga
//         >
//           <option value="null">{NAMES.SIN_MESA}</option>{" "}
//           {/* Opción "Sin mesa" */}
//           {mesasDisponibles.map((mesa) => (
//             <option key={mesa.id} value={mesa.id}>
//               Mesa {mesa.numero} (
//               {mesa.estado === "libre" ? "Libre" : "Ocupada"})
//             </option>
//           ))}
//         </select>
//         {/* Aquí podrías añadir un mensaje de error si errorMesas existe */}
//         {/* {errorMesas && <p className={styles.error}>{errorMesas}</p>} */}
//         <small className={styles.textMuted}>
//           {mesasDisponibles.filter((mesa) => mesa.estado === "libre").length}{" "}
//           mesas libres
//         </small>
//       </div>

//       <div className={styles.categoriasBar}>
//         {categorias.map((categoria: CategoriaProps) => (
//           <Button
//             key={categoria.id}
//             text={categoria.nombre}
//             onClick={() => {
//               setCategoriaSeleccionadaId(categoria.id);
//               setBusqueda("");
//             }}
//             className={`${styles.categoriaButton} ${
//               categoria.id === categoriaSeleccionadaId
//                 ? styles.categoriaButtonActive
//                 : ""
//             }`}
//           />
//         ))}
//       </div>

//       <div className={styles.buscadorContainer}>
//         <input
//           type="text"
//           placeholder={NAMES.COMANDA_BUSCAR_PRODUCTOS}
//           value={busqueda}
//           onChange={(e) => setBusqueda(e.target.value)}
//           className={styles.input}
//         />
//       </div>

//       {!loading && !error && (
//         <>
//           <div className={styles.selectorProductosContainer}>
//             {productosMostrados.length > 0 ? (
//               <ProductoSelectorList
//                 productos={productosMostrados}
//                 onProductoClick={handleSeleccionarProducto}
//               />
//             ) : (
//               <p className={styles.message}>{NAMES.COMANDA_BUSCAR_ERROR}</p>
//             )}
//           </div>

//           <div className={styles.seleccionadosContainer}>
//             <h3>{NAMES.COMANDA_PRODUCTOS_SELECCIONADOS}</h3>
//             <ProductosSeleccionadosList
//               productos={productosSeleccionados}
//               onAumentar={handleAumentarCantidad}
//               onDisminuir={handleDisminuirCantidad}
//             />
//           </div>
//         </>
//       )}

//       <div className={styles.finalizarWrapper}>
//         <Button
//           text={
//             comandaIdParaEditar
//               ? NAMES.ID_COMANDA_ACTUALIZAR
//               : NAMES.ID_COMANDA_FINALIZAR
//           }
//           onClick={handleFinalizarComanda}
//           className={styles.botonFinalizar}
//           disabled={loading || productosSeleccionados.length === 0}
//         />
//         <Button
//           text={NAMES.VOLVER}
//           onClick={() => navigate(ROUTES.DASHBOARD)}
//           className={styles.volverButton}
//         />
//       </div>
//     </div>
//   );
// }

// export default CrearComanda;
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Importa useLocation
import Button from "../../../components/Button/Button";
import ProductoSelectorList from "../../../components/Producto/ProductoSelectorList";
import ProductosSeleccionadosList from "./ProductosSeleccionadosList";
import styles from "./Comandas.module.css";
import { NAMES } from "../../../utils/Constants/text";
import { ROUTES } from "../../../utils/Constants/routes";
import { useCrearComanda } from "../../../hooks/useCrearComanda";
import { CategoriaProps } from "../../../utils/types/CategoriaTypes";
import { ProductoProps } from "../../../utils/types/ComandaTypes";

function CrearComanda() {
  const navigate = useNavigate();
  const location = useLocation(); // Hook para acceder al estado de la navegación

  const {
    categorias,
    productos,
    productosSeleccionados,
    comandaIdParaEditar,
    mensaje,
    error,
    loading,
    mesasDisponibles,
    mesaSeleccionadaId,
    handleSeleccionarProducto,
    handleAumentarCantidad,
    handleDisminuirCantidad,
    handleSeleccionarMesa,
    handleFinalizarComanda,
    // La función setMesaSeleccionadaId podría ser expuesta si useCrearComanda la gestiona internamente
    // O bien, modificamos useCrearComanda para que inicialice mesaSeleccionadaId desde location.state
  } = useCrearComanda();

  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionadaId, setCategoriaSeleccionadaId] = useState<
    number | null
  >(null);

  // NUEVO useEffect para manejar la mesa preseleccionada
  useEffect(() => {
    // Comprobar si hay un ID de mesa en el estado de la navegación
    const { selectedMesaId } = (location.state || {}) as {
      selectedMesaId?: number;
    };
    if (selectedMesaId && mesasDisponibles.length > 0) {
      // Asegurarse de que la mesa con selectedMesaId realmente exista y esté libre
      const mesaToPreselect = mesasDisponibles.find(
        (mesa) => mesa.id === selectedMesaId && mesa.estado === "libre"
      );
      if (mesaToPreselect) {
        // Llama a la función del hook para establecer la mesa seleccionada
        // Esto asume que useCrearComanda tiene una forma de establecer la mesa seleccionada desde fuera,
        // ya sea exponiendo setMesaSeleccionadaId o teniendo una función de inicialización.
        // Si no la tiene, tendrás que modificar useCrearComanda para aceptar un valor inicial.
        handleSeleccionarMesa({
          target: { value: String(mesaToPreselect.id) },
        } as React.ChangeEvent<HTMLSelectElement>);
      }
    }
  }, [location.state, mesasDisponibles, handleSeleccionarMesa]); // Dependencias: estado de la navegación, mesas disponibles, y la función del hook

  useEffect(() => {
    if (categorias.length > 0 && categoriaSeleccionadaId === null) {
      setCategoriaSeleccionadaId(categorias[0].id);
    }
  }, [categorias, categoriaSeleccionadaId]);

  const productosMostrados: ProductoProps[] = productos.filter((p) => {
    const coincideConBusqueda = p.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    if (busqueda.trim() !== "") {
      return coincideConBusqueda;
    }

    const esDeCategoriaSeleccionada =
      categoriaSeleccionadaId === null ||
      p.categoria_id === categoriaSeleccionadaId;

    return esDeCategoriaSeleccionada;
  });

  if (loading) {
    return <div className={styles.message}>{NAMES.CARGANDO_DATOS_COMANDA}</div>;
  }

  return (
    <div className={styles.comandaContainer}>
      <h1 className={styles.comandaTitulo}>
        {comandaIdParaEditar ? NAMES.ID_COMANDA_EDITAR : NAMES.ID_COMANDA_CREAR}
        {comandaIdParaEditar ? ` #${comandaIdParaEditar}` : ""}
      </h1>

      {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
      {mensaje && (
        <p className={`${styles.message} ${styles.success}`}>{mensaje}</p>
      )}

      {/* Selector de Mesas */}
      <div className={styles.mesaSelectorContainer}>
        <label htmlFor="mesa-select" className={styles.label}>
          {NAMES.SELECCIONAR_MESA}:
        </label>
        <select
          id="mesa-select"
          value={mesaSeleccionadaId === null ? "null" : mesaSeleccionadaId}
          onChange={handleSeleccionarMesa}
          className={styles.select}
          disabled={loading}
        >
          <option value="null">{NAMES.SIN_MESA}</option>
          {mesasDisponibles.map((mesa) => (
            <option key={mesa.id} value={mesa.id}>
              Mesa {mesa.numero} (
              {mesa.estado === "libre" ? "Libre" : "Ocupada"})
            </option>
          ))}
        </select>
        <small className={styles.textMuted}>
          {mesasDisponibles.filter((mesa) => mesa.estado === "libre").length}{" "}
          mesas libres
        </small>
      </div>

      <div className={styles.categoriasBar}>
        {categorias.map((categoria: CategoriaProps) => (
          <Button
            key={categoria.id}
            text={categoria.nombre}
            onClick={() => {
              setCategoriaSeleccionadaId(categoria.id);
              setBusqueda("");
            }}
            className={`${styles.categoriaButton} ${
              categoria.id === categoriaSeleccionadaId
                ? styles.categoriaButtonActive
                : ""
            }`}
          />
        ))}
      </div>

      <div className={styles.buscadorContainer}>
        <input
          type="text"
          placeholder={NAMES.COMANDA_BUSCAR_PRODUCTOS}
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className={styles.input}
        />
      </div>

      {!loading && !error && (
        <>
          <div className={styles.selectorProductosContainer}>
            {productosMostrados.length > 0 ? (
              <ProductoSelectorList
                productos={productosMostrados}
                onProductoClick={handleSeleccionarProducto}
              />
            ) : (
              <p className={styles.message}>{NAMES.COMANDA_BUSCAR_ERROR}</p>
            )}
          </div>

          <div className={styles.seleccionadosContainer}>
            <h3>{NAMES.COMANDA_PRODUCTOS_SELECCIONADOS}</h3>
            <ProductosSeleccionadosList
              productos={productosSeleccionados}
              onAumentar={handleAumentarCantidad}
              onDisminuir={handleDisminuirCantidad}
            />
          </div>
        </>
      )}

      <div className={styles.finalizarWrapper}>
        <Button
          text={
            comandaIdParaEditar
              ? NAMES.ID_COMANDA_ACTUALIZAR
              : NAMES.ID_COMANDA_FINALIZAR
          }
          onClick={handleFinalizarComanda}
          className={styles.botonFinalizar}
          disabled={loading || productosSeleccionados.length === 0}
        />
        <Button
          text={NAMES.VOLVER}
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className={styles.volverButton}
        />
      </div>
    </div>
  );
}

export default CrearComanda;
