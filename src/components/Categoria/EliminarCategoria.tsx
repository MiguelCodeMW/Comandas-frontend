// import api from "../../api/axio";
// import { ROUTES } from "../../utils/Constants/routes";
// import styles from "./Categoria.module.css";
// import { NAMES } from "../../utils/Constants/text";
// import { EliminarCategoriaProps } from "../../utils/Categoria/EliminarCategoriaProps";
// import Button from "../Button/Button";

// function EliminarCategoria({
//   id,
//   onCategoriaEliminada,
// }: EliminarCategoriaProps) {
//   const handleDelete = async () => {
//     const confirmDelete = window.confirm(NAMES.CATEGORIA_ELIMINAR);
//     if (!confirmDelete) return;

//     try {
//       await api.delete(ROUTES.CATEGORY_DETAIL.replace(":id", id.toString()));
//       onCategoriaEliminada(id, "HAY QUE MANDAR UN MENSAJE");
//     } catch (error) {
//       alert(NAMES.ALERTA_CATEGORIA);
//       console.error(NAMES.ALERTA_CATEGORIA, error);
//     }
//   };

//   return (
//     <Button
//       text={NAMES.ELIMINAR}
//       onClick={handleDelete}
//       className={[styles.button, styles.delete].join(" ")}
//     />
//   );
// }

// export default EliminarCategoria;
import api from "../../api/axio";
import { ROUTES } from "../../utils/Constants/routes";
import styles from "./Categoria.module.css";
import { NAMES } from "../../utils/Constants/text";
import { EliminarCategoriaProps } from "../../utils/Categoria/EliminarCategoriaProps";
import Button from "../Button/Button";
import axios, { AxiosError } from "axios"; // Importar AxiosError y axios

function EliminarCategoria({
  id,
  onCategoriaEliminada,
}: EliminarCategoriaProps) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(NAMES.CATEGORIA_ELIMINAR_CONFIRMACION); // Usar un mensaje de confirmación más específico
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Si no hay token, no se puede autenticar la solicitud
        // Notificar al padre sobre el error
        onCategoriaEliminada(
          id,
          "Error de autenticación: No se encontró token."
        ); // O un mensaje de NAMES
        return;
      }

      await api.delete(ROUTES.CATEGORY_DETAIL.replace(":id", id.toString()), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // En caso de éxito, el segundo argumento es null
      onCategoriaEliminada(id, null);
    } catch (error) {
      console.error(NAMES.ALERTA_CATEGORIA_ELIMINAR, error);
      let errorMessage = NAMES.ALERTA_CATEGORIA_ELIMINAR; // Mensaje por defecto
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        // Intentar obtener un mensaje más específico del backend si está disponible
        errorMessage =
          axiosError.response?.data?.message || NAMES.ALERTA_CATEGORIA_ELIMINAR;
      }
      // En caso de error, el segundo argumento es el mensaje de error
      onCategoriaEliminada(id, errorMessage);
      // Considera si quieres mostrar un alert aquí además de llamar al callback.
      // Generalmente, el componente padre (que usa el hook) se encargará de mostrar el mensaje de error.
      // alert(errorMessage); // Opcional, dependiendo de tu flujo de UI
    }
  };

  return (
    <Button
      text={NAMES.ELIMINAR}
      onClick={handleDelete}
      className={`${styles.button} ${styles.delete}`} // Manera más limpia de concatenar clases
    />
  );
}

export default EliminarCategoria;
