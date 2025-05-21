import EditarCategoria from "./EditarCategoria";
import EliminarCategoria from "./EliminarCategoria";
import Button from "../Button/Button";
import styles from "./Categoria.module.css";
import { CategoriaListProps } from "../../utils/Categoria/CategoriaListProps";
import { NAMES } from "../../utils/Constants/text";

function CategoriaList({
  categorias,
  editandoId,
  onEdit,
  onCategoriaEditada,
  onCancelar,
  onEliminar,
}: CategoriaListProps) {
  return (
    <ul className={styles.categoriaList}>
      {categorias.map((categoria) => (
        <li key={categoria.id} className={styles.categoriaItem}>
          <span className={styles.categoriaName}>{categoria.nombre}</span>
          <div className={styles.buttonGroup}>
            {editandoId === categoria.id ? (
              <EditarCategoria
                id={categoria.id}
                nombreInicial={categoria.nombre}
                onCategoriaEditada={(nuevoNombre) =>
                  onCategoriaEditada(categoria.id, nuevoNombre)
                }
                onCancelar={onCancelar}
              />
            ) : (
              <>
                <Button
                  text={NAMES.EDITAR}
                  onClick={() => onEdit(categoria.id)}
                  className={[styles.button, styles.edit].join(" ")}
                />
                <EliminarCategoria
                  id={categoria.id}
                  onCategoriaEliminada={() => onEliminar(categoria.id)}
                />
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CategoriaList;
