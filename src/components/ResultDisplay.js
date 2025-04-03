<<<<<<< Updated upstream
import React from 'react';

const ResultDisplay = ({ prediction }) => {
    if (!prediction) {
        return <p>No prediction available.</p>;
    }

    return (
        <div>
            <h2>Classification Result</h2>
            <p><strong>Damage Level:</strong> {prediction.prediction}</p>
            <p><strong>Confidence:</strong> {(prediction.confidence * 100).toFixed(2)}%</p>
        </div>
    );
};

export default ResultDisplay;
=======
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
>>>>>>> Stashed changes
