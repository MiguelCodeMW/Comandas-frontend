import React, { useEffect, useState } from "react";
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

export default CategoriasList;
