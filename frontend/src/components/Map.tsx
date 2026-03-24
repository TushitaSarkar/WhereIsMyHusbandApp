
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngTuple } from 'leaflet';

interface MapProps {
  location: { latitude: number; longitude: number } | null;
}

const defaultPosition: LatLngTuple = [20, 0]; // Center of the world

const Map: React.FC<MapProps> = ({ location }) => {
  return (
    <MapContainer
      center={location ? [location.latitude, location.longitude] as LatLngTuple : defaultPosition}
      zoom={location ? 15 : 2}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {location && (
        <Marker position={[location.latitude, location.longitude] as LatLngTuple}>
          <Popup>Device Location</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;
