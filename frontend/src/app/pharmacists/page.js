"use client";
import React, { useState, useEffect } from "react";
import styles from "../../styles/Pharmacists.module.css";

export default function Pharmacists() {
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState("");
  const [pharmacists, setPharmacists] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [useGeolocation, setUseGeolocation] = useState(true); // Toggle for geolocation

  useEffect(() => {
    const loadScript = (url) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.defer = true;
      script.onload = () => initMap();
      document.head.appendChild(script);
    };

    const initMap = () => {
      if (window.google && window.google.maps) {
        if (useGeolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              initializeMap(userLocation);
            },
            () => alert("Could not get your location")
          );
        }
      }
    };

    if (!window.google) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=API_KEY&libraries=places`
      );
    } else {
      initMap();
    }
  }, [useGeolocation]);

  const initializeMap = (location) => {
    const mapOptions = {
      center: location,
      zoom: 13,
    };

    const newMap = new window.google.maps.Map(document.getElementById("map"), mapOptions);
    setMap(newMap);

    fetchNearbyPharmacists(location, newMap);
  };

  const fetchNearbyPharmacists = (location, mapInstance) => {
    const service = new window.google.maps.places.PlacesService(mapInstance);
  
    const request = {
      location: new window.google.maps.LatLng(location.lat, location.lng),
      radius: "5000", // Broaden the radius to capture more relevant results
      type: ["store"], // Use 'store' type to capture agricultural stores
      keyword: "agriculture supplies, farm equipment, herbicide, pesticide,agriculture store,farm supplies,fertilizers",
    };
  
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPharmacists(results);
      } else {
        alert("No relevant pharmacies found");
      }
    });
  };
  

  // Handle manual location input
  const handleLocationSubmit = async () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const userLocation = results[0].geometry.location;
        initializeMap({ lat: userLocation.lat(), lng: userLocation.lng() });
      } else {
        alert("Location not found");
      }
    });
  };

  // Function to handle the click on a pharmacy
  const handlePharmacyClick = (pharmacy) => {
    // Get the exact latitude and longitude from the selected pharmacy
    const latLng = new window.google.maps.LatLng(
      pharmacy.geometry.location.lat(),
      pharmacy.geometry.location.lng()
    );
  
    // Center the map on the selected pharmacy location
    map.setCenter(latLng);
    map.setZoom(16);
  
    // Clear previous markers (optional if you want to show only one marker at a time)
    if (map.markers) {
      map.markers.forEach((marker) => marker.setMap(null));
    }
    map.markers = [];
  
    // Create a custom marker with red color and increased size
    const marker = new window.google.maps.Marker({
      position: latLng,
      map: map,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE, // Use a circle symbol to mark the location
        fillColor: "red", // Red color for the marker
        fillOpacity: 1,
        strokeColor: "white", // White border for contrast
        strokeWeight: 2,
        scale: 10, // Scale defines the size of the marker
      },
    });
  
    // Store the marker for future reference
    map.markers.push(marker);
  
    // Set the selected pharmacy to show details in the sidebar
    setSelectedPharmacy(pharmacy);
  
    // Create an InfoWindow for marker details
    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div>
          <h3>${pharmacy.name}</h3>
          <p><strong>Address:</strong> ${pharmacy.vicinity}</p>
          ${pharmacy.rating ? `<p><strong>Rating:</strong> ${pharmacy.rating}</p>` : ''}
          ${pharmacy.photos ? `<img src="${pharmacy.photos[0].getUrl()}" alt="${pharmacy.name}" width="150" height="100"/>` : ''}
        </div>
      `,
    });
  
    // Show info window when clicking the marker
    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  };
  
  
  
  
  

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Find an Agriculture-related Pharmacist...</h2>

      {/* Toggle for Geolocation or Manual Entry */}
      <div className={styles.locationToggle}>
        <label>
          <input
            type="radio"
            checked={useGeolocation}
            onChange={() => setUseGeolocation(true)}
          />
          Use My Location
        </label>
        <label>
          <input
            type="radio"
            checked={!useGeolocation}
            onChange={() => setUseGeolocation(false)}
          />
          Enter Location Manually
        </label>
      </div>

      {!useGeolocation && (
        <div className={styles.manualLocation}>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
          />
          <button onClick={handleLocationSubmit}>Search</button>
        </div>
      )}

      <div className={styles.mapContainerAndList}>
        <div id="map" className={styles.mapContainer}></div>

        <div className={styles.pharmacyListContainer}>
          {pharmacists.length > 0 && !selectedPharmacy && (
            <ul className={styles.pharmacistList}>
              {pharmacists.map((pharmacy, index) => (
                <li
                  key={index}
                  className={styles.pharmacyItem}
                  onClick={() => handlePharmacyClick(pharmacy)}
                >
                  {index + 1}. {pharmacy.name}
                </li>
              ))}
            </ul>
          )}

{selectedPharmacy && (
  <div className={styles.pharmacyDetails}>
    <h3>{selectedPharmacy.name}</h3>
    <p>Address: {selectedPharmacy.vicinity}</p>
    {selectedPharmacy.rating && (
      <p>Rating: {selectedPharmacy.rating}</p>
    )}
    {/* Remove the external Google Maps link */}
    <p>Location is centered on the map on the left.</p>

    <button
      onClick={() => setSelectedPharmacy(null)}
      className={styles.backButton}
    >
      Back to List
    </button>
  </div>
)}

        </div>
      </div>
    </div>
  );
}
