import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axio";
import { User } from "../../../utils/User";
import Button from "../../Button/Button";
import styles from "../LoginForm/LoginForm.module.css"; // Importa los estilos CSS
import { ROUTES } from "../../../utils/Constants/routes";

function CreateUserForm() {
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook para manejar la navegación

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await api.post(ROUTES.CREATE_USER, formData); // Usa la instancia de Axios
      setMessage("Usuario creado exitosamente!");
      console.log(res.data);

      // Redirige al usuario a la página principal o al login
      navigate(ROUTES.LOGIN); // Cambia "/dashboard" por la ruta deseada
    } catch (error: any) {
      setMessage("Error al crear usuario");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>Crear Usuario</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          value={formData.name}
          className={styles.input}
        />
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
          text="Registrarse"
          type="submit"
          className={[styles.button, styles.padded].join(" ")}
        />
        <Button
          text="Volver"
          onClick={() => navigate(ROUTES.LOGIN)}
          className={[styles.button, styles.padded].join(" ")}
        />
      </form>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
export default CreateUserForm;
