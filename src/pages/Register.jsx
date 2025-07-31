import React, { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    contrasena: "",
    direccion: "",
    zona: "Zona Norte",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("✅ Usuario registrado con éxito");
        setFormData({
          nombre: "",
          telefono: "",
          correo: "",
          contrasena: "",
          direccion: "",
          zona: "Zona Norte",
        });
      } else {
        alert("❌ Error al registrar usuario");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error al conectar con el servidor");
    }
  };

  return (
    <div style={contenedor}>
      <h2 style={titulo}>📝 Registro de Usuario</h2>
      <form onSubmit={handleSubmit} style={formulario}>
        <input
          name="nombre"
          placeholder="Nombre"
          onChange={handleChange}
          value={formData.nombre}
          required
          style={input}
        />
        <input
          name="telefono"
          placeholder="Teléfono"
          onChange={handleChange}
          value={formData.telefono}
          style={input}
        />
        <input
          name="correo"
          type="email"
          placeholder="Correo"
          onChange={handleChange}
          value={formData.correo}
          required
          style={input}
        />
        <input
          name="contrasena"
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
          value={formData.contrasena}
          required
          style={input}
        />
        <input
          name="direccion"
          placeholder="Dirección"
          onChange={handleChange}
          value={formData.direccion}
          style={input}
        />
        <select
          name="zona"
          onChange={handleChange}
          value={formData.zona}
          style={input}
        >
          <option value="Zona Norte">Zona Norte</option>
          <option value="Zona Centro">Zona Centro</option>
          <option value="Zona Sur">Zona Sur</option>
          <option value="Zona Costera">Zona Costera</option>
          <option value="Zona Residencial">Zona Residencial</option>
        </select>

        <button type="submit" style={boton}>
          Registrarse
        </button>
      </form>
    </div>
  );
}

// 🎨 Estilos en línea
const contenedor = {
  maxWidth: "450px",
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
  padding: "0.9rem",
  fontSize: "1rem",
  backgroundColor: "#27ae60",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};
