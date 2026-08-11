import { ArrowRight, MapPin, X } from "lucide-react";
import { Link } from "react-router-dom";
import ImageFrame from "./ImageFrame.jsx";

const typeLabels = {
  university: "Их сургууль",
  attraction: "Аяллын газар",
};

export default function MobileMapSheet({ location, onClose }) {
  if (!location) return null;

  const summary = location.shortDescriptionMn || location.description;

  return (
    <aside className="mobile-map-sheet" aria-label="Сонгосон газрын мэдээлэл">
      <button className="sheet-close" type="button" onClick={onClose} aria-label="Мэдээллийн картыг хаах">
        <X size={17} aria-hidden="true" />
      </button>
      <ImageFrame src={location.image} alt={location.nameEn} label={location.nameEn} position={location.imagePosition} />
      <div className="sheet-copy">
        <span className={`type-pill ${location.markerType}`}>
          {typeLabels[location.markerType] || "Байршил"}
        </span>
        <h2>{location.nameMn || location.nameEn}</h2>
        <p className="name-stack">{location.nameZh}</p>
        <p className="name-stack">{location.nameEn}</p>
        <p className="popup-district">
          <MapPin size={15} aria-hidden="true" />
          {location.district || "Чунцин"}
        </p>
        <p className="sheet-summary">{summary}</p>
        <Link className="button primary" to={location.route}>
          Дэлгэрэнгүй
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
