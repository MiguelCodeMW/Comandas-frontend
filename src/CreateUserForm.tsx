import React, { Component, ChangeEvent, FormEvent } from "react";
import axios from "axios";

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
      const res = await axios.post(
        "http://localhost:8000/api/create",
        userData
      );
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

export default CreateUserForm;
