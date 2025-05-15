import EditarCategoria from "../EditarCategoria/EditarCategoria";
import EliminarCategoria from "../EliminarCategoria/EliminarCategoria";
import Button from "../../Button/Button";
import styles from "../Categoria.module.css";
import { Categoria } from "../../../utils/Categoria";

interface CategoriaListProps {
  categorias: Categoria[];
  editandoId: number | null;
  onEdit: (id: number) => void;
  onCategoriaEditada: (id: number, nuevoNombre: string) => void;
  onCancelar: () => void;
  onEliminar: (id: number) => void;
}

const CategoriaList = ({
  categorias,
  editandoId,
  onEdit,
  onCategoriaEditada,
  onCancelar,
  onEliminar,
}: CategoriaListProps) => (
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
                text="Editar"
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

export default CategoriaList;
