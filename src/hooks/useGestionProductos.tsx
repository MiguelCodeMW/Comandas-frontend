// import { useState, useEffect, useCallback } from "react";
// import api from "../api/axio";
// import { ProductoProps } from "../utils/Producto/ProductoProps";
// import { Categoria } from "../utils/Categoria/CategoriaProps";
// import { ROUTES } from "../utils/Constants/routes";
// import { NAMES } from "../utils/Constants/text";

// export type NuevoProductoData = Omit<ProductoProps, "id">;

// export function useGestionProductos() {
//   const [productos, setProductos] = useState<ProductoProps[]>([]);
//   const [categorias, setCategorias] = useState<Categoria[]>([]);
//   const [mensaje, setMensaje] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [nuevoProducto, setNuevoProducto] = useState<NuevoProductoData>({
//     nombre: "",
//     precio: 0,
//     categoria_id: 0,
//   });
//   const [editandoProductoId, setEditandoProductoId] = useState<number | null>(
//     null
//   );
//   const [productoEnEdicion, setProductoEnEdicion] =
//     useState<ProductoProps | null>(null);

//   const limpiarMensajes = () => {
//     setMensaje(null);
//     setError(null);
//   };

//   const fetchProductos = useCallback(async () => {
//     limpiarMensajes();
//     try {
//       const response = await api.get(ROUTES.PRODUCT);
//       setProductos(response.data.productos || response.data);
//     } catch (err) {
//       console.error("Error al obtener productos:", err);
//       setError("No se pudieron cargar los productos.");
//     }
//   }, []);

//   const fetchCategorias = useCallback(async () => {
//     try {
//       const response = await api.get(ROUTES.CATEGORY);
//       setCategorias(response.data.categorias || response.data);
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

//   const handleCrearProducto = async (productoData: NuevoProductoData) => {
//     limpiarMensajes();
//     const productoExistente = productos.some(
//       (p) => p.nombre.toLowerCase() === productoData.nombre.trim().toLowerCase()
//     );
//     if (productoExistente) {
//       setError(NAMES.ALERTA_PRODUCTO_DUPLICADO);
//       return false;
//     }
//     if (
//       !productoData.nombre.trim() ||
//       productoData.precio <= 0 ||
//       !productoData.categoria_id
//     ) {
//       setError(NAMES.ALERTA_PRODUCTO_CAMPOS_REQUERIDOS);
//       return false;
//     }
//     try {
//       const response = await api.post(ROUTES.PRODUCT, productoData);
//       setProductos((prev) => [
//         ...prev,
//         response.data.producto || response.data,
//       ]);
//       setMensaje(NAMES.PRODUCTO_EXITOSO);
//       limpiarFormularioCreacion();
//       return true;
//     } catch (err: any) {
//       setError(err.response?.data?.message || NAMES.ALERTA_PRODUCTO_GUARDAR);
//       console.error(NAMES.ALERTA_PRODUCTO_GUARDAR, err);
//       return false;
//     }
//   };

//   const iniciarEdicionProducto = (id: number) => {
//     limpiarMensajes();
//     const producto = productos.find((p) => p.id === id);
//     if (producto) {
//       setEditandoProductoId(id);
//       setProductoEnEdicion(producto);
//     }
//   };

//   const cancelarEdicionProducto = () => {
//     setEditandoProductoId(null);
//     setProductoEnEdicion(null);
//     limpiarMensajes();
//   };

//   const handleEditarProducto = async (
//     id: number,
//     productoData: ProductoProps
//   ) => {
//     limpiarMensajes();
//     if (
//       !productoData.nombre.trim() ||
//       productoData.precio <= 0 ||
//       !productoData.categoria_id
//     ) {
//       setError(NAMES.ALERTA_PRODUCTO_CAMPOS_REQUERIDOS);
//       return false;
//     }
//     // Opcional: verificar duplicados si el nombre cambió
//     const otroProductoExistente = productos.some(
//       (p) =>
//         p.id !== id &&
//         p.nombre.toLowerCase() === productoData.nombre.trim().toLowerCase()
//     );
//     if (otroProductoExistente) {
//       setError(NAMES.ALERTA_PRODUCTO_DUPLICADO);
//       return false;
//     }
//     try {
//       await api.put(
//         ROUTES.PRODUCT_DETAIL.replace(":id", id.toString()),
//         productoData
//       );
//       setProductos((prev) => prev.map((p) => (p.id === id ? productoData : p)));
//       setMensaje(NAMES.PRODUCTO_ACTUALIZADO);
//       cancelarEdicionProducto();
//       return true;
//     } catch (err: any) {
//       setError(
//         err.response?.data?.message || "Error al actualizar el producto."
//       );
//       console.error("Error al actualizar producto:", err);
//       return false;
//     }
//   };

//   const handleProductoEliminadoCallback = (
//     id: number,
//     errorMessage: string | null
//   ) => {
//     limpiarMensajes();
//     if (errorMessage) {
//       setError(errorMessage);
//     } else {
//       setProductos((prev) => prev.filter((p) => p.id !== id));
//       setMensaje(NAMES.PRODUCTO_ELIMINAR_EXITOSA);
//     }
//   };

//   return {
//     productos,
//     categorias,
//     mensaje,
//     error,
//     nuevoProducto,
//     setNuevoProducto, // Exponer para el formulario de creación
//     editandoProductoId,
//     productoEnEdicion,
//     fetchProductos, // Podría no ser necesario exponer si la lista se actualiza bien
//     fetchCategorias, // Podría no ser necesario exponer
//     handleCrearProducto,
//     iniciarEdicionProducto,
//     cancelarEdicionProducto,
//     handleEditarProducto,
//     handleProductoEliminadoCallback,
//     limpiarMensajes,
//   };
// }
import { useState, useEffect, useCallback } from "react";
import api from "../api/axio";
import { ProductoProps } from "../utils/Producto/ProductoProps";
import { CategoriaProps } from "../utils/Categoria/CategoriaProps";
import { ROUTES } from "../utils/Constants/routes";
import { NAMES } from "../utils/Constants/text";

export type NuevoProductoData = Omit<ProductoProps, "id">;

export function useGestionProductos() {
  const [productos, setProductos] = useState<ProductoProps[]>([]);
  const [categorias, setCategorias] = useState<CategoriaProps[]>([]);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [nuevoProducto, setNuevoProducto] = useState<NuevoProductoData>({
    nombre: "",
    precio: 0,
    categoria_id: 0,
  });
  const [editandoProductoId, setEditandoProductoId] = useState<number | null>(
    null
  );
  const [productoEnEdicion, setProductoEnEdicion] =
    useState<ProductoProps | null>(null);

  const limpiarMensajes = () => {
    setMensaje(null);
    setError(null);
  };

  const fetchProductos = useCallback(async () => {
    limpiarMensajes();
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
      // No establecer error aquí para no sobrescribir el de productos si ambos fallan
    }
  }, []);

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
  }, [fetchProductos, fetchCategorias]);

  const limpiarFormularioCreacion = () => {
    setNuevoProducto({ nombre: "", precio: 0, categoria_id: 0 });
  };

  const handleCrearProducto = async (productoData: NuevoProductoData) => {
    limpiarMensajes();
    const productoExistente = productos.some(
      (p) => p.nombre.toLowerCase() === productoData.nombre.trim().toLowerCase()
    );
    if (productoExistente) {
      setError(NAMES.ALERTA_PRODUCTO_DUPLICADO);
      return false;
    }
    if (
      !productoData.nombre.trim() ||
      productoData.precio <= 0 ||
      !productoData.categoria_id
    ) {
      setError(NAMES.ALERTA_PRODUCTO_CAMPOS_REQUERIDOS);
      return false;
    }
    try {
      const response = await api.post(ROUTES.PRODUCT, productoData);
      setProductos((prev) => [
        ...prev,
        response.data.producto || response.data,
      ]);
      setMensaje(NAMES.PRODUCTO_EXITOSO);
      limpiarFormularioCreacion();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || NAMES.ALERTA_PRODUCTO_GUARDAR);
      console.error(NAMES.ALERTA_PRODUCTO_GUARDAR, err);
      return false;
    }
  };

  const iniciarEdicionProducto = (id: number) => {
    limpiarMensajes();
    const producto = productos.find((p) => p.id === id);
    if (producto) {
      setEditandoProductoId(id);
      setProductoEnEdicion(producto);
    }
  };

  const cancelarEdicionProducto = () => {
    setEditandoProductoId(null);
    setProductoEnEdicion(null);
    limpiarMensajes();
  };

  const handleEditarProducto = async (
    id: number,
    productoData: ProductoProps
  ) => {
    limpiarMensajes();
    if (
      !productoData.nombre.trim() ||
      productoData.precio <= 0 ||
      !productoData.categoria_id
    ) {
      setError(NAMES.ALERTA_PRODUCTO_CAMPOS_REQUERIDOS);
      return false;
    }
    // Opcional: verificar duplicados si el nombre cambió
    const otroProductoExistente = productos.some(
      (p) =>
        p.id !== id &&
        p.nombre.toLowerCase() === productoData.nombre.trim().toLowerCase()
    );
    if (otroProductoExistente) {
      setError(NAMES.ALERTA_PRODUCTO_DUPLICADO);
      return false;
    }
    try {
      await api.put(
        ROUTES.PRODUCT_DETAIL.replace(":id", id.toString()),
        productoData
      );
      setProductos((prev) => prev.map((p) => (p.id === id ? productoData : p)));
      setMensaje(NAMES.PRODUCTO_ACTUALIZADO);
      cancelarEdicionProducto();
      return true;
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Error al actualizar el producto."
      );
      console.error("Error al actualizar producto:", err);
      return false;
    }
  };

  const handleProductoEliminadoCallback = (
    id: number,
    errorMessage: string | null
  ) => {
    limpiarMensajes();
    if (errorMessage) {
      setError(errorMessage);
    } else {
      setProductos((prev) => prev.filter((p) => p.id !== id));
      setMensaje(NAMES.PRODUCTO_ELIMINAR_EXITOSA);
    }
  };

  return {
    productos,
    categorias,
    mensaje,
    error,
    nuevoProducto,
    setNuevoProducto, // Exponer para el formulario de creación
    editandoProductoId,
    productoEnEdicion,
    fetchProductos, // Podría no ser necesario exponer si la lista se actualiza bien
    fetchCategorias, // Podría no ser necesario exponer
    handleCrearProducto,
    iniciarEdicionProducto,
    cancelarEdicionProducto,
    handleEditarProducto,
    handleProductoEliminadoCallback,
    limpiarMensajes,
  };
}
