"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import styles from '../../styles/Alerts.module.css'; // Import the consolidated CSS module

// Dynamically import MapComponent with no SSR
const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false });

const Alerts = () => {
  const [cropFilter, setCropFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');

  const alerts = [
    { region: 'Punjab', crop: 'Wheat', disease: 'Blight', date: '2024-08-10' },
    { region: 'Haryana', crop: 'Rice', disease: 'Blast', date: '2024-08-12' },
    { region: 'Karnataka', crop: 'Maize', disease: 'Mosaic Virus', date: '2024-08-15' },
    { region: "Punjab", crop: "Wheat", disease: "Yellow Rust", date: "2024-09-05" },
    { region: "Haryana", crop: "Rice", disease: "Bacterial Leaf Blight", date: "2024-09-08" },
    { region: "Karnataka", crop: "Maize", disease: "Northern Corn Leaf Blight", date: "2024-09-12" },
    { region: "Andhra Pradesh", crop: "Chilli", disease: "Anthracnose", date: "2024-09-15" },
    { region: "Maharashtra", crop: "Cotton", disease: "Boll Rot", date: "2024-09-18" },
    { region: "West Bengal", crop: "Jute", disease: "Stem Rot", date: "2024-09-22" },
    { region: "Madhya Pradesh", crop: "Soybean", disease: "Soybean Rust", date: "2024-09-10" },
    { region: "Tamil Nadu", crop: "Groundnut", disease: "Tikka Disease", date: "2024-09-14" },
    { region: "Uttar Pradesh", crop: "Sugarcane", disease: "Red Rot", date: "2024-09-17" },
    { region: "Gujarat", crop: "Cotton", disease: "Leaf Curl Virus", date: "2024-09-20" },
    { region: "Odisha", crop: "Paddy", disease: "Sheath Blight", date: "2024-09-23" },
    { region: "Bihar", crop: "Maize", disease: "Downy Mildew", date: "2024-09-26" },
    { region: "Karnataka", crop: "Coffee", disease: "Cercospora leaf spot", date: "2024-09-07" }
  ];

  const uniqueCrops = [...new Set(alerts.map(alert => alert.crop))];
  const uniqueRegions = [...new Set(alerts.map(alert => alert.region))];

  const filteredAlerts = alerts.filter(alert => {
    return (cropFilter === '' || alert.crop === cropFilter) &&
           (regionFilter === '' || alert.region === regionFilter);
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Outbreak Alerts</h2>

      <div className={styles.filterContainer}>
        <select 
          value={cropFilter} 
          onChange={e => setCropFilter(e.target.value)} 
          className={styles.filter}
        >
          <option value="" >All Crops</option>
          {uniqueCrops.map(crop => (
            <option key={crop} value={crop}>{crop}</option>
          ))}
        </select>

        <select 
          value={regionFilter} 
          onChange={e => setRegionFilter(e.target.value)} 
          className={styles.filter}
        >
          <option value="">All Regions</option>
          {uniqueRegions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      <div className={styles.alertGrid}>
        {filteredAlerts.map((alert, index) => (
          <div key={index} className={styles.alertCard}>
            <h3>{alert.crop} - {alert.disease}</h3>
            <p><strong>Region:</strong> {alert.region}</p>
            <p><strong>Date:</strong> {alert.date}</p>
          </div>
        ))}
      </div>

      <MapComponent alerts={filteredAlerts} />
    </div>
  );
};

export default Alerts;
