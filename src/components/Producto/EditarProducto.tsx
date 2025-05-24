// import { useState } from "react";
// import api from "../../api/axio";
// import { ROUTES } from "../../utils/Constants/routes";
// import styles from "./Producto.module.css";
// import { ProductoProps } from "../../utils/Producto/ProductoProps";
// import { EditarProductoProps } from "../../utils/Producto/EditarProductoProps";
// import Button from "../Button/Button";
// import { NAMES } from "../../utils/Constants/text";

// function EditarProducto(
//   props: EditarProductoProps & { onCancelarEdicion: () => void }
// ) {
//   const [producto, setProducto] = useState<ProductoProps>({
//     id: props.id,
//     nombre: props.nombreInicial,
//     precio: props.precioInicial,
//     categoria_id: props.categoriaIdInicial || 0,
//   });

//   const [mensaje, setMensaje] = useState<string | null>(null);

//   const handleEdit = async () => {
//     setMensaje(null);
//     if (
//       !producto.nombre.trim() ||
//       producto.precio <= 0 ||
//       !producto.categoria_id
//     ) {
//       setMensaje(NAMES.ALERTA_CAMPOS_VACIOS);
//       return;
//     }

//     try {
//       await api.put(
//         ROUTES.PRODUCT_DETAIL.replace(":id", producto.id.toString()),
//         producto
//       );
//       setMensaje(NAMES.PRODUCTO_ACTUALIZADO);
//       props.onProductoEditado(producto);
//     } catch (error) {
//       setMensaje(NAMES.ALERTA_PRODUCTO_ACTUALIZAR);
//       console.error(NAMES.ALERTA_PRODUCTO_ACTUALIZAR, error);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>Editar Producto</h2>

//       <input
//         type="text"
//         value={producto.nombre}
//         onChange={(e) => setProducto({ ...producto, nombre: e.target.value })}
//         placeholder={NAMES.PLACEHOLDER_PRODUCTO}
//         className={styles.input}
//       />
//       <input
//         type="number"
//         value={producto.precio}
//         onChange={(e) =>
//           setProducto({ ...producto, precio: Number(e.target.value) })
//         }
//         placeholder={NAMES.PLACEHOLDER_PRECIO}
//         className={styles.input}
//       />
//       <select
//         value={producto.categoria_id || ""}
//         onChange={(e) =>
//           setProducto({ ...producto, categoria_id: Number(e.target.value) })
//         }
//         className={styles.select}
//       >
//         <option value="" disabled>
//           Selecciona una categoría
//         </option>
//         {props.categorias.map((categoria) => (
//           <option key={categoria.id} value={categoria.id}>
//             {categoria.nombre}
//           </option>
//         ))}
//       </select>

//       <div className={styles.buttonGroup}>
//         <Button
//           onClick={handleEdit}
//           text={NAMES.GUARDAR}
//           className={[styles.button, styles.save].join(" ")} // Aplica las clases necesarias
//         />
//         <Button
//           onClick={props.onCancelarEdicion}
//           text={NAMES.CANCELAR}
//           className={[styles.button, styles.cancel].join(" ")} // Aplica las clases necesarias
//         />
//       </div>

//       {mensaje && (
//         <p
//           className={`${styles.message} ${
//             mensaje.includes("éxito") ? styles.success : styles.error
//           }`}
//         >
//           {mensaje}
//         </p>
//       )}
//     </div>
//   );
// }

// export default EditarProducto;
