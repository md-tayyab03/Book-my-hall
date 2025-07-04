import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

console.log("Rendering MyBookings component");

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError("");
      try {
        const user = auth.currentUser;
        console.log("Current user:", user);
        if (!user) {
          setError("You must be logged in to view your bookings.");
          setLoading(false);
          return;
        }
        const token = await user.getIdToken();
        console.log("Fetching bookings with token:", token);
        const res = await fetch("http://localhost:5000/api/bookings", {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("GET /api/bookings status:", res.status);
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        console.log("Fetched bookings:", data);
        setBookings(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching bookings:", err);
      }
      setLoading(false);
    };
    fetchBookings();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>My Bookings</h2>
      {loading ? <p>Loading...</p> : null}
      {error ? <p style={{ color: 'red' }}>{error}</p> : null}
      {(!loading && bookings.length === 0 && !error) ? <p>No bookings found.</p> : null}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {bookings.map((booking) => (
          <li key={booking._id} style={{ border: '1px solid #e2e8f0', borderRadius: 8, marginBottom: 16, padding: 16 }}>
            <div><b>Hall ID:</b> {booking.hallId}</div>
            <div><b>Name:</b> {booking.guestFirstName} {booking.guestLastName}</div>
            <div><b>Email:</b> {booking.guestEmail}</div>
            <div><b>Mobile:</b> {booking.guestMobile}</div>
            <div><b>Guests:</b> {booking.guestsCount}</div>
            <div><b>Date:</b> {booking.checkInDate}</div>
            <div><b>Time:</b> {booking.checkInTime}</div>
            <div><b>Status:</b> {booking.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
