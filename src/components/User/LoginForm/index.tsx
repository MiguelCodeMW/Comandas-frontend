import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axio";
import Button from "../../Button/Button";
import styles from "./LoginForm.module.css";

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
      const res = await api.post("/login", formData);
      const token = res.data.token;
      localStorage.setItem("token", token);
      setMessage("Inicio de sesión exitoso!");
      navigate("/dashboard");
    } catch (error: any) {
      setMessage("Error al iniciar sesión");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          value={formData.password}
          className={styles.input}
        />
        <Button
          text="Iniciar Sesión"
          type="submit"
          className={[styles.button, styles.padded].join(" ")}
        />
        <Button
          text="Crear Usuario"
          onClick={() => navigate("/create")}
          className={[styles.button, styles.padded].join(" ")}
        />
      </form>
      {message && <p className={styles.message}>{message}</p>}
      {/* <Button
        text="Registrarse"
        onClick={() => navigate("/create")}
        className={[styles.button, styles.padded].join(" ")}
      /> */}
    </div>
  );
}

export default LoginForm;
