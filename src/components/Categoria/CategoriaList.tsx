// import EditarCategoria from "./EditarCategoria";
// import EliminarCategoria from "./EliminarCategoria";
// import Button from "../Button/Button";
// import styles from "./Categoria.module.css";
// import { CategoriaListProps } from "../../utils/Categoria/CategoriaListProps";
// import { NAMES } from "../../utils/Constants/text";

// function CategoriaList({
//   categorias,
//   editandoId,
//   onEdit,
//   onCategoriaEditada,
//   onCancelar,
//   onEliminar,
// }: CategoriaListProps) {
//   return (
//     <ul className={styles.categoriaList}>
//       {categorias.map((categoria) => (
//         <li key={categoria.id} className={styles.categoriaItem}>
//           <span className={styles.categoriaName}>{categoria.nombre}</span>
//           <div className={styles.buttonGroup}>
//             {editandoId === categoria.id ? (
//               <EditarCategoria
//                 id={categoria.id}
//                 nombreInicial={categoria.nombre}
//                 onCategoriaEditada={(nuevoNombre) =>
//                   onCategoriaEditada(categoria.id, nuevoNombre)
//                 }
//                 onCancelar={onCancelar}
//               />
//             ) : (
//               <>
//                 <Button
//                   text={NAMES.EDITAR}
//                   onClick={() => onEdit(categoria.id)}
//                   className={[styles.button, styles.edit].join(" ")}
//                 />
//                 <EliminarCategoria
//                   id={categoria.id}
//                   onCategoriaEliminada={() => onEliminar(categoria.id)}
//                 />
//               </>
//             )}
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default CategoriaList;
import EliminarCategoria from "./EliminarCategoria";
import Button from "../Button/Button";
import FormularioCategoria from "./FormularioCategoria"; // Usar el nuevo formulario
import styles from "./Categoria.module.css";
import { Categoria } from "../../utils/Categoria/CategoriaProps";
import { NAMES } from "../../utils/Constants/text";

// Actualizar props
interface CategoriaListProps {
  categorias: Categoria[];
  editandoId: number | null;
  categoriaEnEdicion: Categoria | null; // Para pasar al formulario
  onEdit: (id: number) => void;
  onCategoriaEditada: (id: number, nuevoNombre: string) => Promise<boolean>; // El hook se encarga de la lógica
  onCancelar: () => void;
  onEliminarCallback: (id: number, errorMessage: string | null) => void; // Cambiado
  limpiarMensajesAlCambiar?: () => void;
}

function CategoriaList({
  categorias,
  editandoId,
  categoriaEnEdicion,
  onEdit,
  onCategoriaEditada,
  onCancelar,
  onEliminarCallback,
  limpiarMensajesAlCambiar,
}: CategoriaListProps) {
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
                  className={[styles.button, styles.edit].join(" ")}
                />
                <EliminarCategoria
                  id={categoria.id}
                  // onCategoriaEliminada ahora usa onEliminarCallback del hook
                  onCategoriaEliminada={onEliminarCallback}
                  className={[styles.button, styles.delete].join(" ")}
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
