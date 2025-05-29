import EliminarProducto from "./EliminarProducto";
import Button from "../Button/Button";
import FormularioProducto from "./FormularioProducto";
import styles from "./Producto.module.css";
import { ProductoProps } from "../../utils/Producto/ProductoProps";
// import { CategoriaProps } from "../../utils/Categoria/CategoriaProps";
import { NAMES } from "../../utils/Constants/text";
import { useDashboard } from "../../hooks/useDashboard"; // Importa useDashboard
import { ProductoListProps2 } from "../../utils/Producto/ProductoListProps2";

function ProductoList({
  productos,
  categorias,
  editandoProductoId,
  productoEnEdicion,
  onSetEditandoProductoId,
  onDeleteProducto,
  onProductoEditado,
  onCancelarEdicion,
  limpiarMensajesAlCambiar,
}: ProductoListProps2) {
  const { moneda } = useDashboard(); // Obtén la moneda del hook

  const getCategoriaNombre = (categoriaId: number) => {
    const categoria = categorias.find((cat) => cat.id === categoriaId);
    return categoria ? categoria.nombre : NAMES.CATEGORIA_DESCONOCIDA;
  };

  if (productos.length === 0) {
    return (
      <p className={styles.infoMessage}>{NAMES.PRODUCTOS_NO_DISPONIBLES}</p>
    );
  }

  return (
    <ul className={styles.productList}>
      {productos.map((producto) => (
        <li key={producto.id} className={styles.productItem}>
          {editandoProductoId === producto.id && productoEnEdicion ? (
            <FormularioProducto
              productoInicial={productoEnEdicion}
              categoriasDisponibles={categorias}
              onSubmit={async (data) => {
                return await onProductoEditado(
                  producto.id,
                  data as ProductoProps
                );
              }}
              onCancel={onCancelarEdicion}
              textoBotonSubmit={NAMES.GUARDAR_CAMBIOS}
              limpiarMensajesAlCambiar={limpiarMensajesAlCambiar}
            />
          ) : (
            <>
              <div className={styles.productInfoText}>
                <span className={styles.productName}>{producto.nombre}</span>
                <div>
                  {/* {NAMES.LABEL_PRECIO} {moneda || "$"} */}
                  {NAMES.LABEL_PRECIO} {moneda}
                  {producto.precio.toFixed(2)} {/* Usa la moneda */}
                </div>
                <div>
                  {NAMES.LABEL_CATEGORIA}{" "}
                  {getCategoriaNombre(producto.categoria_id)}
                </div>
              </div>
              <div className={styles.buttonGroup}>
                <Button
                  text={NAMES.EDITAR}
                  onClick={() => onSetEditandoProductoId(producto.id)}
                  className={`${styles.button} ${styles.editButton}`}
                />
                <EliminarProducto
                  id={producto.id}
                  onProductoEliminado={onDeleteProducto}
                  className={`${styles.button} ${styles.deleteButton}`}
                />
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ProductoList;
