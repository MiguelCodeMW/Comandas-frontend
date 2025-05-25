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
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await api.post(ROUTES.CREATE_USER, formData);
      setMessage("Usuario creado exitosamente!");
      console.log(res.data);

      // Redirige al usuario al login
      navigate(ROUTES.LOGIN);
    } catch (error: any) {
      setMessage("Error al crear usuario");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Crear Usuario</h1>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          value={formData.name}
          className="input" // Clase global
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          className="input" // Clase global
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          value={formData.password}
          className="input" // Clase global
        />
        <Button
          text="Registrarse"
          type="submit"
          className="btn padded" // Clases globales
        />
        <Button
          text="Volver"
          onClick={() => navigate(ROUTES.LOGIN)}
          className="btn padded" // Clases globales
        />
      </form>
      {message && <p className="message">{message}</p>} {/* Clase global */}
    </div>
  );
}

export default CreateUserForm;
