import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import ResultDisplay from './components/ResultDisplay';
import './App.css';

function App() {
    const [prediction, setPrediction] = useState(null);

    // Handle incoming prediction data
    const handlePrediction = (data) => {
        console.log("Received prediction:", data);
        setPrediction(data);
    };

    return (
        <div className="App">
            <h1>Building Crack Classification</h1>
            <ImageUpload onPrediction={handlePrediction} />
            <ResultDisplay prediction={prediction} />
        </div>
    );
}

export default App;
