import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import marker from "../../assets/map-marker-svgrepo-com.svg";


const redOptions = { color: "red" };

const myIcon = new L.Icon({
  iconUrl: marker,
  iconRetinaUrl: marker,
  popupAnchor: [-0, -0],
  iconSize: [32, 45],
});


const markers = {
  routes: [
    {
      from: "Lukla",
      to: "Phakding",
      coordinates: {
        from: [27.6864, 86.7294],
        to: [27.7403, 86.7138],
      },
    },
    {
      from: "Phakding",
      to: "Namche Bazaar",
      coordinates: {
        from: [27.7403, 86.7138],
        to: [27.8058, 86.7149],
      },
    },
    {
      from: "Namche Bazaar",
      to: "Tengboche",
      coordinates: {
        from: [27.8058, 86.7149],
        to: [27.837, 86.7637],
      },
    },
    {
      from: "Tengboche",
      to: "Dingboche",
      coordinates: {
        from: [27.837, 86.7637],
        to: [27.8917, 86.8252],
      },
    },
    {
      from: "Dingboche",
      to: "Lobuche",
      coordinates: {
        from: [27.8917, 86.8252],
        to: [27.9468, 86.8103],
      },
    },
    {
      from: "Lobuche",
      to: "Gorak Shep",
      coordinates: {
        from: [27.9468, 86.8103],
        to: [28.0037, 86.8528],
      },
    },
    {
      from: "Gorak Shep",
      to: "Everest Base Camp (EBC)",
      coordinates: {
        from: [28.0037, 86.8528],
        to: [28.0043, 86.852],
      },
    },
    {
      from: "Everest Base Camp (EBC)",
      to: "Kala Patthar",
      coordinates: {
        from: [28.0043, 86.852],
        to: [27.9997, 86.8285],
      },
    },
    {
      from: "Kala Patthar",
      to: "Pheriche",
      coordinates: {
        from: [27.9997, 86.8285],
        to: [27.8853, 86.8127],
      },
    },
  ],
};

const MapComponent = () => {
 
  return (
    <MapContainer
    className="map-container"
    style={{width: "600px", height: "600px"}}
      center={[27.6864, 86.7294]} // Centered near Lukla
      zoom={10} // Suitable zoom level for trekking routes
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.routes.map((route, index) => (
        <Marker
          key={index} // Ensure a unique key for each marker
          position={route.coordinates.from} // Marker position for "from" coordinates
          icon={myIcon} // Custom marker icon
        >
          <Popup>
            <strong>From:</strong> {route.from}
            <br />
            <strong>To:</strong> {route.to}
            <br />
            <strong>Coordinates:</strong> {route.coordinates.from.join(", ")}
          </Popup>
        </Marker>
      ))}
      {/* <Polyline pathOptions={redOptions} positions={multiPolyline} /> */}
    </MapContainer>
  );
};

export default MapComponent;
