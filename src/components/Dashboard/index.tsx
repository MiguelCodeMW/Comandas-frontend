import { useEffect, useState } from "react";
import { useDashboard } from "../../hooks/useDashboard";
import ConfigurarIVA from "../ConfigurarIVA/ConfigurarIVA";
import ConfigurarMoneda from "../ConfigurarMoneda/ConfigurarMoneda";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Button from "../Button/Button";
import styles from "./Dashboard.module.css";
import { NAMES } from "../../utils/Constants/text";
import { ROUTES } from "../../utils/Constants/routes";
import DashboardComandasList from "./DashboardComandasList";

function Dashboard() {
  const {
    comandasFiltradas,
    loading,
    error,
    errorIva,
    errorMoneda,
    mostrarPagadas,
    setMostrarPagadas,
    showModalIva,
    setShowModalIva,
    showModalMoneda,
    setShowModalMoneda,
    iva,
    moneda,
    user,
    handleLogout,
    handleIvaGuardado,
    handleMonedaGuardado,
  } = useDashboard();

  const [showAdminSettings, setShowAdminSettings] = useState(false);

  useEffect(() => {
    if (
      user?.role === NAMES.ROL_ADMIN &&
      iva === null &&
      moneda === null &&
      !loading &&
      !errorIva &&
      !errorMoneda &&
      !showModalIva &&
      !showModalMoneda
    ) {
      setShowModalIva(true);
    }
  }, [
    user,
    iva,
    moneda,
    loading,
    setShowModalIva,
    errorIva,
    errorMoneda,
    showModalIva,
    showModalMoneda,
  ]);

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
        <div className={styles.userInfoContainer}>
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

      {user?.role === NAMES.ROL_ADMIN && (
        <div className={styles.adminSectionContainer}>
          <Button
            onClick={() => setShowAdminSettings(!showAdminSettings)}
            text={
              showAdminSettings ? NAMES.OCULTAR_AJUSTES : NAMES.MOSTRAR_AJUSTES
            }
            className={`${styles.headerButton} ${styles.settingsButton}`}
          />
          {showAdminSettings && (
            <div className={styles.adminButtonsContainer}>
              <Button
                onClick={() => setShowModalIva(true)}
                text={`${NAMES.CONFIGURAR_IVA} (Actual: ${
                  iva !== null
                    ? `${(iva * 100).toFixed(0)}%`
                    : NAMES.IVA_NO_CONFIGURADO
                })`}
                className={styles.headerButton}
              />
              <Button
                onClick={() => setShowModalMoneda(true)}
                text={`${NAMES.CONFIGURAR_MONEDA} (Actual: ${
                  moneda !== null ? moneda : NAMES.MONEDA_NO_CONFIGURADA
                })`}
                className={styles.headerButton}
              />
              <Button
                navigateTo={ROUTES.CATEGORY}
                text={NAMES.CATEGORIAS_BUTTON}
                className={styles.headerButton}
              />
              <Button
                navigateTo={ROUTES.PRODUCT}
                text={NAMES.CATEGORIAS_PRODUCTOS}
                className={styles.headerButton}
              />
              {/* NUEVO: Botón para configurar mesas (por el admin) */}
              <Button
                navigateTo={ROUTES.TOTAL_MESAS} // Necesitarás crear este componente y ruta
                text={NAMES.CONFIGURAR_MESAS}
                className={styles.headerButton}
              />
              {errorIva && !showModalIva && (
                <p className={styles.inlineError}>{errorIva}</p>
              )}
              {errorMoneda && !showModalMoneda && (
                <p className={styles.inlineError}>{errorMoneda}</p>
              )}
            </div>
          )}
        </div>
      )}

      {showModalIva && user?.role === NAMES.ROL_ADMIN && (
        <ConfigurarIVA
          onGuardado={async (nuevoIva) => {
            await handleIvaGuardado(nuevoIva);
          }}
          ivaActual={iva}
          onCancelar={() => {
            setShowModalIva(false);
          }}
          errorExterno={errorIva}
        />
      )}

      {showModalMoneda && user?.role === NAMES.ROL_ADMIN && (
        <ConfigurarMoneda
          onGuardado={async (nuevaMoneda) => {
            await handleMonedaGuardado(nuevaMoneda);
          }}
          monedaActual={moneda}
          onCancelar={() => {
            setShowModalMoneda(false);
          }}
          errorExterno={errorMoneda}
        />
      )}

      <div className={styles.comandaActionButtonsContainer}>
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

      <h2 className={styles.listTitle}>
        {mostrarPagadas
          ? NAMES.DASHBOARD_COMANDAS_PAGADAS
          : NAMES.DASHBOARD_COMANDAS_PENDIENTES}
      </h2>

      <DashboardComandasList
        comandas={comandasFiltradas}
        mostrarPagadas={mostrarPagadas}
      />
      {error && comandasFiltradas.length > 0 && (
        <p className={styles.inlineError}>{error}</p>
      )}
    </div>
  );
}

export default Dashboard;
