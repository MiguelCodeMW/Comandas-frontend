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
      <h1 className={styles.title}>Gestionar Categorías</h1>

      {/* Mensajes globales del hook */}
      {mensaje && (
        <p className={`${styles.message} ${styles.success}`}>{mensaje}</p>
      )}
      {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}

      {/* Formulario para crear nueva categoría (solo si no se está editando) */}
      {!editandoId && (
        <>
          <h2 className={styles.titleForm}>Nueva Categoría</h2>
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
      {/* Nuevo contenedor flex para el botón Volver */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "var(--spacing-xl)",
        }}
      >
        <Button
          text="Volver"
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className={styles.dashboardButton}
        />
      </div>
    </div>
  );
}

export default GestionCategoriasPage;
