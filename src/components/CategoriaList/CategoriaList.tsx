/*import React, { useEffect, useState } from "react";
import api from "../../api/axio";

interface Categoria {
  id: number;
  nombre: string;
}

const CategoriasList = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const response = await api.get("/categorias");
      setCategorias(response.data);
    };

    fetchCategorias();
  }, []);

  return (
    <div>
      <h1>Categorías</h1>
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.id}>{categoria.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriasList;*/
import React from "react";
import api from "../../api/axio";

interface Categoria {
  id: number;
  nombre: string;
}

interface CategoriaListProps {
  onSelectCategoria: (id: number, nombre: string) => void;
  onDeleteCategoria: (id: number) => void;
}

const CategoriaList: React.FC<CategoriaListProps> = ({
  onSelectCategoria,
  onDeleteCategoria,
}) => {
  const [categorias, setCategorias] = React.useState<Categoria[]>([]);

  React.useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get("/categorias");
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
        <li
          key={categoria.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <span
            style={{ cursor: "pointer" }}
            onClick={() => onSelectCategoria(categoria.id, categoria.nombre)}
          >
            {categoria.nombre}
          </span>
          <button
            onClick={() => onDeleteCategoria(categoria.id)}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "0.3rem 0.6rem",
              cursor: "pointer",
            }}
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CategoriaList;
