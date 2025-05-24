// import React, { useState, useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import api from "../../../api/axio";
// import Button from "../../Button/Button";
// import ProductoSelectorList from "../../Producto/ProductoSelectorList";
// import styles from "./Comandas.module.css";
// import { ProductoProps } from "../../../utils/Producto/ProductoProps";
// import { Categoria } from "../../../utils/Categoria/CategoriaProps";
// import { NAMES } from "../../../utils/Constants/text";
// import { ROUTES } from "../../../utils/Constants/routes";

// function CrearComanda() {
//   const [categorias, setCategorias] = useState<Categoria[]>([]);
//   const [productos, setProductos] = useState<ProductoProps[]>([]);
//   const [productosSeleccionados, setProductosSeleccionados] = useState<
//     { id: number; nombre: string; precio: number; cantidad: number }[]
//   >([]);
//   const [userId, setUserId] = useState<number | null>(null);
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const id = searchParams.get("id"); // Si viene un id, es para editar

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userResponse = await api.get(ROUTES.USER);
//         setUserId(userResponse.data.id);

//         const categoriasResponse = await api.get(ROUTES.CATEGORY);
//         setCategorias(categoriasResponse.data);

//         const productosResponse = await api.get(ROUTES.PRODUCT);
//         setProductos(productosResponse.data);

//         if (id) {
//           // Precarga la comanda para edición
//           const comandaResponse = await api.get(
//             ROUTES.COMANDA_DETAIL.replace(":id", id.toString())
//           );
//           const comanda = comandaResponse.data.comanda;
//           setProductosSeleccionados(
//             comanda.detalles.map((detalle: any) => ({
//               id: detalle.producto.id,
//               nombre: detalle.producto.nombre,
//               precio: detalle.producto.precio,
//               cantidad: detalle.cantidad,
//             }))
//           );
//         }
//       } catch (error) {
//         console.error(NAMES.ERROR_CARGA, error);
//       }
//     };

//     fetchData();
//   }, [id]);

//   const handleSeleccionarProducto = (producto: ProductoProps) => {
//     setProductosSeleccionados((prev) => {
//       const productoExistente = prev.find((p) => p.id === producto.id);
//       if (productoExistente) {
//         return prev.map((p) =>
//           p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
//         );
//       } else {
//         return [
//           ...prev,
//           {
//             id: producto.id,
//             nombre: producto.nombre,
//             precio: producto.precio,
//             cantidad: 1,
//           },
//         ];
//       }
//     });
//   };

//   const handleAumentarCantidad = (id: number) => {
//     setProductosSeleccionados((prev) =>
//       prev.map((p) => (p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p))
//     );
//   };

//   const handleDisminuirCantidad = (id: number) => {
//     setProductosSeleccionados((prev) =>
//       prev
//         .map((p) => (p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p))
//         .filter((p) => p.cantidad > 0)
//     );
//   };

//   const handleFinalizarComanda = async () => {
//     if (!userId) {
//       alert(NAMES.ERROR_ID);
//       return;
//     }

//     try {
//       const payload = {
//         user_id: userId,
//         estado: "abierta",
//         productos: productosSeleccionados.map((p) => ({
//           producto_id: p.id,
//           cantidad: p.cantidad,
//         })),
//       };

//       if (id) {
//         // Actualizar comanda existente
//         await api.put(
//           ROUTES.COMANDA_DETAIL.replace(":id", id.toString()),
//           payload
//         );
//         alert(NAMES.COMANDA_EXITOSA);
//       } else {
//         // Crear nueva comanda
//         await api.post(ROUTES.COMANDA, {
//           ...payload,
//           fecha: new Date().toISOString(),
//         });
//         alert(NAMES.COMANDA_EXITOSA);
//       }
//       setProductosSeleccionados([]);
//       navigate(ROUTES.DASHBOARD);
//     } catch (error) {
//       console.error(NAMES.ALERTA_COMANDA_GUARDAR, error);
//       alert(NAMES.ALERTA_COMANDA_GUARDAR);
//     }
//   };

//   return (
//     <div className={styles.comandaContainer}>
//       <h1 className={styles.titulo}>
//         {id ? NAMES.ID_COMANDA_EDITAR : NAMES.ID_COMANDA_CREAR}
//       </h1>

//       <div>
//         {categorias.map((categoria) => (
//           <div key={categoria.id} className={styles.categoria}>
//             <h2 className={styles.categoriaTitulo}>{categoria.nombre}</h2>
//             <div className={styles.categoriaProductos}>
//               <ProductoSelectorList
//                 productos={productos.filter(
//                   (p) => p.categoria_id === categoria.id
//                 )}
//                 onProductoClick={handleSeleccionarProducto}
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className={styles.seleccionadosContainer}>
//         <h2>Productos Seleccionados</h2>
//         <ul className={styles.seleccionadosLista}>
//           {productosSeleccionados.map((producto, index) => (
//             <li key={index} className={styles.seleccionadoItem}>
//               <span className={styles.seleccionadoInfo}>
//                 {producto.nombre} - Cantidad: {producto.cantidad} - Precio
//                 Total: ${(producto.precio * producto.cantidad).toFixed(2)}
//               </span>
//               <div className={styles.seleccionadoControles}>
//                 <button
//                   className={styles.controlBtn}
//                   onClick={() => handleAumentarCantidad(producto.id)}
//                 >
//                   +
//                 </button>
//                 <button
//                   className={styles.controlBtn}
//                   onClick={() => handleDisminuirCantidad(producto.id)}
//                 >
//                   −
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className={styles.finalizar}>
//         <Button
//           text={id ? NAMES.ID_COMANDA_ACTUALIZAR : NAMES.ID_COMANDA_FINALIZAR}
//           onClick={handleFinalizarComanda}
//           className={styles.botonFinalizar}
//         />
//         <Button
//           text="Volver"
//           onClick={() => navigate(ROUTES.DASHBOARD)}
//           className={styles.dashboardButton}
//         />
//       </div>
//     </div>
//   );
// }

// export default CrearComanda;
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Button/Button";
import ProductoSelectorList from "../../Producto/ProductoSelectorList"; // Este ya existe
import ProductosSeleccionadosList from "./ProductosSeleccionadosList"; // Nuevo
import styles from "./Comandas.module.css";
import { NAMES } from "../../../utils/Constants/text";
import { ROUTES } from "../../../utils/Constants/routes";
import { useCrearComanda } from "../../../hooks/useCrearComanda";

function CrearComanda() {
  const {
    categorias,
    productos,
    productosSeleccionados,
    comandaIdParaEditar,
    mensaje,
    error,
    loading,
    handleSeleccionarProducto,
    handleAumentarCantidad,
    handleDisminuirCantidad,
    handleFinalizarComanda,
    // limpiarMensajes // Podrías usarlo si tienes inputs directos aquí
  } = useCrearComanda();
  const navigate = useNavigate();

  if (loading) {
    return <div className={styles.message}>{NAMES.CARGANDO_DATOS_COMANDA}</div>;
  }

  return (
    <div className={styles.comandaContainer}>
      <h1 className={styles.titulo}>
        {comandaIdParaEditar ? NAMES.ID_COMANDA_EDITAR : NAMES.ID_COMANDA_CREAR}
        {comandaIdParaEditar ? ` #${comandaIdParaEditar}` : ""}
      </h1>

      {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
      {mensaje && (
        <p className={`${styles.message} ${styles.success}`}>{mensaje}</p>
      )}

      {!loading && !error && (
        <>
          <div className={styles.selectorProductosContainer}>
            {" "}
            {/* Contenedor para la selección */}
            {categorias.map((categoria) => (
              <div key={categoria.id} className={styles.categoriaSection}>
                {" "}
                {/* Usar categoriaSection */}
                <h2 className={styles.categoriaTitulo}>{categoria.nombre}</h2>
                <ProductoSelectorList
                  productos={productos.filter(
                    (p) => p.categoria_id === categoria.id
                  )}
                  onProductoClick={handleSeleccionarProducto}
                />
              </div>
            ))}
          </div>

          <div className={styles.seleccionadosContainer}>
            <h3>Productos Seleccionados</h3>
            <ProductosSeleccionadosList
              productos={productosSeleccionados}
              onAumentar={handleAumentarCantidad}
              onDisminuir={handleDisminuirCantidad}
            />
          </div>
        </>
      )}

      <div className={styles.finalizar}>
        {" "}
        {/* Cambiado de finalizarWrapper a finalizar */}
        <Button
          text={
            comandaIdParaEditar
              ? NAMES.ID_COMANDA_ACTUALIZAR
              : NAMES.ID_COMANDA_FINALIZAR
          }
          onClick={handleFinalizarComanda}
          className={styles.botonFinalizar}
          disabled={loading || productosSeleccionados.length === 0} // Deshabilitar si está cargando o no hay productos
        />
        <Button
          text="Volver"
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className={styles.dashboardButton} // Asegúrate que esta clase exista
        />
      </div>
    </div>
  );
}

export default CrearComanda;
