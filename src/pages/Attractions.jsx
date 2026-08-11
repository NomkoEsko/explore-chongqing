import { useMemo, useState } from "react";
import PageHero from "../components/PageHero.jsx";
import PlaceCard from "../components/PlaceCard.jsx";
import { attractionFilters, attractions } from "../data/attractions.js";
import { saveListScrollPosition } from "../utils/scrollRestoration.js";

export default function Attractions() {
  const [activeFilter, setActiveFilter] = useState("all");
  const filteredAttractions = useMemo(() => {
    if (activeFilter === "all") return attractions;
    return attractions.filter((attraction) => attraction.tags?.includes(activeFilter));
  }, [activeFilter]);

  return (
    <main>
      
      <section className="section">
        <div className="container">
          <div className="university-filter attraction-filter" aria-label="Аяллын газрын шүүлтүүр">
            {attractionFilters.map((filter) => (
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
        </div>
        <div className="container card-grid">
          {filteredAttractions.map((attraction) => (
            <PlaceCard
              key={attraction.id}
              item={attraction}
              to={`/attractions/${attraction.id}`}
              meta={attraction.categoryLabel}
              cta="Дэлгэрэнгүй"
              onClick={() => saveListScrollPosition("/attractions")}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
