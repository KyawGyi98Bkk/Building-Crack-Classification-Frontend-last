import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import ResultDisplay from './components/ResultDisplay';
import './App.css';

function App() {
  const [prediction, setPrediction] = useState(null);

  const handlePrediction = (data) => {
    console.log("✅ Data received from backend:", data);
    setPrediction(data); // Set the actual response, not just prediction field
  };

  return (
    <div className="App">
      <h1>🏗️ Building Crack Classifier</h1>
      <ImageUpload onPrediction={handlePrediction} />
      {prediction && <ResultDisplay prediction={prediction} />}
    </div>
  );
}

export default App;
