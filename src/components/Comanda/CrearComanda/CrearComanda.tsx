import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Button/Button";
import ProductoSelectorList from "../../Producto/ProductoSelectorList";
import ProductosSeleccionadosList from "./ProductosSeleccionadosList";
import styles from "./Comandas.module.css";
import { NAMES } from "../../../utils/Constants/text";
import { ROUTES } from "../../../utils/Constants/routes";
import { useCrearComanda } from "../../../hooks/useCrearComanda";
import { CategoriaProps } from "../../../utils/Categoria/CategoriaProps";

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
  } = useCrearComanda();
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionadaId, setCategoriaSeleccionadaId] = useState<
    number | null
  >(null);

  // Efecto para seleccionar la primera categoría por defecto al cargar
  useEffect(() => {
    if (categorias.length > 0 && categoriaSeleccionadaId === null) {
      setCategoriaSeleccionadaId(categorias[0].id);
    }
  }, [categorias, categoriaSeleccionadaId]);

  const productosMostrados = productos.filter((p) => {
    const coincideConBusqueda = p.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    // Si hay texto en la búsqueda, filtramos por búsqueda en todos los productos
    if (busqueda.trim() !== "") {
      return coincideConBusqueda;
    }

    // Si no hay búsqueda, filtramos por la categoría seleccionada
    const esDeCategoriaSeleccionada =
      categoriaSeleccionadaId === null || // Debería estar seleccionada por defecto
      p.categoria_id === categoriaSeleccionadaId;

    return esDeCategoriaSeleccionada;
  });

  if (loading) {
    return <div className={styles.message}>{NAMES.CARGANDO_DATOS_COMANDA}</div>;
  }

  return (
    <div className={styles.comandaContainer}>
      <h1 className={styles.comandaTitulo}>
        {comandaIdParaEditar ? NAMES.ID_COMANDA_EDITAR : NAMES.ID_COMANDA_CREAR}
        {comandaIdParaEditar ? ` #${comandaIdParaEditar}` : ""}
      </h1>

      {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
      {mensaje && (
        <p className={`${styles.message} ${styles.success}`}>{mensaje}</p>
      )}

      {/* Contenedor de la barra de categorías */}
      <div className={styles.categoriasBar}>
        {categorias.map((categoria: CategoriaProps) => (
          <Button
            key={categoria.id}
            text={categoria.nombre}
            onClick={() => {
              setCategoriaSeleccionadaId(categoria.id);
              setBusqueda(""); //limpiar búsqueda al cambiar de categoría
            }}
            className={`${styles.categoriaButton} ${
              categoria.id === categoriaSeleccionadaId
                ? styles.categoriaButtonActive
                : ""
            }`}
          />
        ))}
      </div>

      <div className={styles.buscadorContainer}>
        <input
          type="text"
          placeholder={NAMES.COMANDA_BUSCAR_PRODUCTOS}
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className={styles.input}
        />
      </div>

      {!loading && !error && (
        <>
          <div className={styles.selectorProductosContainer}>
            {productosMostrados.length > 0 ? (
              <ProductoSelectorList
                productos={productosMostrados}
                onProductoClick={handleSeleccionarProducto}
              />
            ) : (
              <p className={styles.message}>{NAMES.COMANDA_BUSCAR_ERROR}</p>
            )}
          </div>

          <div className={styles.seleccionadosContainer}>
            <h3>{NAMES.COMANDA_PRODUCTOS_SELECCIONADOS}</h3>
            <ProductosSeleccionadosList
              productos={productosSeleccionados}
              onAumentar={handleAumentarCantidad}
              onDisminuir={handleDisminuirCantidad}
            />
          </div>
        </>
      )}

      <div className={styles.finalizarWrapper}>
        <Button
          text={
            comandaIdParaEditar
              ? NAMES.ID_COMANDA_ACTUALIZAR
              : NAMES.ID_COMANDA_FINALIZAR
          }
          onClick={handleFinalizarComanda}
          className={styles.botonFinalizar}
          disabled={loading || productosSeleccionados.length === 0}
        />
        <Button
          text={NAMES.VOLVER}
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className={styles.volverButton}
        />
      </div>
    </div>
  );
}

export default CrearComanda;
