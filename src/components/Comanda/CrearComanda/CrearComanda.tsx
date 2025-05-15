import React, { useState, useEffect } from "react";
import api from "../../../api/axio";
import Button from "../../Button/Button";
import ProductoSelectorList from "../../Producto/ProductoSelectorList/ProductoSelectorList";
import { useNavigate } from "react-router-dom";

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
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await api.get("/user");
        setUserId(userResponse.data.id);

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

  const handleSeleccionarProducto = (producto: Producto) => {
    setProductosSeleccionados((prev) => {
      const productoExistente = prev.find((p) => p.id === producto.id);
      if (productoExistente) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        return [
          ...prev,
          {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1,
          },
        ];
      }
    });
  };

  const handleAumentarCantidad = (id: number) => {
    setProductosSeleccionados((prev) =>
      prev.map((p) => (p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p))
    );
  };

  const handleDisminuirCantidad = (id: number) => {
    setProductosSeleccionados((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p))
        .filter((p) => p.cantidad > 0)
    );
  };

  const handleFinalizarComanda = async () => {
    if (!userId) {
      alert("No se pudo obtener el ID del usuario. Por favor, inicia sesión.");
      return;
    }

    try {
      await api.post("/comandas", {
        user_id: userId,
        estado: "abierta",
        fecha: new Date().toISOString(),
        productos: productosSeleccionados.map((p) => ({
          id: p.id,
          cantidad: p.cantidad,
        })),
      });
      alert("Comanda creada con éxito");
      setProductosSeleccionados([]);
      navigate("/dashboard"); // <-- Redirige al dashboard
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
            <ProductoSelectorList
              productos={productos.filter(
                (p) => p.categoria_id === categoria.id
              )}
              onProductoClick={handleSeleccionarProducto}
            />
          </div>
        ))}
      </div>
      <h2>Productos Seleccionados</h2>
      <ul>
        {productosSeleccionados.map((producto, index) => (
          <li key={index}>
            {producto.nombre} - Cantidad: {producto.cantidad} - Precio Total: $
            {(producto.precio * producto.cantidad).toFixed(2)}
            <button onClick={() => handleAumentarCantidad(producto.id)}>
              +
            </button>
            <button onClick={() => handleDisminuirCantidad(producto.id)}>
              −
            </button>
          </li>
        ))}
      </ul>
      <Button
        text="Finalizar Comanda"
        onClick={handleFinalizarComanda}
        className=""
      />
    </div>
  );
};

export default CrearComanda;
