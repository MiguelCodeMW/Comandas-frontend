// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "../../Button/Button";
// import ProductoSelectorList from "../../Producto/ProductoSelectorList"; // ProductoSelectorList incluido correctamente
// import ProductosSeleccionadosList from "./ProductosSeleccionadosList";
// import styles from "./Comandas.module.css";
// import { NAMES } from "../../../utils/Constants/text";
// import { ROUTES } from "../../../utils/Constants/routes";
// import { useCrearComanda } from "../../../hooks/useCrearComanda";

// function CrearComanda() {
//   const {
//     categorias,
//     productos,
//     productosSeleccionados,
//     comandaIdParaEditar,
//     mensaje,
//     error,
//     loading,
//     handleSeleccionarProducto,
//     handleAumentarCantidad,
//     handleDisminuirCantidad,
//     handleFinalizarComanda,
//   } = useCrearComanda();
//   const navigate = useNavigate();

//   const [busqueda, setBusqueda] = useState("");

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

//       <div className={styles.buscadorContainer}>
//         <input
//           type="text"
//           placeholder="Buscar producto..."
//           value={busqueda}
//           onChange={(e) => setBusqueda(e.target.value)}
//           className="input"
//         />
//       </div>

//       {!loading && !error && (
//         <>
//           <div className={styles.selectorProductosContainer}>
//             {categorias.map((categoria) => {
//               const productosFiltrados = productos
//                 .filter((p) => p.categoria_id === categoria.id)
//                 .filter((p) =>
//                   p.nombre.toLowerCase().includes(busqueda.toLowerCase())
//                 );
//               if (productosFiltrados.length === 0) return null;
//               return (
//                 <div key={categoria.id} className={styles.categoriaSection}>
//                   <h2 className={styles.categoriaTitulo}>{categoria.nombre}</h2>
//                   {/* ProductoSelectorList incluido aquí */}
//                   <ProductoSelectorList
//                     productos={productosFiltrados}
//                     onProductoClick={handleSeleccionarProducto}
//                   />
//                 </div>
//               );
//             })}
//           </div>

//           <div className={styles.seleccionadosContainer}>
//             <h3>Productos Seleccionados</h3>
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
//           text="Volver"
//           onClick={() => navigate(ROUTES.DASHBOARD)}
//           className="btn"
//         />
//       </div>
//     </div>
//   );
// }

// export default CrearComanda;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Button/Button";
import ProductoSelectorList from "../../Producto/ProductoSelectorList";
import ProductosSeleccionadosList from "./ProductosSeleccionadosList";
import styles from "./Comandas.module.css";
import { NAMES } from "../../../utils/Constants/text";
import { ROUTES } from "../../../utils/Constants/routes";
import { useCrearComanda } from "../../../hooks/useCrearComanda";
import { Categoria } from "../../../utils/Categoria/CategoriaProps"; // Asegúrate de que esta importación sea correcta

function CrearComanda() {
  const {
    categorias,
    productos,
    productosSeleccionados,
    comandaIdParaEditar,
    mensaje,
    error,
    loading,
    handleSeleccionarProducto,
    handleAumentarCantidad,
    handleDisminuirCantidad,
    handleFinalizarComanda,
  } = useCrearComanda();
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionadaId, setCategoriaSeleccionadaId] = useState<
    number | null
  >(null);

  // Efecto para seleccionar la primera categoría por defecto al cargar
  useEffect(() => {
    if (categorias.length > 0 && categoriaSeleccionadaId === null) {
      setCategoriaSeleccionadaId(categorias[0].id);
    }
  }, [categorias, categoriaSeleccionadaId]);

  // Filtramos los productos basándonos en la categoría seleccionada Y la búsqueda
  const productosMostrados = productos.filter((p) => {
    // Si no hay categoría seleccionada (lo cual no debería pasar con el useEffect)
    // o la categoría del producto coincide con la seleccionada
    const esDeCategoriaSeleccionada =
      categoriaSeleccionadaId === null ||
      p.categoria_id === categoriaSeleccionadaId;

    // Si la búsqueda está vacía o el nombre del producto incluye la búsqueda
    const coincideConBusqueda = p.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    return esDeCategoriaSeleccionada && coincideConBusqueda;
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

      {/* Contenedor de la barra de categorías */}
      <div className={styles.categoriasBar}>
        {categorias.map(
          (
            categoria: Categoria // Asegúrate de usar la interfaz Categoria aquí
          ) => (
            <Button
              key={categoria.id}
              text={categoria.nombre}
              onClick={() => {
                setCategoriaSeleccionadaId(categoria.id);
                setBusqueda(""); // Opcional: limpiar búsqueda al cambiar de categoría
              }}
              className={`${styles.categoriaButton} ${
                categoria.id === categoriaSeleccionadaId
                  ? styles.categoriaButtonActive
                  : ""
              }`}
            />
          )
        )}
      </div>

      <div className={styles.buscadorContainer}>
        <input
          type="text"
          placeholder="Buscar producto..."
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
              <p className={styles.message}>
                No hay productos en esta categoría o que coincidan con la
                búsqueda.
              </p>
            )}
          </div>

          <div className={styles.seleccionadosContainer}>
            <h3>Productos Seleccionados</h3>
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
          text="Volver"
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className={styles.volverButton}
        />
      </div>
    </div>
  );
}

export default CrearComanda;
