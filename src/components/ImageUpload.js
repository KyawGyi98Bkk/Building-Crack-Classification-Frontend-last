import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ onPrediction }) => {
  const [selectedImage, setSelectedImage] = useState(null); // For displaying the selected image
  const [imageFile, setImageFile] = useState(null); // To store the file to send to backend
  const [loading, setLoading] = useState(false); // To manage the loading state during file upload
  const [error, setError] = useState(null); // To handle any upload errors

  // Handle file selection (updates both the preview image and the file)
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Creates a URL for image preview
      setImageFile(file); // Saves the actual file for uploading
    }
  };

  // Handle form submission and send the image file to backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    // If no file is selected, prevent the form submission
    if (!imageFile) {
      setError('Please select an image first!');
      return;
    }

    setLoading(true); // Start loading
    setError(null); // Reset previous error state

    const formData = new FormData();
    formData.append('image', imageFile); // Append the image file to form data

    try {
      // POST the image file to the backend for prediction
      const response = await axios.post(
        'https://building-crack-classification-backend-1.onrender.com/predict', 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Ensure it's treated as form data
          },
        }
      );

      // If the request is successful, pass the prediction data back to the parent component
      onPrediction(response.data); // Pass the prediction result to parent
    } catch (err) {
      // Handle any errors that occur during the upload process
      setError('Error uploading the image. Please try again.');
      console.error(err);
    } finally {
      // Set loading state to false once the upload attempt is finished
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Upload Image for Crack Classification</h1>
      
      {/* File upload form */}
      <form onSubmit={handleSubmit}>
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept="image/*" 
          required 
        />
        <button type="submit" disabled={loading}>Upload</button>
      </form>

      {/* Display loading message */}
      {loading && <p>Loading...</p>}

      {/* Display error message if any */}
      {error && <p>{error}</p>}

      {/* Preview the selected image */}
      {selectedImage && (
        <div>
          <h2>Preview:</h2>
          <img 
            src={selectedImage} 
            alt="Selected" 
            style={{ width: '300px', height: 'auto', marginTop: '10px' }} 
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
