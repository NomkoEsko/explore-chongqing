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

function CardList({ title, items, icon: Icon }) {
  return (
    <article className="content-panel icon-panel">
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
        eyebrow="Чунцины тухай"
        title="Уул, гол, гүүр, их сургууль, халуун амттай мегаполис."
        subtitle="重庆 / Chongqing — Монгол оюутанд зориулсан хотын товч хөтөч."
        image={attractions[5].image}
        imagePosition={attractions[5].imagePosition}
        label="Чунцины хотын үзэмж"
      >
        <p>
          Чунцин бол Бээжин, Шанхай, Тяньжинтай адил төв засгийн газарт шууд
          харьяалагддаг 4 хотын нэг. Нийт нутаг дэвсгэр том учраас хүн амын
          тоог зөвхөн хотын төвийн хэмжээнд ойлгож болохгүй.
        </p>
      </PageHero>

      <section className="section">
        <div className="container detail-grid">
          <article className="content-panel">
            <p className="eyebrow">Чунцин товчхон</p>
            <h2>Үндсэн мэдээлэл</h2>
            <p>
              Чунцин нь Хятадын баруун өмнөд хэсэгт, Янцзы мөрний дээд урсгалд
              байрладаг. 1997 онд тусгай захиргааны статустай болсон бөгөөд
              газар нутгийн хувьд шууд харьяа хотуудаас хамгийн том нь.
            </p>
          </article>
          <InfoGrid items={chongqingAtGlance} />
        </div>
      </section>

      <section className="section split-section">
        <div className="container two-column">
          <article className="content-panel">
            <p className="eyebrow">山城 — Уулын хот</p>
            <h2>Хотын дүр төрх</h2>
            <ul className="clean-list">
              {mountainCity.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="content-panel">
            <p className="eyebrow">Амьдрах зардал</p>
            <h2>Харьцангуй боломжийн сонголтууд</h2>
            <p>
              Чунцин нь том хотын боломжтой боловч Бээжин, Шанхай зэрэг хоттой
              харьцуулахад оюутны амьдралд илүү боломжийн хувилбаруудтай.
              Сарын зардлыг яг ¥X гэж зохиож бичээгүй: зардал нь дотуур байр, хооллох
              хэв маяг, аялал, хэрэглээнээс их хамаарна.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid compact-about-grid">
          {costOfLivingCards.map((card) => (
            <article className="about-card" key={card.title}>
              <Building2 size={22} aria-hidden="true" />
              <h2>{card.title}</h2>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container three-column">
          <article className="content-panel icon-panel">
            <Train size={24} aria-hidden="true" />
            <h2>Тээвэр</h2>
            <MetricList items={transportStats} />
            <p>
              Чунцин нь Chengdu, Xi'an, Kunming, Guiyang зэрэг хотуудтай
              холбогддог баруун өмнөдийн том тээврийн зангилаа.
            </p>
          </article>
          <article className="content-panel icon-panel">
            <CloudRain size={24} aria-hidden="true" />
            <h2>Уур амьсгал</h2>
            <MetricList items={climateStats} />
          </article>
          <article className="content-panel icon-panel">
            <GraduationCap size={24} aria-hidden="true" />
            <h2>Боловсролын орчин</h2>
            <MetricList items={educationStats} />
            <Link className="text-link" to="/universities">
              11 сургуулийг үзэх
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <CardList title="Уур амьсгалын давуу тал" items={climateCards.advantages} icon={CloudRain} />
          <CardList title="Уур амьсгалд анхаарах зүйл" items={climateCards.watchOuts} icon={CloudRain} />
        </div>
      </section>

      <section className="section">
        <div className="container detail-grid">
          <article className="content-panel">
            <p className="eyebrow">Эдийн засаг ба боломж</p>
            <h2>Суралцахаас цааш харах хот</h2>
            <ul className="clean-list">
              {economyFacts.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="content-panel">
            <p className="eyebrow">Салбарууд</p>
            <div className="tag-list">
              {economySectors.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <CardList title="Давуу тал" items={balancedNotes.advantages} icon={Landmark} />
          <CardList title="Анхаарах зүйл" items={balancedNotes.watchOuts} icon={CloudRain} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Яагаад Чунцин гэж?</p>
            <h2>Суралцах, амьдрах, аялах, өсөх боломжийг нэг дор өгдөг хот.</h2>
          </div>
          <div className="about-grid">
            {whyChongqing.map((card) => (
              <article className="about-card" key={card.title}>
                <Utensils size={22} aria-hidden="true" />
                <h2>{card.title}</h2>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <article className="notice-panel association-panel">
            <GraduationCap size={24} aria-hidden="true" />
            <div>
              <h2>{mongolianAssociation.title}</h2>
              <p>{mongolianAssociation.text}</p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
