import React, { Component } from "react";
import CreateUserForm from "./CreateUserForm"; // Importa el formulario de usuario

class App extends Component {
  render() {
    return (
      <div>
        <CreateUserForm /> {/* Aquí se renderiza el formulario */}
      </div>
    );
  }
}

export default App;
