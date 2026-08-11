import { useMemo, useState } from "react";
import PageHero from "../components/PageHero.jsx";
import PlaceCard from "../components/PlaceCard.jsx";
import { attractionFilters, attractions } from "../data/attractions.js";

export default function Attractions() {
  const [activeFilter, setActiveFilter] = useState("all");
  const filteredAttractions = useMemo(() => {
    if (activeFilter === "all") return attractions;
    return attractions.filter((attraction) => attraction.tags?.includes(activeFilter));
  }, [activeFilter]);

  return (
    <main>
      <PageHero
        eyebrow="Аяллын хөтөч"
        title={`Чунцины ${attractions.length} аяллын газар`}
        subtitle="Алдартай газрууд, Citywalk, creative street, зураг авах цэг, байгаль, шөнийн хот."
        image={attractions[0].image}
        imagePosition={attractions[0].imagePosition}
        label="Чунцины шөнийн үзэмж"
      >
        <p>
          Карт бүрээс очих шалтгаан, цагийн зөвлөмж, тээврийн чиглэл,
          ойролцоох газрууд болон газрын зургийн байршлыг харна. Эхэд байхгүй
          аяллын яг хугацаа, тасалбарын үнийг зохиож нэмээгүй.
        </p>
      </PageHero>
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
            />
          ))}
        </div>
      </section>
    </main>
  );
}
