import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ZonaMap from "./pages/ZonaMap";
import PanelUsuario from "./pages/PanelUsuario";
import RegistrarPerro from "./pages/RegistrarPerro";
import VerDuenos from "./pages/VerDuenos";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/zonas" element={<ZonaMap />} />
        <Route path="/panel" element={<PanelUsuario />} />
        <Route path="/registrar-perro" element={<RegistrarPerro />} />
        <Route path="/duenos" element={<VerDuenos />} />

        {/* Agrega más rutas según funciones */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
