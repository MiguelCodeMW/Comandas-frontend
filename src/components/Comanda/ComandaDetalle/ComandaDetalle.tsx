import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api/axio";
import Button from "../../Button/Button";
import styles from "./ComandaDetalle.module.css";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

interface ComandaDetalle {
  id: number;
  producto: Producto;
  cantidad: number;
}

interface Comanda {
  id: number;
  fecha: string;
  estado: string;
  user_id: number;
  detalles: ComandaDetalle[];
}

function ComandaDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [comanda, setComanda] = useState<Comanda | null>(null);
  const [mensaje, setMensaje] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComandaDetails = async () => {
      try {
        const res = await api.get(`/comandas/${id}`);
        setComanda(res.data);
      } catch (err: any) {
        setError(err.message || "Error al cargar los detalles de la comanda");
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
      setMensaje("¡Comanda pagada con éxito!");
      // Opcional: recargar los datos para actualizar el estado
      const res = await api.get(`/comandas/${id}`);
      setComanda(res.data);
    } catch (err: any) {
      setMensaje(
        err.response?.data?.message ||
          "Error al pagar la comanda. Inténtalo de nuevo."
      );
    }
  };

  if (loading) {
    return (
      <div className={styles.message}>Cargando detalles de la comanda...</div>
    );
  }

  if (error || !comanda) {
    return (
      <div style={{ padding: "2rem" }}>
        {error
          ? `Error: ${error}`
          : "No se encontraron detalles para esta comanda."}
      </div>
    );
  }

  return (
    <div className={styles.comandaDetalleContainer}>
      <h1 className={styles.comandaDetalleTitulo}>
        Detalles de la Comanda #{comanda.id}
      </h1>
      <p className={styles.comandaDetalleInfo}>Estado: {comanda.estado}</p>
      <p className={styles.comandaDetalleInfo}>
        Fecha: {new Date(comanda.fecha).toLocaleString()}
      </p>
      <h2 className={styles.detallesTitulo}>Detalles:</h2>
      {comanda.detalles.length === 0 ? (
        <p className={styles.message}>No hay detalles para esta comanda.</p>
      ) : (
        <ul className={styles.detallesLista}>
          {comanda.detalles.map((detalle) => (
            <li key={detalle.id} className={styles.detalleItem}>
              <p className={styles.detalleInfo}>
                Producto: {detalle.producto.nombre}
              </p>
              <p className={styles.detalleInfo}>Cantidad: {detalle.cantidad}</p>
              <p className={styles.detalleInfo}>
                Precio Unitario: ${detalle.producto.precio.toFixed(2)}
              </p>
              <p className={styles.detalleInfo}>
                Total: $
                {(detalle.cantidad * detalle.producto.precio).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}
      <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
        <Button
          text="Editar Comanda"
          onClick={handleEditarComanda}
          className={styles.editarButton}
        />
        {comanda.estado !== "cerrada" && (
          <Button
            text="Pagar Comanda"
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
