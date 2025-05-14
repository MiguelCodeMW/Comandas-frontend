import { useState, useEffect } from "react";
import api from "../../../api/axio"; // Usamos axios
import { ROUTES } from "../../../utils/Constants/routes";
import Button from "../../Button/Button";
import styles from "../Producto.module.css"; // Usamos un único archivo CSS
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

function CrearProducto() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensaje(null);

    if (!nombre.trim() || precio <= 0 || !categoriaId) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    try {
      if (editandoId) {
        // Editar producto existente
        await api.put(
          ROUTES.PRODUCT_DETAIL.replace(":id", editandoId.toString()),
          {
            nombre,
            precio,
            categoria_id: categoriaId,
          }
        );
        setProductos((prev) =>
          prev.map((prod) =>
            prod.id === editandoId
              ? { ...prod, nombre, precio, categoria_id: categoriaId }
              : prod
          )
        );
        setMensaje("Producto actualizado con éxito.");
      } else {
        // Crear nuevo producto
        const response = await api.post(ROUTES.PRODUCT, {
          nombre,
          precio,
          categoria_id: categoriaId,
        });

        // Asegúrate de que el producto añadido tenga todas las propiedades necesarias
        const nuevoProducto = {
          id: response.data.producto.id,
          nombre: response.data.producto.nombre || nombre,
          precio: response.data.producto.precio || precio,
          categoria_id: response.data.producto.categoria_id || categoriaId,
        };

        setProductos((prev) => [...prev, nuevoProducto]);
        setMensaje("Producto creado con éxito.");
      }

      // Reinicia los campos del formulario
      setNombre("");
      setPrecio(0);
      setCategoriaId(null);
      setEditandoId(null);
    } catch (error) {
      setMensaje("Error al guardar el producto. Inténtalo de nuevo.");
      console.error("Error al guardar el producto:", error);
    }
  };

  const handleEdit = (id: number) => {
    const producto = productos.find((prod) => prod.id === id);
    if (producto) {
      setNombre(producto.nombre);
      setPrecio(producto.precio);
      setCategoriaId(producto.categoria_id);
      setEditandoId(id);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(ROUTES.PRODUCT_DETAIL.replace(":id", id.toString()));
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

      <form onSubmit={handleSubmit} className={styles.form}>
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
            onChange={(e) => setPrecio(Number(e.target.value))}
            className={styles.input}
            placeholder="Precio del producto"
            required
          />
        </label>
        <label>
          Categoría:
          <select
            value={categoriaId || ""}
            onChange={(e) => setCategoriaId(Number(e.target.value))}
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
          text={editandoId ? "Guardar Cambios" : "Añadir Producto"}
          type="submit"
          className={styles.button}
        />
      </form>

      {mensaje && (
        <p
          className={`${styles.message} ${
            mensaje.includes("éxito") ? styles.success : styles.error
          }`}
        >
          {mensaje}
        </p>
      )}

      <h2 className={styles.title}>Lista de Productos</h2>
      <ul className={styles.productList}>
        {productos.map((producto) => (
          <li key={producto.id} className={styles.productItem}>
            <span className={styles.productName}>
              {producto.nombre} - ${producto.precio.toFixed(2)}
            </span>
            <div className={styles.buttonGroup}>
              <Button
                text="Editar"
                onClick={() => handleEdit(producto.id)}
                className={styles.button}
              />
              <Button
                text="Eliminar"
                onClick={() => handleDelete(producto.id)}
                className={`${styles.button} ${styles.delete}`}
              />
            </div>
          </li>
        ))}
      </ul>
      <Button
        text="Volver"
        onClick={() => navigate(ROUTES.DASHBOARD)}
        className={styles.dashboardButton}
      />
    </div>
  );
}

export default CrearProducto;
