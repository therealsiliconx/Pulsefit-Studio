
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  User,
  CalendarDays,
  CheckCircle,
} from "lucide-react";

import classes from "../data/classes";
import { addBooking } from "../services/bookingService";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the selected class
  const selectedClass = classes.find(
    (fitnessClass) => String(fitnessClass.id) === String(id)
  );

  // Customer form information
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    session: "",
  });

  const [error, setError] = useState("");
  const [bookingComplete, setBookingComplete] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Update form fields
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
  }

  // Submit booking
  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!formData.session) {
      setError("Please select a training session.");
      return;
    }

    if (!selectedClass) {
      setError("The selected class could not be found.");
      return;
    }

    if (selectedClass.availableSpots <= 0) {
      setError("Sorry, this class is fully booked.");
      return;
    }

    // Generate a booking ID
    const bookingId =
      "PF-" + Math.floor(10000 + Math.random() * 90000);

    // Create booking object
    const newBooking = {
      id: bookingId,
      classId: selectedClass.id,
      className: selectedClass.name,
      trainer: selectedClass.trainer,
      customerName: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      session: formData.session,
      price: selectedClass.price,
      status: "Confirmed",
    };

    // Save booking
    addBooking(newBooking);

    setConfirmedBooking(newBooking);
    setBookingComplete(true);
  }

  // Class not found
  if (!selectedClass) {
    return (
      <main className="placeholder-page">
        <div className="section-label">PULSEFIT STUDIO — BOOKING</div>

        <h1>
          CLASS NOT
          <br />
          <span>FOUND.</span>
        </h1>

        <p>
          We could not find the class you are trying to book.
          Please return to our classes page.
        </p>

        <Link to="/classes" className="button-primary">
          <ArrowLeft size={17} /> Browse Classes
        </Link>
      </main>
    );
  }

  // Booking confirmation screen
  if (bookingComplete && confirmedBooking) {
    return (
      <main className="booking-page">
        <section className="booking-confirmation">
          <div className="confirmation-icon">
            <CheckCircle size={38} />
          </div>

          <div className="section-label">
            PULSEFIT STUDIO — SUCCESS
          </div>

          <h1>
            YOU'RE
            <br />
            <span>BOOKED.</span>
          </h1>

          <p>
            Your training session has been successfully reserved.
            We look forward to seeing you!
          </p>

          <div className="confirmation-details">
            <div>
              <span>BOOKING ID</span>
              <strong>{confirmedBooking.id}</strong>
            </div>

            <div>
              <span>CLASS</span>
              <strong>{confirmedBooking.className}</strong>
            </div>

            <div>
              <span>NAME</span>
              <strong>{confirmedBooking.customerName}</strong>
            </div>

            <div>
              <span>SESSION</span>
              <strong>{confirmedBooking.session}</strong>
            </div>

            <div>
              <span>PRICE</span>
              <strong>
                Rs. {confirmedBooking.price.toLocaleString()}
              </strong>
            </div>

            <div>
              <span>STATUS</span>
              <strong className="booking-status">
                CONFIRMED
              </strong>
            </div>
          </div>

          <div className="confirmation-actions">
            <Link to="/my-bookings" className="button-primary">
              My Bookings <ArrowRight size={17} />
            </Link>

            <Link to="/classes" className="back-link">
              Browse More Classes
            </Link>
          </div>
        </section>
      </main>
    );
  }

  // Booking form
  return (
    <main className="booking-page">
      <section className="booking-header">
        <div className="section-label">
          PULSEFIT STUDIO — YOUR SESSION
        </div>

        <h1>
          COMPLETE YOUR
          <br />
          <span>BOOKING.</span>
        </h1>

        <p>
          One step closer to your fitness goals.
          Fill in your details to reserve your session.
        </p>
      </section>

      <section className="booking-content">
        {/* Selected class information */}
        <div className="booking-class-summary">
          <div className="section-label">YOUR SELECTED CLASS</div>

          <h2>{selectedClass.name}</h2>

          <p>{selectedClass.description}</p>

          <div className="booking-summary-item">
            <User size={17} />
            <span>Trainer: {selectedClass.trainer}</span>
          </div>

          <div className="booking-summary-item">
            <Clock size={17} />
            <span>{selectedClass.duration} minutes</span>
          </div>

          <div className="booking-summary-item">
            <CalendarDays size={17} />
            <span>{selectedClass.schedule}</span>
          </div>

          <div className="booking-price">
            <span>SESSION PRICE</span>
            <strong>
              Rs. {selectedClass.price.toLocaleString()}
            </strong>
          </div>

          <div className="booking-availability">
            {selectedClass.availableSpots} spots available
          </div>
        </div>

        {/* Customer booking form */}
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="section-label">CUSTOMER INFORMATION</div>

          <h2>YOUR DETAILS.</h2>

          <div className="booking-input-group">
            <label htmlFor="name">FULL NAME</label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="booking-input-group">
            <label htmlFor="email">EMAIL ADDRESS</label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="booking-input-group">
            <label htmlFor="phone">PHONE NUMBER</label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="03XXXXXXXXX"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="booking-input-group">
            <label htmlFor="session">SELECT YOUR SESSION</label>

            <select
              id="session"
              name="session"
              value={formData.session}
              onChange={handleChange}
              required
            >
              <option value="">Choose a session</option>
              <option value={selectedClass.schedule}>
                {selectedClass.schedule}
              </option>
            </select>
          </div>

          {error && (
            <div className="booking-error" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="button-primary booking-submit">
            CONFIRM BOOKING <ArrowRight size={17} />
          </button>

          <Link to={`/classes/${selectedClass.id}`} className="booking-back">
            <ArrowLeft size={15} /> Back to Class Details
          </Link>
        </form>
      </section>
    </main>
  );
}

export default Booking;
