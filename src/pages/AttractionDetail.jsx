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
          <p>Энэ аяллын газар одоогийн Explore Chongqing мэдээлэлд байхгүй байна.</p>
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
        <p>{attraction.district} / Чунцин</p>
        <div className="hero-actions">
          <Link className="button primary" to={`/map?focus=${attraction.id}`}>
            <MapPinned size={18} aria-hidden="true" />
            Газрын зураг дээр харах
          </Link>
          <BackButton to="/attractions">Аяллын газрууд</BackButton>
        </div>
      </PageHero>

      <section className="section">
        <div className="container detail-grid">
          <article className="content-panel">
            <p className="eyebrow">Танилцуулга</p>
            <h2>Яагаад очих вэ?</h2>
            <p>{overview}</p>
          </article>
          <InfoGrid
            items={[
              { label: "Тохиромжтой цаг", value: bestTime },
              { label: "Үргэлжлэх хугацаа", value: attraction.duration },
              { label: "Ойролцоох газрууд", value: attraction.nearby.join(", ") },
            ]}
          />
        </div>
      </section>

      <section className="section split-section">
        <div className="container three-column">
          <article className="content-panel icon-panel">
            <Clock size={24} aria-hidden="true" />
            <h2>Үзэх шалтгаан</h2>
            <div className="tag-list">
              {whyVisit.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
          <article className="content-panel icon-panel">
            <Navigation size={24} aria-hidden="true" />
            <h2>Хэрхэн очих вэ?</h2>
            <p>{transport}</p>
          </article>
          <article className="content-panel icon-panel">
            <Camera size={24} aria-hidden="true" />
            <h2>Зураг авах санаа</h2>
            <p>{tips}</p>
          </article>
        </div>
      </section>

      {attraction.sourceReferences?.length ? (
        <section className="section">
          <div className="container">
            <article className="content-panel">
              <p className="eyebrow">Эх сурвалж</p>
              <h2>Баталгаанд ашигласан мэдээлэл</h2>
              <div className="tag-list source-list">
                {attraction.sourceReferences.map((source) => (
                  <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                    {source.label}
                  </a>
                ))}
              </div>
            </article>
          </div>
        </section>
      ) : null}

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
