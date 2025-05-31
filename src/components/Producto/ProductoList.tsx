import { useState } from "react";
import EliminarProducto from "./EliminarProducto";
import Button from "../Button/Button";
import FormularioProducto from "./FormularioProducto";
import styles from "./Producto.module.css";
import { ProductoProps } from "../../utils/types/ComandaTypes";
import { NAMES } from "../../utils/Constants/text";
import { useDashboard } from "../../hooks/useDashboard";
import { ProductoListProps } from "../../utils/types/ComandaTypes";

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
}: ProductoListProps) {
  const { moneda } = useDashboard();
  const [busqueda, setBusqueda] = useState("");

  // Para obtener el nombre de la categoría
  const getCategoriaNombre = (categoriaId: number) => {
    const categoria = categorias.find((cat) => cat.id === categoriaId);
    return categoria ? categoria.nombre : NAMES.CATEGORIA_DESCONOCIDA;
  };

  // Filtrado de productos por búsqueda
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className={styles.gestionProductosContainer}>
      <h1 className={styles.pageTitle}>{NAMES.GESTIONAR_PRODUCTOS}</h1>

      <div className={styles.buscadorContainer}>
        <input
          type="text"
          placeholder={NAMES.PRODUCTO_BUSCAR}
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className={styles.input}
        />
      </div>

      <h2 className={styles.sectionTitle}>{NAMES.LISTA_PRODUCTOS}</h2>

      {productos.length === 0 ? (
        <p className={`${styles.message} ${styles.infoMessage}`}>
          {NAMES.PRODUCTOS_NO_DISPONIBLES}
        </p>
      ) : productosFiltrados.length === 0 ? (
        <p className={`${styles.message} ${styles.infoMessage}`}>
          {NAMES.COMANDA_BUSCAR_ERROR}
        </p>
      ) : (
        <ul className={styles.productList}>
          {productosFiltrados.map((producto) => (
            <li key={producto.id} className={styles.productItem}>
              {editandoProductoId === producto.id && productoEnEdicion ? (
                <FormularioProducto
                  productoInicial={productoEnEdicion}
                  categoriasDisponibles={categorias}
                  onSubmit={async (data) =>
                    await onProductoEditado(producto.id, data as ProductoProps)
                  }
                  onCancel={onCancelarEdicion}
                  textoBotonSubmit={NAMES.GUARDAR_CAMBIOS}
                  limpiarMensajesAlCambiar={limpiarMensajesAlCambiar}
                />
              ) : (
                <>
                  <div className={styles.productInfoText}>
                    <span className={styles.productName}>
                      {producto.nombre}
                    </span>
                    <div>
                      {NAMES.LABEL_PRECIO} {producto.precio.toFixed(2)}
                      <span className={styles.currencySymbol}>{moneda}</span>
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
      )}
    </div>
  );
}

export default ProductoList;
