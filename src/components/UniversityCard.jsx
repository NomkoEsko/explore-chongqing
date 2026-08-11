import { ArrowRight, MapPin, Sparkles, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import ImageFrame from "./ImageFrame.jsx";
import { formatAcademicTag, formatBcurRank, formatScholarshipType } from "../utils/localization.js";
import { getUniversityPrimaryName, getUniversitySecondaryName } from "../utils/placeNames.js";

export default function UniversityCard({ university }) {
  const scholarshipTypes = [...new Set(university.scholarships.map((scholarship) => scholarship.type))]
    .map(formatScholarshipType)
    .join(" / ");
  const bcurRank = formatBcurRank(university.bcur2026);
  const primaryName = getUniversityPrimaryName(university);
  const secondaryName = getUniversitySecondaryName(university);

  return (
    <Link className="university-card" to={`/universities/${university.id}`} aria-label={`Дэлгэрэнгүй: ${primaryName}`}>
      <ImageFrame
        src={university.image}
        alt={university.nameEn}
        label={university.abbreviation}
        position={university.imagePosition}
      />
      <div className="university-card-body">
        {bcurRank ? (
          <p className="rank-line">
            <Trophy size={15} aria-hidden="true" />
            {bcurRank}
          </p>
        ) : null}
        <p className="district-line">
          <MapPin size={15} aria-hidden="true" />
          {university.district}
        </p>
        <h2>{primaryName}</h2>
        <p className="name-stack">{secondaryName}</p>
        <div className="tag-list compact-tags">
          {university.strengths.slice(0, 4).map((strength) => (
            <span key={strength}>{formatAcademicTag(strength)}</span>
          ))}
        </div>
        <p className="scholarship-summary">
          <Sparkles size={15} aria-hidden="true" />
          {university.scholarships.length} тэтгэлэг · {scholarshipTypes}
        </p>
        <span className="text-link">
          Дэлгэрэнгүй
          <ArrowRight size={16} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
