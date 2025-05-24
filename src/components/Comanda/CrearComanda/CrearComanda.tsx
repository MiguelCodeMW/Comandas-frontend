import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Button/Button";
import ProductoSelectorList from "../../Producto/ProductoSelectorList";
import ProductosSeleccionadosList from "./ProductosSeleccionadosList";
import styles from "./Comandas.module.css";
import { NAMES } from "../../../utils/Constants/text";
import { ROUTES } from "../../../utils/Constants/routes";
import { useCrearComanda } from "../../../hooks/useCrearComanda";

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

  // Estado para el buscador
  const [busqueda, setBusqueda] = useState("");

  if (loading) {
    return <div className={styles.message}>{NAMES.CARGANDO_DATOS_COMANDA}</div>;
  }

  return (
    <div className={styles.comandaContainer}>
      <h1 className={styles.titulo}>
        {comandaIdParaEditar ? NAMES.ID_COMANDA_EDITAR : NAMES.ID_COMANDA_CREAR}
        {comandaIdParaEditar ? ` #${comandaIdParaEditar}` : ""}
      </h1>

      {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
      {mensaje && (
        <p className={`${styles.message} ${styles.success}`}>{mensaje}</p>
      )}

      {/* Buscador de productos */}
      <div className={styles.buscadorContainer}>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className={styles.buscador}
        />
      </div>

      {!loading && !error && (
        <>
          <div className={styles.selectorProductosContainer}>
            {categorias.map((categoria) => {
              // Filtrar productos por categoría y búsqueda
              const productosFiltrados = productos
                .filter((p) => p.categoria_id === categoria.id)
                .filter((p) =>
                  p.nombre.toLowerCase().includes(busqueda.toLowerCase())
                );
              if (productosFiltrados.length === 0) return null;
              return (
                <div key={categoria.id} className={styles.categoriaSection}>
                  <h2 className={styles.categoriaTitulo}>{categoria.nombre}</h2>
                  <ProductoSelectorList
                    productos={productosFiltrados}
                    onProductoClick={handleSeleccionarProducto}
                  />
                </div>
              );
            })}
          </div>

          <div className={styles.seleccionadosContainer}>
            <h3>Productos Seleccionados</h3>
            <ProductosSeleccionadosList
              productos={productosSeleccionados}
              onAumentar={handleAumentarCantidad}
              onDisminuir={handleDisminuirCantidad}
            />
          </div>
        </>
      )}

      <div className={styles.finalizar}>
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
          text="Volver"
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className={styles.dashboardButton}
        />
      </div>
    </div>
  );
}

export default CrearComanda;
