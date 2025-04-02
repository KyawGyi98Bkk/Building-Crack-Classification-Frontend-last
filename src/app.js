import React, { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import ResultDisplay from "./components/ResultDisplay";
import "./App.css";

function app() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle the prediction data coming from the backend
  const handlePrediction = (data) => {
    setLoading(false);
    if (data && data.prediction) {
      setPrediction(data);
      setError(null);
    } else {
      setError("Invalid response from server.");
      setPrediction(null);
    }
  };

  // Function to handle loading state
  const handleLoading = () => {
    setLoading(true);
    setError(null);
  };

  return (
    <div className="app">
      <h1>Building Crack Classification</h1>
      <div className="container">
        <ImageUpload onPrediction={handlePrediction} onLoading={handleLoading} />
        {loading && <p className="loading">Processing image, please wait...</p>}
        {error && <p className="error">{error}</p>}
        <ResultDisplay prediction={prediction} />
      </div>
    </div>
  );
}

export default app;
