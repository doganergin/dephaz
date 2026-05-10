'use client';
import { useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

const PIN = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface GeoSonuc {
  il: string;
  ilce: string;
  lat: number;
  lon: number;
}

interface Props {
  onSec: (sonuc: GeoSonuc) => void;
  yukleniyor: boolean;
  lang: 'TR' | 'EN';
}

function TiklaHandler({ onTikla }: { onTikla: (lat: number, lon: number) => void }) {
  useMapEvents({
    click(e) {
      onTikla(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function KonumSecHaritasi({ onSec, yukleniyor, lang }: Props) {
  const [isaretci, setIsaretci] = useState<[number, number] | null>(null);
  const [araниyor, setAranıyor] = useState(false);
  const [hata, setHata] = useState('');

  const TR = lang === 'TR';

  const handleTikla = useCallback(async (lat: number, lon: number) => {
    setIsaretci([lat, lon]);
    setAranıyor(true);
    setHata('');

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1&countrycodes=tr`
      );
      const data = await res.json();

      if (data.error || !data.address) {
        setHata(TR ? 'Bu alan desteklenmiyor.' : 'This area is not supported.');
        setAranıyor(false);
        return;
      }

      const adres = data.address;
      const il =
        adres.province || adres.state || adres.city || '';
      const ilce =
        adres.county || adres.town || adres.suburb || adres.city_district || adres.municipality || il;

      if (!il) {
        setHata(TR ? 'İl bilgisi bulunamadı.' : 'Province not found.');
        setAranıyor(false);
        return;
      }

      onSec({ il, ilce, lat, lon });
    } catch {
      setHata(TR ? 'Konum alınamadı.' : 'Could not get location.');
    } finally {
      setAranıyor(false);
    }
  }, [onSec, TR]);

  return (
    <div className="space-y-2">
      <p className="text-[11px] text-[var(--muted)]">
        {TR ? 'Haritada bölgenize tıklayın.' : 'Click on your region on the map.'}
      </p>
      <div className="rounded-xl overflow-hidden border border-[var(--border)]" style={{ height: '280px' }}>
        <MapContainer
          center={[39, 35]}
          zoom={6}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <TiklaHandler onTikla={handleTikla} />
          {isaretci && <Marker position={isaretci} icon={PIN} />}
        </MapContainer>
      </div>
      {(araниyor || yukleniyor) && (
        <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
          <div className="w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
          {araниyor
            ? (TR ? 'Konum tespit ediliyor...' : 'Detecting location...')
            : (TR ? 'Risk analizi yapılıyor...' : 'Analysing risk...')}
        </div>
      )}
      {hata && <p className="text-xs text-red-500">{hata}</p>}
    </div>
  );
}
