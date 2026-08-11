import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, ZoomControl, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ArrowRight, Loader2, MapPinned, RotateCcw, Search } from "lucide-react";
import CategoryFilter from "./CategoryFilter.jsx";
import MapMarker from "./MapMarker.jsx";
import MobileMapSheet from "./MobileMapSheet.jsx";
import { allLocations } from "../data/mapLocations.js";
import { attractions } from "../data/attractions.js";
import { universities } from "../data/universities.js";
import { getLocationPrimaryName, getLocationSecondaryName } from "../utils/placeNames.js";

const CHONGQING_CENTER = [29.5605, 106.5572];
const DEFAULT_ZOOM = 12;

function normalizeSearch(value = "") {
  return value.toString().toLocaleLowerCase("mn-MN").trim();
}

function getSearchText(location) {
  return [
    location.nameMn,
    location.nameZh,
    location.nameEn,
    location.abbreviation,
    location.district,
    location.campusNameMn,
    location.campusAddress,
    location.categoryLabel,
    ...(location.tags || []),
  ]
    .filter(Boolean)
    .join(" ");
}

function MapFocus({ focusId, onFocusedLocation }) {
  const map = useMap();

  useEffect(() => {
    const focused = allLocations.find((location) => location.id === focusId);
    if (focused) {
      map.flyTo([focused.latitude, focused.longitude], 14, { duration: 0.8 });
      onFocusedLocation(focused);
      return;
    }
    map.setView(CHONGQING_CENTER, DEFAULT_ZOOM);
  }, [focusId, map, onFocusedLocation]);

  return null;
}

function MapResetControl({ resetSignal }) {
  const map = useMap();

  useEffect(() => {
    if (resetSignal > 0) {
      map.flyTo(CHONGQING_CENTER, DEFAULT_ZOOM, { duration: 0.7 });
    }
  }, [map, resetSignal]);

  return null;
}

function MapDismissLayer({ onDismiss }) {
  useMapEvents({
    click: () => onDismiss(),
  });

  return null;
}

function MapTransitionResize() {
  const map = useMap();

  useEffect(() => {
    const resize = () => {
      window.requestAnimationFrame(() => {
        try {
          map.invalidateSize({ pan: false });
        } catch {
          // Leaflet can be mid-unmount during route transitions.
        }
      });
    };
    const stop = () => {
      try {
        map.stop();
      } catch {
        // Leaflet can be mid-unmount during route transitions.
      }
    };

    window.addEventListener("route-transition-start", stop);
    window.addEventListener("route-transition-end", resize);
    return () => {
      stop();
      window.removeEventListener("route-transition-start", stop);
      window.removeEventListener("route-transition-end", resize);
    };
  }, [map]);

  return null;
}

export default function MapView({ compact = false }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [ready, setReady] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isTouchMode, setIsTouchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [manualFocusId, setManualFocusId] = useState(null);
  const [resetSignal, setResetSignal] = useState(0);
  const [searchParams] = useSearchParams();
  const focusId = searchParams.get("focus");
  const activeFocusId = manualFocusId || focusId;
  const searchNeedle = normalizeSearch(searchQuery);

  useEffect(() => {
    const media = window.matchMedia("(hover: none), (pointer: coarse), (max-width: 760px)");
    const update = () => setIsTouchMode(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  const visibleLocations = useMemo(() => {
    return allLocations.filter((location) => {
      const matchesCategory = activeCategory === "all" || location.markerType === activeCategory;
      const matchesSearch = !searchNeedle || normalizeSearch(getSearchText(location)).includes(searchNeedle);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchNeedle]);

  const searchResults = searchNeedle ? visibleLocations.slice(0, 6) : [];

  useEffect(() => {
    if (selectedLocation && !visibleLocations.some((location) => location.id === selectedLocation.id)) {
      setSelectedLocation(null);
    }
  }, [selectedLocation, visibleLocations]);

  useEffect(() => {
    if (manualFocusId && !visibleLocations.some((location) => location.id === manualFocusId)) {
      setManualFocusId(null);
    }
  }, [manualFocusId, visibleLocations]);

  const handleFocus = useCallback(
    (location) => {
      setSelectedLocation(location);
    },
    [],
  );

  const handleResultFocus = useCallback(
    (location) => {
      setManualFocusId(location.id);
      setSelectedLocation(location);
    },
    [],
  );

  const handleReset = useCallback(() => {
    setManualFocusId(null);
    setSelectedLocation(null);
    setResetSignal((value) => value + 1);
  }, []);

  return (
    <section className={`map-stage ${compact ? "compact" : ""}`} aria-label="Чунчины интерактив газрын зураг">
      <div className="map-topbar">
        <div>
          <p className="eyebrow">Газрын зураг</p>
          <h1>Чунчиныг газрын зургаар үзээрэй</h1>
          <p>Их сургууль, аялал.</p>
        </div>
        <Link className="button ghost guide-link" to="/universities">
          <span className="guide-full">Суралцах хөтөч</span>
          <span className="guide-short">Хөтөч</span>
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>

      <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

      <div className="map-tools">
        {/* <label className="map-search">
          <Search size={17} aria-hidden="true" />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Монгол, 中文, English нэрээр хайх"
            aria-label="Байршил хайх"
          />
        </label> */}
        <button className="map-reset-button" type="button" onClick={handleReset}>
          <RotateCcw size={16} aria-hidden="true" />
          Төв рүү буцах
        </button>
      </div>

      <div className="map-shell">
        {!ready ? (
          <div className="map-loading">
            <Loader2 size={26} aria-hidden="true" />
            Газрын зураг ачаалж байна...
          </div>
        ) : null}
        {searchNeedle ? (
          <div className="map-search-results" aria-live="polite">
            <strong>{visibleLocations.length ? `${visibleLocations.length} илэрц` : "Илэрц алга"}</strong>
            {searchResults.map((location) => (
              <button key={location.id} type="button" onClick={() => handleResultFocus(location)}>
                <span>{getLocationPrimaryName(location)}</span>
                <small>{getLocationSecondaryName(location) || location.nameEn}</small>
              </button>
            ))}
          </div>
        ) : null}
        <MapContainer
          center={CHONGQING_CENTER}
          zoom={DEFAULT_ZOOM}
          minZoom={10}
          maxZoom={16}
          zoomSnap={0.5}
          zoomControl={false}
          scrollWheelZoom
          className="leaflet-map"
          whenReady={() => setReady(true)}
        >
          <ZoomControl position="topright" />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapDismissLayer onDismiss={() => setSelectedLocation(null)} />
          <MapTransitionResize />
          <MapFocus focusId={activeFocusId} onFocusedLocation={handleFocus} />
          <MapResetControl resetSignal={resetSignal} />
          {visibleLocations.map((location) => (
            <MapMarker
              key={location.id}
              location={location}
              focused={location.id === (selectedLocation?.id || activeFocusId)}
              isTouchMode={isTouchMode}
              onSelect={setSelectedLocation}
            />
          ))}
        </MapContainer>
        {/* <div className="map-note">
          <MapPinned size={17} aria-hidden="true" />
          {allLocations.length} бодит байршил: {universities.length} сургууль, {attractions.length} аяллын газар.
        </div> */}
        <MobileMapSheet location={isTouchMode ? selectedLocation : null} onClose={() => setSelectedLocation(null)} />
      </div>
    </section>
  );
}
