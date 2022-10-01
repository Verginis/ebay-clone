import React, {useRef, useMemo} from 'react'
import { MapContainer, TileLayer, useMap, Marker } from 'react-leaflet'
import L from 'leaflet'
import '../styles/map.scss'
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png';

const Map = ({center , draggable , onDragMarker}) => {
    const markerRef = useRef( null );
    const dragHandlers = useMemo (
        () => ({
            dragend() {
            const marker = markerRef.current;
            if( marker != null ) {
                onDragMarker(marker.getLatLng());
            }
        },
    }),
    []
    );


    let DefaultIcon = L.icon({
        iconUrl: icon
    });
   
  return (
    <div>


        <MapContainer center={[center.lng, center.lat]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
            icon={DefaultIcon}
            draggable={draggable}
            eventHandlers={dragHandlers}
            position={[
                center && center.lng ? center.lng : "",
                center && center.lat ? center.lat : "",
            ]}
            ref={markerRef}>
        </Marker>
        </MapContainer>
    </div>
  )
}

export default Map