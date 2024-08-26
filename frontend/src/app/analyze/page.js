"use client";

import { useState } from 'react';
import styles from '../../styles/CropAnalysis.module.css';

export default function CropAnalysis() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleDiagnosis = () => {
    // Mock API call - replace with actual API integration
    setDiagnosis('Blight');
    setTreatment('Use fungicides containing copper or organic solutions like neem oil.');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Crop Disease Analysis</h2>
      <p className={styles.instructions}>Upload an image of your crop to receive a diagnosis and treatment recommendations.</p>
      <div className={styles.uploadSection}>
        <input type="file" onChange={handleImageUpload} className={styles.fileInput} />
        {selectedImage && (
          <div className={styles.imagePreview}>
            <img src={selectedImage} alt="Selected Crop" />
          </div>
        )}
        <button className={styles.analyzeButton} onClick={handleDiagnosis} disabled={!selectedImage}>
          Analyze Crop
        </button>
      </div>
      {diagnosis && (
        <div className={styles.resultSection}>
          <h3>Diagnosis: {diagnosis}</h3>
          <p>Treatment Recommendations: {treatment}</p>
        </div>
      )}
    </div>
  );
}
