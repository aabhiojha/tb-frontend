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
// import useStore from "../../store/store";

const redOptions = { color: "red" };

const myIcon = new L.Icon({
  iconUrl: marker,
  iconRetinaUrl: marker,
  popupAnchor: [-0, -0],
  iconSize: [32, 45],
});

const MapComponent = ({ routeData }) => {
  console.log(JSON.stringify(routeData, null, 4));
  const polyData = routeData.reduce((acc, current, index, arr) => {
    if (index < arr.length - 1) {
      const start = arr[index];
      const end = arr[index + 1];
      acc.push([
        [start.coordinates.latitude, start.coordinates.longitude],
        [end.coordinates.latitude, end.coordinates.longitude],
      ]);
    }
    return acc;
  }, []);

  console.log(polyData);
  return (
    <MapContainer
      className="map-container"
      style={{ width: "600px", height: "600px" }}
      center={[27.6864, 86.7294]} // Centered near Lukla
      zoom={7} // Suitable zoom level for trekking routes
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {routeData.map((route, index) => (
        <Marker
          key={index} // Ensure a unique key for each marker
          position={[route.coordinates.latitude, route.coordinates.longitude]} // Marker position for "from" coordinates
          icon={myIcon} // Custom marker icon
        >
          <Popup>
            <strong>Day:</strong> {route.day}
            <br />
            <strong>Location:</strong> {route.location}
            <br />
            <strong>Hightlight:</strong> {route.highlight}
            <br />
            <strong>Coordinates:</strong>{" "}
            {[route.coordinates.latitude, route.coordinates.longitude]}
          </Popup>
        </Marker>
      ))}

      <Polyline pathOptions={redOptions} positions={polyData} />
    </MapContainer>
  );
};

export default MapComponent;
