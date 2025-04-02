import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import ResultDisplay from './components/ResultDisplay';
import './App.css';

function App() {
  const [prediction, setPrediction] = useState(null);

  // Handle the prediction result
  const handlePrediction = (data) => {
    setPrediction(data);
  };

  return (
    <div className="App">
      <h1>Building Crack Classification</h1>
      <ImageUpload onPrediction={handlePrediction} />
      {prediction && <ResultDisplay prediction={prediction} />}
    </div>
  );
}

export default App;
