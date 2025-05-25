// import React from "react";
// import EliminarProducto from "./EliminarProducto";
// import Button from "../Button/Button";
// import FormularioProducto from "./FormularioProducto";
// import styles from "./Producto.module.css";
// import { ProductoProps } from "../../utils/Producto/ProductoProps";
// import { Categoria } from "../../utils/Categoria/CategoriaProps";
// import { NAMES } from "../../utils/Constants/text";

// interface ProductoListProps {
//   productos: ProductoProps[];
//   categorias: Categoria[];
//   editandoProductoId: number | null;
//   productoEnEdicion: ProductoProps | null;
//   onSetEditandoProductoId: (id: number) => void;
//   onDeleteProducto: (id: number, errorMessage: string | null) => void;
//   onProductoEditado: (id: number, data: ProductoProps) => Promise<boolean>;
//   onCancelarEdicion: () => void;
//   limpiarMensajesAlCambiar?: () => void;
// }

// function ProductoList({
//   productos,
//   categorias,
//   editandoProductoId,
//   productoEnEdicion,
//   onSetEditandoProductoId,
//   onDeleteProducto,
//   onProductoEditado,
//   onCancelarEdicion,
//   limpiarMensajesAlCambiar,
// }: ProductoListProps) {
//   const getCategoriaNombre = (categoriaId: number) => {
//     const categoria = categorias.find((cat) => cat.id === categoriaId);
//     return categoria ? categoria.nombre : "Desconocida";
//   };

//   if (productos.length === 0) {
//     return <p className={styles.message}>{NAMES.PRODUCTOS_NO_DISPONIBLES}</p>;
//   }

//   return (
//     <ul className={styles.productList}>
//       {productos.map((producto) => (
//         <li key={producto.id} className={styles.productItem}>
//           {editandoProductoId === producto.id && productoEnEdicion ? (
//             <FormularioProducto
//               productoInicial={productoEnEdicion}
//               categoriasDisponibles={categorias}
//               onSubmit={async (data) => {
//                 return await onProductoEditado(
//                   producto.id,
//                   data as ProductoProps
//                 );
//               }}
//               onCancel={onCancelarEdicion}
//               textoBotonSubmit={NAMES.GUARDAR_CAMBIOS}
//               limpiarMensajesAlCambiar={limpiarMensajesAlCambiar}
//             />
//           ) : (
//             <>
//               <div className={styles.productInfo}>
//                 <span className={styles.productName}>{producto.nombre}</span>
//                 <div>Precio: ${producto.precio.toFixed(2)}</div>
//                 <div>
//                   Categoría: {getCategoriaNombre(producto.categoria_id)}
//                 </div>
//               </div>
//               <div className={styles.buttonGroup}>
//                 <Button
//                   text={NAMES.EDITAR}
//                   onClick={() => onSetEditandoProductoId(producto.id)}
//                   className={`${styles.button} ${styles.editButton}`}
//                 />
//                 <EliminarProducto
//                   id={producto.id}
//                   onProductoEliminado={onDeleteProducto}
//                   className={`${styles.button} ${styles.deleteButton}`}
//                 />
//               </div>
//             </>
//           )}
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default ProductoList;
// import React from "react";
// import EliminarProducto from "./EliminarProducto";
// import Button from "../Button/Button";
// import FormularioProducto from "./FormularioProducto";
// import styles from "./Producto.module.css"; // Usa el CSS actualizado
// import { ProductoProps } from "../../utils/Producto/ProductoProps";
// import { Categoria } from "../../utils/Categoria/CategoriaProps";
// import { NAMES } from "../../utils/Constants/text";

// interface ProductoListProps {
//   productos: ProductoProps[];
//   categorias: Categoria[];
//   editandoProductoId: number | null;
//   productoEnEdicion: ProductoProps | null;
//   onSetEditandoProductoId: (id: number) => void;
//   onDeleteProducto: (id: number, errorMessage: string | null) => void;
//   onProductoEditado: (id: number, data: ProductoProps) => Promise<boolean>;
//   onCancelarEdicion: () => void;
//   limpiarMensajesAlCambiar?: () => void;
// }

// function ProductoList({
//   productos,
//   categorias,
//   editandoProductoId,
//   productoEnEdicion,
//   onSetEditandoProductoId,
//   onDeleteProducto,
//   onProductoEditado,
//   onCancelarEdicion,
//   limpiarMensajesAlCambiar,
// }: ProductoListProps) {
//   const getCategoriaNombre = (categoriaId: number) => {
//     const categoria = categorias.find((cat) => cat.id === categoriaId);
//     return categoria ? categoria.nombre : "MIERDA EN UN BOTE 3"; // Usar constante
//   };

//   if (productos.length === 0) {
//     return (
//       <p className={styles.infoMessage}>{NAMES.PRODUCTOS_NO_DISPONIBLES}</p>
//     ); // Usar infoMessage
//   }

//   return (
//     <ul className={styles.productList}>
//       {productos.map((producto) => (
//         <li key={producto.id} className={styles.productItem}>
//           {editandoProductoId === producto.id && productoEnEdicion ? (
//             <FormularioProducto
//               productoInicial={productoEnEdicion}
//               categoriasDisponibles={categorias}
//               onSubmit={async (data) => {
//                 return await onProductoEditado(
//                   producto.id,
//                   data as ProductoProps
//                 );
//               }}
//               onCancel={onCancelarEdicion}
//               textoBotonSubmit={NAMES.GUARDAR_CAMBIOS}
//               limpiarMensajesAlCambiar={limpiarMensajesAlCambiar}
//             />
//           ) : (
//             <>
//               <div className={styles.productInfoText}>
//                 {" "}
//                 {/* Usar productInfoText */}
//                 <span className={styles.productName}>{producto.nombre}</span>
//                 <div>Precio: ${producto.precio.toFixed(2)}</div>
//                 <div>
//                   Categoría: {getCategoriaNombre(producto.categoria_id)}
//                 </div>
//               </div>
//               <div className={styles.buttonGroup}>
//                 <Button
//                   text={NAMES.EDITAR}
//                   onClick={() => onSetEditandoProductoId(producto.id)}
//                   className={styles.editButton} // Usar editButton
//                 />
//                 <EliminarProducto
//                   id={producto.id}
//                   onProductoEliminado={onDeleteProducto}
//                   className={styles.deleteButton} // Usar deleteButton
//                 />
//               </div>
//             </>
//           )}
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default ProductoList;
// components/Producto/ProductoList.tsx
import React from "react";
import EliminarProducto from "./EliminarProducto";
import Button from "../Button/Button";
import FormularioProducto from "./FormularioProducto";
import styles from "./Producto.module.css";
import { ProductoProps } from "../../utils/Producto/ProductoProps";
import { Categoria } from "../../utils/Categoria/CategoriaProps";
import { NAMES } from "../../utils/Constants/text";

interface ProductoListProps {
  productos: ProductoProps[];
  categorias: Categoria[];
  editandoProductoId: number | null;
  productoEnEdicion: ProductoProps | null;
  onSetEditandoProductoId: (id: number) => void;
  onDeleteProducto: (id: number, errorMessage: string | null) => void;
  onProductoEditado: (id: number, data: ProductoProps) => Promise<boolean>;
  onCancelarEdicion: () => void;
  limpiarMensajesAlCambiar?: () => void;
}

function ProductoList({
  productos,
  categorias,
  editandoProductoId,
  productoEnEdicion,
  onSetEditandoProductoId,
  onDeleteProducto,
  onProductoEditado,
  onCancelarEdicion,
  limpiarMensajesAlCambiar,
}: ProductoListProps) {
  const getCategoriaNombre = (categoriaId: number) => {
    const categoria = categorias.find((cat) => cat.id === categoriaId);
    return categoria ? categoria.nombre : NAMES.CATEGORIA_DESCONOCIDA; // Usar constante apropiada
  };

  if (productos.length === 0) {
    return (
      <p className={styles.infoMessage}>{NAMES.PRODUCTOS_NO_DISPONIBLES}</p>
    );
  }

  return (
    <ul className={styles.productList}>
      {productos.map((producto) => (
        <li key={producto.id} className={styles.productItem}>
          {editandoProductoId === producto.id && productoEnEdicion ? (
            <FormularioProducto
              productoInicial={productoEnEdicion}
              categoriasDisponibles={categorias}
              onSubmit={async (data) => {
                return await onProductoEditado(
                  producto.id,
                  data as ProductoProps
                );
              }}
              onCancel={onCancelarEdicion}
              textoBotonSubmit={NAMES.GUARDAR_CAMBIOS}
              limpiarMensajesAlCambiar={limpiarMensajesAlCambiar}
            />
          ) : (
            <>
              <div className={styles.productInfoText}>
                <span className={styles.productName}>{producto.nombre}</span>
                <div>Precio: ${producto.precio.toFixed(2)}</div>
                <div>
                  Categoría: {getCategoriaNombre(producto.categoria_id)}
                </div>
              </div>
              <div className={styles.buttonGroup}>
                <Button
                  text={NAMES.EDITAR}
                  onClick={() => onSetEditandoProductoId(producto.id)}
                  // AHORA: Usa styles.button + styles.editButton
                  className={`${styles.button} ${styles.editButton}`}
                />
                <EliminarProducto
                  id={producto.id}
                  onProductoEliminado={onDeleteProducto}
                  // AHORA: Usa styles.button + styles.deleteButton
                  className={`${styles.button} ${styles.deleteButton}`}
                />
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ProductoList;
