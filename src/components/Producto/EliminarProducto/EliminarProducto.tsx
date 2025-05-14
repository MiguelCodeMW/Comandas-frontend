import { useState } from "react";
import api from "../../../api/axio";
import { ROUTES } from "../../../utils/Constants/routes";
import { EliminarProductoProps } from "../../../utils/EliminarProductoProps";
import styles from "../Producto.module.css";
import Button from "../../Button/Button";

function EliminarProducto({
  id,
  onProductoEliminado,
  className,
}: EliminarProductoProps) {
  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(ROUTES.PRODUCT_DETAIL.replace(":id", id.toString()));
      setMensaje("Producto eliminado con éxito.");
      onProductoEliminado(id);
    } catch (error) {
      setMensaje("Error al eliminar el producto. Inténtalo de nuevo.");
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div>
      <Button
        text="Eliminar"
        onClick={handleDelete}
        className={`${styles.button} ${styles.delete} ${className || ""}`} // Aseguramos que use los estilos base
      />
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
