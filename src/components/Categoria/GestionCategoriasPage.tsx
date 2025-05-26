import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import CategoriaList from "./CategoriaList";
import FormularioCategoria from "./FormularioCategoria";
import styles from "./Categoria.module.css";
import { ROUTES } from "../../utils/Constants/routes";
import { NAMES } from "../../utils/Constants/text";
import { useGestionCategorias } from "../../hooks/useGestionCategorias";

function GestionCategoriasPage() {
  const {
    categorias,
    mensaje,
    error,
    editandoId,
    categoriaEnEdicion,
    handleCrearCategoria,
    iniciarEdicion,
    cancelarEdicion,
    handleEditarCategoria,
    handleEliminarCategoriaCallback,
    limpiarMensajes,
  } = useGestionCategorias();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{NAMES.CATEGORIAS_BUTTON}</h1>

      {/* Mensajes globales del hook */}
      {mensaje && (
        <p className={`${styles.message} ${styles.success}`}>{mensaje}</p>
      )}
      {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}

      {/* Formulario para crear nueva categoría (solo si no se está editando) */}
      {!editandoId && (
        <>
          <h2 className={styles.titleForm}>{NAMES.CATEGORIA_NUEVA}</h2>
          <FormularioCategoria
            onSubmit={async (nombreInput) => {
              const success = await handleCrearCategoria(nombreInput);
              return success;
            }}
            textoBotonSubmit={NAMES.CATEGORIA_GUARDAR}
            placeholder={NAMES.PLACEHOLDER_NOMBRE}
            limpiarMensajesAlCambiar={limpiarMensajes}
          />
        </>
      )}

      <h2 className={styles.titleList}>Lista de Categorías</h2>
      <CategoriaList
        categorias={categorias}
        editandoId={editandoId}
        categoriaEnEdicion={categoriaEnEdicion}
        onEdit={iniciarEdicion}
        onCategoriaEditada={handleEditarCategoria}
        onCancelar={cancelarEdicion}
        onEliminarCallback={handleEliminarCategoriaCallback}
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
          className={styles.dashboardButton}
        />
      </div>
    </div>
  );
}

export default GestionCategoriasPage;
