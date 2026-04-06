'use client';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import type { MapDeprem } from '@/app/harita/page';

interface Props {
  depremler: MapDeprem[];
  merkez: [number, number];
  zoom: number;
  buyuklukRenk: (mag: number) => string;
  tLabels: { buyukluk: string; tarih: string; derinlik: string };
}

export default function DepremHaritasi({ depremler, merkez, zoom, buyuklukRenk, tLabels }: Props) {
  return (
    <MapContainer
      key={`${merkez[0]}-${merkez[1]}-${zoom}`}
      center={merkez}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {depremler.map((d, i) => (
        <CircleMarker
          key={i}
          center={[d.lat, d.lon]}
          radius={Math.max(4, d.buyukluk * 3)}
          pathOptions={{
            color: buyuklukRenk(d.buyukluk),
            fillColor: buyuklukRenk(d.buyukluk),
            fillOpacity: 0.7,
            weight: 1.5,
          }}
        >
          <Popup>
            <div style={{ fontSize: '12px', minWidth: '160px' }}>
              <strong style={{ fontSize: '14px' }}>{d.buyukluk.toFixed(1)}</strong>
              <span style={{ color: '#6b7280', marginLeft: '4px' }}>Mw</span>
              <p style={{ margin: '4px 0 0', fontWeight: 600 }}>{d.konum}</p>
              <p style={{ margin: '2px 0', color: '#6b7280', fontSize: '11px' }}>
                {tLabels.tarih}: {d.tarih}
              </p>
              <p style={{ margin: '2px 0', color: '#6b7280', fontSize: '11px' }}>
                {tLabels.derinlik}: {d.derinlik?.toFixed(1)} km
              </p>
              <p style={{ margin: '2px 0', color: '#6b7280', fontSize: '10px', textTransform: 'uppercase' }}>
                {d.kaynak === 'kandilli' ? 'Kandilli Rasathanesi' : 'USGS'}
              </p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
