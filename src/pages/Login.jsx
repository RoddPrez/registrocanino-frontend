import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}api/usuarios/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, contrasena }),
      });

      if (response.ok) {
        const data = await response.json();

        // 🔐 Guardar el ID del usuario autenticado
        localStorage.setItem("usuarioId", data.id);

        // (Opcional) Guardar todo el objeto por si lo necesitas después
        localStorage.setItem("usuario", JSON.stringify(data));

        alert("✅ Inicio de sesión exitoso");
        navigate("/panel");
      } else {
        alert("❌ Credenciales inválidas");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error al conectar con el servidor");
    }
  };

  return (
    <div style={contenedor}>
      <h2 style={titulo}>🔐 Iniciar Sesión</h2>
      <form onSubmit={handleLogin} style={formulario}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
          style={input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
          style={input}
        />
        <button type="submit" style={boton}>
          Ingresar
        </button>
      </form>
    </div>
  );
}

const contenedor = {
  maxWidth: "400px",
  margin: "80px auto",
  padding: "2rem",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  fontFamily: "'Segoe UI', sans-serif",
};

const titulo = {
  fontSize: "1.8rem",
  marginBottom: "1.5rem",
  textAlign: "center",
  color: "#2d3436",
};

const formulario = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const input = {
  padding: "0.8rem",
  fontSize: "1rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  outline: "none",
};

const boton = {
  padding: "0.8rem",
  fontSize: "1rem",
  backgroundColor: "#0984e3",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};
