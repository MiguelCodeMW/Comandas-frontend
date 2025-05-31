// import EliminarCategoria from "./EliminarCategoria";
// import Button from "../Button/Button";
// import FormularioCategoria from "./FormularioCategoria";
// import styles from "./Categoria.module.css";
// // import { CategoriaProps } from "../../utils/Categoria/CategoriaProps";
// import { NAMES } from "../../utils/Constants/text";
// import { CategoriaListProps2 } from "../../utils/Categoria/CategoriaListProps2";

// function CategoriaList({
//   categorias,
//   editandoId,
//   categoriaEnEdicion,
//   onEdit,
//   onCategoriaEditada,
//   onCancelar,
//   onEliminarCallback,
//   limpiarMensajesAlCambiar,
// }: CategoriaListProps2) {
//   return (
//     <ul className={styles.categoriaList}>
//       {categorias.map((categoria) => (
//         <li key={categoria.id} className={styles.categoriaItem}>
//           {editandoId === categoria.id && categoriaEnEdicion ? (
//             <FormularioCategoria
//               categoriaInicial={categoriaEnEdicion}
//               onSubmit={async (nuevoNombre) => {
//                 return await onCategoriaEditada(categoria.id, nuevoNombre);
//               }}
//               onCancel={onCancelar}
//               textoBotonSubmit={NAMES.GUARDAR_CAMBIOS}
//               limpiarMensajesAlCambiar={limpiarMensajesAlCambiar}
//             />
//           ) : (
//             <>
//               <span className={styles.categoriaName}>{categoria.nombre}</span>
//               <div className={styles.buttonGroup}>
//                 <Button
//                   text={NAMES.EDITAR}
//                   onClick={() => onEdit(categoria.id)}
//                   className={`${styles.button} ${styles.edit}`}
//                 />
//                 <EliminarCategoria
//                   id={categoria.id}
//                   onCategoriaEliminada={onEliminarCallback}
//                   className={`${styles.button} ${styles.delete}`}
//                 />
//               </div>
//             </>
//           )}
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default CategoriaList;
import EliminarCategoria from "./EliminarCategoria";
import Button from "../Button/Button";
import FormularioCategoria from "./FormularioCategoria";
import styles from "./Categoria.module.css";
import { NAMES } from "../../utils/Constants/text";
// Importa el tipo unificado
import { CategoriaListProps } from "../../utils/types/CategoriaTypes"; // Asegúrate de que la ruta sea correcta

function CategoriaList({
  categorias,
  editandoId,
  categoriaEnEdicion,
  onEdit,
  onCategoriaEditada,
  onCancelar,
  onEliminar, // Cambiado de onEliminarCallback a onEliminar
  limpiarMensajesAlCambiar,
}: CategoriaListProps) {
  // Usa el tipo unificado
  return (
    <ul className={styles.categoriaList}>
      {categorias.map((categoria) => (
        <li key={categoria.id} className={styles.categoriaItem}>
          {editandoId === categoria.id && categoriaEnEdicion ? (
            <FormularioCategoria
              categoriaInicial={categoriaEnEdicion}
              onSubmit={async (nuevoNombre) => {
                return await onCategoriaEditada(categoria.id, nuevoNombre);
              }}
              onCancel={onCancelar}
              textoBotonSubmit={NAMES.GUARDAR_CAMBIOS}
              limpiarMensajesAlCambiar={limpiarMensajesAlCambiar}
            />
          ) : (
            <>
              <span className={styles.categoriaName}>{categoria.nombre}</span>
              <div className={styles.buttonGroup}>
                <Button
                  text={NAMES.EDITAR}
                  onClick={() => onEdit(categoria.id)}
                  className={`${styles.button} ${styles.edit}`}
                />
                <EliminarCategoria
                  id={categoria.id}
                  onCategoriaEliminada={onEliminar} // Usa onEliminar
                  className={`${styles.button} ${styles.delete}`}
                />
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default CategoriaList;
