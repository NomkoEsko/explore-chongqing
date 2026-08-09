import { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import PhotoFrame from "./PhotoFrame.jsx";

export default function AttractionCard({ attraction }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="attraction-card">
      <PhotoFrame
        compact
        label={attraction.imageLabel}
        title={attraction.name}
      />
      <div className="card-body">
        <div className="location-line">
          <MapPin size={16} aria-hidden="true" />
          <span>{attraction.location}</span>
        </div>
        <h3>{attraction.name}</h3>
        <p>{attraction.intro}</p>
        {expanded ? <p className="detail-text">{attraction.detail}</p> : null}
        <button
          className="text-button"
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
        >
          Дэлгэрэнгүй
          <ChevronDown
            size={16}
            aria-hidden="true"
            className={expanded ? "rotated" : ""}
          />
        </button>
      </div>
    </article>
  );
}
