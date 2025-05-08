import React from "react";
import EliminarProducto from "../EliminarProducto/EliminarProducto";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria_id: number;
}

interface Categoria {
  id: number;
  nombre: string;
}

interface ProductoListProps {
  productos: Producto[];
  categorias: Categoria[];
  onEditProducto: (id: number) => void;
  onDeleteProducto: (id: number) => void;
}

const ProductoList = ({
  productos,
  categorias,
  onEditProducto,
  onDeleteProducto,
}: ProductoListProps) => {
  return (
    <ul>
      {productos.map((producto) => (
        <li
          key={producto.id}
          onClick={() => onEditProducto(producto.id)} // Lógica para manejar el clic en el <li>
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.5rem",
            cursor: "pointer",
          }}
        >
          <span>
            {producto.nombre} - ${producto.precio.toFixed(2)} -{" "}
            {
              categorias.find(
                (categoria) => categoria.id === producto.categoria_id
              )?.nombre
            }
          </span>
          {/* Botón para editar el producto */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Detiene la propagación del evento al <li>
              onEditProducto(producto.id);
            }}
            style={{
              backgroundColor: "blue",
              color: "white",
              border: "none",
              padding: "0.3rem 0.6rem",
              cursor: "pointer",
              marginLeft: "0.5rem",
            }}
          >
            Editar
          </button>
          {/* Botón para eliminar el producto */}
          <EliminarProducto id={producto.id} onDelete={onDeleteProducto} />
        </li>
      ))}
    </ul>
  );
};

export default ProductoList;
