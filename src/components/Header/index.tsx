import { Link } from "react-router-dom";
import Logout from "../Logout";
export default function Header() {
  return (
    <header className="gradient-custom">
      <nav>
        <Link to="/" className="text-white">Home</Link>
        <a href="#" className="text-white">About</a>
        <Link to="/cart" className="text-white">Ir al Carrito</Link>
        <Logout />
      </nav>
    </header>
  );
}