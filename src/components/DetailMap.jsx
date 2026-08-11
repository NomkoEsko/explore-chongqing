import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2, MapPin } from "lucide-react";
import { MapContainer, TileLayer, ZoomControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapMarker from "./MapMarker.jsx";

const remoteZooms = {
  "wulong-karst": 13,
  "dazu-rock-carvings": 14,
};

function getDetailZoom(location) {
  if (location.detailMapZoom) return location.detailMapZoom;
  if (remoteZooms[location.id]) return remoteZooms[location.id];
  return location.markerType === "university" ? 15 : 16;
}

function DetailMapController({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom, { animate: false });
    window.requestAnimationFrame(() => map.invalidateSize());
  }, [center, map, zoom]);

  return null;
}

export default function DetailMap({ place, markerType }) {
  const [ready, setReady] = useState(false);
  const location = useMemo(
    () => ({
      ...place,
      markerType,
      route: markerType === "university" ? `/universities/${place.id}` : `/attractions/${place.id}`,
    }),
    [markerType, place],
  );
  const center = useMemo(() => [location.latitude, location.longitude], [location.latitude, location.longitude]);
  const zoom = getDetailZoom(location);
  const subtitle = markerType === "university" ? location.campusNameMn || location.campusAddress : location.district;

  return (
    <div className="detail-location-map">
      <div
        className="detail-map-shell"
        data-location-id={location.id}
        data-detail-zoom={zoom}
        aria-label={`${location.nameMn || location.nameEn} газрын зураг`}
      >
        {!ready ? (
          <div className="map-loading">
            <Loader2 size={24} aria-hidden="true" />
            Газрын зураг ачаалж байна...
          </div>
        ) : null}
        <MapContainer
          center={center}
          zoom={zoom}
          minZoom={10}
          maxZoom={18}
          zoomSnap={0.5}
          zoomControl={false}
          scrollWheelZoom={false}
          className="leaflet-map"
          whenReady={() => setReady(true)}
        >
          <ZoomControl position="topright" />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <DetailMapController center={center} zoom={zoom} />
          <MapMarker location={location} focused isTouchMode={false} onSelect={() => {}} />
        </MapContainer>
        <div className="detail-map-label">
          <strong>{location.nameMn || location.nameEn}</strong>
          {subtitle ? (
            <span>
              <MapPin size={15} aria-hidden="true" />
              {subtitle}
            </span>
          ) : null}
        </div>
      </div>
      <Link className="button primary detail-map-cta" to={`/map?focus=${location.id}`}>
        Бүх газрын зураг харах
        <ArrowRight size={17} aria-hidden="true" />
      </Link>
    </div>
  );
}
