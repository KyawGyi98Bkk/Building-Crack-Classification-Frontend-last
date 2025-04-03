<<<<<<< Updated upstream
import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ onPrediction }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    // Handle form submission and send image to backend
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setError("Please select an image first.");
            return;
        }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post(
                'https://building-crack-classification-backend-1.onrender.com/predict',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            // Check if the backend response is valid
            if (response.data && response.data.prediction) {
                onPrediction(response.data);
            } else {
                setError("Invalid response from the server.");
            }
        } catch (err) {
            setError("Error in uploading the image. Please try again.");
            console.error("Upload error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Upload an Image</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button type="submit" disabled={loading}>Classify</button>
            </form>
            {loading && <p>Processing...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {previewImage && <img src={previewImage} alt="Selected" style={{ width: '300px', marginTop: '10px' }} />}
        </div>
    );
};

export default ImageUpload;

=======
import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ onPrediction }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError('Please select an image.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post(
        'https://building-crack-classification-backend-1.onrender.com/predict',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      onPrediction(response.data);
    } catch (err) {
      setError('Error in uploading the image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload an Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>Upload</button>
      </form>
      {loading && <p>Processing...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {previewImage && <img src={previewImage} alt="Preview" style={{ width: '300px' }} />}
    </div>
  );
};

export default ImageUpload;
>>>>>>> Stashed changes
