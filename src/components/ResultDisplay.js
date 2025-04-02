import React from 'react';

const ResultDisplay = ({ prediction }) => {
  return (
    <div>
      <h2>Prediction Result</h2>
      <p><strong>Damage Level:</strong> {prediction.prediction}</p>
      <p><strong>Confidence:</strong> {prediction.confidence.toFixed(2)}</p>
    </div>
  );
};

export default ResultDisplay;
