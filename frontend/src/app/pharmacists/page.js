"use client";
import styles from '../../styles/Pharmacists.module.css';

import React, { useState, useEffect } from 'react';

export default function Pharmacists() {
  const [location, setLocation] = useState('');
  const [pharmacists, setPharmacists] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    // Dynamically load the Google Maps script
    const loadScript = (url) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    if (!window.google) {
      loadScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyAIvOQ5TMxm9IdWuZeipj4OyASsOyiKLTo&libraries=places`);
    }

    // Initialize Google Places Autocomplete once the script is loaded
    const handleScriptLoad = () => {
      const autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('location-input'));

      autocomplete.setFields(['geometry', 'name']);
      
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        setSelectedPlace(place);
      });
    };

    // Check if the script is already loaded
    if (window.google && window.google.maps) {
      handleScriptLoad();
    } else {
      window.addEventListener('load', handleScriptLoad);
    }

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('load', handleScriptLoad);
  }, []);

  const findPharmacists = async () => {
    if (!selectedPlace || !selectedPlace.geometry) {
      alert("Please select a valid location.");
      return;
    }

    const { lat, lng } = selectedPlace.geometry.location;

    // Fetch nearby pharmacists from your backend API
    const response = await fetch('http://localhost:5000/nearby-pharmacies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat: lat(), lng: lng() }),
    });

    const data = await response.json();
    setPharmacists(data.results);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Find a Pharmacist...</h2>
      <input
        id="location-input"
        type="text"
        placeholder="Enter your location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={findPharmacists}>Search</button>
  
      {pharmacists.length > 0 && (
        <div className={styles.pharmacistGrid}>
          {pharmacists.map((pharmacist, index) => (
            <div key={index} className={styles.pharmacistCard}>
              <h3>{pharmacist.name}</h3>
              <p>{pharmacist.vicinity}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${pharmacist.geometry.location.lat},${pharmacist.geometry.location.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Map
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}  