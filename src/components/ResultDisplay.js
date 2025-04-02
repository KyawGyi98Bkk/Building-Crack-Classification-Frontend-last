import React from 'react';

const ResultDisplay = ({ prediction }) => {
    if (!prediction) return null;

    return (
        <div>
            <h2>Prediction Result</h2>
            <p><strong>Damage Level:</strong> {prediction.prediction}</p>
            <p><strong>Confidence:</strong> {prediction.confidence}</p>
        </div>
    );
};

export default ResultDisplay;


  