import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axio";

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
    <div style={{ padding: "2rem" }}>
      <h1>Detalles de la Comanda #{comanda.id}</h1>
      <p>Estado: {comanda.estado}</p>
      <p>Fecha: {new Date(comanda.fecha).toLocaleString()}</p>
      <h2>Detalles:</h2>
      {comanda.detalles.length === 0 ? (
        <p>No hay detalles para esta comanda.</p>
      ) : (
        <ul>
          {comanda.detalles.map((detalle) => (
            <li key={detalle.id}>
              <p>Producto: {detalle.producto.nombre}</p>
              <p>Cantidad: {detalle.cantidad}</p>
              <p>Precio unitario: ${detalle.producto.precio.toFixed(2)}</p>
              <p>
                Total: $
                {(detalle.cantidad * detalle.producto.precio).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ComandaDetails;
