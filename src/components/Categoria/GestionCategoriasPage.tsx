import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import CategoriaList from "./CategoriaList";
import FormularioCategoria from "./FormularioCategoria"; // Usaremos este componente
import styles from "./Categoria.module.css";
import { ROUTES } from "../../utils/Constants/routes";
import { NAMES } from "../../utils/Constants/text";
import { useGestionCategorias } from "../../hooks/useGestionCategorias"; // Importamos el hook

function GestionCategoriasPage() {
  const {
    categorias,
    // nombreNuevaCategoria, // El estado para el input de nueva categoría ahora está en FormularioCategoria
    // setNombreNuevaCategoria, // Ya no se necesita aquí
    mensaje,
    error, // Añadido para mostrar errores del hook
    editandoId,
    categoriaEnEdicion,
    // fetchCategorias, // El hook lo maneja internamente
    handleCrearCategoria,
    iniciarEdicion,
    cancelarEdicion,
    handleEditarCategoria,
    handleEliminarCategoriaCallback, // Cambiado para reflejar el hook
    limpiarMensajes, // Para limpiar mensajes desde los formularios
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
              // El hook se encarga de la lógica de creación y mensajes
              const success = await handleCrearCategoria(nombreInput);
              return success; // Devuelve true/false para que el formulario sepa si limpiar
            }}
            textoBotonSubmit={NAMES.CATEGORIA_GUARDAR}
            placeholder={NAMES.PLACEHOLDER_NOMBRE}
            limpiarMensajesAlCambiar={limpiarMensajes} // Pasa la función para limpiar mensajes
          />
        </>
      )}

      <h2 className={styles.titleList}>Lista de Categorías</h2>
      <CategoriaList
        categorias={categorias}
        editandoId={editandoId}
        categoriaEnEdicion={categoriaEnEdicion} // Pasar la categoría completa para el formulario de edición
        onEdit={iniciarEdicion} // Función del hook para iniciar edición
        onCategoriaEditada={handleEditarCategoria} // Función del hook para guardar edición
        onCancelar={cancelarEdicion} // Función del hook para cancelar edición
        onEliminarCallback={handleEliminarCategoriaCallback} // Función del hook para manejar eliminación
        limpiarMensajesAlCambiar={limpiarMensajes} // Pasa la función para limpiar mensajes
      />
      <Button
        text="Volver"
        onClick={() => navigate(ROUTES.DASHBOARD)}
        className={styles.dashboardButton} // Asegúrate que esta clase exista y esté estilada
      />
    </div>
  );
}

export default GestionCategoriasPage;
