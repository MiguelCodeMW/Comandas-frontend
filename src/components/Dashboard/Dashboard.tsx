import React, { useEffect, useState } from "react";
import api from "../../api/axio";

// Define la estructura de una comanda (ajusta los campos según tu necesidad)
interface Comanda {
  id: number;
  fecha: string;
  estado: string;
  user_id: number;
}

function Dashboard() {
  const [comandas, setComandas] = useState<Comanda[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchComandas() {
      try {
        const res = await api.get("/dashboard"); // Asegúrate de que este endpoint existe y retorna un array de comandas
        setComandas(res.data.comandas);
      } catch (err: any) {
        setError(err.message || "Error al cargar comandas");
      } finally {
        setLoading(false);
      }
    }
    fetchComandas();
  }, []);

  if (loading) {
    return <div style={{ padding: "2rem" }}>Cargando comandas...</div>;
  }

  if (error) {
    return <div style={{ padding: "2rem" }}>Error: {error}</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Comandas</h1>
      {comandas.length === 0 ? (
        <p>No hay comandas.</p>
      ) : (
        <ul>
          {comandas.map((comanda) => (
            <li key={comanda.id}>
              <h3>Comanda #{comanda.id}</h3>
              <p>Estado: {comanda.estado}</p>
              <p>Fecha: {new Date(comanda.fecha).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
