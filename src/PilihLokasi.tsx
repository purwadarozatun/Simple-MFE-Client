import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from 'react-leaflet'
import { AlurkerjaInputType } from './alurkerjaType';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default icon issue with Leaflet and Webpack
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

// Custom icon untuk lokasi yang dipilih
const SelectedIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: 'selected-marker'
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function PilihLokasi({ props }: { props: AlurkerjaInputType }) {
    const { register, control, setValue ,getValues } = props.form || {};

    const position = [51.505, -0.09] as [number, number];

    return (<div>

        <h1 className='text-lg font-bold'>Pilih Lokasi</h1>

        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "300px", width: "100%" }} >
            <MapData setValue={setValue} getValues={getValues}></MapData>
        </MapContainer>

    </div>
    );
}

const MapData = ({setValue , getValues} : {setValue: any, getValues: any}) => {
    useMapEvent('click', (e) => {
        setValue('lokasi', e.latlng);
    });
    const position = [51.505, -0.09] as [number, number];
    return <>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {
            getValues('lokasi') &&
            <Marker position={[getValues('lokasi').lat, getValues('lokasi').lng]} icon={SelectedIcon}>
                <Popup>
                    📍 Lokasi yang dipilih <br /> Lat: {getValues('lokasi').lat} Lng: {getValues('lokasi').lng}
                </Popup>
            </Marker>
        }
        </>
}