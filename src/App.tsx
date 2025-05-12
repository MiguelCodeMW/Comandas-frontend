import React, { useEffect } from "react";
import CreateUserForm from "./components/User/CreateUserForm";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/User/LoginForm";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import ComandaDetails from "./components/Comanda/ComandaDetalle/ComandaDetalle";
import CrearCategoria from "./components/Categoria/CrearCategoria/CrearCategoria";
import CrearProducto from "./components/Producto/CrearProducto/CrearProducto";
import CrearComanda from "./components/Comanda/CrearComanda/CrearComanda";
// Importa el componente de ruta privada
// Importa el formulario de usuario

function App() {
  // useEffect(() => {
  //   // Elimina el token al iniciar la aplicación
  //   localStorage.removeItem("token");
  // }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/create" element={<CreateUserForm />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />{" "}
        <Route
          path="/comandas/:id"
          element={
            <PrivateRoute>
              <ComandaDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/categorias/crear"
          element={
            <PrivateRoute>
              <CrearCategoria />
            </PrivateRoute>
          }
        />
        <Route
          path="/productos/crear"
          element={
            <PrivateRoute>
              <CrearProducto />
            </PrivateRoute>
          }
        />
        <Route
          path="/comandas/crear"
          element={
            <PrivateRoute>
              <CrearComanda />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
