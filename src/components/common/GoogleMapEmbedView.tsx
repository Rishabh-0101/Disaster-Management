// ============================================================
// GOOGLE MAPS — NO API KEY, NO BILLING (iframe embed trick)
// ============================================================
// Yeh Google Maps ka "legacy" query-string embed hai — koi API key ya
// billing account nahi chahiye. Bas is component ko import karke use karo.
//
// ⚠️ Honestly bata rahe hain: yeh Google ka OFFICIALLY documented/supported
// tareeka NAHI hai (official "Maps Embed API" ko hamesha ek free API key
// chahiye hota hai, jo Google Cloud Console se milta hai — no credit card
// jaruri sirf key ke liye, billing sirf tab lagti hai jab usage free tier
// se zyada ho jaaye). Yeh "?output=embed" wala tareeka purana/unofficial hai:
// abhi kaam karta hai, par Google isse kabhi bhi bina notice ke band kar
// sakta hai — kyunki yeh koi guaranteed public API nahi hai.
//
// Isliye default map (MapView.tsx — OpenStreetMap/Leaflet) already isse
// zyada reliable hai kyunki wo ek officially free, open, aur stable
// service use karta hai. Yeh component sirf ek extra option ke taur par
// diya hai agar aapko Google ka look/style hi chahiye ho.
// ============================================================

interface GoogleMapEmbedViewProps {
  latitude: number;
  longitude: number;
  label?: string;
  zoom?: number;
  heightClassName?: string;
}

export default function GoogleMapEmbedView({
  latitude,
  longitude,
  label,
  zoom = 15,
  heightClassName = 'h-64',
}: GoogleMapEmbedViewProps) {
  // Correct no-key embed URL format — must include lat,lng as the "q" param
  // and &output=embed at the end, otherwise it just opens google.com.
  const query = label ? encodeURIComponent(label) : `${latitude},${longitude}`;
  const src = `https://maps.google.com/maps?q=${query}&ll=${latitude},${longitude}&z=${zoom}&output=embed`;

  return (
    <div className={`overflow-hidden rounded-xl border border-white/10 ${heightClassName}`}>
      <iframe
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Location map"
      />
    </div>
  );
}
