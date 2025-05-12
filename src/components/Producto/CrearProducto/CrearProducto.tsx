import React, { useState, useEffect } from "react";
import api from "../../../api/axio";
import ProductoList from "../ProductoList/ProductoList";
import EditarProducto from "../EditarProducto/EditarProducto";

interface Categoria {
  id: number;
  nombre: string;
}

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria_id: number;
}

const CrearProducto = () => {
  const [productos, setProductos] = useState<Producto[]>([]); // Lista de productos
  const [categorias, setCategorias] = useState<Categoria[]>([]); // Lista de categorías
  const [nombre, setNombre] = useState<string>(""); // Nombre del producto
  const [precio, setPrecio] = useState<number>(0); // Precio del producto
  const [categoriaId, setCategoriaId] = useState<number | null>(null); // Categoría seleccionada
  const [mensaje, setMensaje] = useState<string | null>(null); // Mensajes de éxito o error
  const [editandoId, setEditandoId] = useState<number | null>(null); // ID del producto que se está editando

  // Cargar categorías y productos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriasResponse = await api.get("/categorias");
        setCategorias(categoriasResponse.data);

        const productosResponse = await api.get("/productos");
        setProductos(productosResponse.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  // Manejar el envío del formulario para añadir un producto
  const handleAddProducto = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensaje(null);

    if (!nombre.trim() || precio <= 0 || !categoriaId) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await api.post("/productos", {
        nombre,
        precio,
        categoria_id: categoriaId,
      });
      setProductos((prev) => [...prev, response.data.producto]);
      setMensaje("Producto creado con éxito.");
      setNombre("");
      setPrecio(0);
      setCategoriaId(null);
    } catch (error) {
      setMensaje("Error al guardar el producto. Inténtalo de nuevo.");
      console.error("Error al guardar el producto:", error);
    }
  };

  // Manejar la actualización de un producto
  const handleUpdateProducto = async (
    id: number,
    nuevoNombre: string,
    nuevoPrecio: number,
    nuevaCategoriaId: number
  ) => {
    try {
      await api.put(`/productos/${id}`, {
        nombre: nuevoNombre,
        precio: nuevoPrecio,
        categoria_id: nuevaCategoriaId,
      });
      setProductos((prev) =>
        prev.map((prod) =>
          prod.id === id
            ? {
                ...prod,
                nombre: nuevoNombre,
                precio: nuevoPrecio,
                categoria_id: nuevaCategoriaId,
              }
            : prod
        )
      );
      setMensaje("Producto actualizado con éxito.");
      setEditandoId(null);
    } catch (error) {
      setMensaje("Error al actualizar el producto. Inténtalo de nuevo.");
      console.error("Error al actualizar el producto:", error);
    }
  };

  // Manejar la eliminación de un producto
  const handleDeleteProducto = async (id: number) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/productos/${id}`);
      setProductos((prev) => prev.filter((prod) => prod.id !== id));
      setMensaje("Producto eliminado con éxito.");
    } catch (error) {
      setMensaje("Error al eliminar el producto. Inténtalo de nuevo.");
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Gestionar Productos</h1>
      {mensaje && (
        <p style={{ color: mensaje.includes("éxito") ? "green" : "red" }}>
          {mensaje}
        </p>
      )}
      {editandoId ? (
        <EditarProducto
          id={editandoId}
          nombreInicial={
            productos.find((prod) => prod.id === editandoId)?.nombre || ""
          }
          precioInicial={
            productos.find((prod) => prod.id === editandoId)?.precio || 0
          }
          categoriaIdInicial={
            productos.find((prod) => prod.id === editandoId)?.categoria_id || 0
          }
          categorias={categorias}
          onUpdateProducto={handleUpdateProducto}
          onCancel={() => setEditandoId(null)}
        />
      ) : (
        <form onSubmit={handleAddProducto}>
          <label>
            Nombre:
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre del producto"
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
              placeholder="Precio del producto"
              required
            />
          </label>
          <br />
          <label>
            Categoría:
            <select
              value={categoriaId || ""}
              onChange={(e) => setCategoriaId(parseInt(e.target.value))}
              required
            >
              <option value="" disabled>
                Selecciona una categoría
              </option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </label>
          <br />
          <button type="submit">Añadir Producto</button>
        </form>
      )}
      <h2>Lista de Productos</h2>
      <ProductoList
        productos={productos}
        categorias={categorias}
        onEditProducto={setEditandoId}
        onDeleteProducto={handleDeleteProducto}
      />
    </div>
  );
};

export default CrearProducto;
