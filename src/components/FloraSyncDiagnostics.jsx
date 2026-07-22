import React, { useState } from 'react';

function FloraSyncDiagnostics() {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
      setReportData(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setReportData(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.status === "success") {
        setReportData(result.data);

        // Save entry to scan history for dashboard stats
        const currentHistory = JSON.parse(localStorage.getItem('scanHistory') || '[]');
        const newEntry = {
          plant_type: result.data.plant_type,
          disease_detected: result.data.disease_detected,
          severity: result.data.severity,
          confidence: result.data.confidence,
          date: new Date().toLocaleDateString()
        };
        localStorage.setItem('scanHistory', JSON.stringify([newEntry, ...currentHistory]));
      } else {
        setError(result.analysis || "An unknown backend error occurred.");
      }
    } catch (err) {
      setError(err.message || "Failed to connect to the backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>🌱 FloraSync Diagnostics</h2>
      
      {/* File Upload Section */}
      <div style={{ border: '1px dashed #ccc', padding: '20px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
        <input type="file" onChange={handleFileChange} id="fileInput" style={{ display: 'none' }} />
        <label htmlFor="fileInput" style={{ cursor: 'pointer', background: '#e6f4ea', padding: '8px 16px', borderRadius: '4px', color: '#137333' }}>
          Choose File
        </label>
        <span style={{ marginLeft: '10px' }}>{file ? file.name : 'No file selected'}</span>
      </div>

      {/* Image Preview Container */}
      {imagePreview && (
        <div style={{ background: '#1a1a1a', padding: '15px', borderRadius: '8px', textAlign: 'center', marginBottom: '20px' }}>
          <img src={imagePreview} alt="Preview" style={{ maxHeight: '350px', maxWidth: '100%', borderRadius: '4px' }} />
        </div>
      )}

      {/* Action Button */}
      <button 
        onClick={handleAnalyze} 
        disabled={loading || !file} 
        style={{ width: '100%', padding: '12px', background: '#0f9d58', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '20px' }}
      >
        {loading ? 'Analyzing Content...' : 'Analyze Image 🚀'}
      </button>

      {/* Error Message */}
      {error && (
        <div style={{ padding: '15px', background: '#fce8e6', border: '1px solid #fad2cf', borderRadius: '6px', color: '#c5221f', marginBottom: '20px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Structured Output Layout */}
      {reportData && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Top Banner Alert Component */}
          <div style={{ background: '#fce8e6', border: '1px solid #fad2cf', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ fontSize: '24px' }}>🛡️</div>
            <div>
              <h3 style={{ color: '#c5221f', margin: '0 0 4px 0' }}>Disease Detected</h3>
              <p style={{ color: '#a51d19', margin: 0, fontWeight: 'bold' }}>{reportData.disease_detected}</p>
            </div>
          </div>

          {/* Analysis Details Card */}
          <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', background: '#fff' }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#202124' }}>Analysis Details</h4>
            
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '14px', color: '#5f6368' }}>
                <span>Confidence</span>
                <span style={{ fontWeight: 'bold', color: '#137333' }}>{reportData.confidence}</span>
              </div>
              <div style={{ background: '#f1f3f4', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ background: '#137333', height: '100%', width: reportData.confidence }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f3f4', paddingTop: '10px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#70757a' }}>Plant Type</div>
                <strong style={{ color: '#202124' }}>{reportData.plant_type}</strong>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#70757a' }}>Severity</div>
                <span style={{ background: '#fef7e0', color: '#b06000', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
                  {reportData.severity}
                </span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #f1f3f4', marginTop: '10px', paddingTop: '10px', fontSize: '14px', color: '#202124' }}>
              📉 <span>Estimated yield loss if untreated:</span> <strong style={{ marginLeft: '5px' }}>{reportData.yield_loss}</strong>
            </div>
          </div>

          {/* Timeframe Urgency Warning Block */}
          <div style={{ background: '#fef7e0', border: '1px solid #feebd0', borderRadius: '8px', padding: '15px', color: '#b06000', display: 'flex', gap: '10px' }}>
            <span>⚠️</span>
            <div>
              <strong style={{ display: 'block' }}>{reportData.timeframe_warning}</strong>
              <span style={{ fontSize: '13px' }}>The disease is active. Early treatment reduces crop degradation risks substantially.</span>
            </div>
          </div>

          {/* Description Card Component */}
          <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', background: '#fff' }}>
            <h4 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px', color: '#137333' }}>
              🍃 Description
            </h4>
            <p style={{ margin: 0, color: '#3c4043', lineHeight: '1.5', fontSize: '15px' }}>{reportData.description}</p>
          </div>

          {/* Recommended Treatments */}
          <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', background: '#fff' }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#e47200' }}>🛡️ Recommended Treatment</h4>
            
            <div style={{ background: '#f4fbf7', border: '1px solid #e6f4ea', padding: '15px', borderRadius: '6px', marginBottom: '15px' }}>
              <h5 style={{ margin: '0 0 10px 0', color: '#137333' }}>🌿 Low-Cost / Home Remedies</h5>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#3c4043', fontSize: '14px', lineHeight: '1.6' }}>
                {reportData.home_remedies?.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>

            <div style={{ background: '#fffdf4', border: '1px solid #fef7e0', padding: '15px', borderRadius: '6px' }}>
              <h5 style={{ margin: '0 0 10px 0', color: '#b06000' }}>🧪 Chemical Treatment</h5>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#3c4043', fontSize: '14px', lineHeight: '1.6' }}>
                {reportData.chemical_treatments?.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          </div>

          {/* Prevention Steps */}
          <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', background: '#fff' }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#202124' }}>✅ Prevent This in Future Seasons</h4>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {reportData.prevention_steps?.map((step, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#3c4043' }}>
                  <input type="checkbox" checked readOnly style={{ marginTop: '3px' }} />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
}

export default FloraSyncDiagnostics;