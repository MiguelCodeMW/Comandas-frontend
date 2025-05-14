/*import { useState, useEffect } from "react";
import api from "../../../api/axio";
import { ROUTES } from "../../../utils/Constants/routes";
import Button from "../../Button/Button";
import styles from "../Producto.module.css";
import { useNavigate } from "react-router-dom";
import { Producto } from "../../../utils/Producto";
import { Categoria } from "../../../utils/Categoria";

function CrearProducto() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [producto, setProducto] = useState<Producto>({
    id: 0, // Inicializamos con un valor por defecto
    nombre: "",
    precio: 0,
    categoria_id: 0, // Inicializamos con un valor por defecto
  });
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

    if (
      !producto.nombre.trim() ||
      producto.precio <= 0 ||
      !producto.categoria_id
    ) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    try {
      if (editandoId) {
        // Editar producto existente
        await api.put(
          ROUTES.PRODUCT_DETAIL.replace(":id", editandoId.toString()),
          producto
        );
        setProductos((prev) =>
          prev.map((prod) =>
            prod.id === editandoId ? { ...prod, ...producto } : prod
          )
        );
        setMensaje("Producto actualizado con éxito.");
      } else {
        // Crear nuevo producto
        const { id, ...productoSinId } = producto; // Excluimos el id al enviar al backend
        const response = await api.post(ROUTES.PRODUCT, productoSinId);

        const nuevoProducto = {
          id: response.data.producto.id,
          ...productoSinId,
        };

        setProductos((prev) => [...prev, nuevoProducto]);
        setMensaje("Producto creado con éxito.");
      }

      // Reinicia el estado del producto
      setProducto({ id: 0, nombre: "", precio: 0, categoria_id: 0 });
      setEditandoId(null);
    } catch (error) {
      setMensaje("Error al guardar el producto. Inténtalo de nuevo.");
      console.error("Error al guardar el producto:", error);
    }
  };

  const handleEdit = (id: number) => {
    const productoAEditar = productos.find((prod) => prod.id === id);
    if (productoAEditar) {
      setProducto(productoAEditar); // Asigna directamente el objeto encontrado
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
            value={producto.nombre}
            onChange={(e) =>
              setProducto({ ...producto, nombre: e.target.value })
            }
            className={styles.input}
            placeholder="Nombre del producto"
            required
          />
        </label>
        <label>
          Precio:
          <input
            type="number"
            value={producto.precio}
            onChange={(e) =>
              setProducto({ ...producto, precio: Number(e.target.value) })
            }
            className={styles.input}
            placeholder="Precio del producto"
            required
          />
        </label>
        <label>
          Categoría:
          <select
            value={producto.categoria_id || ""}
            onChange={(e) =>
              setProducto({ ...producto, categoria_id: Number(e.target.value) })
            }
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
*/
import { useState, useEffect } from "react";
import api from "../../../api/axio";
import { ROUTES } from "../../../utils/Constants/routes";
import Button from "../../Button/Button";
import EditarProducto from "../EditarProducto/EditarProducto";
import ProductoList from "../ProductoList/ProductoList";
import styles from "../Producto.module.css";
import { useNavigate } from "react-router-dom";
import { Producto } from "../../../utils/Producto";
import { Categoria } from "../../../utils/Categoria";

function CrearProducto() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [editandoProducto, setEditandoProducto] = useState<Producto | null>(
    null
  );
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [nuevoProducto, setNuevoProducto] = useState<Producto>({
    id: 0,
    nombre: "",
    precio: 0,
    categoria_id: 0,
  });

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

  const handleCrearProducto = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensaje(null);

    if (
      !nuevoProducto.nombre.trim() ||
      nuevoProducto.precio <= 0 ||
      !nuevoProducto.categoria_id
    ) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    try {
      const { id, ...productoSinId } = nuevoProducto;
      const response = await api.post(ROUTES.PRODUCT, productoSinId);

      const productoCreado = {
        id: response.data.producto.id,
        ...productoSinId,
      };

      setProductos((prev) => [...prev, productoCreado]);
      setMensaje("Producto creado con éxito.");
      setNuevoProducto({ id: 0, nombre: "", precio: 0, categoria_id: 0 });
    } catch (error) {
      setMensaje("Error al guardar el producto. Inténtalo de nuevo.");
      console.error("Error al guardar el producto:", error);
    }
  };

  const handleEditProducto = (id: number) => {
    const productoAEditar = productos.find((prod) => prod.id === id);
    if (productoAEditar) {
      setEditandoProducto(productoAEditar);
    }
  };

  const handleProductoEditado = (productoEditado: Producto) => {
    setProductos((prev) =>
      prev.map((prod) =>
        prod.id === productoEditado.id ? productoEditado : prod
      )
    );
    setEditandoProducto(null); // <- Se cierra el formulario de edición
    setMensaje("Producto actualizado con éxito.");
  };

  const handleCancelarEdicion = () => {
    setEditandoProducto(null); // <- Botón para cancelar
  };

  const handleDeleteProducto = (id: number) => {
    setProductos((prev) => prev.filter((prod) => prod.id !== id));
    setMensaje("Producto eliminado con éxito.");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gestionar Productos</h1>

      {editandoProducto ? (
        <EditarProducto
          id={editandoProducto.id}
          nombreInicial={editandoProducto.nombre}
          precioInicial={editandoProducto.precio}
          categoriaIdInicial={editandoProducto.categoria_id}
          categorias={categorias}
          onProductoEditado={handleProductoEditado}
          onCancelarEdicion={handleCancelarEdicion} // <- Nuevo
        />
      ) : (
        <>
          <form onSubmit={handleCrearProducto} className={styles.form}>
            <label>
              Nombre:
              <input
                type="text"
                value={nuevoProducto.nombre}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
                }
                placeholder="Nombre del producto"
                className={styles.input}
                required
              />
            </label>
            <label>
              Precio:
              <input
                type="number"
                value={nuevoProducto.precio}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    precio: Number(e.target.value),
                  })
                }
                placeholder="Precio del producto"
                className={styles.input}
                required
              />
            </label>
            <label>
              Categoría:
              <select
                value={nuevoProducto.categoria_id || ""}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    categoria_id: Number(e.target.value),
                  })
                }
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
          <ProductoList
            productos={productos}
            categorias={categorias}
            onEditProducto={handleEditProducto}
            onDeleteProducto={handleDeleteProducto}
          />
        </>
      )}

      {mensaje && (
        <p
          className={`${styles.message} ${
            mensaje.includes("éxito") ? styles.success : styles.error
          }`}
        >
          {mensaje}
        </p>
      )}

      <Button
        text="Volver"
        onClick={() => navigate(ROUTES.DASHBOARD)}
        className={styles.dashboardButton}
      />
    </div>
  );
}

export default CrearProducto;
