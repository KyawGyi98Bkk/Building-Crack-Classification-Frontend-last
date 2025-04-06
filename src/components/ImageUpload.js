import React from 'react';

const ResultDisplay = ({ prediction }) => {
  console.log("🧪 Prediction received in ResultDisplay:", prediction);

  const damageLevel = prediction.class || prediction?.prediction?.class;
  const confidence = prediction.confidence || prediction?.prediction?.confidence;

  return (
    <div style={styles.result}>
      <h2>📊 Classification Result</h2>
      <p><strong>Damage Level:</strong> {damageLevel || "N/A"}</p>
      <p><strong>Confidence:</strong> {(confidence * 100).toFixed(2)}%</p>
    </div>
  );
};

const styles = {
  result: {
    backgroundColor: "#d4fcd4",
    padding: "20px",
    marginTop: "20px",
    borderRadius: "10px",
    maxWidth: "500px",
    margin: "auto",
    textAlign: "center",
    border: "1px solid #aaa"
  }
};

export default ResultDisplay;
