import { useState } from 'react';

export interface GeoResult {
  latitude: number;
  longitude: number;
  state?: string;
  district?: string;
  city?: string;
  address?: string;
}

interface UseGeolocationReturn {
  loading: boolean;
  error: string | null;
  detect: () => Promise<GeoResult | null>;
}

// Real browser GPS location — no API key needed.
// Reverse-geocoding (turning lat/lng into state/district/city names) uses the
// free OpenStreetMap Nominatim API (no key required, fair-use rate limited).
export function useGeolocation(): UseGeolocationReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detect = (): Promise<GeoResult | null> => {
    setError(null);
    setLoading(true);

    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by this browser.');
        setLoading(false);
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
              { headers: { Accept: 'application/json' } }
            );
            const data = await res.json();
            const addr = data.address || {};
            resolve({
              latitude,
              longitude,
              state: addr.state,
              district: addr.state_district || addr.county || addr.city_district,
              city: addr.city || addr.town || addr.village || addr.county,
              address: data.display_name,
            });
          } catch {
            // Even if reverse geocoding fails, we still have the raw coordinates.
            resolve({ latitude, longitude });
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          setError(err.message || 'Could not get your location. Please allow location access.');
          setLoading(false);
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  };

  return { loading, error, detect };
}

export default useGeolocation;
