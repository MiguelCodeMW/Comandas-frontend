import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api/axio";
import Button from "../../Button/Button";
import styles from "./ComandaDetalle.module.css";
import { ComandaProps } from "../../../utils/Comanda/ComandaProps";
import { ROUTES } from "../../../utils/Constants/routes";

import { NAMES } from "../../../utils/Constants/text";

function ComandaDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [comanda, setComanda] = useState<ComandaProps | null>(null);
  const [mensaje, setMensaje] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComandaDetails = async () => {
      try {
        const res = await api.get(ROUTES.COMANDA_DETAIL.replace(":id", id!));
        setComanda(res.data);
      } catch (err: any) {
        setError(err.message || NAMES.ALERTA_COMANDA_PAGAR);
      } finally {
        setLoading(false);
      }
    };
    fetchComandaDetails();
  }, [id]);

  const handleEditarComanda = () => {
    navigate(`/comandas/crear?id=${id}`);
  };

  const handlePagarComanda = async () => {
    try {
      await api.put(`/comandas/${id}/pagar`);
      setMensaje(NAMES.COMANDA_PAGADA_EXITOSA);
      const res = await api.get(`/comandas/${id}`);
      setComanda(res.data);
    } catch (err: any) {
      setMensaje(err.response?.data?.message || NAMES.ALERTA_COMANDA_PAGAR);
    }
  };

  if (loading) {
    return <div className={styles.message}>{NAMES.COMANDA_CARGANDO}</div>;
  }

  if (error || !comanda) {
    return (
      <div style={{ padding: "2rem" }}>
        {error ? `Error: ${error}` : NAMES.COMANDA_NO_ENCONTRADA}
      </div>
    );
  }

  return (
    <div className={styles.comandaDetalleContainer}>
      <h1 className={styles.comandaDetalleTitulo}>
        {NAMES.ID_COMANDA_EDITAR} #{comanda.id}
      </h1>
      <p className={styles.comandaDetalleInfo}>Estado: {comanda.estado}</p>
      <p className={styles.comandaDetalleInfo}>
        Fecha: {new Date(comanda.fecha).toLocaleString()}
      </p>
      <h2 className={styles.detallesTitulo}>{NAMES.DETALLES_TITULO}</h2>
      {comanda.detalles.length === 0 ? (
        <p className={styles.message}>{NAMES.DETALLES_NO_DISPONIBLES}</p>
      ) : (
        <ul className={styles.detallesLista}>
          {comanda.detalles.map((detalle) => (
            <li key={detalle.id} className={styles.detalleItem}>
              <p className={styles.detalleInfo}>
                {NAMES.DETALLES_PRODUCTO} {detalle.producto.nombre}
              </p>
              <p className={styles.detalleInfo}>
                {NAMES.DETALLES_CANTIDAD} {detalle.cantidad}
              </p>
              <p className={styles.detalleInfo}>
                {NAMES.DETALLES_PRECIO_UNITARIO} $
                {detalle.producto.precio.toFixed(2)}
              </p>
              <p className={styles.detalleInfo}>
                {NAMES.DETALLES_TOTAL} $
                {(detalle.cantidad * detalle.producto.precio).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}
      <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
        {/* Mostrar el botón de editar solo si la comanda no está cerrada */}
        {comanda.estado !== "cerrada" && (
          <Button
            text={NAMES.ID_COMANDA_EDITAR}
            onClick={handleEditarComanda}
            className={styles.editarButton}
          />
        )}
        {/* Mostrar el botón de pagar solo si la comanda no está cerrada */}
        {comanda.estado !== "cerrada" && (
          <Button
            text={NAMES.COMANDA_PAGAR}
            onClick={handlePagarComanda}
            className={styles.pagarButton}
          />
        )}
      </div>
      {mensaje && <p className={styles.message}>{mensaje}</p>}
    </div>
  );
}

export default ComandaDetails;
