import { useState } from "react";
import api from "../../../api/axio";
import { ROUTES } from "../../../utils/Constants/routes";
import styles from "../Producto.module.css"; // Importa el archivo CSS centralizado

interface EliminarProductoProps {
  id: number;
  onProductoEliminado: (id: number) => void; // Ajustamos el tipo para aceptar un argumento
}

function EliminarProducto({ id, onProductoEliminado }: EliminarProductoProps) {
  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(ROUTES.PRODUCT_DETAIL.replace(":id", id.toString()));
      setMensaje("Producto eliminado con éxito.");
      onProductoEliminado(id); // Pasamos el ID al callback
    } catch (error) {
      setMensaje("Error al eliminar el producto. Inténtalo de nuevo.");
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div className={styles.container}>
      <button
        onClick={handleDelete}
        className={`${styles.button} ${styles.delete}`}
      >
        Eliminar
      </button>
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

export default EliminarProducto;
