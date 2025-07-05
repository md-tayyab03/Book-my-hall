import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

const FALLBACK_IMAGE = "https://via.placeholder.com/400x200?text=No+Image";

export default function MyPostings() {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [editingHall, setEditingHall] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [category, setCategory] = useState("");

  const fetchMyHalls = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const token = await user.getIdToken();
    const res = await fetch("http://localhost:5000/api/halls", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const allHalls = await res.json();
    setHalls(allHalls.filter(hall => hall.ownerId === user.uid));
    setLoading(false);
  };

  useEffect(() => {
    fetchMyHalls();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    let imageUrl = "";
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "unsigned_preset"); // Use your actual preset

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dilfjz7tv/image/upload", // Use your actual cloud name
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      imageUrl = data.secure_url;
      console.log("Cloudinary upload response:", data);
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        setMessage("You must be logged in as an owner to post a hall.");
        return;
      }
      const token = await user.getIdToken();
      console.log("Submitting with category:", category);
      const response = await fetch("http://localhost:5000/api/halls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          address,
          price,
          category, // add this line
          images: [imageUrl]
        })
      });
      if (response.ok) {
        const newHall = await response.json();
        setHalls([newHall, ...halls]);
        setName(""); setAddress(""); setPrice(""); setFile(null);
        setMessage("Hall posted successfully!");
      } else {
        const data = await response.json();
        setMessage(data.error || "Failed to post hall.");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  const handleDelete = async (hallId) => {
    console.log('Delete clicked for hall:', hallId);
    if (!window.confirm("Are you sure you want to delete this hall?")) return;
    try {
      const user = auth.currentUser;
      if (!user) {
        alert('No user logged in.');
        return;
      }
      const token = await user.getIdToken();
      const response = await fetch(`http://localhost:5000/api/halls/${hallId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Delete response status:', response.status);
      if (response.ok) {
        setHalls(halls.filter(hall => hall._id !== hallId));
        console.log('Hall deleted from UI.');
      } else {
        let errorMsg = 'Failed to delete hall.';
        let errorText = await response.text();
        try {
          const data = JSON.parse(errorText);
          if (data && data.error) errorMsg += ' ' + data.error;
          else errorMsg += ' ' + errorText;
        } catch {
          errorMsg += ' ' + errorText;
        }
        alert(errorMsg);
        console.error('Delete error:', errorMsg);
      }
    } catch (err) {
      alert("Error deleting hall: " + err.message);
      console.error('Delete exception:', err);
    }
  };

  const handleEdit = (hall) => {
    setEditingHall(hall);
    setEditName(hall.name);
    setEditAddress(hall.address);
    setEditPrice(hall.price);
  };

  return (
    <div style={{ maxWidth: 1100, margin: "2rem auto", padding: '0 1rem' }}>
      <h2>Post a New Hall</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 32, background: '#f7f7f7', padding: 16, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
        <input
          type="text"
          placeholder="Hall Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />
        <select
  value={category}
  onChange={e => setCategory(e.target.value)}
  required
  style={{ width: "100%", marginBottom: 8, padding: 8 }}
>
  <option value="">Select Category</option>
  <option value="Wedding Halls">Wedding Halls</option>
  <option value="Party Halls">Party Halls</option>
  <option value="Conference Halls">Conference Halls</option>
  <option value="Others">Others</option>
</select>
        <input
          type="file"
          accept="image/*"
          onChange={e => {
            setFile(e.target.files[0]);
            console.log("Selected file:", e.target.files[0]);
          }}
          style={{ width: "100%", marginBottom: 8 }}
        />
        <button type="submit" style={{ padding: '8px 16px', background: '#3182ce', color: 'white', border: 'none', borderRadius: 4, fontWeight: 600, fontSize: 16 }}>Post Hall</button>
        {message && <p style={{ color: message.includes('success') ? 'green' : 'red', marginTop: 8 }}>{message}</p>}
      </form>
      <button
  onClick={fetchMyHalls}
  style={{ marginBottom: 16, padding: '6px 12px', background: '#3182ce', color: 'white', border: 'none', borderRadius: 4, fontWeight: 600 }}
>
  Refresh My Halls
</button>
      <h2>My Recent Halls</h2>
      {/* Responsive styles for cards and buttons */}
      <style>{`
        @media (max-width: 600px) {
          .responsive-card {
            width: 100% !important;
            min-width: 0 !important;
            max-width: 100% !important;
          }
          .responsive-btn-group {
            flex-direction: column !important;
            gap: 8px !important;
          }
          .responsive-btn-group button {
            width: 100% !important;
            min-width: 0 !important;
          }
        }
      `}</style>
      {loading ? (
        <p>Loading...</p>
      ) : halls.length === 0 ? (
        <p>No halls posted yet.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'flex-start' }}>
          {halls.map(hall => (
            <div key={hall._id} className="responsive-card" style={{ border: "1px solid #e2e8f0", margin: 0, padding: 0, borderRadius: 12, background: '#fff', width: '100%', maxWidth: 250, minWidth: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.09)', display: 'flex', flexDirection: 'column', overflow: 'hidden', transition: 'box-shadow 0.2s', minHeight: 260, flex: '1 1 250px' }}>
              <img
                src={hall.images && hall.images.length > 0 && hall.images[0] ? hall.images[0] : FALLBACK_IMAGE}
                alt="hall image"
                style={{ width: '100%', height: 110, objectFit: 'cover', background: '#f1f1f1' }}
                onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE; }}
              />
              <div style={{ padding: '12px 12px 8px 12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: 16, fontWeight: 700, color: '#2d3748', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{hall.name}</h3>
                  <p style={{ margin: '0 0 4px 0', color: '#4a5568', fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{hall.address}</p>
                  <p style={{ margin: 0, color: '#2b6cb0', fontWeight: 600, fontSize: 13 }}>₹{hall.price}</p>
                  <p style={{ color: hall.status === 'booked' ? 'red' : 'green', fontWeight: 600 }}>
                    {hall.status === 'booked' ? 'Booked' : 'Available'}
                  </p>
                </div>
                <div className="responsive-btn-group" style={{
  display: 'flex',
  gap: 8,
  marginTop: 'auto',
  width: '100%',
  background: 'transparent',
  zIndex: 1
}}>
  <button
    onClick={() => handleEdit(hall)}
    style={{
      flex: 1,
      background: '#f6ad55',
      color: '#222',
      border: 'none',
      borderRadius: 4,
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: 14,
      height: 40,
      outline: 'none',
      minWidth: 0
    }}
  >
    Edit
  </button>
  <button
    onClick={() => handleDelete(hall._id)}
    style={{
      flex: 1,
      background: '#e53e3e',
      color: 'white',
      border: 'none',
      borderRadius: 4,
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: 14,
      height: 40,
      outline: 'none',
      minWidth: 0
    }}
  >
    Delete
  </button>
</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {editingHall && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            console.log("Submitting edit for hall:", editingHall._id, editName, editAddress, editPrice);
            const user = auth.currentUser;
            if (!user) return;
            const token = await user.getIdToken();
            const response = await fetch(`http://localhost:5000/api/halls/${editingHall._id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify({
                name: editName,
                address: editAddress,
                price: editPrice
              })
            });
            if (response.ok) {
              const updated = await response.json();
              setHalls(halls.map(h => h._id === updated._id ? updated : h));
              setEditingHall(null);
            } else {
              const errorText = await response.text();
              console.log("Edit error response:", errorText);
              alert("Failed to update hall.");
            }
          }}
          style={{ marginTop: 24, background: '#f7f7f7', padding: 16, borderRadius: 8 }}
        >
          <h3>Edit Hall</h3>
          <input
            type="text"
            value={editName}
            onChange={e => setEditName(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 8, padding: 8 }}
          />
          <input
            type="text"
            value={editAddress}
            onChange={e => setEditAddress(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 8, padding: 8 }}
          />
          <input
            type="number"
            value={editPrice}
            onChange={e => setEditPrice(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 8, padding: 8 }}
          />
          <button type="submit" style={{ padding: '8px 16px', background: '#3182ce', color: 'white', border: 'none', borderRadius: 4, fontWeight: 600, fontSize: 16, marginRight: 8 }}>Save</button>
          <button type="button" onClick={() => setEditingHall(null)} style={{ padding: '8px 16px', background: '#e53e3e', color: 'white', border: 'none', borderRadius: 4, fontWeight: 600, fontSize: 16 }}>Cancel</button>
        </form>
      )}
    </div>
  );
}