import { ArrowRight, MapPinned } from "lucide-react";
import { cityContent } from "../data/cityContent.js";
import DownloadButton from "./DownloadButton.jsx";
import InfoCard from "./InfoCard.jsx";
import PhotoFrame from "./PhotoFrame.jsx";

export default function Hero() {
  const icons = [MapPinned, MapPinned, MapPinned, MapPinned];

  return (
    <section id="home" className="hero-section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Загвар хотын танилцуулга</p>
          <h1>{cityContent.hero.title}</h1>
          <p className="hero-subtitle">{cityContent.hero.subtitle}</p>
          <p className="hero-intro">{cityContent.hero.intro}</p>
          <div className="hero-actions">
            <a className="button primary" href="#about">
              {cityContent.hero.primaryAction}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <DownloadButton />
          </div>
        </div>
        <PhotoFrame
          className="hero-photo"
          label={cityContent.hero.imageLabel}
          title="Улаанбаатар хот"
        />
      </div>
      <div className="container quick-facts" aria-label="Шуурхай мэдээлэл">
        {cityContent.quickFacts.map((fact, index) => (
          <InfoCard
            key={fact.label}
            icon={icons[index]}
            label={fact.label}
            value={fact.value}
          />
        ))}
      </div>
    </section>
  );
}
