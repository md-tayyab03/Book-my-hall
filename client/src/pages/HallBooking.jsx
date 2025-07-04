import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

console.log("Rendering HallBooking component");

export default function HallBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const hall = location.state;
  const [form, setForm] = useState({
    guestFirstName: "",
    guestLastName: "",
    guestEmail: "",
    guestMobile: "",
    guestsCount: 1,
    checkInDate: "",
    checkInTime: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!hall) {
    return <div style={{ maxWidth: 600, margin: "2rem auto" }}><h2>No hall selected for booking.</h2></div>;
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("Booking form submitted");
    setLoading(true);
    setMessage("");
    try {
      const user = auth.currentUser;
      if (!user) {
        setMessage("You must be logged in to book.");
        setLoading(false);
        return;
      }
      const userId = user.uid;
      const payload = {
        hallId: hall._id,
        userId,
        ...form
      };
      console.log("Booking payload:", payload);
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      console.log("Booking response status:", response.status);
      if (response.ok) {
        setMessage("Booking successful!");
        setTimeout(() => navigate("/my-bookings"), 1000);
      } else {
        const data = await response.json();
        setMessage(data.error || "Booking failed");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>Book {hall.name}</h2>
      <form onSubmit={handleSubmit} style={{ background: '#f7f7f7', padding: 24, borderRadius: 8 }}>
        <input name="guestFirstName" placeholder="First Name" value={form.guestFirstName} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
        <input name="guestLastName" placeholder="Last Name" value={form.guestLastName} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
        <input name="guestEmail" placeholder="Email" type="email" value={form.guestEmail} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
        <input name="guestMobile" placeholder="Mobile" value={form.guestMobile} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
        <input name="guestsCount" placeholder="Guests Count" type="number" min="1" value={form.guestsCount} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
        <input name="checkInDate" placeholder="Check-in Date" type="date" value={form.checkInDate} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
        <input name="checkInTime" placeholder="Check-in Time" type="time" value={form.checkInTime} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
        <button type="submit" disabled={loading} style={{ background: '#3182ce', color: 'white', padding: '8px 16px', border: 'none', borderRadius: 4, fontWeight: 600 }}
          onClick={() => console.log('Book button clicked')}
        >
          {loading ? 'Booking...' : 'Book'}
        </button>
      </form>
      {message && <p style={{ color: message.includes('success') ? 'green' : 'red', marginTop: 8 }}>{message}</p>}
    </div>
  );
} 