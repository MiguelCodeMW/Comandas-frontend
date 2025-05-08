import React, { useEffect, useState } from "react";
import api from "../../api/axio";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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

  const handleComandaClick = (
    e: React.MouseEvent<HTMLLIElement>,
    comanda: Comanda
  ) => {
    e.stopPropagation();
    navigate(`/comandas/${comanda.id}`);
  };

  const handleAddCategoria = () => {
    navigate("/categorias/crear"); // Redirige a la página de creación de categorías
  };

  if (loading) {
    return <div style={{ padding: "2rem" }}>Cargando comandas...</div>;
  }

  if (error) {
    return <div style={{ padding: "2rem" }}>Error: {error}</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Comandas</h1>
        <button
          onClick={handleAddCategoria}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Añadir Categoría
        </button>
        <button
          onClick={() => navigate("/productos/crear")}
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          Gestionar Productos
        </button>
        <button
          onClick={() => navigate("/comandas/crear")}
          style={{
            backgroundColor: "orange",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            cursor: "pointer",
            marginLeft: "1rem",
          }}
        >
          Crear Comanda
        </button>
      </div>
      {comandas.length === 0 ? (
        <p>No hay comandas.</p>
      ) : (
        <ul>
          {comandas.map((comanda) => (
            <li
              key={comanda.id}
              onClick={(e) => handleComandaClick(e, comanda)}
              style={{ cursor: "pointer", marginBottom: "1rem" }}
            >
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
