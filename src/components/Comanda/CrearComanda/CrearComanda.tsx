import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../../api/axio";
import Button from "../../Button/Button";
import ProductoSelectorList from "../../Producto/ProductoSelectorList/ProductoSelectorList";
import styles from "../Comandas.module.css";

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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id"); // Si viene un id, es para editar

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await api.get("/user");
        setUserId(userResponse.data.id);

        const categoriasResponse = await api.get("/categorias");
        setCategorias(categoriasResponse.data);

        const productosResponse = await api.get("/productos");
        setProductos(productosResponse.data);

        if (id) {
          // Precarga la comanda para edición
          const comandaResponse = await api.get(`/comandas/${id}`);
          const comanda = comandaResponse.data;
          setProductosSeleccionados(
            comanda.detalles.map((detalle: any) => ({
              id: detalle.producto.id,
              nombre: detalle.producto.nombre,
              precio: detalle.producto.precio,
              cantidad: detalle.cantidad,
            }))
          );
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, [id]);

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
      const payload = {
        user_id: userId,
        estado: "abierta",
        productos: productosSeleccionados.map((p) => ({
          producto_id: p.id,
          cantidad: p.cantidad,
        })),
      };

      if (id) {
        // Actualizar comanda existente
        await api.put(`/comandas/${id}`, payload);
        alert("Comanda actualizada con éxito");
      } else {
        // Crear nueva comanda
        await api.post("/comandas", {
          ...payload,
          fecha: new Date().toISOString(),
        });
        alert("Comanda creada con éxito");
      }
      setProductosSeleccionados([]);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al guardar la comanda:", error);
      alert("Error al guardar la comanda. Inténtalo de nuevo.");
    }
  };

  return (
    <div className={styles.comandaContainer}>
      <h1 className={styles.titulo}>
        {id ? "Editar Comanda" : "Crear Comanda"}
      </h1>

      <div>
        {categorias.map((categoria) => (
          <div key={categoria.id} className={styles.categoria}>
            <h2 className={styles.categoriaTitulo}>{categoria.nombre}</h2>
            <div className={styles.categoriaProductos}>
              <ProductoSelectorList
                productos={productos.filter(
                  (p) => p.categoria_id === categoria.id
                )}
                onProductoClick={handleSeleccionarProducto}
              />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.seleccionadosContainer}>
        <h2>Productos Seleccionados</h2>
        <ul className={styles.seleccionadosLista}>
          {productosSeleccionados.map((producto, index) => (
            <li key={index} className={styles.seleccionadoItem}>
              <span className={styles.seleccionadoInfo}>
                {producto.nombre} - Cantidad: {producto.cantidad} - Precio
                Total: ${(producto.precio * producto.cantidad).toFixed(2)}
              </span>
              <div className={styles.seleccionadoControles}>
                <button
                  className={styles.controlBtn}
                  onClick={() => handleAumentarCantidad(producto.id)}
                >
                  +
                </button>
                <button
                  className={styles.controlBtn}
                  onClick={() => handleDisminuirCantidad(producto.id)}
                >
                  −
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.finalizar}>
        <Button
          text={id ? "Actualizar Comanda" : "Finalizar Comanda"}
          onClick={handleFinalizarComanda}
          className={styles.botonFinalizar}
        />
      </div>
    </div>
  );
};

export default CrearComanda;
