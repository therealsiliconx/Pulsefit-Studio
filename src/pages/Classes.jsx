
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";
import classes from "../data/classes";

function Classes() {
  return (
    <main className="classes-page">
      <section className="classes-header">
        <div className="section-label">PULSEFIT STUDIO — TRAINING</div>

        <h1>
          FIND YOUR
          <br />
          <span>SESSION.</span>
        </h1>

        <p>
          From building your foundations to pushing your limits.
          Find a training session that fits your goals.
        </p>

        <div className="classes-count">
          <span>{classes.length} PROGRAMS</span>
          <span>ISLAMABAD, PAKISTAN</span>
        </div>
      </section>

      <section className="classes-list-section">
        <div className="classes-list-heading">
          <h2>OUR TRAINING PROGRAMS</h2>
          <p>Choose your starting point.</p>
        </div>

        <div className="classes-grid">
          {classes.map((fitnessClass, index) => (
            <article className="class-list-card" key={fitnessClass.id}>
              <div className={`class-card-visual visual-${(index % 4) + 1}`}>
                <span className="class-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="class-category">
                  {fitnessClass.category}
                </span>

                <span className="class-visual-word">
                  {fitnessClass.category.toUpperCase()}
                </span>
              </div>

              <div className="class-list-info">
                <div className="class-title-row">
                  <h3>{fitnessClass.name}</h3>
                  <span className="class-price">
                    Rs. {fitnessClass.price.toLocaleString()}
                  </span>
                </div>

                <p className="class-description">
                  {fitnessClass.description}
                </p>

                <div className="class-meta">
                  <span>
                    <Clock size={15} /> {fitnessClass.duration} min
                  </span>
                  <span>{fitnessClass.difficulty}</span>
                </div>

                <Link
                  to={`/classes/${fitnessClass.id}`}
                  className="class-details-link"
                >
                  View Details <ArrowUpRight size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Classes;
