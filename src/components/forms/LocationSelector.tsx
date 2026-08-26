import { useState } from 'react';
import { LocateFixed, Loader2 } from 'lucide-react';
import { INDIAN_STATES, getDistrictsForState } from '../../constants/indianStates';
import { useGeolocation } from '../../hooks/useGeolocation';
import MapView from '../common/MapView';

export interface LocationValue {
  state: string;
  district: string;
  city: string;
  address: string;
  latitude?: number;
  longitude?: number;
}

interface LocationSelectorProps {
  value: LocationValue;
  onChange: (value: LocationValue) => void;
}

// Default map center: roughly the middle of India, used before any location is picked.
const DEFAULT_CENTER = { lat: 22.9734, lng: 78.6569 };

export default function LocationSelector({ value, onChange }: LocationSelectorProps) {
  const { loading, error, detect } = useGeolocation();
  const [districts, setDistricts] = useState<string[]>(getDistrictsForState(value.state));

  const handleStateChange = (state: string) => {
    const newDistricts = getDistrictsForState(state);
    setDistricts(newDistricts);
    onChange({ ...value, state, district: '' });
  };

  const handleUseCurrentLocation = async () => {
    const result = await detect();
    if (!result) return;

    // Try to match the detected state name against our known state list
    // (reverse-geocoded names can differ slightly in punctuation/casing).
    const matchedState =
      INDIAN_STATES.find((s) => s.toLowerCase() === (result.state || '').toLowerCase()) || value.state;
    const stateDistricts = getDistrictsForState(matchedState);
    setDistricts(stateDistricts);

    const matchedDistrict =
      stateDistricts.find((d) => d.toLowerCase().includes((result.district || '').toLowerCase())) ||
      result.district ||
      value.district;

    onChange({
      ...value,
      state: matchedState,
      district: matchedDistrict,
      city: result.city || value.city,
      address: result.address || value.address,
      latitude: result.latitude,
      longitude: result.longitude,
    });
  };

  const mapCenter =
    value.latitude && value.longitude ? { lat: value.latitude, lng: value.longitude } : DEFAULT_CENTER;

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={handleUseCurrentLocation}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-brand-400/40 bg-brand-400/10 py-2.5 text-sm font-medium text-brand-300 transition hover:bg-brand-400/20 disabled:opacity-60"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <LocateFixed size={16} />}
        {loading ? 'Detecting your location…' : 'Use my current location'}
      </button>
      {error && <p className="text-xs text-red-400">{error}</p>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">State *</label>
          <select
            value={value.state}
            onChange={(e) => handleStateChange(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-400"
          >
            <option value="" className="bg-navy-900">Select state</option>
            {INDIAN_STATES.map((s) => (
              <option key={s} value={s} className="bg-navy-900">{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">District *</label>
          <select
            value={value.district}
            onChange={(e) => onChange({ ...value, district: e.target.value })}
            disabled={!value.state}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-brand-400 disabled:opacity-50"
          >
            <option value="" className="bg-navy-900">
              {value.state ? 'Select district' : 'Select a state first'}
            </option>
            {districts.map((d) => (
              <option key={d} value={d} className="bg-navy-900">{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">City / Town</label>
          <input
            type="text"
            value={value.city}
            onChange={(e) => onChange({ ...value, city: e.target.value })}
            placeholder="e.g. Ranchi"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-brand-400"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">Local Area / Landmark</label>
          <input
            type="text"
            value={value.address}
            onChange={(e) => onChange({ ...value, address: e.target.value })}
            placeholder="e.g. Near Hatia bridge"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-brand-400"
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
          {value.latitude ? 'Detected location on map' : 'Map preview (detect your location to pin it exactly)'}
        </p>
        <MapView
          latitude={mapCenter.lat}
          longitude={mapCenter.lng}
          label={value.address || value.city || 'Reported location'}
          zoom={value.latitude ? 14 : 4}
        />
      </div>
    </div>
  );
}
