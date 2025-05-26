import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import ProductoList from "./ProductoList";
import FormularioProducto from "./FormularioProducto";
import styles from "./Producto.module.css";
import { ROUTES } from "../../utils/Constants/routes";
import { NAMES } from "../../utils/Constants/text";
import { useGestionProductos } from "../../hooks/useGestionProductos";

function GestionProductosPage() {
  const {
    productos,
    categorias,
    mensaje,
    error,
    editandoProductoId,
    productoEnEdicion,
    handleCrearProducto,
    iniciarEdicionProducto,
    cancelarEdicionProducto,
    handleEditarProducto,
    handleProductoEliminadoCallback,
    limpiarMensajes,
  } = useGestionProductos();
  const navigate = useNavigate();

  return (
    <div className={styles.gestionProductosContainer}>
      <h1 className={styles.pageTitle}>{NAMES.CATEGORIAS_PRODUCTOS}</h1>{" "}
      {mensaje && (
        <p className={`${styles.message} ${styles.successMessage}`}>
          {mensaje}
        </p>
      )}
      {error && (
        <p className={`${styles.message} ${styles.errorMessage}`}>{error}</p>
      )}
      {!editandoProductoId && (
        <>
          <h2 className={styles.sectionTitle}>{NAMES.PRODUCTO_GUARDAR}</h2>
          <FormularioProducto
            onSubmit={async (data) => {
              const { id, ...productoDataParaCrear } = data as any;
              return await handleCrearProducto(productoDataParaCrear);
            }}
            categoriasDisponibles={categorias}
            textoBotonSubmit={NAMES.PRODUCTO_GUARDAR}
            limpiarMensajesAlCambiar={limpiarMensajes}
          />
        </>
      )}
      <h2 className={styles.sectionTitle}>{NAMES.PRODUCTOS_LISTA}</h2>{" "}
      <ProductoList
        productos={productos}
        categorias={categorias}
        editandoProductoId={editandoProductoId}
        productoEnEdicion={productoEnEdicion}
        onSetEditandoProductoId={iniciarEdicionProducto}
        onDeleteProducto={handleProductoEliminadoCallback}
        onProductoEditado={handleEditarProducto}
        onCancelarEdicion={cancelarEdicionProducto}
        limpiarMensajesAlCambiar={limpiarMensajes}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "var(--spacing-xl)",
        }}
      >
        <Button
          text={NAMES.VOLVER}
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className={`${styles.button} ${styles.backButton}`}
        />
      </div>
    </div>
  );
}

export default GestionProductosPage;
