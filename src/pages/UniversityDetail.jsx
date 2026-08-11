import { ExternalLink, MapPinned } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import BackButton from "../components/BackButton.jsx";
import DetailMap from "../components/DetailMap.jsx";
import InfoGrid from "../components/InfoGrid.jsx";
import PageHero from "../components/PageHero.jsx";
import { scholarshipNotice } from "../data/scholarships.js";
import { universities } from "../data/universities.js";
import { formatAcademicTag, formatBcurRank, formatScholarshipType, formatStudyLevel, formatStudyLevels } from "../utils/localization.js";

function ListBlock({ title, items }) {
  if (!items?.length) return null;

  return (
    <article className="content-panel">
      <p className="eyebrow">{title}</p>
      <div className="tag-list">
        {items.map((item) => (
          <span key={item}>{formatAcademicTag(item)}</span>
        ))}
      </div>
    </article>
  );
}

function ScholarshipCard({ scholarship }) {
  return (
    <article className="scholarship-card">
      <div className="scholarship-card-head">
        <div>
          <p className="eyebrow">{formatScholarshipType(scholarship.type)}</p>
          <h3>{scholarship.name}</h3>
        </div>
        <span className="status-pill">{scholarship.dataStatus}</span>
      </div>
      <div className="mini-meta">
        <span>{formatStudyLevels(scholarship.levels)}</span>
        <span>{scholarship.deadline}</span>
      </div>
      <div className="coverage-list">
        {scholarship.coverage.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
      <p className="amount-line">
        <strong>Дүн:</strong> {scholarship.amount}
      </p>
      {scholarship.criteria?.length ? (
        <details>
          <summary>Шалгуур, анхаарах зүйл</summary>
          <ul>
            {scholarship.criteria.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </details>
      ) : null}
    </article>
  );
}

export default function UniversityDetail() {
  const { id } = useParams();
  const university = universities.find((item) => item.id === id);

  if (!university) {
    return (
      <main className="not-found-page">
        <div className="container narrow">
          <BackButton>Газрын зураг руу буцах</BackButton>
          <h1>Байршил олдсонгүй</h1>
          <p>Энэ их сургууль одоогийн Explore Chongqing мэдээлэлд байхгүй байна.</p>
        </div>
      </main>
    );
  }

  const bcurRank = formatBcurRank(university.bcur2026);
  const info = [
    { label: "Товчлол", value: university.abbreviation },
    { label: "Дүүрэг", value: university.district },
    { label: "Тэмдэглэсэн кампус", value: university.campusNameMn },
    { label: "Албан хаяг", value: university.campusAddress },
    { label: "Сургуулийн төрөл", value: university.type },
    { label: "Суралцах түвшин", value: university.studyLevels.map(formatStudyLevel).join(", ") },
  ];

  if (bcurRank) {
    info.push({ label: "2026 BCUR", value: bcurRank });
  } else if (university.rankingNote) {
    info.push({ label: "Эрэмбэ", value: university.rankingNote });
  }

  return (
    <main>
      <PageHero
        eyebrow="Их сургууль"
        title={university.nameMn}
        subtitle={`${university.nameZh} / ${university.nameEn} / ${university.abbreviation}`}
        image={university.image}
        imagePosition={university.imagePosition}
      >
        <p>{university.district} / Чунцин</p>
        <div className="hero-actions">
          <Link className="button primary" to={`/map?focus=${university.id}`}>
            <MapPinned size={18} aria-hidden="true" />
            Газрын зураг дээр харах
          </Link>
          <a className="button ghost" href={university.officialUrl} target="_blank" rel="noopener noreferrer">
            Албан ёсны сайт
            <ExternalLink size={17} aria-hidden="true" />
          </a>
        </div>
      </PageHero>

      <section className="section detail-section">
        <div className="container detail-grid">
          <article className="content-panel">
            <p className="eyebrow">Танилцуулга</p>
            <h2>Сургуулийн тухай</h2>
            <p>{university.overviewMn || university.overview}</p>
            {university.rankingNote ? <p className="notice">{university.rankingNote}</p> : null}
          </article>
          <InfoGrid items={info} />
        </div>
      </section>

      <section className="section split-section">
        <div className="container three-column">
          <ListBlock title="Давуу чиглэл" items={university.strengths} />
          <ListBlock title="Мэргэжлийн чиглэл" items={university.majors} />
          <ListBlock title="Хэлний шаардлага" items={university.languageRequirements} />
        </div>
      </section>

      <section className="section scholarships-detail">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Тэтгэлэг</p>
            <h2>{university.abbreviation} дээрх тэтгэлгийн боломжууд</h2>
            <p>{scholarshipNotice}</p>
          </div>
          <div className="scholarship-card-grid">
            {university.scholarships.map((scholarship) => (
              <ScholarshipCard key={scholarship.name} scholarship={scholarship} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <article className="content-panel">
            <p className="eyebrow">Шалгуур</p>
            <h2>Тавигдах шаардлага</h2>
            <ul className="clean-list">
              {university.eligibility.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="content-panel">
            <p className="eyebrow">Баримт бичиг</p>
            <h2>Бүрдүүлэх материал</h2>
            <ul className="clean-list">
              {university.requiredDocuments.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <article className="content-panel">
            <p className="eyebrow">Өргөдлийн хугацаа</p>
            <h2>Эхэд баталгаатай дурдсан хугацаа</h2>
            <ul className="clean-list">
              {university.deadlines.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="content-panel">
            <p className="eyebrow">Кампус</p>
            <h2>Өдөр тутмын орчин</h2>
            <div className="tag-list">
              {university.campusLife.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <a className="text-link external-link" href={university.applicationUrl} target="_blank" rel="noopener noreferrer">
              Өргөдлийн албан холбоос
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </article>
        </div>
      </section>

      <section className="section detail-map">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Газрын зураг</p>
            <h2>{university.nameMn} газрын зураг дээр</h2>
          </div>
          <DetailMap place={university} markerType="university" />
        </div>
      </section>
    </main>
  );
}
