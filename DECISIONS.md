
# PulseFit Studio — Frontend Decisions

## Decision 1 — Class Discovery

**Problem:** Visitors have difficulty finding classes matching their goals,
experience level, and schedule.

**Decision:** Use searchable class cards with category filters,
difficulty labels, duration, and price visible before opening details.

**Alternative:** Use a separate schedule page with category links.

**Reason:** Users can compare multiple sessions quickly without
opening every class individually.

**Tradeoff:** The listing cards contain more information and require
careful responsive layout.

**Code location:** `src/pages/Classes.jsx`,
`src/components/ClassCard.jsx`

**Evidence:** `R1_discovery_problem.png`,
`A2_class_browsing.png`, `A3_search_filter.png`

---

## Decision 2 — Booking Availability and Selection

**Problem:** Users may not know whether a session has availability
or how their selection affects the booking total.

**Decision:** Show available spots, prevent selections that exceed
capacity, and display a live booking summary.

**Alternative:** Show availability only on a separate checkout page.

**Reason:** Users can make informed choices before entering their details.

**Tradeoff:** Booking state and availability validation need to be
kept consistent across pages.

**Code location:** `src/context/BookingContext.jsx`,
`src/utils/bookingRules.js`

**Evidence:** `R2_booking_information.png`,
`A5_booking_selection.png`, `A7_booking_summary.png`

---

## Decision 3 — Booking Form and Mobile Usability

**Problem:** Users may lose valid form information when correcting
errors, and booking controls can be difficult to use on smaller screens.

**Decision:** Use controlled form inputs with field-specific validation,
preserve valid input, and provide a responsive booking layout.

**Alternative:** Use a basic form that validates only after submission.

**Reason:** Users receive clearer feedback and can correct mistakes
without starting again.

**Tradeoff:** Controlled inputs and validation require additional
state and logic.

**Code location:** `src/pages/Booking.jsx`,
`src/styles/booking.css`

**Evidence:** `R3_form_problem.png`,
`A6_booking_form.png`, `A9_mobile_home.png`
