import React, { useState } from 'react';
import axios from 'axios';
import DicomViewer from './DicomViewer';
import PredictionResults from './PredictionResults';

const Home = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setResult(null); // reset result on new file upload
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please upload a DICOM (.dcm) file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(response.data);
    } catch (error) {
      console.error("Prediction failed:", error);
      alert("Prediction failed. Check backend or CORS settings.");
    }
  };

  return (
    <section id="home" style={{ ...styles.home, paddingTop: '150px', marginTop: '-100px' }}>
      <div style={styles.overlay}>
        <h1>Welcome,</h1>
        <p>
          We present you the solution for the early detection and management of lumbar spinal stenosis. 
          Our innovative platform utilizes Deep Learning techniques to analyze MRI images and provide 
          accurate assessments to help healthcare professionals make informed decisions.
        </p>

        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <input type="file" accept=".dcm" onChange={handleFileChange} />
          <button type="submit" style={styles.uploadBtn}>Predict</button>
        </form>

        {file && (
          <div style={{ marginTop: '30px' }}>
            <h3>Image Preview:</h3>
            <DicomViewer file={file} />
          </div>
        )}

        {result && (
          <div style={{ marginTop: '30px', backgroundColor: '#222', padding: '20px', borderRadius: '10px' }}>
            <PredictionResults results={result} />
          </div>
        )}
      </div>
    </section>
  );
};

const styles = {
  home: {
    backgroundImage: 'url("bg.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'relative',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: '70px',
    borderRadius: '10px',
    maxWidth: '700px',
    position: 'relative',
    top: '-40px',
  },
  uploadBtn: {
    marginLeft: '10px',
    padding: '8px 16px',
    backgroundColor: '#00bcd4',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer'
  }
};

export default Home;
