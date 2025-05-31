// import api from "../../api/axio";
// import { ROUTES } from "../../utils/Constants/routes";
// import styles from "./Categoria.module.css"; // Importa los estilos CSS Modules
// import { NAMES } from "../../utils/Constants/text";
// import { EliminarCategoriaProps } from "../../utils/Categoria/EliminarCategoriaProps";
// import Button from "../Button/Button";
// import axios, { AxiosError } from "axios";

// function EliminarCategoria({
//   id,
//   onCategoriaEliminada,
// }: EliminarCategoriaProps) {
//   const handleDelete = async () => {
//     const confirmDelete = window.confirm(NAMES.CATEGORIA_ELIMINAR_CONFIRMACION);
//     if (!confirmDelete) return;

//     try {
//       const token = localStorage.getItem(NAMES.TOKEN);
//       if (!token) {
//         onCategoriaEliminada(id, NAMES.TOKEN_ERROR);
//         return;
//       }

//       await api.delete(ROUTES.CATEGORY_DETAIL.replace(":id", id.toString()), {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       onCategoriaEliminada(id, null);
//     } catch (error) {
//       console.error(NAMES.ALERTA_CATEGORIA_ELIMINAR, error);
//       let errorMessage = NAMES.ALERTA_CATEGORIA_ELIMINAR;
//       if (axios.isAxiosError(error)) {
//         const axiosError = error as AxiosError<any>;
//         errorMessage =
//           axiosError.response?.data?.message || NAMES.ALERTA_CATEGORIA_ELIMINAR;
//       }
//       onCategoriaEliminada(id, errorMessage);
//     }
//   };

//   return (
//     <Button
//       text={NAMES.ELIMINAR}
//       onClick={handleDelete}
//       className={`${styles.button} ${styles.delete}`}
//     />
//   );
// }

// export default EliminarCategoria;
import api from "../../api/axio";
import { ROUTES } from "../../utils/Constants/routes";
import styles from "./Categoria.module.css";
import { NAMES } from "../../utils/Constants/text";
// Importa el tipo unificado
import { EliminarCategoriaProps } from "../../utils/types/CategoriaTypes"; // Asegúrate de que la ruta sea correcta
import Button from "../Button/Button";
import axios, { AxiosError } from "axios";

function EliminarCategoria({
  id,
  onCategoriaEliminada,
  className, // Añadir si lo usas
}: EliminarCategoriaProps) {
  // Usa el tipo unificado
  const handleDelete = async () => {
    const confirmDelete = window.confirm(NAMES.CATEGORIA_ELIMINAR_CONFIRMACION);
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem(NAMES.TOKEN);
      if (!token) {
        onCategoriaEliminada(id, NAMES.TOKEN_ERROR);
        return;
      }

      await api.delete(ROUTES.CATEGORY_DETAIL.replace(":id", id.toString()), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onCategoriaEliminada(id, null);
    } catch (error) {
      console.error(NAMES.ALERTA_CATEGORIA_ELIMINAR, error);
      let errorMessage = NAMES.ALERTA_CATEGORIA_ELIMINAR;
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        // Es buena práctica usar un mensaje más específico si el backend lo proporciona
        errorMessage =
          axiosError.response?.data?.message || NAMES.ALERTA_CATEGORIA_ELIMINAR;
      }
      onCategoriaEliminada(id, errorMessage);
    }
  };

  return (
    <Button
      text={NAMES.ELIMINAR}
      onClick={handleDelete}
      className={className || `${styles.button} ${styles.delete}`} // Usa className si se pasa, de lo contrario el predeterminado
    />
  );
}

export default EliminarCategoria;
