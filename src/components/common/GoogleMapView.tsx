import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

// ============================================================
// GOOGLE MAPS SETUP — YAHAN KYA KARNA HAI:
// 1. https://console.cloud.google.com par jao, naya project banao
// 2. "APIs & Services" > "Library" > "Maps JavaScript API" enable karo
// 3. "Credentials" > "Create Credentials" > "API Key" — usko copy karo
// 4. .env file mein VITE_GOOGLE_MAPS_API_KEY=<your key> daalo
// 5. Is component ko MapView.tsx ki jagah kahin bhi use kar do — same props
//    (latitude, longitude, label) leta hai.
//
// Free tier: Google deta hai $200/month free credit, jo normal usage ke
// liye kaafi hai. Card details manga sakta hai signup pe.
// ============================================================

interface GoogleMapViewProps {
  latitude: number;
  longitude: number;
  label?: string;
  zoom?: number;
  heightClassName?: string;
}

export default function GoogleMapView({ latitude, longitude, label, zoom = 14, heightClassName = 'h-64' }: GoogleMapViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

  useEffect(() => {
    if (!apiKey || !ref.current) return;

    const loader = new Loader({ apiKey, version: 'weekly' });
    loader.load().then((google) => {
      const map = new google.maps.Map(ref.current as HTMLDivElement, {
        center: { lat: latitude, lng: longitude },
        zoom,
      });
      const marker = new google.maps.Marker({ position: { lat: latitude, lng: longitude }, map });
      if (label) {
        const infoWindow = new google.maps.InfoWindow({ content: label });
        marker.addListener('click', () => infoWindow.open(map, marker));
      }
    });
  }, [apiKey, latitude, longitude, zoom, label]);

  if (!apiKey) {
    return (
      <div className={`flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-center text-xs text-slate-500 ${heightClassName}`}>
        Add VITE_GOOGLE_MAPS_API_KEY to .env to enable Google Maps here.
        <br />
        (MapView.tsx — the free OpenStreetMap version — works with no key.)
      </div>
    );
  }

  return <div ref={ref} className={`overflow-hidden rounded-xl border border-white/10 ${heightClassName}`} />;
}
