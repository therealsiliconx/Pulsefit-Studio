
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function Booking() {
  return (
    <main className="placeholder-page">
      <div className="section-label">PULSEFIT STUDIO — YOUR SESSION</div>

      <h1>
        YOUR
        <br />
        <span>BOOKING.</span>
      </h1>

      <p>
        Your selected sessions and booking form will be available here
        as we build the booking system.
      </p>

      <Link to="/classes" className="button-primary">
        <ArrowLeft size={17} /> Browse Classes
      </Link>
    </main>
  );
}

export default Booking;
