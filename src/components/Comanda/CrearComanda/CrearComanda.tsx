/*import React, { useState, useEffect } from "react";
import api from "../../../api/axio";
import Button from "../../Button/Button";
import ProductoSelectorList from "../../Producto/ProductoSelectorList/ProductoSelectorList";
import { useNavigate } from "react-router-dom";
import styles from "../Comandas.module.css"; // 👈 Importa el CSS Module

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
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al crear la comanda:", error);
      alert("Error al crear la comanda. Inténtalo de nuevo.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Crear Comanda</h1>

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

      <div className={styles.productosSeleccionados}>
        <h2>Productos Seleccionados</h2>
        <ul className={styles.listaProductos}>
          {productosSeleccionados.map((producto, index) => (
            <li key={index} className={styles.productoItem}>
              <span className={styles.productoInfo}>
                {producto.nombre} - Cantidad: {producto.cantidad} - Precio
                Total: ${(producto.precio * producto.cantidad).toFixed(2)}
              </span>
              <div className={styles.botonesCantidad}>
                <button
                  className={styles.botonCantidad}
                  onClick={() => handleAumentarCantidad(producto.id)}
                >
                  +
                </button>
                <button
                  className={styles.botonCantidad}
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
          text="Finalizar Comanda"
          onClick={handleFinalizarComanda}
          className={styles.botonPrincipal}
        />
      </div>
    </div>
  );
};

export default CrearComanda;*/
import React, { useState, useEffect } from "react";
import api from "../../../api/axio";
import Button from "../../Button/Button";
import ProductoSelectorList from "../../Producto/ProductoSelectorList/ProductoSelectorList";
import { useNavigate } from "react-router-dom";
import styles from "../Comandas.module.css"; // 👈 Importa el CSS Module

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
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al crear la comanda:", error);
      alert("Error al crear la comanda. Inténtalo de nuevo.");
    }
  };

  return (
    <div className={styles.comandaContainer}>
      <h1 className={styles.comandaTitulo}>Crear Comanda</h1>

      <div>
        {categorias.map((categoria) => (
          <div key={categoria.id} className={styles.categoriaSection}>
            <h2 className={styles.categoriaTitulo}>{categoria.nombre}</h2>
            <div className={styles.productosGrid}>
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

      <div className={styles.finalizarWrapper}>
        <Button
          text="Finalizar Comanda"
          onClick={handleFinalizarComanda}
          className={styles.botonFinalizar}
        />
      </div>
    </div>
  );
};

export default CrearComanda;
