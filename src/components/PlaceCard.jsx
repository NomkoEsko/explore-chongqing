import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import ImageFrame from "./ImageFrame.jsx";

export default function PlaceCard({ item, to, meta, cta = "Дэлгэрэнгүй", onClick }) {
  const summary = item.shortDescriptionMn || item.description;

  return (
    <Link className="place-card" to={to} aria-label={`${cta}: ${item.nameEn}`} onClick={onClick}>
      <ImageFrame src={item.image} alt={item.nameEn} label={item.nameEn} position={item.imagePosition} />
      <div className="place-card-body">
        <p className="district-line">
          <MapPin size={15} aria-hidden="true" />
          {item.district || meta}
        </p>
        <h2>{item.nameMn || item.nameEn}</h2>
        <p className="name-stack">{item.nameZh}</p>
        <h3>{item.nameEn}</h3>
        <p>{summary}</p>
        {meta ? <span className="meta-pill">{meta}</span> : null}
        <span className="text-link">
          {cta}
          <ArrowRight size={16} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
