// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "../Button/Button";
// import ProductoList from "./ProductoList";
// import FormularioProducto from "./FormularioProducto";
// import styles from "./Producto.module.css";
// import { ROUTES } from "../../utils/Constants/routes";
// import { NAMES } from "../../utils/Constants/text";
// import { useGestionProductos } from "../../hooks/useGestionProductos";

// function GestionProductosPage() {
//   const {
//     productos,
//     categorias,
//     mensaje,
//     error,
//     nuevoProducto, // El hook lo gestiona, pero el formulario de creación puede tener su propio estado
//     // setNuevoProducto, // No se necesita si el formulario de creación es independiente o el hook lo resetea
//     editandoProductoId,
//     productoEnEdicion,
//     handleCrearProducto,
//     iniciarEdicionProducto,
//     cancelarEdicionProducto,
//     handleEditarProducto,
//     handleProductoEliminadoCallback,
//     limpiarMensajes,
//   } = useGestionProductos();
//   const navigate = useNavigate();

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Gestionar Productos</h1>

//       {mensaje && (
//         <p className={`${styles.message} ${styles.success}`}>{mensaje}</p>
//       )}
//       {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}

//       {!editandoProductoId && (
//         <>
//           <h2 className={styles.titleForm}>Añadir Producto</h2>
//           <FormularioProducto
//             // El formulario puede manejar su propio estado interno para los inputs
//             // y llamar a handleCrearProducto con los datos finales.
//             onSubmit={async (data) => {
//               // Asegurarse que data es del tipo Omit<ProductoProps, "id">
//               const { id, ...productoDataParaCrear } = data as any; // Simple type casting, improve if needed
//               return await handleCrearProducto(productoDataParaCrear);
//             }}
//             categoriasDisponibles={categorias}
//             textoBotonSubmit="Añadir Producto"
//             limpiarMensajesAlCambiar={limpiarMensajes}
//           />
//         </>
//       )}

//       <h2 className={styles.titleList}>Lista de Productos</h2>
//       <ProductoList
//         productos={productos}
//         categorias={categorias} // Pasar categorías para mostrar nombres en la lista/edición
//         editandoProductoId={editandoProductoId}
//         productoEnEdicion={productoEnEdicion} // Pasar el producto completo para el formulario
//         onSetEditandoProductoId={iniciarEdicionProducto} // Cambiado para usar la función del hook
//         onDeleteProducto={handleProductoEliminadoCallback} // Ya usa el callback del hook
//         onProductoEditado={handleEditarProducto} // El hook se encarga de la lógica
//         onCancelarEdicion={cancelarEdicionProducto} // Ya usa el callback del hook
//         limpiarMensajesAlCambiar={limpiarMensajes}
//       />

//       <Button
//         text="Volver"
//         onClick={() => navigate(ROUTES.DASHBOARD)}
//         className={styles.button} // Reutilizar estilo o crear uno específico
//       />
//     </div>
//   );
// }

// export default GestionProductosPage;
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "../Button/Button";
// import ProductoList from "./ProductoList";
// import FormularioProducto from "./FormularioProducto";
// import styles from "./Producto.module.css"; // Usa el CSS actualizado
// import { ROUTES } from "../../utils/Constants/routes";
// import { NAMES } from "../../utils/Constants/text";
// import { useGestionProductos } from "../../hooks/useGestionProductos";

// function GestionProductosPage() {
//   const {
//     productos,
//     categorias,
//     mensaje,
//     error,
//     editandoProductoId,
//     productoEnEdicion,
//     handleCrearProducto,
//     iniciarEdicionProducto,
//     cancelarEdicionProducto,
//     handleEditarProducto,
//     handleProductoEliminadoCallback,
//     limpiarMensajes,
//   } = useGestionProductos();
//   const navigate = useNavigate();

//   return (
//     <div className={styles.gestionProductosContainer}>
//       {" "}
//       {/* Usar la clase del contenedor principal */}
//       <h1 className={styles.pageTitle}>MIERDA EN UN TARRO</h1>
//       {mensaje && (
//         <p className={`${styles.message} ${styles.successMessage}`}>
//           {mensaje}
//         </p> // Clases de mensaje actualizadas
//       )}
//       {error && (
//         <p className={`${styles.message} ${styles.errorMessage}`}>{error}</p>
//       )}{" "}
//       {/* Clases de mensaje actualizadas */}
//       {!editandoProductoId && (
//         <>
//           <h2 className={styles.sectionTitle}>{NAMES.PRODUCTO_GUARDAR}</h2>{" "}
//           {/* Usar sectionTitle */}
//           <FormularioProducto
//             onSubmit={async (data) => {
//               const { id, ...productoDataParaCrear } = data as any;
//               return await handleCrearProducto(productoDataParaCrear);
//             }}
//             categoriasDisponibles={categorias}
//             textoBotonSubmit={NAMES.PRODUCTO_GUARDAR}
//             limpiarMensajesAlCambiar={limpiarMensajes}
//           />
//         </>
//       )}
//       <h2 className={styles.sectionTitle}>MIERDA EN UN TARRO 2"</h2>{" "}
//       {/* Usar sectionTitle */}
//       <ProductoList
//         productos={productos}
//         categorias={categorias}
//         editandoProductoId={editandoProductoId}
//         productoEnEdicion={productoEnEdicion}
//         onSetEditandoProductoId={iniciarEdicionProducto}
//         onDeleteProducto={handleProductoEliminadoCallback}
//         onProductoEditado={handleEditarProducto}
//         onCancelarEdicion={cancelarEdicionProducto}
//         limpiarMensajesAlCambiar={limpiarMensajes}
//       />
//       <Button
//         text={NAMES.VOLVER}
//         onClick={() => navigate(ROUTES.DASHBOARD)}
//         className="btn" // Se mantiene la clase global 'btn'
//       />
//     </div>
//   );
// }

// export default GestionProductosPage;
// components/Producto/GestionProductosPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import ProductoList from "./ProductoList";
import FormularioProducto from "./FormularioProducto";
import styles from "./Producto.module.css";
import { ROUTES } from "../../utils/Constants/routes";
import { NAMES } from "../../utils/Constants/text";
import { useGestionProductos } from "../../hooks/useGestionProductos";

function GestionProductosPage() {
  const {
    productos,
    categorias,
    mensaje,
    error,
    editandoProductoId,
    productoEnEdicion,
    handleCrearProducto,
    iniciarEdicionProducto,
    cancelarEdicionProducto,
    handleEditarProducto,
    handleProductoEliminadoCallback,
    limpiarMensajes,
  } = useGestionProductos();
  const navigate = useNavigate();

  return (
    <div className={styles.gestionProductosContainer}>
      <h1 className={styles.pageTitle}>Gestionar Productos</h1>{" "}
      {/* Cambié el "MIERDA" por algo más apropiado */}
      {mensaje && (
        <p className={`${styles.message} ${styles.successMessage}`}>
          {mensaje}
        </p>
      )}
      {error && (
        <p className={`${styles.message} ${styles.errorMessage}`}>{error}</p>
      )}
      {!editandoProductoId && (
        <>
          <h2 className={styles.sectionTitle}>{NAMES.PRODUCTO_GUARDAR}</h2>
          <FormularioProducto
            onSubmit={async (data) => {
              const { id, ...productoDataParaCrear } = data as any;
              return await handleCrearProducto(productoDataParaCrear);
            }}
            categoriasDisponibles={categorias}
            textoBotonSubmit={NAMES.PRODUCTO_GUARDAR}
            limpiarMensajesAlCambiar={limpiarMensajes}
          />
        </>
      )}
      <h2 className={styles.sectionTitle}>Lista de Productos</h2>{" "}
      {/* Cambié el "MIERDA" por algo más apropiado */}
      <ProductoList
        productos={productos}
        categorias={categorias}
        editandoProductoId={editandoProductoId}
        productoEnEdicion={productoEnEdicion}
        onSetEditandoProductoId={iniciarEdicionProducto}
        onDeleteProducto={handleProductoEliminadoCallback}
        onProductoEditado={handleEditarProducto}
        onCancelarEdicion={cancelarEdicionProducto}
        limpiarMensajesAlCambiar={limpiarMensajes}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "var(--spacing-xl)",
        }}
      >
        <Button
          text={NAMES.VOLVER}
          onClick={() => navigate(ROUTES.DASHBOARD)}
          // AHORA: Usa styles.button + styles.backButton del CSS Module
          className={`${styles.button} ${styles.backButton}`}
        />
      </div>
    </div>
  );
}

export default GestionProductosPage;
