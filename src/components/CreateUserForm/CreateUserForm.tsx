/*import React, { Component, ChangeEvent, FormEvent } from "react";
import api from "../../api/axio";
// Definimos los tipos para las props y el estado
interface CreateUserFormProps {}

interface CreateUserFormState {
  name: string;
  email: string;
  password: string;
  message: string;
}

class CreateUserForm extends Component<
  CreateUserFormProps,
  CreateUserFormState
> {
  constructor(props: CreateUserFormProps) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      message: "",
    };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<
      CreateUserFormState,
      keyof CreateUserFormState
    >);
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const userData = { name, email, password };

    try {
      const res = await api.post("/create", userData); // Usa la instancia de Axios
      this.setState({ message: "Usuario creado exitosamente!" });
      console.log(res.data);
    } catch (error: any) {
      this.setState({ message: "Error al crear usuario" });
      console.error(error.response?.data || error.message);
    }
  };

  render() {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Crear Usuario</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            onChange={this.handleChange}
            value={this.state.name}
          />
          <br />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <br />
          <button type="submit">Crear</button>
        </form>
        {this.state.message && <p>{this.state.message}</p>}
      </div>
    );
  }
}

*/
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import api from "../../api/axio";

function CreateUserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  // const navigate = useNavigate(); // Hook para manejar la navegación

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await api.post("/create", formData); // Usa la instancia de Axios
      setMessage("Usuario creado exitosamente!");
      console.log(res.data);

      // Redirige al usuario a la página principal o al login
      // navigate("/dashboard"); // Cambia "/dashboard" por la ruta deseada
    } catch (error: any) {
      setMessage("Error al crear usuario");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Crear Usuario</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          value={formData.name}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          value={formData.password}
        />
        <br />
        <button type="submit">Crear</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateUserForm;
