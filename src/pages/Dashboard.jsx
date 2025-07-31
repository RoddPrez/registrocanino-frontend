import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const navigate = useNavigate();

  const [totalPerros, setTotalPerros] = useState(0);
  const [datosPorRaza, setDatosPorRaza] = useState([]);
  const [edadesPorTamaño, setEdadesPorTamaño] = useState([]);

  const colores = ["#6c5ce7", "#00cec9", "#fdcb6e", "#fab1a0", "#55efc4"];

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resTotal = await axios.get(`${baseUrl}api/perros/total`);
        setTotalPerros(resTotal.data.total);

        const resRazas = await axios.get(`${baseUrl}api/perros/por-raza`);
        setDatosPorRaza(resRazas.data);

        const resEdades = await axios.get(
          `${baseUrl}api/perros/por-edad-tamanio`
        );
        setEdadesPorTamaño(resEdades.data);

        // 👇 Verifica en consola si llegan los datos
        console.log("🐾 Total:", resTotal.data);
        console.log("🐾 Razas:", resRazas.data);
        console.log("🐾 Edades/Tamaños:", resEdades.data);
      } catch (err) {
        console.error("Error cargando dashboard:", err);
      }
    };

    cargarDatos();
  }, []);

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "1.5rem", color: "#2d3436" }}>
        🐶 Dashboard de Perros - San Miguel
      </h1>

      <div style={{ marginBottom: "2rem" }}>
        <button onClick={() => navigate("/login")} style={estiloBoton}>
          Iniciar sesión
        </button>
        <button
          onClick={() => navigate("/registro")}
          style={{
            ...estiloBoton,
            backgroundColor: "#00b894",
            marginLeft: "1rem",
          }}
        >
          Registrarse
        </button>
      </div>

      <div style={cajaTotal}>
        <h2>Total de perros registrados: {totalPerros}</h2>
      </div>

      <div style={contenedorGraficos}>
        {/* 🥧 PieChart */}
        <div style={cardGrafico}>
          <h3>🐕‍🦺 Perros por raza</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={datosPorRaza}
                dataKey="cantidad"
                nameKey="raza"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {datosPorRaza.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colores[index % colores.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 📊 BarChart */}
        <div style={cardGrafico}>
          <h3>📊 Perros por edad y tamaño</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={edadesPorTamaño}>
              <XAxis dataKey="categoriaEdad" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pequeno" fill="#6c5ce7" name="Pequeño" />
              <Bar dataKey="mediano" fill="#00cec9" name="Mediano" />
              <Bar dataKey="grande" fill="#fdcb6e" name="Grande" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const estiloBoton = {
  padding: "0.6rem 1.2rem",
  fontSize: "1rem",
  backgroundColor: "#0984e3",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
};

const cajaTotal = {
  backgroundColor: "#dfe6e9",
  padding: "1rem",
  marginBottom: "2rem",
  borderRadius: "10px",
  fontSize: "1.2rem",
  color: "#2d3436",
};

const contenedorGraficos = {
  display: "flex",
  gap: "2rem",
  flexWrap: "wrap",
};

const cardGrafico = {
  width: "450px",
  height: "320px",
  backgroundColor: "#ffffff",
  border: "1px solid #dcdde1",
  borderRadius: "12px",
  padding: "1rem",
  boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
};

export default Dashboard;
