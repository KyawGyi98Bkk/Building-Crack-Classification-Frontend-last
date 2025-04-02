import React from 'react';

const ResultDisplay = ({ prediction }) => {
    if (!prediction) return <p>No classification yet.</p>;

    return (
        <div>
            <h2>Classification Result</h2>
            <p><strong>Prediction:</strong> {prediction.prediction}</p>
            <p><strong>Confidence:</strong> {Math.round(prediction.confidence * 100)}%</p>
        </div>
    );
};

export default ResultDisplay;
