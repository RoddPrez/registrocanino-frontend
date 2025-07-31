import React, { useEffect, useState } from "react";
import axios from "axios";

const VerDuenos = () => {
  const [duenos, setDuenos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/usuarios/con-perros")
      .then((res) => setDuenos(res.data))
      .catch((err) => console.error("Error al cargar datos de dueños:", err));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>👨‍👩‍👧 Dueños y sus Perros</h1>

      {duenos.map((dueno, index) => (
        <div key={index} style={styles.card}>
          <h2 style={styles.name}>{dueno.usuario.nombre}</h2>
          <p style={styles.info}>
            📍 <strong>Zona:</strong> {dueno.usuario.zona}
          </p>
          <p style={styles.info}>
            📞 <strong>Teléfono:</strong> {dueno.usuario.telefono}
          </p>
          <p style={styles.info}>
            📧 <strong>Correo:</strong> {dueno.usuario.correo}
          </p>

          <h3 style={styles.subtitle}>🐶 Perros Registrados:</h3>

          {dueno.perros && dueno.perros.length > 0 ? (
            <ul style={styles.list}>
              {dueno.perros.map((perro, i) => (
                <li key={i} style={styles.listItem}>
                  <strong>{perro.nombre}</strong> — {perro.raza} (
                  {perro.tamanio}, {perro.edad} años)
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ fontStyle: "italic", color: "#888" }}>
              No tiene perros registrados.
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "Segoe UI, sans-serif",
    background: "#fafafa",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
    textAlign: "center",
    color: "#2c3e50",
  },
  card: {
    background: "#fff",
    padding: "1.5rem",
    marginBottom: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  },
  name: {
    fontSize: "1.4rem",
    color: "#34495e",
    marginBottom: "0.5rem",
  },
  info: {
    margin: "0.25rem 0",
    fontSize: "1rem",
    color: "#555",
  },
  subtitle: {
    marginTop: "1rem",
    fontSize: "1.1rem",
    color: "#2c3e50",
    fontWeight: "600",
  },
  list: {
    marginTop: "0.5rem",
    paddingLeft: "1.5rem",
    color: "#333",
  },
  listItem: {
    marginBottom: "0.25rem",
    fontSize: "1rem",
  },
};

export default VerDuenos;
