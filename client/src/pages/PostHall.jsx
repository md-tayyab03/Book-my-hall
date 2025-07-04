import React, { useState } from "react";
import { auth } from "../firebase";

export default function PostHall() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = "";
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "your-upload-preset"); // Replace with your preset name

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/your-cloud-name/image/upload", // Replace with your cloud name
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
          images: [imageUrl]
        })
      });
      if (response.ok) {
        setMessage("Hall posted successfully!");
        setName(""); setAddress(""); setPrice(""); setFile(null);
      } else {
        const data = await response.json();
        setMessage(data.error || "Failed to post hall.");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>Post a New Hall</h2>
      <input
        type="text"
        placeholder="Hall Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        style={{ width: "100%", marginBottom: 8 }}
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={e => setAddress(e.target.value)}
        required
        style={{ width: "100%", marginBottom: 8 }}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
        required
        style={{ width: "100%", marginBottom: 8 }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={e => setFile(e.target.files[0])}
        style={{ width: "100%", marginBottom: 8 }}
      />
      <button type="submit">Post Hall</button>
      {message && <p>{message}</p>}
    </form>
  );
}