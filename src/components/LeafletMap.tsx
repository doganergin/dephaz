'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { BulusmaNokta } from '@/types';

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const violetIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function LeafletMap({ noktalar }: { noktalar: BulusmaNokta[] }) {
  return (
    <MapContainer
      center={[41.01, 28.98]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {noktalar.map((n) => (
        <Marker
          key={n.id}
          position={[n.latitude, n.longitude]}
          icon={n.tur === 'birincil' ? greenIcon : violetIcon}
        >
          <Popup>
            <strong>{n.ad}</strong><br />
            {n.adres}<br />
            <span style={{ color: '#1D9E75' }}>{n.mesafe}</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
