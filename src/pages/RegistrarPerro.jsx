import React, { useState } from "react";
import axios from "axios";

const RegistrarPerro = () => {
  const [form, setForm] = useState({
    nombre: "",
    raza: "",
    tamanio: "Mediano",
    comportamiento: "tranquilo",
    edad: "",
  });

  const usuarioId = localStorage.getItem("usuarioId");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioId) {
      alert("⚠️ Debes iniciar sesión antes de registrar un perro.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/perros", {
        ...form,
        usuarioId: parseInt(usuarioId), // asegúrate de enviarlo como número si tu backend lo espera así
      });

      alert("🐶 Perro registrado correctamente");

      setForm({
        nombre: "",
        raza: "",
        tamanio: "Mediano",
        comportamiento: "tranquilo",
        edad: "",
      });
    } catch (error) {
      console.error(error);
      alert("❌ Error al registrar el perro");
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "500px",
        margin: "0 auto",
        background: "#fdfdfd",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          fontSize: "1.8rem",
        }}
      >
        🐶 Registrar un nuevo perro
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del perro"
          value={form.nombre}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="raza"
          placeholder="Raza"
          value={form.raza}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <select
          name="tamanio"
          value={form.tamanio}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="Pequeño">Pequeño</option>
          <option value="Mediano">Mediano</option>
          <option value="Grande">Grande</option>
        </select>

        <select
          name="comportamiento"
          value={form.comportamiento}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="tranquilo">Tranquilo</option>
          <option value="juguetón">Juguetón</option>
          <option value="agresivo">Agresivo</option>
          <option value="ansioso">Ansioso</option>
          <option value="entrenado">Entrenado</option>
        </select>

        <input
          type="number"
          name="edad"
          placeholder="Edad (años)"
          value={form.edad}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            padding: "0.75rem",
            background: "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: "0.7rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

export default RegistrarPerro;
