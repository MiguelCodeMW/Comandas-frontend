import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import styles from "./Producto.module.css";
import { NAMES } from "../../utils/Constants/text";
import { ProductoProps } from "../../utils/Producto/ProductoProps";
import { Categoria } from "../../utils/Categoria/CategoriaProps";
import { NuevoProductoData } from "../../hooks/useGestionProductos";

interface FormularioProductoProps {
  onSubmit?: (data: NuevoProductoData | ProductoProps) => Promise<boolean>;
  onCancel?: () => void;
  productoInicial?: ProductoProps | null;
  categoriasDisponibles?: Categoria[];
  textoBotonSubmit?: string;
  limpiarMensajesAlCambiar?: () => void;
}

function FormularioProducto({
  onSubmit = async () => true,
  onCancel,
  productoInicial,
  categoriasDisponibles = [],
  textoBotonSubmit = "Guardar",
  limpiarMensajesAlCambiar,
}: FormularioProductoProps = {}) {
  const [formData, setFormData] = useState<NuevoProductoData | ProductoProps>(
    productoInicial || { nombre: "", precio: 0, categoria_id: 0 }
  );

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
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>
        Nombre:
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
        Precio:
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
        Categoría:
        <select
          name="categoria_id"
          value={formData.categoria_id || ""}
          onChange={handleChange}
          className={styles.select}
          required
        >
          <option value="" disabled>
            Selecciona una categoría
          </option>
          {categoriasDisponibles.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </label>
      <div className={styles.buttonGroup}>
        <Button
          text={textoBotonSubmit}
          type="submit"
          className={styles.button}
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
