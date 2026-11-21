
const STORAGE_KEY = "pulsefit_bookings";

// Get all bookings from localStorage
export function getBookings() {
  const savedBookings = localStorage.getItem(STORAGE_KEY);

  if (!savedBookings) {
    return [];
  }

  return JSON.parse(savedBookings);
}

// Save all bookings
export function saveBookings(bookings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

// Add a new booking
export function addBooking(booking) {
  const bookings = getBookings();

  bookings.push(booking);

  saveBookings(bookings);

  return booking;
}

// Cancel/remove a booking
export function cancelBooking(bookingId) {
  const bookings = getBookings();

  const updatedBookings = bookings.filter(
    (booking) => booking.id !== bookingId
  );

  saveBookings(updatedBookings);
}
