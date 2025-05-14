import { useState } from "react";
import api from "../../../api/axio";
import { ROUTES } from "../../../utils/Constants/routes";
import styles from "../Producto.module.css"; // Importa el archivo CSS centralizado

interface EditarProductoProps {
  id: number;
  nombreInicial: string;
  precioInicial: number;
  categoriaIdInicial: number;
  categorias: { id: number; nombre: string }[];
  onProductoEditado: () => void;
}

function EditarProducto({
  id,
  nombreInicial,
  precioInicial,
  categoriaIdInicial,
  categorias,
  onProductoEditado,
}: EditarProductoProps) {
  const [nombre, setNombre] = useState<string>(nombreInicial);
  const [precio, setPrecio] = useState<number>(precioInicial);
  const [categoriaId, setCategoriaId] = useState<number>(categoriaIdInicial);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleEdit = async () => {
    try {
      await api.put(ROUTES.PRODUCT_DETAIL.replace(":id", id.toString()), {
        nombre,
        precio,
        categoria_id: categoriaId,
      });
      setMensaje("Producto actualizado con éxito.");
      onProductoEditado();
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
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nuevo nombre del producto"
        className={styles.input}
      />
      <input
        type="number"
        value={precio}
        onChange={(e) => setPrecio(Number(e.target.value))}
        placeholder="Nuevo precio del producto"
        className={styles.input}
      />
      <select
        value={categoriaId}
        onChange={(e) => setCategoriaId(Number(e.target.value))}
        className={styles.select}
      >
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.nombre}
          </option>
        ))}
      </select>
      <div className={styles.buttonGroup}>
        <button
          onClick={handleEdit}
          className={`${styles.button} ${styles.save}`}
        >
          Guardar
        </button>
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
