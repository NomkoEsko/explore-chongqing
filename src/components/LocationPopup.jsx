import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import ImageFrame from "./ImageFrame.jsx";

const typeLabels = {
  university: "Их сургууль",
  attraction: "Аяллын газар",
};

export default function LocationPopup({ location }) {
  const summary = location.shortDescriptionMn || location.description;

  return (
    <div className="location-popup">
      <ImageFrame src={location.image} alt={location.nameEn} label={location.nameEn} position={location.imagePosition} />
      <div className="popup-copy">
        <p className={`type-pill ${location.markerType}`}>
          {typeLabels[location.markerType] || "Байршил"}
        </p>
        <h3>{location.nameMn || location.nameEn}</h3>
        <strong>{location.nameZh}</strong>
        <strong>{location.nameEn}</strong>
        <p className="popup-district">
          <MapPin size={14} aria-hidden="true" />
          {location.district || "Чунцин"}
        </p>
        <p>{summary}</p>
        <Link to={location.route}>
          Дэлгэрэнгүй
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
