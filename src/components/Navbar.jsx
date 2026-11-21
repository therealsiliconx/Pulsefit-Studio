
import { Link, NavLink } from "react-router-dom";
import { Dumbbell, ArrowUpRight } from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">
          <Dumbbell size={21} />
        </span>

        <span className="brand-name">
          PULSE<span>FIT</span>
          <small>STUDIO</small>
        </span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/classes">
          Classes
        </NavLink>

        <NavLink to="/booking">
          My Booking
        </NavLink>
      </nav>

      <Link to="/classes" className="nav-cta">
        Get Started <ArrowUpRight size={16} />
      </Link>
    </header>
  );
}

export default Navbar;
