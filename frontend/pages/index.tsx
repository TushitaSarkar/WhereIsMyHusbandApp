import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../src/components/Map'), { ssr: false });

export default function Home() {
  const [deviceId, setDeviceId] = useState('');
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const fetchLocation = async () => {
    if (!deviceId) return;
    const res = await fetch(`https://whereismyhusbandapp-production.up.railway.app/location/${deviceId}`);
    if (res.ok) {
      const data = await res.json();
      setLocation({ latitude: data.latitude, longitude: data.longitude });
    } else {
      setLocation(null);
    }
  };
  

  useEffect(() => {
    fetchLocation();
    const interval = setInterval(fetchLocation, 5000);
    return () => clearInterval(interval);
  }, [deviceId]);

  return (
    <div>
      <h1>Location Tracker Dashboard</h1>
      <input
        type="text"
        placeholder="Enter Device ID"
        value={deviceId}
        onChange={e => setDeviceId(e.target.value)}
      />
      <button onClick={fetchLocation}>Refresh</button>
      <div style={{ height: 400, marginTop: 20 }}>
        <Map location={location} />
      </div>
    </div>
  );
}
