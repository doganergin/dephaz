'use client';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Props {
  lat?: number;
  lon?: number;
  onChange: (lat: number, lon: number) => void;
}

const PIN_ICON = L.divIcon({
  html: `<div style="width:28px;height:28px;background:#EF4444;border:3px solid #fff;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  className: '',
});

export default function BulusmaHaritasi({ lat, lon, onChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [lat ?? 39.0, lon ?? 35.0],
      zoom: lat ? 13 : 6,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(map);

    if (lat && lon) {
      markerRef.current = L.marker([lat, lon], { icon: PIN_ICON }).addTo(map);
    }

    map.on('click', (e) => {
      const { lat: clickLat, lng: clickLon } = e.latlng;
      if (markerRef.current) {
        markerRef.current.setLatLng([clickLat, clickLon]);
      } else {
        markerRef.current = L.marker([clickLat, clickLon], { icon: PIN_ICON }).addTo(map);
      }
      onChange(clickLat, clickLon);
    });

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !lat || !lon) return;
    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lon]);
    } else {
      markerRef.current = L.marker([lat, lon], { icon: PIN_ICON }).addTo(mapRef.current);
    }
    mapRef.current.setView([lat, lon], 13);
  }, [lat, lon]);

  return (
    <div ref={containerRef} style={{ height: '220px', borderRadius: '12px', overflow: 'hidden' }} />
  );
}
