import { Link, useParams } from "react-router-dom";
import { Camera, Clock, MapPinned, Navigation } from "lucide-react";
import BackButton from "../components/BackButton.jsx";
import DetailMap from "../components/DetailMap.jsx";
import InfoGrid from "../components/InfoGrid.jsx";
import PageHero from "../components/PageHero.jsx";
import { attractions } from "../data/attractions.js";

export default function AttractionDetail() {
  const { id } = useParams();
  const attraction = attractions.find((item) => item.id === id);
  const overview = attraction?.overviewMn || attraction?.overview;
  const whyVisit = attraction?.whyVisitMn || attraction?.whyVisit || [];
  const bestTime = attraction?.bestTimeMn || attraction?.bestTime;
  const transport = attraction?.transportMn || attraction?.transport;
  const tips = attraction?.tipsMn || attraction?.photoTip;

  if (!attraction) {
    return (
      <main className="not-found-page">
        <div className="container narrow">
          <BackButton>Газрын зураг руу буцах</BackButton>
          <h1>Байршил олдсонгүй</h1>
          <p>Энэ аяллын газар одоогийн Чунчин мэдээлэлд байхгүй байна.</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <PageHero
        eyebrow="Аяллын газар"
        title={attraction.nameMn}
        subtitle={`${attraction.nameZh} / ${attraction.nameEn}`}
        image={attraction.image}
        imagePosition={attraction.imagePosition}
      >
        <p>{attraction.district} / Чунчин</p>
        <div className="hero-actions">
          <Link className="button primary" to={`/map?focus=${attraction.id}`}>
            <MapPinned size={18} aria-hidden="true" />
            Газрын зураг дээр харах
          </Link>
          <BackButton to="/attractions" restoreScroll>Онцлох газрууд</BackButton>
        </div>
      </PageHero>

      <section className="section">
        <div className="container detail-grid">
          <article className="content-panel">
            <p className="eyebrow">Танилцуулга</p>
            <p>{overview}</p>
          </article>
          <InfoGrid
            items={[
              { label: "Тохиромжтой цаг", value: bestTime },
            ]}
          />
        </div>
      </section>

      

      <section className="section detail-map">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Газрын зураг</p>
            <h2>{attraction.nameMn} газрын зураг дээр</h2>
          </div>
          <DetailMap place={attraction} markerType="attraction" />
        </div>
      </section>
    </main>
  );
}
