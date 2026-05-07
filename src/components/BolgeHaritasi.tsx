'use client';
import { MapContainer, TileLayer, Marker, Circle, Popup } from 'react-leaflet';
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

interface Props {
  merkez: [number, number];
  il: string;
  ilce: string;
  riskSkoru: number;
  fayMesafe: number;
  riskRenk: string;
}

export default function BolgeHaritasi({ merkez, il, ilce, riskSkoru, fayMesafe, riskRenk }: Props) {
  return (
    <MapContainer
      key={`${merkez[0]}-${merkez[1]}`}
      center={merkez}
      zoom={10}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle
        center={merkez}
        radius={fayMesafe * 1000}
        pathOptions={{ color: riskRenk, fillColor: riskRenk, fillOpacity: 0.08, weight: 1.5, dashArray: '6 4' }}
      />
      <Marker position={merkez} icon={PIN}>
        <Popup>
          <div style={{ fontSize: '12px', minWidth: '140px' }}>
            <p style={{ fontWeight: 700, margin: '0 0 4px' }}>{ilce} / {il}</p>
            <p style={{ margin: '2px 0', color: '#6b7280' }}>Risk Skoru: <strong style={{ color: riskRenk }}>{riskSkoru}</strong></p>
            <p style={{ margin: '2px 0', color: '#6b7280', fontSize: '11px' }}>Fay mesafesi: ~{fayMesafe} km</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
