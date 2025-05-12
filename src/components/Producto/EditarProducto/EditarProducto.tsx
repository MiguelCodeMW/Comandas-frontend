import React, { useState } from "react";

interface EditarProductoProps {
  id: number;
  nombreInicial: string;
  precioInicial: number;
  categoriaIdInicial: number;
  categorias: { id: number; nombre: string }[];
  onUpdateProducto: (
    id: number,
    nuevoNombre: string,
    nuevoPrecio: number,
    nuevaCategoriaId: number
  ) => void;
  onCancel: () => void;
}

const EditarProducto = ({
  id,
  nombreInicial,
  precioInicial,
  categoriaIdInicial,
  categorias,
  onUpdateProducto,
  onCancel,
}: EditarProductoProps) => {
  const [nombre, setNombre] = useState<string>(nombreInicial);
  const [precio, setPrecio] = useState<number>(precioInicial);
  const [categoriaId, setCategoriaId] = useState<number>(categoriaIdInicial);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdateProducto(id, nombre, precio, categoriaId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Precio:
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(parseFloat(e.target.value))}
          required
        />
      </label>
      <br />
      <label>
        Categoría:
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(parseInt(e.target.value))}
          required
        >
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
};

export default EditarProducto;
