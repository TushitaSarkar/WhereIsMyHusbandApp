

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngTuple, Icon } from 'leaflet';


interface MapProps {
  location: { latitude: number; longitude: number } | null;
}

const defaultPosition: LatLngTuple = [20, 0]; // Center of the world

const customIcon = new Icon({
  iconUrl: '/DUDU.jpg', // Use public folder path for Next.js static assets
  iconSize: [48, 48], // adjust as needed
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
});

const Map: React.FC<MapProps> = ({ location }) => {
  // Use maximum zoom for best visibility
  const zoom = location ? 22 : 2;
  const isZero = location && (location.latitude === 0 && location.longitude === 0);
  return (
    <MapContainer
      center={location ? [location.latitude, location.longitude] as LatLngTuple : defaultPosition}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {location && (
        <Marker position={[location.latitude, location.longitude] as LatLngTuple} icon={customIcon}>
          <Popup>Device Location</Popup>
        </Marker>
      )}
      {isZero && (
        <Marker position={defaultPosition} icon={customIcon}>
          <Popup>Default Position (0,0)</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;
