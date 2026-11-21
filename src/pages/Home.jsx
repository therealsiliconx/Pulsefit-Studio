
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Play, Zap, Target, Clock } from "lucide-react";
import classes from "../data/classes";

function Home() {
  const featuredClasses = classes.slice(0, 3);

  return (
    <main>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <div className="eyebrow">
            <span className="status-dot"></span>
            YOUR FITNESS. YOUR PACE.
          </div>

          <h1>
            BUILT TO
            <br />
            <span>MOVE</span> YOU.
          </h1>

          <p className="hero-description">
            Train with purpose. Show up for yourself. Find the sessions,
            coaches, and community that help you become stronger every day.
          </p>

          <div className="hero-actions">
            <Link to="/classes" className="button-primary">
              Explore Classes <ArrowUpRight size={18} />
            </Link>

            <a href="#about" className="button-secondary">
              <Play size={16} /> Discover PulseFit
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <h3>10<span>+</span></h3>
              <p>Training programs</p>
            </div>

            <div>
              <h3>6</h3>
              <p>Training styles</p>
            </div>

            <div>
              <h3>1<span>%</span></h3>
              <p>Better every day</p>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-placeholder">
            <div className="hero-image-overlay"></div>

            <div className="hero-image-label">
              <span>01 / TRAIN WITH PURPOSE</span>
              <span>ISLAMABAD, PK</span>
            </div>

            <div className="hero-image-text">
              <p>NO SHORTCUTS.</p>
              <p className="outline-text">JUST WORK.</p>
            </div>

            <div className="hero-floating-card">
              <div className="floating-icon">
                <Zap size={20} />
              </div>
              <div>
                <strong>Find your strength</strong>
                <p>Your next session starts here.</p>
              </div>
              <ArrowRight size={18} />
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          <span></span>
          SCROLL TO EXPLORE
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section" id="about">
        <div className="section-label">01 — WHO WE ARE</div>

        <div className="about-content">
          <h2>
            LESS TALK.
            <br />
            <span>MORE ACTION.</span>
          </h2>

          <div className="about-text">
            <p>
              PulseFit is built around one simple idea: progress comes
              from showing up. Whether you're lifting for the first time
              or pushing your limits, there's a place for you here.
            </p>

            <Link to="/classes" className="text-link">
              Find your training <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>

        <div className="about-features">
          <div className="feature-item">
            <Target size={23} />
            <h3>Purposeful training</h3>
            <p>Every session has a goal. Every rep has a reason.</p>
          </div>

          <div className="feature-item">
            <Clock size={23} />
            <h3>Flexible sessions</h3>
            <p>Different training styles and schedules to fit your day.</p>
          </div>

          <div className="feature-item">
            <Zap size={23} />
            <h3>Real progress</h3>
            <p>Build consistency, confidence, and strength over time.</p>
          </div>
        </div>
      </section>

      {/* FEATURED CLASSES */}
      <section className="featured-section">
        <div className="section-label">02 — FIND YOUR SESSION</div>

        <div className="section-heading-row">
          <h2>
            PICK YOUR
            <br />
            <span>CHALLENGE.</span>
          </h2>

          <Link to="/classes" className="button-primary">
            All Classes <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="featured-grid">
          {featuredClasses.map((fitnessClass, index) => (
            <Link
              to={`/classes/${fitnessClass.id}`}
              className="featured-card"
              key={fitnessClass.id}
            >
              <div className={`class-card-visual visual-${index + 1}`}>
                <span className="class-number">
                  0{index + 1}
                </span>

                <span className="class-category">
                  {fitnessClass.category}
                </span>

                <div className="class-visual-word">
                  {index === 0 && "STRENGTH"}
                  {index === 1 && "ENERGY"}
                  {index === 2 && "POWER"}
                </div>
              </div>

              <div className="featured-card-info">
                <div>
                  <h3>{fitnessClass.name}</h3>
                  <p>{fitnessClass.duration} MIN · {fitnessClass.difficulty}</p>
                </div>

                <span className="featured-card-arrow">
                  <ArrowUpRight size={20} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta-section">
        <div className="cta-content">
          <span className="section-label">03 — YOUR NEXT MOVE</span>
          <h2>
            READY TO
            <br />
            <span>SHOW UP?</span>
          </h2>
          <p>
            You don't need to be ready. You just need to start.
            Find your session and take the first step.
          </p>
          <Link to="/classes" className="button-dark">
            Start Training <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
