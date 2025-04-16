'use client';

import {useEffect, useRef} from 'react';

export function CustomerLocationData() {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = initMap;
      document.head.appendChild(script);
    };

    const initMap = () => {
      // Basic map options
      const mapOptions = {
        zoom: 6,
        center: {lat: 40.7128, lng: -74.0060}, // New York coordinates
      };

      // Create a new map object
      // @ts-expect-error
      const map = new google.maps.Map(mapRef.current, mapOptions);

      // Sample customer locations (replace with real data)
      const customerLocations = [
        {lat: 34.0522, lng: -118.2437, name: 'Los Angeles'}, // Los Angeles
        {lat: 41.8781, lng: -87.6298, name: 'Chicago'}, // Chicago
        {lat: 29.7604, lng: -95.3698, name: 'Houston'}, // Houston
      ];

      // Add markers for each customer location
      customerLocations.forEach((location) => {
        // @ts-expect-error
        new google.maps.Marker({
          position: location,
          map,
          title: location.name,
        });
      });
    };

    // Check if Google Maps API is already loaded
    if (typeof google === 'undefined') {
      loadGoogleMapsScript();
    } else {
      initMap();
    }
  }, []);

  return (
    
      
        
          
        
      
    
  );
}
