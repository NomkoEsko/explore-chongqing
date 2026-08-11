import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import LocationPopup from "./LocationPopup.jsx";

const markerLabels = {
  university: "И",
  attraction: "А",
};

export default function MapMarker({ location, focused, isTouchMode, onSelect }) {
  const icon = L.divIcon({
    className: "cq-marker-shell",
    html: `<span class="cq-marker ${location.markerType} ${focused ? "focused" : ""}">${markerLabels[location.markerType] || "P"}</span>`,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
    popupAnchor: [0, -18],
  });

  return (
    <Marker
      position={[location.latitude, location.longitude]}
      icon={icon}
      eventHandlers={{
        mouseover: (event) => {
          if (!isTouchMode) event.target.openPopup();
        },
        click: (event) => {
          if (event.originalEvent) L.DomEvent.stopPropagation(event.originalEvent);
          onSelect(location);
          if (isTouchMode) {
            event.target.closePopup();
            return;
          }
          event.target.openPopup();
        },
      }}
    >
      <Popup closeButton={false} minWidth={270} maxWidth={320}>
        <LocationPopup location={location} />
      </Popup>
    </Marker>
  );
}
