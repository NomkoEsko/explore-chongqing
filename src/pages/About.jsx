import { ArrowRight, Building2, CloudRain, GraduationCap, Landmark, Train, Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import InfoGrid from "../components/InfoGrid.jsx";
import PageHero from "../components/PageHero.jsx";
import {
  balancedNotes,
  chongqingAtGlance,
  climateCards,
  climateStats,
  costOfLivingCards,
  economyFacts,
  economySectors,
  educationStats,
  mongolianAssociation,
  mountainCity,
  transportStats,
  whyChongqing,
} from "../data/aboutChongqing.js";
import { attractions } from "../data/attractions.js";

function CardList({ title, items, icon: Icon, className = "" }) {
  return (
    <article className={`content-panel icon-panel ${className}`.trim()}>
      <Icon size={24} aria-hidden="true" />
      <h2>{title}</h2>
      <ul className="clean-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function MetricList({ items }) {
  return (
    <div className="metric-list">
      {items.map((item) => (
        <div key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}

export default function About() {
  return (
    <main>
      <PageHero
        title="Чунчин хотын тухай"
        image={attractions[5].image}
        imagePosition={attractions[5].imagePosition}
        label="Чунчины хотын үзэмж"
      >
      </PageHero>

      <section className="section">
        <div className="container detail-grid">
          <article className="content-panel">

            <h2>CHONGQING — THE 8D CYBER CITY</h2>
            <p>
              Чунчин (重庆) нь Хятадын баруун өмнөд хэсэгт орших, төв засгийн газарт шууд харьяалагддаг дөрвөн хотын нэг. (Шанхай, Бээжин, Тяньжин, Чунчин)

              Уул, мана, өндөр барилга, гүүр болон олон түвшний зам тээвэр нь давхарлан нийлсэн өвөрмөц хот байгуулалтаараа дэлхийд танигдсан.

            </p>
            <p>Хотын газарзүйн онцлогоос шалтгаалан зам, метро, барилга байгууламж нь өөр өөр өндөрлөг, түвшинд байрладаг. Үүний үр дүнд нэг барилгаас нөгөө барилга руу явахдаа хэд хэдэн давхар дээш доош хөдөлж, газрын зураг дээрх ойрхон хоёр цэг бодит байдал дээр огт өөр түвшинд байх тохиолдол бий.</p>
            <p>Тиймээс Чунчинийг интернэт хэрэглэгчид:

              “8D City” — 8 хэмжээст хот
              “Cyber City” — ирээдүйн хот

              хэмээн дүрслэх нь түгээмэл.</p>
          </article>
          <InfoGrid items={chongqingAtGlance} />
        </div>
      </section>
     <section className="section">
  <div
    className="container two-column"
    style={{ marginBottom: "10px" }}
  >
    <CardList
      title="Уур амьсгал"
      items={climateCards.advantages}
      icon={CloudRain}
      className="climate-card-list"
    />
  </div>
</section>

      <section className="section split-section">
          <article className="content-panel">

            <h2>Амьдрах зардал</h2>
            <p>
              Чунчин нь Бээжин, Шанхай зэрэг хотуудтай ижил том хот ч бусад хотуудтай харьцуулахад амьдрах зардал харьцангуй бага хот юм.

              Хотын хэмжээ, боловсрол, технологи, худалдаа, нийтийн тээврийн хөгжлөөр томоохон мегаполисын түвшинд хүрсэн хэдий ч байр, хоол, өдөр тутмын хэрэглээний зардал нь оюутны төсөвт харьцангуй хэмнэлттэй зохицуулах боломжтой байдаг.
            </p>
          </article>
        
      </section>

      <section className="section">
        <div className="container about-grid compact-about-grid">
          {costOfLivingCards.map((card) => (
            <article className="about-card" key={card.title}>
              <Building2 size={22} aria-hidden="true" />
              <h2>{card.title}</h2>
              <p style={{ whiteSpace: "pre-line" }}>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container two-column" style={{ marginBottom: "10px" }}>
          <CardList title="Давуу тал" items={balancedNotes.advantages} icon={Landmark} className="climate-card-list" />
        </div>
      </section>

    </main>
  );
}
