
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Clock, XCircle } from "lucide-react";
import { getBookings, cancelBooking } from "../services/bookingService";

function MyBookings() {
  const [bookings, setBookings] = useState(getBookings());

  function handleCancel(bookingId) {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    cancelBooking(bookingId);
    setBookings(getBookings());
  }

  return (
    <main className="my-bookings-page">
      <section className="my-bookings-header">
        <div className="section-label">PULSEFIT STUDIO — YOUR TRAINING</div>

        <h1>
          MY
          <br />
          <span>BOOKINGS.</span>
        </h1>

        <p>Manage your sessions and keep your training on track.</p>
      </section>

      <section className="my-bookings-content">
        {bookings.length > 0 ? (
          <div className="my-bookings-grid">
            {bookings.map((booking) => (
              <article className="my-booking-card" key={booking.id}>
                <div className="my-booking-top">
                  <span className="my-booking-status">
                    {booking.status || "Confirmed"}
                  </span>

                  <span className="my-booking-id">{booking.id}</span>
                </div>

                <h2>{booking.className}</h2>

                <p className="my-booking-trainer">
                  TRAINER: {booking.trainer}
                </p>

                <div className="my-booking-info">
                  <div>
                    <CalendarDays size={16} />
                    <span>{booking.session}</span>
                  </div>

                  <div>
                    <Clock size={16} />
                    <span>Session booked</span>
                  </div>
                </div>

                <div className="my-booking-bottom">
                  <strong>
                    Rs. {Number(booking.price).toLocaleString()}
                  </strong>

                  <button
                    className="cancel-booking-button"
                    onClick={() => handleCancel(booking.id)}
                  >
                    Cancel Booking <XCircle size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="my-bookings-empty">
            <div className="section-label">NOTHING SCHEDULED YET</div>

            <h2>
              YOUR TRAINING
              <br />
              <span>STARTS HERE.</span>
            </h2>

            <p>
              You haven't booked any sessions yet.
              Explore our classes and reserve your spot.
            </p>

            <Link to="/classes" className="button-primary">
              Explore Classes <ArrowRight size={17} />
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

export default MyBookings;
