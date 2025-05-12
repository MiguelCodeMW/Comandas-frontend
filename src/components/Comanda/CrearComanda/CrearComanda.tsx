import React, { useState, useEffect } from "react";
import api from "../../../api/axio";

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

const CrearComanda = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState<
    { id: number; nombre: string; precio: number; cantidad: number }[]
  >([]);
  const [userId, setUserId] = useState<number | null>(null); // Estado para almacenar el user_id

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener el usuario autenticado
        const userResponse = await api.get("/user");
        setUserId(userResponse.data.id); // Guardar el user_id en el estado

        // Obtener las categorías
        const categoriasResponse = await api.get("/categorias");
        setCategorias(categoriasResponse.data);

        // Obtener los productos
        const productosResponse = await api.get("/productos");
        setProductos(productosResponse.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleSeleccionarProducto = (producto: Producto) => {
    setProductosSeleccionados((prev) => {
      const productoExistente = prev.find((p) => p.id === producto.id);
      if (productoExistente) {
        // Incrementar la cantidad si el producto ya está seleccionado
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        // Añadir el producto con cantidad inicial de 1
        return [
          ...prev,
          {
            id: producto.id,
            nombre: producto.nombre, // Añadir el nombre del producto
            precio: producto.precio, // Añadir el precio del producto
            cantidad: 1,
          },
        ];
      }
    });
  };

  const handleFinalizarComanda = async () => {
    if (!userId) {
      alert("No se pudo obtener el ID del usuario. Por favor, inicia sesión.");
      return;
    }

    try {
      await api.post("/comandas", {
        user_id: userId, // Usar el ID del usuario autenticado
        estado: "abierta", // Estado inicial de la comanda
        fecha: new Date().toISOString(), // Fecha actual en formato ISO
        productos: productosSeleccionados.map((p) => ({
          id: p.id,
          cantidad: p.cantidad,
        })), // Enviar solo id y cantidad al backend
      });
      alert("Comanda creada con éxito");
      setProductosSeleccionados([]);
    } catch (error) {
      console.error("Error al crear la comanda:", error);
      alert("Error al crear la comanda. Inténtalo de nuevo.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Crear Comanda</h1>
      <div>
        {categorias.map((categoria) => (
          <div key={categoria.id} style={{ marginBottom: "1rem" }}>
            <h2>{categoria.nombre}</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {productos
                .filter((producto) => producto.categoria_id === categoria.id)
                .map((producto) => (
                  <li
                    key={producto.id}
                    onClick={() => handleSeleccionarProducto(producto)}
                    style={{
                      cursor: "pointer",
                      padding: "0.5rem",
                      border: "1px solid #ccc",
                      marginBottom: "0.5rem",
                      borderRadius: "5px",
                    }}
                  >
                    {producto.nombre} - ${producto.precio.toFixed(2)}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      <h2>Productos Seleccionados</h2>
      <ul>
        {productosSeleccionados.map((producto, index) => (
          <li key={index}>
            {producto.nombre} - Cantidad: {producto.cantidad} - Precio Total: $
            {(producto.precio * producto.cantidad).toFixed(2)}
          </li>
        ))}
      </ul>
      <button
        onClick={handleFinalizarComanda}
        style={{
          backgroundColor: "green",
          color: "white",
          border: "none",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Finalizar Comanda
      </button>
    </div>
  );
};

export default CrearComanda;
