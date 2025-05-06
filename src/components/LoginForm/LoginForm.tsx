import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axio";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario

    try {
      // Enviar los datos del formulario al endpoint de inicio de sesión
      const res = await api.post("/login", formData);

      // Obtener el token del backend
      const token = res.data.token;

      // Guardar el token en localStorage
      localStorage.setItem("token", token);

      // Mostrar un mensaje de éxito
      setMessage("Inicio de sesión exitoso!");

      // Redirigir al usuario a la página principal
      navigate("/dashboard"); // Cambia "/dashboard" por la ruta de tu página principal
    } catch (error: any) {
      // Manejo de errores
      setMessage("Error al iniciar sesión");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          value={formData.password}
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default LoginForm;
