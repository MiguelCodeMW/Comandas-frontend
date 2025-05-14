import { Category } from "../../../utils/Category";
import styles from "../Categoria.module.css";

interface CategoriaListProps {
  categorias: Category[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

function CategoriaList({ categorias, onEdit, onDelete }: CategoriaListProps) {
  return (
    <ul className={styles.categoryList}>
      {categorias.map((categoria) => (
        <li key={categoria.id} className={styles.categoryItem}>
          <span className={styles.categoryName}>{categoria.nombre}</span>
          <div className={styles.buttonGroup}>
            <button
              onClick={() => onEdit(categoria.id)}
              className={`${styles.button} ${styles.edit}`}
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(categoria.id)}
              className={`${styles.button} ${styles.delete}`}
            >
              Eliminar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CategoriaList;
