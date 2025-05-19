import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/axio";
import styles from "./ComandaDetalle.module.css";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

interface ComandaDetalle {
  id: number;
  producto: Producto; // Relación con el producto
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
  const { id } = useParams<{ id: string }>(); // Obtiene el ID de la comanda desde la URL
  const [comanda, setComanda] = useState<Comanda | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null); // Mensaje de éxito o error

  useEffect(() => {
    async function fetchComandaDetails() {
      try {
        const res = await api.get(`/comandas/${id}`); // Endpoint para obtener los detalles de la comanda
        setComanda(res.data);
      } catch (err: any) {
        setError(err.message || "Error al cargar los detalles de la comanda");
      } finally {
        setLoading(false);
      }
    }
    fetchComandaDetails();
  }, [id]);

  async function handlePagarComanda() {
    if (!id) return;

    try {
      await api.put(`/comandas/${id}/pagar`); // Endpoint para pagar la comanda
      setComanda({ ...comanda!, estado: "cerrada" }); // Actualiza el estado de la comanda a "cerrada"
      setMensaje("La comanda ha sido pagada con éxito.");
    } catch (err: any) {
      setMensaje(err.message || "Error al pagar la comanda.");
    }
  }

  if (loading) {
    return (
      <div style={{ padding: "2rem" }}>Cargando detalles de la comanda...</div>
    );
  }

  if (error) {
    return <div style={{ padding: "2rem" }}>Error: {error}</div>;
  }

  if (!comanda) {
    return (
      <div style={{ padding: "2rem" }}>
        No se encontraron detalles para esta comanda.
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
                Precio unitario: ${detalle.producto.precio.toFixed(2)}
              </p>
              <p className={styles.detalleTotal}>
                Total: $
                {(detalle.cantidad * detalle.producto.precio).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}
      {mensaje && <p className={styles.message}>{mensaje}</p>}
      {comanda.estado === "abierta" && (
        <button className={styles.pagarButton} onClick={handlePagarComanda}>
          Pagar Comanda
        </button>
      )}
    </div>
  );
}

export default ComandaDetails;
