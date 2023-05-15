import { Link } from "react-router-dom";
import Logout from "../Logout";
export default function Header() {
  return (
    <header className="gradient-custom">
      <nav>
        <Link to="/" className="text-white">Home</Link>
        <Link to="/my-courses" className="text-white">My Courses</Link>
        <Link to="/cart" className="text-white">Go to Shooping Cart</Link>
        <Logout />
      </nav>
    </header>
  );
}