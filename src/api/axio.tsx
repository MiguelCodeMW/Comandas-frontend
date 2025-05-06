import axios from "axios";

// Crear una instancia de Axios con configuración base
const api = axios.create({
  baseURL: "http://localhost:8000/api", // Cambia esta URL según tu entorno
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para manejar errores globales (opcional)
/*api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "Error en la solicitud:",
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);*/

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;
