// components/Alerts.jsx

"use client";

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet library
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import styles from '../../styles/Alerts.module.css'; // Import the consolidated CSS module

const MapComponent = ({ alerts }) => {
  // Define the custom icon using CDN URL
  const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', // CDN URL for the icon
    iconSize: [25, 41], // Size of the icon
    iconAnchor: [12, 41], // Anchor point of the icon (relative to its size)
    popupAnchor: [0, -41] // Anchor point of the popup relative to the icon
  });

  return (
    <div className={styles.mapContainer}>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} className={styles.map}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {alerts.map((alert, index) => (
          <Marker
            key={index}
            position={getCoordinates(alert.region)}
            icon={customIcon} // Use custom icon
          >
            <Popup>
              <strong>{alert.crop}</strong><br />
              Disease: {alert.disease}<br />
              Date: {alert.date}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

// Function to convert region to coordinates
const getCoordinates = (region) => {
  const coordinates = {
    Punjab: [31.1471, 75.3412],
    Haryana: [29.0588, 76.0856],
    Karnataka: [15.3173, 75.7139],
    "Andhra Pradesh": [15.9129, 79.7400],
    Maharashtra: [19.6633, 75.3],
    "West Bengal": [22.9868, 87.8550],
    "Madhya Pradesh": [23.4734, 77.9450],
    "Tamil Nadu": [11.1271, 78.6569],
    "Uttar Pradesh": [26.8467, 80.9462],
    Gujarat: [22.2587, 71.1924],
    Odisha: [20.9517, 85.0985],
    Bihar: [25.0961, 85.3131],
    "Karnataka": [15.3173, 75.7139] // Added multiple entries for Karnataka
  };
  return coordinates[region] || [20.5937, 78.9629]; // Default to central India if region not found
};

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
          <option value="">All Crops</option>
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
