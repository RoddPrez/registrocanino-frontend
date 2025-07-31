import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const PanelLayout = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");

  useEffect(() => {
    const nombre = localStorage.getItem("usuarioNombre");
    if (nombre) {
      setNombreUsuario(nombre);
    }
  }, []);

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>🐶 Panel Canino</h2>

        {nombreUsuario && (
          <div style={styles.userBox}>
            👋 ¡Bienvenido, <strong>{nombreUsuario}</strong>!<br />
            Nos alegra tenerte aquí 🐾
          </div>
        )}

        <nav>
          <ul style={styles.menuList}>
            <li>
              <Link to="/registrar-perro" style={styles.link}>
                📥 Registrar mis perros
              </Link>
            </li>
            <li>
              <Link to="/duenos" style={styles.link}>
                📋 Ver dueños y perros
              </Link>
            </li>
            <li>
              <Link to="/densidad-zonas" style={styles.link}>
                📊 Densidad por zona
              </Link>
            </li>
            <li>
              <Link to="/ver-por-raza" style={styles.link}>
                🐕 Ver por raza
              </Link>
            </li>
            <li>
              <Link to="/ranking-incidentes" style={styles.link}>
                📈 Ranking de incidentes
              </Link>
            </li>
            <li>
              <Link to="/registrar-incidente" style={styles.link}>
                ⚠️ Registrar incidente
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenido dinámico */}
      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Segoe UI, sans-serif",
    background: "#f8f9fa",
  },
  sidebar: {
    width: "260px",
    background: "#34495e",
    color: "#ecf0f1",
    padding: "2rem 1.2rem",
    boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
  },
  sidebarTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  userBox: {
    fontSize: "0.95rem",
    marginBottom: "2rem",
    backgroundColor: "#2c3e50",
    padding: "0.8rem",
    borderRadius: "8px",
    textAlign: "center",
    lineHeight: "1.4",
  },
  menuList: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },
  link: {
    textDecoration: "none",
    color: "#ecf0f1",
    fontSize: "1.05rem",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    transition: "background 0.3s",
  },
  main: {
    flexGrow: 1,
    padding: "2rem",
    overflowY: "auto",
  },
};

// Hover style via inline JS workaround (basic)
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("a").forEach((a) => {
    a.addEventListener("mouseover", () => {
      a.style.backgroundColor = "#2c3e50";
    });
    a.addEventListener("mouseout", () => {
      a.style.backgroundColor = "transparent";
    });
  });
});

export default PanelLayout;
