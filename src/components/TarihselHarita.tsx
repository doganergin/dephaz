'use client';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import type { TarihselDeprem } from '@/data/tarihselDepremler';

interface Props {
  depremler: TarihselDeprem[];
  secilenId: string | null;
  onSec: (id: string) => void;
  buyuklukRenk: (mag: number) => string;
}

export default function TarihselHarita({ depremler, secilenId, onSec, buyuklukRenk }: Props) {
  return (
    <MapContainer
      center={[39, 35]}
      zoom={5}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {depremler.map((d) => (
        <CircleMarker
          key={d.id}
          center={[d.lat, d.lon]}
          radius={Math.max(6, d.buyukluk * 3.5)}
          pathOptions={{
            color: secilenId === d.id ? '#fff' : buyuklukRenk(d.buyukluk),
            fillColor: buyuklukRenk(d.buyukluk),
            fillOpacity: secilenId === d.id ? 1 : 0.75,
            weight: secilenId === d.id ? 3 : 1.5,
          }}
          eventHandlers={{ click: () => onSec(d.id) }}
        >
          <Popup>
            <div style={{ fontSize: '12px', minWidth: '160px' }}>
              <strong style={{ fontSize: '14px', color: buyuklukRenk(d.buyukluk) }}>
                M{d.buyukluk.toFixed(1)}
              </strong>
              <p style={{ margin: '4px 0 0', fontWeight: 600 }}>{d.yer}</p>
              <p style={{ margin: '2px 0', color: '#6b7280', fontSize: '11px' }}>{d.tarih}</p>
              {d.olum != null && d.olum > 0 && (
                <p style={{ margin: '2px 0', color: '#ef4444', fontSize: '11px', fontWeight: 600 }}>
                  {d.olum.toLocaleString('tr-TR')} can kaybı
                </p>
              )}
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
