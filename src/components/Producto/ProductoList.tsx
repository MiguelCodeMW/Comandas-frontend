// import styles from "./Producto.module.css";
// import EliminarProducto from "./EliminarProducto";
// import { ProductoListProps } from "../../utils/Producto/ProductoListProps";
// import Button from "../Button/Button";
// import { NAMES } from "../../utils/Constants/text";

// function ProductoList({
//   productos,
//   categorias,
//   onEditProducto,
//   onDeleteProducto,
// }: ProductoListProps) {
//   return productos.length === 0 ? (
//     <p className={styles.message}>{NAMES.PRODUCTOS_NO_DISPONIBLES}</p>
//   ) : (
//     <ul className={styles.productList}>
//       {productos.map((producto) => (
//         <li key={producto.id} className={styles.productItem}>
//           <span className={styles.productName}>
//             {producto.nombre} - ${producto.precio.toFixed(2)} -{" "}
//             {
//               categorias.find(
//                 (categoria) => categoria.id === producto.categoria_id
//               )?.nombre
//             }
//           </span>
//           <div className={styles.buttonGroup}>
//             <Button
//               text={NAMES.EDITAR}
//               onClick={() => onEditProducto(producto.id)}
//               className={[styles.button, styles.edit].join(" ")}
//             />
//             <EliminarProducto
//               id={producto.id}
//               onProductoEliminado={onDeleteProducto}
//               className={styles.button}
//             />
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default ProductoList;
// import styles from "./Producto.module.css";
// import EliminarProducto from "./EliminarProducto"; // Asumo que este es para el botón de eliminar
// import EditarProducto from "./EditarProducto"; // Necesitarás importar EditarProducto
// import { Categoria } from "../../utils/Categoria/CategoriaProps"; // Asegúrate de tener esta importación si no está
// import { ProductoProps } from "../../utils/Producto/ProductoProps"; // Asegúrate de tener esta importación si no está
// import Button from "../Button/Button";
// import { NAMES } from "../../utils/Constants/text";

// import { ProductoListProps } from "../../utils/Producto/ProductoListProps"; // Asegúrate de que esta interfaz exista y defina las propiedades necesarias

// function ProductoList({
//   productos,
//   categorias,
//   onDeleteProducto,
//   editandoProductoId,
//   onSetEditandoProductoId,
//   onProductoEditado,
//   onCancelarEdicion,
// }: ProductoListProps) {
//   const getCategoriaNombre = (categoriaId: number) => {
//     const categoria = categorias.find((cat) => cat.id === categoriaId);
//     return categoria ? categoria.nombre : "Sin categoría";
//   };

//   if (productos.length === 0) {
//     return <p className={styles.message}>{NAMES.PRODUCTOS_NO_DISPONIBLES}</p>;
//   }

//   return (
//     <ul className={styles.productList}>
//       {productos.map((producto) => (
//         <li key={producto.id} className={styles.productItem}>
//           {editandoProductoId === producto.id ? (
//             <EditarProducto
//               id={producto.id}
//               nombreInicial={producto.nombre}
//               precioInicial={producto.precio}
//               categoriaIdInicial={producto.categoria_id}
//               categorias={categorias}
//               onProductoEditado={onProductoEditado}
//               onCancelarEdicion={onCancelarEdicion}
//             />
//           ) : (
//             <>
//               <div>
//                 <span className={styles.productName}>
//                   {producto.nombre} - ${producto.precio.toFixed(2)} -{" "}
//                   {getCategoriaNombre(producto.categoria_id || -1)}
//                 </span>
//               </div>
//               <div className={styles.buttonGroup}>
//                 <Button
//                   text={NAMES.EDITAR}
//                   onClick={() => onSetEditandoProductoId(producto.id)} // Cambiado para activar la edición
//                   className={[styles.button, styles.edit].join(" ")}
//                 />
//                 {/*
//                   Si EliminarProducto es solo un botón que llama a onDeleteProducto(producto.id),
//                   puedes mantenerlo. Si es un modal o algo más complejo, asegúrate que
//                   no interfiera con la lógica de edición inline.
//                   Para simplificar, podrías usar un Button normal aquí también si EliminarProducto
//                   solo envuelve una llamada a la API.
//                 */}
//                 <EliminarProducto // O un <Button text="Eliminar" onClick={() => onDeleteProducto(producto.id)} ... />
//                   id={producto.id}
//                   onProductoEliminado={onDeleteProducto}
//                   className={styles.button} // Asegúrate que el estilo sea consistente
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
import React from "react";
import EliminarProducto from "./EliminarProducto";
import Button from "../Button/Button";
import FormularioProducto from "./FormularioProducto"; // Usar el nuevo formulario
import styles from "./Producto.module.css";
import { ProductoProps } from "../../utils/Producto/ProductoProps";
import { Categoria } from "../../utils/Categoria/CategoriaProps";
import { NAMES } from "../../utils/Constants/text";

// Actualizar props
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
    return categoria ? categoria.nombre : "Desconocida";
  };

  return (
    <div className={styles.productListContainer}>
      {" "}
      {/* Añadir un contenedor si es necesario */}
      {productos.length === 0 && <p>No hay productos para mostrar.</p>}
      {productos.map((producto) => (
        <div key={producto.id} className={styles.productoCard}>
          {" "}
          {/* Estilo para cada producto */}
          {editandoProductoId === producto.id && productoEnEdicion ? (
            <FormularioProducto
              productoInicial={productoEnEdicion}
              categoriasDisponibles={categorias}
              onSubmit={async (data) => {
                // El ID ya está en productoEnEdicion.id o data.id si es ProductoProps
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
              <div className={styles.productoInfo}>
                <h3 className={styles.productoNombre}>{producto.nombre}</h3>
                <p className={styles.productoDetalle}>
                  Precio: ${producto.precio.toFixed(2)}
                </p>
                <p className={styles.productoDetalle}>
                  Categoría: {getCategoriaNombre(producto.categoria_id)}
                </p>
              </div>
              <div className={styles.productoActions}>
                <Button
                  text={NAMES.EDITAR}
                  onClick={() => onSetEditandoProductoId(producto.id)}
                  className={`${styles.button} ${styles.editButton}`}
                />
                <EliminarProducto
                  id={producto.id}
                  onProductoEliminado={onDeleteProducto} // Ya pasa (id, error)
                  className={`${styles.button} ${styles.deleteButton}`}
                />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProductoList;
