import React from "react";
import api from "../../../api/axio";
import { Category } from "../../../utils/Category";
import { ROUTES } from "../../../utils/Constants/routes";

interface CategoriaListProps {
  onSelectCategoria: (id: number, nombre: string) => void;
  onDeleteCategoria: (id: number) => void;
}

const CategoriaList: React.FC<CategoriaListProps> = ({
  onSelectCategoria,
  onDeleteCategoria,
}) => {
  const [categorias, setCategorias] = React.useState<Category[]>([]);

  React.useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get(ROUTES.CATEGORY);
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  return (
    <ul>
      {categorias.map((categoria) => (
        <li key={categoria.id}>
          <span
            onClick={() => onSelectCategoria(categoria.id, categoria.nombre)}
          >
            {categoria.nombre}
          </span>
          <button onClick={() => onDeleteCategoria(categoria.id)}>
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CategoriaList;
