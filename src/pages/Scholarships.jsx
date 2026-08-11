import { useMemo, useState } from "react";
import { ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import {
  scholarshipComparison,
  scholarshipFilters,
  scholarshipNotice,
} from "../data/scholarships.js";
import { universities } from "../data/universities.js";
import { formatScholarshipType, formatStudyLevels } from "../utils/localization.js";

function matchesFilter(item, activeFilter) {
  if (activeFilter === "all") return true;
  return item.type === activeFilter || item.levels.includes(activeFilter);
}

export default function Scholarships() {
  const [activeFilter, setActiveFilter] = useState("all");

  const visibleScholarships = useMemo(
    () => scholarshipComparison.filter((item) => matchesFilter(item, activeFilter)),
    [activeFilter],
  );

  return (
    <main>
      <PageHero
        eyebrow="Тэтгэлэг"
        title="11 сургуулийн тэтгэлгийн харьцуулалт"
        // subtitle="Тэтгэлэг бүрийн багтах зүйлс, хугацаа, баталгаажсан байдал."
        image={universities[0].image}
        imagePosition={universities[0].imagePosition}
        label="Чунчинд суралцах"
      >
        {/* <p>
          Баталгаагүй 2026 оны дүн, эрэмбэ, өргөдлийн хугацааг зохиож нэмээгүй. Зарим
          мэдээлэл “хамгийн сүүлийн нийтлэгдсэн” эсвэл “2026 оны яг дүн баталгаажаагүй”
          гэж тусад нь тэмдэглэгдсэн.
        </p> */}
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="scholarship-controls" aria-label="Тэтгэлгийн шүүлтүүр">
            {scholarshipFilters.map((filter) => (
              <button
                key={filter.id}
                className={activeFilter === filter.id ? "active" : ""}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="scholarship-count">
            <strong>{visibleScholarships.length}</strong>
            <span>тэтгэлгийн мэдээлэл харагдаж байна</span>
          </div>

          <div className="scholarship-card-list">
            {visibleScholarships.map((scholarship) => (
              <article className="scholarship-comparison-card" key={scholarship.id}>
                <div className="scholarship-card-head">
                  <div>
                    <p className="eyebrow">{formatScholarshipType(scholarship.type)}</p>
                    <h2>{scholarship.name}</h2>
                    <p className="name-stack">
                      {scholarship.universityNameZh} / {scholarship.abbreviation}
                    </p>
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
                <div className="comparison-actions">
                  {/* <Link className="text-link" to={`/universities/${scholarship.universityId}`}>
                    Сургуулийн мэдээлэл
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link> */}
                  <a className="text-link external-link" href={scholarship.officialUrl} target="_blank" rel="noopener noreferrer">
                    Албан ёсны сайт
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="notice-panel">
            <ShieldCheck size={24} aria-hidden="true" />
            <p>{scholarshipNotice}</p>
            <Link className="button primary" to="/universities">
              11 сургуулийг харах
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
