// import React, { useState, useEffect, useCallback } from "react"; // useCallback añadido
// import api from "../../api/axio";
// import { ROUTES } from "../../utils/Constants/routes";
// import Button from "../Button/Button";
// // EditarProducto ya no se usa directamente aquí para el renderizado principal
// import ProductoList from "./ProductoList"; // Asegúrate que este es el componente correcto
// import styles from "./Producto.module.css";
// import { useNavigate } from "react-router-dom";
// import { ProductoProps } from "../../utils/Producto/ProductoProps"; // Renombrado a Producto para consistencia
// import { Categoria } from "../../utils/Categoria/CategoriaProps";
// import { NAMES } from "../../utils/Constants/text";

// // Renombrar ProductoProps a Producto para claridad si es el tipo principal

// function CrearProducto() {
//   // Este es el componente al que me refería como GestionProductos
//   const [productos, setProductos] = useState<ProductoProps[]>([]);
//   const [categorias, setCategorias] = useState<Categoria[]>([]);
//   const [mensaje, setMensaje] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null); // Añadido para manejo de errores
//   const [nuevoProducto, setNuevoProducto] = useState<Omit<ProductoProps, "id">>(
//     {
//       // Omitir id para nuevo producto
//       nombre: "",
//       precio: 0,
//       categoria_id: 0,
//     }
//   );
//   const [editandoProductoId, setEditandoProductoId] = useState<number | null>(
//     null
//   ); // Para manejar el ID del producto en edición

//   const navigate = useNavigate();

//   const fetchProductos = useCallback(async () => {
//     try {
//       // Asegúrate que ROUTES.PRODUCT sea el endpoint correcto para listar productos
//       const response = await api.get(ROUTES.PRODUCT);
//       setProductos(response.data.productos || response.data); // Ajusta según la respuesta de tu API
//     } catch (err) {
//       console.error("Error al obtener productos:", err);
//       setError("No se pudieron cargar los productos.");
//     }
//   }, []);

//   const fetchCategorias = useCallback(async () => {
//     try {
//       // Asegúrate que ROUTES.CATEGORY sea el endpoint correcto para listar categorías
//       const response = await api.get(ROUTES.CATEGORY);
//       setCategorias(response.data.categorias || response.data); // Ajusta según la respuesta de tu API
//     } catch (err) {
//       console.error("Error al obtener categorías:", err);
//       // No establecer error aquí para no sobrescribir el de productos si ambos fallan
//     }
//   }, []);

//   useEffect(() => {
//     fetchProductos();
//     fetchCategorias();
//   }, [fetchProductos, fetchCategorias]);

//   const limpiarFormularioCreacion = () => {
//     setNuevoProducto({ nombre: "", precio: 0, categoria_id: 0 });
//   };

//   const handleCrearProducto = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setMensaje(null);
//     setError(null);

//     const productoExistente = productos.some(
//       (producto) =>
//         producto.nombre.toLowerCase() ===
//         nuevoProducto.nombre.trim().toLowerCase()
//     );

//     if (productoExistente) {
//       setError(NAMES.ALERTA_PRODUCTO_DUPLICADO); // Usar setError
//       return;
//     }

//     if (
//       !nuevoProducto.nombre.trim() ||
//       nuevoProducto.precio <= 0 ||
//       !nuevoProducto.categoria_id // categoria_id puede ser 0 si es un valor válido, ajusta si es necesario
//     ) {
//       setError(NAMES.ALERTA_CAMPOS_VACIOS); // Usar setError
//       return;
//     }

//     try {
//       // Asegúrate que ROUTES.PRODUCT es el endpoint para CREAR productos
//       await api.post(ROUTES.PRODUCT, {
//         ...nuevoProducto,
//         precio: Number(nuevoProducto.precio), // Asegurar que el precio es número
//         categoria_id: Number(nuevoProducto.categoria_id), // Asegurar que categoria_id es número
//       });
//       setMensaje(NAMES.ALERTA_PRODUCTO_GUARDAR); // Mensaje más específico
//       limpiarFormularioCreacion();
//       fetchProductos(); // Recargar productos
//     } catch (err: any) {
//       setError(err.response?.data?.message || NAMES.ALERTA_PRODUCTO_GUARDAR);
//       console.error(NAMES.ALERTA_PRODUCTO_GUARDAR, err);
//     }
//   };

//   // Esta función ahora solo establece el ID del producto a editar
//   const handleSetEditandoProductoId = (id: number | null) => {
//     setEditandoProductoId(id);
//     setMensaje(null); // Limpiar mensajes al iniciar edición
//     setError(null);
//   };

//   // Se llama cuando el producto se edita exitosamente desde EditarProducto (via ProductoList)
//   const handleProductoEditado = () => {
//     setEditandoProductoId(null); // Salir del modo edición
//     setMensaje(NAMES.PRODUCTO_ACTUALIZADO);
//     fetchProductos(); // Recargar la lista de productos
//   };

//   // Se llama para cancelar la edición desde EditarProducto (via ProductoList)
//   const handleCancelarEdicion = () => {
//     setEditandoProductoId(null);
//   };

//   const handleDeleteProducto = async (id: number) => {
//     // Hacerla async para la llamada a la API
//     if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
//       try {
//         // Asegúrate que ROUTES.PRODUCT}/${id} es el endpoint para ELIMINAR productos
//         await api.delete(`${ROUTES.PRODUCT}/${id}`);
//         setMensaje(NAMES.PRODUCTO_ELIMINAR_EXISTOSA);
//         fetchProductos(); // Recargar productos
//       } catch (err: any) {
//         setError(
//           err.response?.data?.message || "Error al eliminar el producto."
//         );
//         console.error("Error al eliminar producto:", err);
//       }
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Gestionar Productos</h1>

//       {/* Mostrar mensajes de éxito o error */}
//       {mensaje && (
//         <p className={`${styles.message} ${styles.success}`}>{mensaje}</p>
//       )}
//       {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}

//       {/* Formulario de creación siempre visible */}
//       <form onSubmit={handleCrearProducto} className={styles.form}>
//         <label>
//           Nombre:
//           <input
//             type="text"
//             value={nuevoProducto.nombre}
//             onChange={(e) =>
//               setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
//             }
//             placeholder={NAMES.PLACEHOLDER_PRODUCTO}
//             className={styles.input}
//             required
//           />
//         </label>
//         <label>
//           Precio:
//           <input
//             type="number"
//             value={nuevoProducto.precio} // El valor puede ser string aquí por el input, se convierte en el submit
//             onChange={(e) =>
//               setNuevoProducto({
//                 ...nuevoProducto,
//                 precio: parseFloat(e.target.value) || 0, // Permitir decimales y manejar NaN
//               })
//             }
//             placeholder={NAMES.PLACEHOLDER_PRECIO}
//             className={styles.input}
//             step="0.01" // Permitir decimales
//             required
//           />
//         </label>
//         <label>
//           Categoría:
//           <select
//             value={nuevoProducto.categoria_id || ""}
//             onChange={(e) =>
//               setNuevoProducto({
//                 ...nuevoProducto,
//                 categoria_id: Number(e.target.value),
//               })
//             }
//             className={styles.select} // Asumo que tienes un estilo .select
//             required
//           >
//             <option value="" disabled>
//               Selecciona una categoría
//             </option>
//             {categorias.map((categoria) => (
//               <option key={categoria.id} value={categoria.id}>
//                 {categoria.nombre}
//               </option>
//             ))}
//           </select>
//         </label>
//         <Button
//           text="Añadir Producto"
//           type="submit"
//           className={styles.button} // Asumo que tienes un estilo .button
//         />
//       </form>

//       <h2 className={styles.title}>Lista de Productos</h2>
//       {/* ProductoList siempre visible, maneja la lógica de edición inline */}
//       <ProductoList
//         productos={productos}
//         categorias={categorias}
//         editandoProductoId={editandoProductoId} // Pasar el ID del producto en edición
//         onSetEditandoProductoId={handleSetEditandoProductoId} // Para que ProductoList pueda iniciar la edición
//         onDeleteProducto={handleDeleteProducto}
//         onProductoEditado={handleProductoEditado} // Callback para cuando se guarda la edición
//         onCancelarEdicion={handleCancelarEdicion} // Callback para cancelar la edición
//       />

//       <Button
//         text="Volver"
//         onClick={() => navigate(ROUTES.DASHBOARD)}
//         className={styles.button} // Reutilizar estilo de botón o crear uno específico
//         // Añadir un poco de margen si es necesario
//       />
//     </div>
//   );
// }

// export default CrearProducto;
import React, { useState, useEffect, useCallback } from "react";
import api from "../../api/axio";
import { ROUTES } from "../../utils/Constants/routes";
import Button from "../Button/Button";
import ProductoList from "./ProductoList";
import styles from "./Producto.module.css";
import { useNavigate } from "react-router-dom";
import { ProductoProps } from "../../utils/Producto/ProductoProps";
import { Categoria } from "../../utils/Categoria/CategoriaProps";
import { NAMES } from "../../utils/Constants/text";

function CrearProducto() {
  const [productos, setProductos] = useState<ProductoProps[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [nuevoProducto, setNuevoProducto] = useState<Omit<ProductoProps, "id">>(
    {
      nombre: "",
      precio: 0,
      categoria_id: 0,
    }
  );
  const [editandoProductoId, setEditandoProductoId] = useState<number | null>(
    null
  );
  const navigate = useNavigate();

  const fetchProductos = useCallback(async () => {
    try {
      const response = await api.get(ROUTES.PRODUCT);
      setProductos(response.data.productos || response.data);
    } catch (err) {
      console.error("Error al obtener productos:", err);
      setError("No se pudieron cargar los productos.");
    }
  }, []);

  const fetchCategorias = useCallback(async () => {
    try {
      const response = await api.get(ROUTES.CATEGORY);
      setCategorias(response.data.categorias || response.data);
    } catch (err) {
      console.error("Error al obtener categorías:", err);
    }
  }, []);

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
  }, [fetchProductos, fetchCategorias]);

  const limpiarFormularioCreacion = () => {
    setNuevoProducto({ nombre: "", precio: 0, categoria_id: 0 });
  };

  const handleCrearProducto = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);

    const productoExistente = productos.some(
      (producto) =>
        producto.nombre.toLowerCase() ===
        nuevoProducto.nombre.trim().toLowerCase()
    );

    if (productoExistente) {
      setError(NAMES.ALERTA_PRODUCTO_DUPLICADO);
      return;
    }
    if (
      !nuevoProducto.nombre.trim() ||
      nuevoProducto.precio <= 0 ||
      !nuevoProducto.categoria_id
    ) {
      setError(NAMES.ALERTA_CAMPOS_VACIOS);
      return;
    }

    try {
      await api.post(ROUTES.PRODUCT, {
        ...nuevoProducto,
        precio: Number(nuevoProducto.precio),
        categoria_id: Number(nuevoProducto.categoria_id),
      });
      setMensaje(NAMES.ALERTA_PRODUCTO_GUARDAR);
      limpiarFormularioCreacion();
      fetchProductos();
    } catch (err: any) {
      setError(err.response?.data?.message || NAMES.ALERTA_PRODUCTO_GUARDAR);
      console.error(NAMES.ALERTA_PRODUCTO_GUARDAR, err);
    }
  };

  const handleSetEditandoProductoId = (id: number | null) => {
    setEditandoProductoId(id);
    setMensaje(null);
    setError(null);
  };

  const handleProductoEditado = () => {
    setEditandoProductoId(null);
    setMensaje(NAMES.PRODUCTO_ACTUALIZADO);
    fetchProductos();
  };

  const handleCancelarEdicion = () => {
    setEditandoProductoId(null);
  };

  // Esta función es llamada por EliminarProducto.tsx a través de ProductoList.tsx
  // El primer argumento es el id del producto, el segundo es un mensaje de error (null si fue exitoso)
  const handleProductoEliminadoCallback = (
    id: number,
    errorMessage: string | null
  ) => {
    if (errorMessage) {
      setError(errorMessage);
      setMensaje(null);
    } else {
      setMensaje(NAMES.PRODUCTO_ELIMINAR_EXISTOSA);
      setError(null);
      // Actualizar la lista de productos localmente
      setProductos((prevProductos) =>
        prevProductos.filter((producto) => producto.id !== id)
      );
      // fetchProductos(); // Puedes comentar o eliminar esta línea si la actualización local es suficiente
      // o mantenerla si quieres una re-sincronización con el backend.
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gestionar Productos</h1>

      {mensaje && (
        <p className={`${styles.message} ${styles.success}`}>{mensaje}</p>
      )}
      {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}

      <form onSubmit={handleCrearProducto} className={styles.form}>
        <label>
          Nombre:
          <input
            type="text"
            value={nuevoProducto.nombre}
            onChange={(e) =>
              setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
            }
            placeholder={NAMES.PLACEHOLDER_PRODUCTO}
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
                precio: parseFloat(e.target.value) || 0,
              })
            }
            placeholder={NAMES.PLACEHOLDER_PRECIO}
            className={styles.input}
            step="0.01"
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
        editandoProductoId={editandoProductoId}
        onSetEditandoProductoId={handleSetEditandoProductoId}
        // Pasar la nueva función callback a ProductoList
        onDeleteProducto={handleProductoEliminadoCallback}
        onProductoEditado={handleProductoEditado}
        onCancelarEdicion={handleCancelarEdicion}
      />

      <Button
        text="Volver"
        onClick={() => navigate(ROUTES.DASHBOARD)}
        className={styles.button}
      />
    </div>
  );
}

export default CrearProducto;
