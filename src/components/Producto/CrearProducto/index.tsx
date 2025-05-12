import React, { useState, useEffect } from "react";
import api from "../../../api/axio";
import { Product } from "../../../utils/Product"; // Importa el tipo Product
import { Category } from "../../../utils/Category"; // Importa el tipo Category
import { ROUTES } from "../../../utils/Constants/routes"; // Importa las rutas
import Button from "../../Button/Button"; // Importa tu componente Button
import styles from "./CrearProducto.module.css";
import { useNavigate } from "react-router-dom";

const CrearProducto = () => {
  const [productos, setProductos] = useState<Product[]>([]);
  const [categorias, setCategorias] = useState<Category[]>([]);
  const [nombre, setNombre] = useState<string>("");
  const [precio, setPrecio] = useState<number>(0);
  const [categoriaId, setCategoriaId] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriasResponse = await api.get(ROUTES.CATEGORY);
        setCategorias(categoriasResponse.data);

        const productosResponse = await api.get(ROUTES.PRODUCT);
        setProductos(productosResponse.data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddProducto = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensaje(null);

    if (!nombre.trim() || precio <= 0 || !categoriaId) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await api.post(ROUTES.PRODUCT, {
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

  const handleUpdateProducto = async (
    id: number,
    nuevoNombre: string,
    nuevoPrecio: number,
    nuevaCategoriaId: number
  ) => {
    try {
      await api.put(`${ROUTES.PRODUCT}/${id}`, {
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

  const handleDeleteProducto = async (id: number) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`${ROUTES.PRODUCT}/${id}`);
      setProductos((prev) => prev.filter((prod) => prod.id !== id));
      setMensaje("Producto eliminado con éxito.");
    } catch (error) {
      setMensaje("Error al eliminar el producto. Inténtalo de nuevo.");
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gestionar Productos</h1>
      {mensaje && (
        <p
          className={`${styles.message} ${
            mensaje.includes("éxito") ? styles.success : styles.error
          }`}
        >
          {mensaje}
        </p>
      )}
      <form onSubmit={handleAddProducto} className={styles.form}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={styles.input}
            placeholder="Nombre del producto"
            required
          />
        </label>
        <label>
          Precio:
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(parseFloat(e.target.value))}
            className={styles.input}
            placeholder="Precio del producto"
            required
          />
        </label>
        <label>
          Categoría:
          <select
            value={categoriaId || ""}
            onChange={(e) => setCategoriaId(parseInt(e.target.value))}
            className={styles.select}
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
        <Button
          text="Añadir Producto"
          type="submit"
          className={styles.button}
        />
      </form>
      <h2 className={styles.title}>Lista de Productos</h2>
      <ul className={styles.productList}>
        {productos.map((producto) => (
          <li key={producto.id} className={styles.productItem}>
            {editandoId === producto.id ? (
              <>
                <input
                  type="text"
                  value={producto.nombre}
                  onChange={(e) =>
                    setProductos((prev) =>
                      prev.map((prod) =>
                        prod.id === producto.id
                          ? { ...prod, nombre: e.target.value }
                          : prod
                      )
                    )
                  }
                  className={styles.input}
                />
                <input
                  type="number"
                  value={producto.precio}
                  onChange={(e) =>
                    setProductos((prev) =>
                      prev.map((prod) =>
                        prod.id === producto.id
                          ? { ...prod, precio: parseFloat(e.target.value) }
                          : prod
                      )
                    )
                  }
                  className={styles.input}
                />
                <div className={styles.buttonGroup}>
                  <Button
                    text="Guardar"
                    onClick={() =>
                      handleUpdateProducto(
                        producto.id,
                        producto.nombre,
                        producto.precio,
                        producto.categoria_id
                      )
                    }
                    className={`${styles.button} ${styles.save}`}
                  />
                  <Button
                    text="Cancelar"
                    onClick={() => setEditandoId(null)}
                    className={`${styles.button} ${styles.cancel}`}
                  />
                </div>
              </>
            ) : (
              <>
                <span className={styles.productName}>
                  {producto.nombre} - ${producto.precio.toFixed(2)}
                </span>
                <div className={styles.buttonGroup}>
                  <Button
                    text="Editar"
                    onClick={() => setEditandoId(producto.id)}
                    className={styles.button}
                  />
                  <Button
                    text="Eliminar"
                    onClick={() => handleDeleteProducto(producto.id)}
                    className={`${styles.button} ${styles.delete}`}
                  />
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <Button
        text="Volver al Dashboard"
        onClick={() => navigate("/dashboard")}
        className={styles.dashboardButton}
      />
    </div>
  );
};

export default CrearProducto;
