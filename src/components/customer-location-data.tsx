'use client';

import {useEffect, useRef} from 'react';

export function CustomerLocationData() {
  const mapRef = useRef(null);

  useEffect(() => {
    // Function to load and initialize the Google Map
    const loadMap = () => {
      const google = window.google;
      if (google && mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: {lat: 37.7749, lng: -122.4194}, // San Francisco coordinates
          zoom: 12,
        });

        new google.maps.Marker({
          position: {lat: 37.7749, lng: -122.4194},
          map: map,
          title: 'San Francisco',
        });
      }
    };

    // Check if Google Maps API is already loaded
    if (window.google && window.google.maps) {
      loadMap();
    } else {
      // Load the Google Maps API script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = loadMap; // Set initMap as a global function
      document.head.appendChild(script);

      script.onerror = () => {
        console.error('Failed to load Google Maps API');
      };
    }
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Customer Location (San Francisco)</h2>
      <div ref={mapRef} style={{height: '400px', width: '100%'}} />
    </div>
  );
}
