
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Clock, Users } from "lucide-react";
import classes from "../data/classes";

function ClassDetails() {
  const { id } = useParams();

  const fitnessClass = classes.find((item) => item.id === id);

  if (!fitnessClass) {
    return (
      <main className="placeholder-page">
        <div className="section-label">CLASS NOT FOUND</div>

        <h1>
          SESSION
          <br />
          <span>UNAVAILABLE.</span>
        </h1>

        <p>
          We couldn't find that training session. Please choose
          one from our available programs.
        </p>

        <Link to="/classes" className="button-primary">
          <ArrowLeft size={17} /> Browse Classes
        </Link>
      </main>
    );
  }

  return (
    <main className="detail-page">
      <Link to="/classes" className="back-link">
        <ArrowLeft size={16} /> Back to Classes
      </Link>

      <section className="detail-content">
        <div className="detail-visual">
          <span className="section-label">
            PULSEFIT / {fitnessClass.category.toUpperCase()}
          </span>

          <div className="detail-visual-word">
            {fitnessClass.category.toUpperCase()}
          </div>
        </div>

        <div className="detail-info">
          <div className="section-label">TRAINING SESSION</div>

          <h1>{fitnessClass.name}</h1>

          <p className="detail-description">
            {fitnessClass.description}
          </p>

          <div className="detail-meta">
            <div>
              <Clock size={19} />
              <span>{fitnessClass.duration} minutes</span>
            </div>

            <div>
              <Users size={19} />
              <span>{fitnessClass.difficulty}</span>
            </div>
          </div>

          <div className="detail-trainer">
            <span>YOUR TRAINER</span>
            <strong>{fitnessClass.trainer}</strong>
          </div>

          <div className="detail-price">
            <span>SESSION PRICE</span>
            <h2>Rs. {fitnessClass.price.toLocaleString()}</h2>
          </div>

          <div className="detail-availability">
            {fitnessClass.availableSpots} spots currently available
          </div>

          <Link to={`/booking/${fitnessClass.id}`} className="button-primary detail-book-button">
            Continue to Booking <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ClassDetails;
