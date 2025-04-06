
import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ onPrediction }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [predictionResult, setPredictionResult] = useState(null);

    // Backend API Endpoint
    const API_URL = "https://building-crack-classification-backend-1.onrender.com/predict/";

    /** Handles file selection */
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(file));
            setError(null);
            setPredictionResult(null);
        }
    };

    /** Handles form submission and sends image to backend */
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            setError("❌ Please select an image first.");
            return;
        }

        setLoading(true);
        setError(null);
        setPredictionResult(null);

        const formData = new FormData();
        formData.append('file', selectedFile);

        console.log("🔄 Uploading image to backend:", API_URL);

        try {
            const response = await axios.post(API_URL, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            console.log("✅ Server Response:", response.data);

            if (response.data && response.data.prediction) {
                setPredictionResult(response.data.prediction);
                if (typeof onPrediction === 'function') {
                    onPrediction(response.data);
                }
            } else {
                setError("⚠️ Invalid response from the server.");
            }
        } catch (err) {
            console.error("❌ Upload error:", err);
            setError("⚠️ Error uploading the image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2>🖼 Upload an Image for Classification</h2>

            <form onSubmit={handleSubmit} style={styles.form}>
                <input type="file" accept="image/*" onChange={handleFileChange} style={styles.fileInput} />
                
                <button type="submit" disabled={loading} style={loading ? styles.buttonDisabled : styles.button}>
                    {loading ? "🔄 Processing..." : "📊 Classify"}
                </button>
            </form>

            {loading && <p style={styles.infoText}>⏳ Please wait, classifying...</p>}
            {error && <p style={styles.errorText}>{error}</p>}
            {predictionResult && <p style={styles.successText}>✅ Result: {predictionResult}</p>}

            {previewImage && (
                <img src={previewImage} alt="Selected" style={styles.imagePreview} />
            )}
        </div>
    );
};

// **💡 Styles for better UI/UX**
const styles = {
    container: {
        textAlign: "center",
        padding: "20px",
        maxWidth: "500px",
        margin: "auto",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px"
    },
    fileInput: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        cursor: "pointer"
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        color: "#fff",
        backgroundColor: "#007bff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "0.3s",
    },
    buttonDisabled: {
        padding: "10px 20px",
        fontSize: "16px",
        color: "#fff",
        backgroundColor: "#cccccc",
        border: "none",
        borderRadius: "5px",
        cursor: "not-allowed",
    },
    imagePreview: {
        width: "100%",
        maxWidth: "300px",
        marginTop: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    errorText: {
        color: "red",
        fontWeight: "bold"
    },
    successText: {
        color: "green",
        fontWeight: "bold"
    },
    infoText: {
        color: "#555",
        fontStyle: "italic"
    }
};

export default ImageUpload;

