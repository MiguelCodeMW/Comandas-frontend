import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axio";
import Button from "../../Button/Button";
import styles from "./LoginForm.module.css";
import { ROUTES } from "../../../utils/Constants/routes";

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
    e.preventDefault();

    try {
      const res = await api.post(ROUTES.LOGIN, formData);
      const token = res.data.token;
      localStorage.setItem("token", token);

      // Obtener datos del usuario autenticado y guardarlos en localStorage
      const userRes = await api.get("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.setItem("user", JSON.stringify(userRes.data));

      setMessage("Inicio de sesión exitoso!");
      navigate(ROUTES.DASHBOARD);
    } catch (error: any) {
      setMessage("Error al iniciar sesión");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Iniciar Sesión</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          value={formData.password}
          className="input"
        />
        <Button text="Iniciar Sesión" type="submit" className="btn padded" />
        <Button
          text="Crear Usuario"
          onClick={() => navigate("/create")}
          className="btn padded"
        />
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
