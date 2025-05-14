import { useState } from "react";
import api from "../../../api/axio";
import { ROUTES } from "../../../utils/Constants/routes";
import styles from "../Producto.module.css";
import { Producto } from "../../../utils/Producto";
import { EditarProductoProps } from "../../../utils/EditarProductoProps";
import Button from "../../Button/Button";
function EditarProducto(
  props: EditarProductoProps & { onCancelarEdicion: () => void }
) {
  const [producto, setProducto] = useState<Producto>({
    id: props.id,
    nombre: props.nombreInicial,
    precio: props.precioInicial,
    categoria_id: props.categoriaIdInicial || 0,
  });

  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleEdit = async () => {
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
      await api.put(
        ROUTES.PRODUCT_DETAIL.replace(":id", producto.id.toString()),
        producto
      );
      setMensaje("Producto actualizado con éxito.");
      props.onProductoEditado(producto);
    } catch (error) {
      setMensaje("Error al actualizar el producto. Inténtalo de nuevo.");
      console.error("Error al actualizar el producto:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Editar Producto</h2>

      <input
        type="text"
        value={producto.nombre}
        onChange={(e) => setProducto({ ...producto, nombre: e.target.value })}
        placeholder="Nuevo nombre del producto"
        className={styles.input}
      />
      <input
        type="number"
        value={producto.precio}
        onChange={(e) =>
          setProducto({ ...producto, precio: Number(e.target.value) })
        }
        placeholder="Nuevo precio del producto"
        className={styles.input}
      />
      <select
        value={producto.categoria_id || ""}
        onChange={(e) =>
          setProducto({ ...producto, categoria_id: Number(e.target.value) })
        }
        className={styles.select}
      >
        <option value="" disabled>
          Selecciona una categoría
        </option>
        {props.categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.nombre}
          </option>
        ))}
      </select>

      <div className={styles.buttonGroup}>
        <Button
          onClick={handleEdit}
          text="Guardar"
          className={[styles.button, styles.save].join(" ")} // Aplica las clases necesarias
        />
        <Button
          onClick={props.onCancelarEdicion}
          text="Cancelar"
          className={[styles.button, styles.cancel].join(" ")} // Aplica las clases necesarias
        />
      </div>

      {mensaje && (
        <p
          className={`${styles.message} ${
            mensaje.includes("éxito") ? styles.success : styles.error
          }`}
        >
          {mensaje}
        </p>
      )}
    </div>
  );
}

export default EditarProducto;
