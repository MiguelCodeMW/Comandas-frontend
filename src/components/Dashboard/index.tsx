import React, { useEffect } from "react";
import { useDashboard } from "../../hooks/useDashboard";
import ConfigurarIVA from "../ConfigurarIVA/ConfigurarIVA";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Button from "../Button/Button";
import styles from "./Dashboard.module.css";
import { NAMES } from "../../utils/Constants/text";
import { ROUTES } from "../../utils/Constants/routes";

function Dashboard() {
  const {
    comandasFiltradas,
    loading,
    error,
    errorIva,
    mostrarPagadas,
    setMostrarPagadas,
    showModalIva,
    setShowModalIva,
    iva,
    user,
    handleLogout,
    handleIvaGuardado,
  } = useDashboard();

  useEffect(() => {
    if (user?.role === "admin" && iva === null && !loading && !errorIva) {
      setShowModalIva(true);
    }
  }, [user, iva, loading, setShowModalIva, errorIva]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error && !comandasFiltradas.length && !loading) {
    return (
      <ErrorMessage
        message={error || NAMES.ERROR_CARGA}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{NAMES.DASHBOARD_TITULO}</h1>
        <div>
          {user && (
            <span className={styles.userInfo}>
              Hola, {user.name} ({user.role})
            </span>
          )}
          <Button
            onClick={handleLogout}
            text={NAMES.LOGOUT_BOTON}
            className={styles.logoutButton}
          />
        </div>
      </header>

      {user?.role === "admin" && (
        <div className={styles.headerButtons}>
          <Button
            onClick={() => setShowModalIva(true)}
            text={`${NAMES.CONFIGURAR_IVA} (Actual: ${
              iva !== null ? `${(iva * 100).toFixed(0)}%` : "No configurado"
            })`}
            className={styles.headerButton}
          />
          <Button
            navigateTo={ROUTES.CATEGORY}
            text="Gestionar Categorías"
            className={styles.headerButton}
          />
          <Button
            navigateTo={ROUTES.PRODUCT}
            text="Gestionar Productos"
            className={styles.headerButton}
          />
          {errorIva && !showModalIva && (
            <p className={styles.inlineError}>{errorIva}</p>
          )}
          {iva === null && !errorIva && !loading && (
            <p className={styles.alert}>
              {NAMES.DASHBOARD_CONFIGURAR_IVA_ALERTA}
            </p>
          )}
        </div>
      )}

      {showModalIva && user?.role === "admin" && (
        <ConfigurarIVA
          onGuardado={handleIvaGuardado}
          ivaActual={iva}
          onCancelar={() => {
            setShowModalIva(false);
          }}
          errorExterno={errorIva}
        />
      )}

      <div className={styles.headerButtons}>
        <Button
          onClick={() => setMostrarPagadas(!mostrarPagadas)}
          text={
            mostrarPagadas
              ? NAMES.DASHBOARD_VER_PENDIENTES
              : NAMES.DASHBOARD_VER_PAGADAS
          }
          className={styles.headerButton}
        />
        <Button
          navigateTo={ROUTES.CREATE_COMANDA}
          text={NAMES.CREAR_COMANDA}
          className={styles.headerButton}
        />
      </div>

      <div className={styles.list}>
        <h2>
          {mostrarPagadas
            ? NAMES.DASHBOARD_VER_PAGADAS
            : NAMES.DASHBOARD_VER_PENDIENTES}
        </h2>
        {comandasFiltradas.length > 0 ? (
          comandasFiltradas.map((comanda) => (
            <div
              key={comanda.id}
              className={`${styles.item} ${styles[comanda.estado] || ""}`}
            >
              <p className={styles.itemTitle}>
                ID: {comanda.id} - Fecha:{" "}
                {new Date(comanda.fecha).toLocaleString()}
              </p>
              <p className={styles.itemText}>Estado: {comanda.estado}</p>
              <Button
                navigateTo={ROUTES.COMANDA_DETAIL.replace(
                  ":id",
                  comanda.id.toString()
                )}
                text={NAMES.EDITAR}
                className={styles.headerButton}
              />
            </div>
          ))
        ) : (
          <p className={styles.message}>
            {mostrarPagadas
              ? NAMES.DASHBOARD_NO_COMANDAS_PAGADAS
              : NAMES.DASHBOARD_NO_COMANDAS_PENDIENTES}
          </p>
        )}
      </div>
      {error && comandasFiltradas.length > 0 && (
        <p className={styles.inlineError}>{error}</p>
      )}
    </div>
  );
}

export default Dashboard;
