
import { Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Link to="/" className="brand footer-brand">
          <span className="brand-icon">
            <Dumbbell size={20} />
          </span>

          <span className="brand-name">
            PULSE<span>FIT</span>
            <small>STUDIO</small>
          </span>
        </Link>

        <p>Move better. Get stronger. Stay consistent.</p>

        <Link to="/classes" className="footer-link">
          Explore Classes →
        </Link>
      </div>

      <div className="footer-bottom">
        <p>© 2026 PulseFit Studio. Student project.</p>
        <p>Built for better movement.</p>
      </div>
    </footer>
  );
}

export default Footer;
