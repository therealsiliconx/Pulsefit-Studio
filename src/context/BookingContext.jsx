// src/context/BookingContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { calculateOrderSummary, canAddToCart } from "../utils/bookingRules";

const BookingContext = createContext();
const CART_STORAGE_KEY = "pulsefit_cart_v1";
const BOOKINGS_STORAGE_KEY = "pulsefit_bookings_v1";

export function BookingProvider({ children }) {
  // 1. Cart Selection State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 2. Confirmed Bookings History
  const [confirmedBookings, setConfirmedBookings] = useState(() => {
    try {
      const saved = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist Cart
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Persist Confirmed Bookings
  useEffect(() => {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(confirmedBookings));
  }, [confirmedBookings]);

  // Actions
  function addToCart(classItem, quantity = 1) {
    const existingIndex = cart.findIndex((item) => item.id === classItem.id);
    const currentQty = existingIndex > -1 ? cart[existingIndex].quantity : 0;
    
    // Enforce business rules before adding
    const check = canAddToCart(classItem, currentQty + quantity);
    if (!check.allowed) {
      return { success: false, reason: check.reason };
    }

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      setCart(updated);
    } else {
      setCart([...cart, { ...classItem, quantity }]);
    }
    return { success: true };
  }

  function updateQuantity(classId, targetQty, availableSpots) {
    if (targetQty <= 0) {
      removeFromCart(classId);
      return;
    }
    if (targetQty > availableSpots) return;

    setCart(cart.map((item) => 
      item.id === classId ? { ...item, quantity: targetQty } : item
    ));
  }

  function removeFromCart(classId) {
    setCart(cart.filter((item) => item.id !== classId));
  }

  function clearCart() {
    setCart([]);
  }

  function confirmBooking(customerData) {
    const summary = calculateOrderSummary(cart);
    const newBooking = {
      id: "PF-" + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      customer: customerData,
      items: [...cart],
      summary,
      status: "Confirmed"
    };

    setConfirmedBookings((prev) => [newBooking, ...prev]);
    clearCart();
    return newBooking;
  }

  function cancelBooking(bookingId) {
    setConfirmedBookings((prev) => prev.filter((b) => b.id !== bookingId));
  }

  const summary = calculateOrderSummary(cart);

  return (
    <BookingContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        summary,
        confirmedBookings,
        confirmBooking,
        cancelBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}