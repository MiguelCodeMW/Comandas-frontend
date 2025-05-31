// import React, { useState, useEffect } from "react";
// import Button from "../Button/Button";
// import styles from "./Producto.module.css";
// import { NAMES } from "../../utils/Constants/text";
// import { ProductoProps } from "../../utils/Producto/ProductoProps";
// // import { CategoriaProps } from "../../utils/Categoria/CategoriaProps";
// import { NuevoProductoData } from "../../hooks/useGestionProductos";
// import { useDashboard } from "../../hooks/useDashboard"; // Importa useDashboard
// import { FormularioProductoProps } from "../../utils/Producto/FormularioProductoProps";

// function FormularioProducto({
//   onSubmit = async () => true,
//   onCancel,
//   productoInicial,
//   categoriasDisponibles = [],
//   textoBotonSubmit = NAMES.GUARDAR,
//   limpiarMensajesAlCambiar,
// }: FormularioProductoProps = {}) {
//   const [formData, setFormData] = useState<NuevoProductoData | ProductoProps>(
//     productoInicial || { nombre: "", precio: 0, categoria_id: 0 }
//   );

//   const { moneda } = useDashboard(); // Obtén la moneda del hook

//   useEffect(() => {
//     if (productoInicial) {
//       setFormData(productoInicial);
//     } else {
//       setFormData({ nombre: "", precio: 0, categoria_id: 0 });
//     }
//   }, [productoInicial]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         name === "precio" || name === "categoria_id" ? Number(value) : value,
//     }));
//     if (limpiarMensajesAlCambiar) {
//       limpiarMensajesAlCambiar();
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const success = await onSubmit(formData);
//     if (success && !productoInicial) {
//       setFormData({ nombre: "", precio: 0, categoria_id: 0 });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className={styles.formContainer}>
//       <label>
//         {NAMES.LABEL_NOMBRE}
//         <input
//           type="text"
//           name="nombre"
//           value={formData.nombre}
//           onChange={handleChange}
//           placeholder={NAMES.PLACEHOLDER_PRODUCTO}
//           className={styles.input}
//           required
//         />
//       </label>
//       <label>
//         {NAMES.PRODUCTO_PRECIO}{" "}
//         <span className={styles.currencySymbol}>{moneda}</span>{" "}
//         {/* Muestra la moneda o un '$' por defecto
//         {moneda || "$"}</span>{" "}*/}
//         <input
//           type="number"
//           name="precio"
//           value={formData.precio}
//           onChange={handleChange}
//           placeholder={NAMES.PLACEHOLDER_PRECIO}
//           className={styles.input}
//           step="0.01"
//           min="0"
//           required
//         />
//       </label>
//       <label>
//         {NAMES.LABEL_CATEGORIA}
//         <select
//           name="categoria_id"
//           value={formData.categoria_id || ""}
//           onChange={handleChange}
//           className={styles.select}
//           required
//         >
//           <option value="" disabled>
//             {NAMES.PRODUCTO_SELECCIONAR_CATEGORIA}
//           </option>
//           {categoriasDisponibles.map((categoria) => (
//             <option key={categoria.id} value={categoria.id}>
//               {categoria.nombre}
//             </option>
//           ))}
//         </select>
//       </label>
//       <div className={styles.buttonGroup}>
//         <Button
//           text={textoBotonSubmit}
//           type="submit"
//           className={`${styles.button} ${styles.saveButton}`}
//         />
//         {onCancel && (
//           <Button
//             text={NAMES.CANCELAR}
//             onClick={onCancel}
//             type="button"
//             className={`${styles.button} ${styles.cancelButton}`}
//           />
//         )}
//       </div>
//     </form>
//   );
// }

// export default FormularioProducto;
// src/components/FormularioProducto/FormularioProducto.tsx

import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import styles from "./Producto.module.css";
import { NAMES } from "../../utils/Constants/text";
// CAMBIO 1: Importar ProductoProps desde utils/types/ComandaTypes.ts
import {
  ProductoProps,
  NuevoProductoData,
} from "../../utils/types/ComandaTypes"; // ¡CAMBIO AQUI!
// CAMBIO 2: Importar CategoriaProps desde utils/types/CategoriaTypes.ts
import { CategoriaProps } from "../../utils/types/CategoriaTypes"; // ¡NUEVA IMPORTACION AQUI! (Si no la tienes ya)

// CAMBIO 3: Eliminar la importación incorrecta de NuevoProductoData desde el hook
// import { NuevoProductoData } from "../../hooks/useGestionProductos"; // ¡ELIMINAR ESTA LINEA!

import { useDashboard } from "../../hooks/useDashboard"; // Importa useDashboard
// CAMBIO 4: Asegúrate de que FormularioProductoProps también se importe desde un lugar centralizado, probablemente ComandaTypes.ts o ProductoTypes.ts si tienes uno específico para productos.
// Asumo que la definición de FormularioProductoProps ahora está en ComandaTypes.ts (o similar)
import { FormularioProductoProps } from "../../utils/types/ComandaTypes"; // ¡CAMBIO AQUI! (O desde tu archivo de tipos de producto si existe)

function FormularioProducto({
  onSubmit = async () => true,
  onCancel,
  productoInicial,
  categoriasDisponibles = [], // Asegúrate de que CategoriaProps esté bien importado
  textoBotonSubmit = NAMES.GUARDAR,
  limpiarMensajesAlCambiar,
}: FormularioProductoProps = {}) {
  const [formData, setFormData] = useState<NuevoProductoData | ProductoProps>(
    productoInicial || { nombre: "", precio: 0, categoria_id: 0 }
  );

  const { moneda } = useDashboard(); // Obtén la moneda del hook

  useEffect(() => {
    if (productoInicial) {
      setFormData(productoInicial);
    } else {
      setFormData({ nombre: "", precio: 0, categoria_id: 0 });
    }
  }, [productoInicial]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "precio" || name === "categoria_id" ? Number(value) : value,
    }));
    if (limpiarMensajesAlCambiar) {
      limpiarMensajesAlCambiar();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await onSubmit(formData);
    if (success && !productoInicial) {
      setFormData({ nombre: "", precio: 0, categoria_id: 0 });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <label>
        {NAMES.LABEL_NOMBRE}
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder={NAMES.PLACEHOLDER_PRODUCTO}
          className={styles.input}
          required
        />
      </label>
      <label>
        {NAMES.PRODUCTO_PRECIO}{" "}
        <span className={styles.currencySymbol}>{moneda || "$"}</span>{" "}
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          placeholder={NAMES.PLACEHOLDER_PRECIO}
          className={styles.input}
          step="0.01"
          min="0"
          required
        />
      </label>
      <label>
        {NAMES.LABEL_CATEGORIA}
        <select
          name="categoria_id"
          value={formData.categoria_id || ""}
          onChange={handleChange}
          className={styles.select}
          required
        >
          <option value="" disabled>
            {NAMES.PRODUCTO_SELECCIONAR_CATEGORIA}
          </option>
          {categoriasDisponibles.map(
            (
              categoria: CategoriaProps // Asegúrate de tipar 'categoria'
            ) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            )
          )}
        </select>
      </label>
      <div className={styles.buttonGroup}>
        <Button
          text={textoBotonSubmit}
          type="submit"
          className={`${styles.button} ${styles.saveButton}`}
        />
        {onCancel && (
          <Button
            text={NAMES.CANCELAR}
            onClick={onCancel}
            type="button"
            className={`${styles.button} ${styles.cancelButton}`}
          />
        )}
      </div>
    </form>
  );
}

export default FormularioProducto;
