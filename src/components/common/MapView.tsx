import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon paths (Vite + Leaflet quirk).
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapViewProps {
  latitude: number;
  longitude: number;
  label?: string;
  zoom?: number;
  heightClassName?: string;
}

function Recenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
}

// Real, live, interactive map using OpenStreetMap tiles — completely free,
// no API key required. If you'd rather use Google Maps (needs a paid/free-tier
// API key from https://console.cloud.google.com), swap this out for
// GoogleMapView.tsx in the same folder — it's already scaffolded.
export default function MapView({ latitude, longitude, label, zoom = 13, heightClassName = 'h-64' }: MapViewProps) {
  return (
    <div className={`overflow-hidden rounded-xl border border-white/10 ${heightClassName}`}>
      <MapContainer center={[latitude, longitude]} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          {label && <Popup>{label}</Popup>}
        </Marker>
        <Recenter lat={latitude} lng={longitude} />
      </MapContainer>
    </div>
  );
}
