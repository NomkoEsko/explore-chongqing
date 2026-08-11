import { useMemo, useState } from "react";
import PageHero from "../components/PageHero.jsx";
import UniversityCard from "../components/UniversityCard.jsx";
import { universities } from "../data/universities.js";

const filters = [
  { id: "all", label: "Бүгд", match: () => true },
  { id: "engineering", label: "Инженер", match: (text) => /Engineering|Mechanical|Civil|Transportation|Bridge|Architecture|Technology|Automotive/i.test(text) },
  { id: "it", label: "IT", match: (text) => /IT|Computer|Software|AI|Telecommunications|Cybersecurity/i.test(text) },
  { id: "law", label: "Хууль", match: (text) => /Law|Political/i.test(text) },
  { id: "language", label: "Хэл", match: (text) => /Chinese|Language|Translation|International Studies|Foreign/i.test(text) },
  { id: "education", label: "Боловсрол", match: (text) => /Education|Teacher|Normal|Psychology/i.test(text) },
];

function compareBcurRank(a, b) {
  const rankA = a.bcur2026?.rank ?? Number.POSITIVE_INFINITY;
  const rankB = b.bcur2026?.rank ?? Number.POSITIVE_INFINITY;
  return rankA - rankB;
}

export default function Universities() {
  const [activeFilter, setActiveFilter] = useState("all");

  const visibleUniversities = useMemo(() => {
    const selected = filters.find((filter) => filter.id === activeFilter) || filters[0];
    return universities
      .filter((university) =>
        selected.match([university.type, ...university.strengths, ...university.majors].join(" ")),
      )
      .sort(compareBcurRank);
  }, [activeFilter]);

  return (
    <main>
      
      <section className="section">
        <div className="container">
          <div className="university-filter" aria-label="Их сургуулийн чиглэлийн шүүлтүүр">
            {filters.map((filter) => (
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
          <div className="university-count">
            <strong>{visibleUniversities.length}</strong>
            <span>сургууль харагдаж байна</span>
          </div>
          <div className="card-grid university-grid">
            {visibleUniversities.map((university) => (
              <UniversityCard key={university.id} university={university} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
