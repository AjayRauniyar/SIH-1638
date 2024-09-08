"use client";
import React, { useState, useEffect } from "react";
import styles from "../../styles/Pharmacists.module.css";

export default function Pharmacists() {
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState("");
  const [pharmacists, setPharmacists] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [useGeolocation, setUseGeolocation] = useState(true); // Toggle for geolocation
  const logoUrl = "/images/IMG_20240906_153012.png"; // Custom logo for pharmacy markers

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
        } else {
          // Handle the case where geolocation is not used
        }
      }
    };

    if (!window.google) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`
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

    const newMap = new window.google.maps.Map(
      document.getElementById("map"),
      mapOptions
    );
    setMap(newMap);

    fetchNearbyPharmacists(location, newMap);
  };

  const fetchNearbyPharmacists = (location, mapInstance) => {
    const service = new window.google.maps.places.PlacesService(mapInstance);

    const request = {
      location: new window.google.maps.LatLng(location.lat, location.lng),
      radius: "20000",
      type: ["store"],
      keyword:
        "agriculture supplies, farm equipment, herbicide, pesticide, agriculture store, farm supplies, fertilizers,medicines,agriculture pharmacy,farm",
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPharmacists(results);
        placePharmacyMarkers(results, mapInstance);
      } else {
        alert("No relevant pharmacies found");
      }
    });
  };

  const placePharmacyMarkers = (pharmacies, mapInstance) => {
    pharmacies.forEach((pharmacy) => {
      const latLng = new window.google.maps.LatLng(
        pharmacy.geometry.location.lat(),
        pharmacy.geometry.location.lng()
      );

      const marker = new window.google.maps.Marker({
        position: latLng,
        map: mapInstance,
        icon: {
          url: logoUrl,
          scaledSize: new window.google.maps.Size(40, 40),
        },
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div>
            <h3>${pharmacy.name}</h3>
            <p><strong>Address:</strong> ${pharmacy.vicinity}</p>
            ${
              pharmacy.rating
                ? `<p><strong>Rating:</strong> ${pharmacy.rating}</p>`
                : ""
            }
            ${
              pharmacy.photos
                ? `<img src="${pharmacy.photos[0].getUrl()}" alt="${pharmacy.name}" width="150" height="100"/>`
                : ""
            }
          </div>
        `,
      });

      marker.addListener("click", () => {
        infoWindow.open(mapInstance, marker);
        setSelectedPharmacy(pharmacy);
      });
    });
  };

  // Handle when a user clicks on a pharmacy from the list
  const handlePharmacyClick = (pharmacy) => {
    const latLng = new window.google.maps.LatLng(
      pharmacy.geometry.location.lat(),
      pharmacy.geometry.location.lng()
    );

    // Center and zoom in the map
    map.setCenter(latLng);
    map.setZoom(16); // Zoom level for a closer view

    // Clear existing markers if any
    if (map.markers) {
      map.markers.forEach((marker) => marker.setMap(null));
    }
    map.markers = [];

    // Add a custom marker to the selected pharmacy
    const marker = new window.google.maps.Marker({
      position: latLng,
      map: map,
      icon: {
        url: logoUrl,
        scaledSize: new window.google.maps.Size(40, 40),
      },
    });

    // Set InfoWindow
    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div>
          <h3>${pharmacy.name}</h3>
          <p><strong>Address:</strong> ${pharmacy.vicinity}</p>
          ${
            pharmacy.rating
              ? `<p><strong>Rating:</strong> ${pharmacy.rating}</p>`
              : ""
          }
          ${
            pharmacy.photos
              ? `<img src="${pharmacy.photos[0].getUrl()}" alt="${pharmacy.name}" width="150" height="100"/>`
              : ""
          }
        </div>
      `,
    });

    infoWindow.open(map, marker);
  };

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

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        Find an Agriculture-related Pharmacist...
      </h2>

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
                  onClick={() => handlePharmacyClick(pharmacy)} // Update this line
                >
                  <img
                    src={logoUrl}
                    alt="Pharmacy Logo"
                    width="30"
                    height="30"
                    style={{ marginRight: "10px" }}
                  />
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
