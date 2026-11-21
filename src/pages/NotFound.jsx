
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function NotFound() {
  return (
    <main className="placeholder-page not-found">
      <div className="section-label">404 — PAGE NOT FOUND</div>

      <h1>
        LOST YOUR
        <br />
        <span>WAY?</span>
      </h1>

      <p>
        This page doesn't exist. Let's get you back to training.
      </p>

      <Link to="/" className="button-primary">
        <ArrowLeft size={17} /> Back Home
      </Link>
    </main>
  );
}

export default NotFound;
