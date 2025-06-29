'use client';

import {useEffect, useRef, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';

interface CustomerLocation {
  lat: number;
  lng: number;
  name: string;
}

export function CustomerLocationData() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [customerLocations, setCustomerLocations] = useState<CustomerLocation[]>([]);
  const [newLocationName, setNewLocationName] = useState<string>('');
  const [hasGoogleMapsLoaded, setHasGoogleMapsLoaded] = useState<boolean>(false);

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
      setHasGoogleMapsLoaded(true);

      const mapOptions: google.maps.MapOptions = {
        zoom: 4,
        center: {lat: 37.0902, lng: -95.7129}, // Center of the US
      };

      if (mapRef.current) {
        const newMap = new google.maps.Map(mapRef.current, mapOptions);

        newMap.addListener('click', (event: google.maps.MapMouseEvent) => {
          if (event.latLng) {
            addMarker(event.latLng, 'New Location');
          }
        });

        setMap(newMap);
      }
    };

    if (typeof google === 'undefined') {
      loadGoogleMapsScript();
    } else {
      initMap();
    }
  }, []);

  const addMarker = (location: google.maps.LatLng, title: string) => {
    if (!map) return;

    const marker = new google.maps.Marker({
      position: location,
      map: map,
      title: title,
    });

    setCustomerLocations(prevLocations => [
      ...prevLocations,
      {lat: location.lat(), lng: location.lng(), name: title},
    ]);
  };

  const handleLocationNameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewLocationName(e.target.value);
  };

  const handleAddLocation = () => {
    // Check if there are any customerLocations to process
    if (customerLocations.length === 0) {
      alert('No locations to add. Please pin a location on the map first.');
      return;
    }

    // Get the last added location
    const lastLocation = customerLocations[customerLocations.length - 1];

    // Ensure the map is initialized and there's a new location name
    if (!map || !newLocationName.trim()) {
      alert('Please enter a location name.');
      return;
    }

    // Create a new object with the last location's data and the new name
    const updatedLocation = {
      ...lastLocation,
      name: newLocationName.trim(),
    };

    // Update the customerLocations state with the modified location
    setCustomerLocations(prevLocations => {
      const updatedLocations = [...prevLocations];
      updatedLocations[updatedLocations.length - 1] = updatedLocation; // Modify the last element
      return updatedLocations;
    });

    // Call the function to save the location data to the backend
    saveLocationData(updatedLocation);

    // Clear the new location name input
    setNewLocationName('');
  };

  const saveLocationData = async (location: CustomerLocation) => {
    try {
      const response = await fetch('/api/save-customer-location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(location),
      });

      if (response.ok) {
        alert('Customer location saved successfully!');
      } else {
        console.error('Error saving customer location:', response.statusText);
        alert('Failed to save customer location.');
      }
    } catch (error: any) {
      console.error('Error saving customer location:', error);
      alert('Failed to save customer location.');
    }
  };

  return (
    <div>
      {!hasGoogleMapsLoaded && <div className="text-gray-600">Loading Google Maps...</div>}
      {hasGoogleMapsLoaded && (
        <div className="space-y-4">
          <div>
            <div ref={mapRef} style={{height: '400px', width: '100%', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}/>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Customer Locations:</h3>
            <ul>
              {customerLocations.map((location, index) => (
                <li key={index} className="text-gray-600">
                  {location.name} - Lat: {location.lat}, Lng: {location.lng}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center space-x-2">
            <Textarea
              placeholder="Enter location name..."
              value={newLocationName}
              onChange={handleLocationNameChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <Button onClick={handleAddLocation} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700">Add Location</Button>
          </div>
        </div>
      )}
    </div>
  );
}
