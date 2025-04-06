import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ onPrediction }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "https://building-crack-classification-backend-1.onrender.com/predict/";

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("❌ Please upload an image.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      console.log("✅ Backend response:", response.data);
      onPrediction(response.data);
    } catch (err) {
      console.error("❌ Error uploading image:", err);
      setError("❌ Failed to upload image. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={loading} style={{ marginLeft: "10px" }}>
          {loading ? "Classifying..." : "Classify"}
        </button>
      </form>
      {preview && <img src={preview} alt="Preview" style={{ marginTop: "20px", maxWidth: "300px" }} />}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ImageUpload;
