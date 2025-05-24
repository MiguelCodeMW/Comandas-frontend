// import { useState } from "react";
// import api from "../../api/axio";
// import { ROUTES } from "../../utils/Constants/routes";
// import { EliminarProductoProps } from "../../utils/Producto/EliminarProductoProps";
// import styles from "./Producto.module.css";
// import Button from "../Button/Button";
// import { NAMES } from "../../utils/Constants/text";

// function EliminarProducto({
//   id,
//   onProductoEliminado,
//   className,
// }: EliminarProductoProps) {
//   const [mensaje, setMensaje] = useState<string | null>(null);

//   const handleDelete = async () => {
//     const confirmDelete = window.confirm(NAMES.PRODUCTO_ELIMINAR);
//     if (!confirmDelete) return;

//     try {
//       await api.delete(ROUTES.PRODUCT_DETAIL.replace(":id", id.toString()));
//       setMensaje(NAMES.PRODUCTO_ELIMINAR_EXISTOSA);
//       onProductoEliminado(id);
//     } catch (error) {
//       setMensaje(NAMES.ALERTA_PRODUCTO_ELIMINAR);
//       console.error(NAMES.ALERTA_PRODUCTO_ELIMINAR, error);
//     }
//   };

//   return (
//     <div>
//       <Button
//         text="Eliminar"
//         onClick={handleDelete}
//         className={`${styles.button} ${styles.delete} ${className || ""}`} // Aseguramos que use los estilos base
//       />
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

// export default EliminarProducto;
import api from "../../api/axio";
import { ROUTES } from "../../utils/Constants/routes";
import { EliminarProductoProps } from "../../utils/Producto/EliminarProductoProps"; // Asegúrate que esta interfaz exista y defina 'id' y 'onProductoEliminado'
import styles from "./Producto.module.css";
import Button from "../Button/Button";
import { NAMES } from "../../utils/Constants/text";

function EliminarProducto({
  id,
  onProductoEliminado, // Callback para notificar al padre del éxito o error
  className,
}: EliminarProductoProps) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "¿Seguro que deseas eliminar este producto?" // Usar una constante de texto para la confirmación
    );
    if (!confirmDelete) return;

    try {
      await api.delete(ROUTES.PRODUCT_DETAIL.replace(":id", id.toString()));
      onProductoEliminado(id, null); // Notificar éxito al padre (id, errorMessage = null)
    } catch (error: any) {
      console.error(NAMES.ALERTA_PRODUCTO_ELIMINAR, error);
      // Intentar obtener un mensaje de error específico de la respuesta de la API
      const apiErrorMessage =
        error.response?.data?.message || "Error al eliminar el producto.";
      onProductoEliminado(id, apiErrorMessage); // Notificar error al padre (id, mensajeDeError)
    }
  };

  return (
    <Button
      text={NAMES.ELIMINAR || "Eliminar"} // Usar una constante de texto
      onClick={handleDelete}
      className={`${styles.button} ${styles.delete} ${className || ""}`}
    />
  );
}

export default EliminarProducto;
