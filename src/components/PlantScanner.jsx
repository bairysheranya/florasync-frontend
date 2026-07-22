import React, { useState } from 'react';

export default function PlantScanner() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!image) {
      setError("Please upload an image first!");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', image);

    try {
      // Pulls dynamically from your .env file
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:10000';
      
      const response = await fetch(`${apiUrl}/api/v1/scans/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Analysis failed. Please verify your backend server is active and CORS is configured.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#2e7d32' }}>FloraSync Leaf Analysis</h2>
      
      <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginBottom: '15px' }} />
      
      {image && (
        <div style={{ marginBottom: '15px' }}>
          <img src={URL.createObjectURL(image)} alt="Preview" style={{ width: '100%', borderRadius: '8px' }} />
        </div>
      )}

      <button 
        onClick={handleAnalyze} 
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: loading ? '#a5d6a7' : '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        {loading ? 'Analyzing Leaf Patterns...' : 'Analyze Image 🚀'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f1f8e9', borderRadius: '8px', border: '1px solid #c5e1a5' }}>
          <h3 style={{ color: '#33691e', marginTop: 0 }}>Diagnosis Results</h3>
          <p><strong>Species:</strong> {result.plant_species}</p>
          <p><strong>Healthy:</strong> {result.is_healthy ? 'Yes ✅' : 'No ❌'}</p>
          {result.disease_name && <p><strong>Disease Name:</strong> {result.disease_name}</p>}
          {result.severity && <p><strong>Severity Level:</strong> {result.severity}</p>}
          {result.confidence_score && <p><strong>Confidence:</strong> {(result.confidence_score * 100).toFixed(1)}%</p>}
          {result.treatment_advice && (
            <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed #aebfbe' }}>
              <strong>Treatment Advice:</strong>
              <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#555' }}>{result.treatment_advice}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}