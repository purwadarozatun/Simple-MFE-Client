import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { AlurkerjaInputType } from "./alurkerjaType";

// Fix default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function PilihLokasi({ props }: { props: AlurkerjaInputType }) {
    const { setValue, getValues } = props.form;
    const mapRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);

    useEffect(() => {
        // Initialize map only once
        if (!mapRef.current) {
            const map = L.map("map").setView([-37.87, 175.475], 12);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Add click event to place marker
            map.on('click', function (e) {
                const latlng = e.latlng;
                setValue('lokasi', { lat: latlng.lat, lng: latlng.lng });
                
                // Remove existing marker if any
                if (markerRef.current) {
                    map.removeLayer(markerRef.current);
                }
                
                // Add new marker
                markerRef.current = L.marker(latlng)
                    .addTo(map)
                    .bindPopup(`📍 Lokasi dipilih<br/>Lat: ${latlng.lat.toFixed(5)}<br/>Lng: ${latlng.lng.toFixed(5)}`)
                    .openPopup();
            });

            mapRef.current = map;
        }

        // Cleanup function
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [setValue]);

    const lokasiValue = getValues('lokasi');
    const displayValue = lokasiValue 
        ? `Lat: ${lokasiValue.lat?.toFixed(5) || ''}, Lng: ${lokasiValue.lng?.toFixed(5) || ''}`
        : 'Belum ada lokasi dipilih';

    return (
        <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 className='text-lg font-bold mb-2'>Pilih Lokasi</h1>
            <div 
                id="map" 
                style={{ 
                    height: "400px", 
                    width: "100%",
                    position: 'relative',
                    zIndex: 1
                }}
            ></div>
            <div className="mt-3">
                <p className="text-sm font-semibold mb-1">Lokasi Terpilih:</p>
                <input 
                    readOnly 
                    value={displayValue}
                    placeholder="Klik pada peta untuk memilih lokasi"
                    className="input border h-11 text-base px-3 w-full focus:ring-main-blue-alurkerja focus-within:ring-main-blue-alurkerja focus-within:border-main-blue-alurkerja focus:border-main-blue-alurkerja rounded-md" 
                />
            </div>
        </div>
    );
}
