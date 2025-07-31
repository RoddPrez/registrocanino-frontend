// src/components/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex gap-4">
      <Link to="/">Inicio</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/ver-duenos">Dueños y sus Perros</Link> {/* <- AQUI */}
    </nav>
  );
};

export default Navbar;
