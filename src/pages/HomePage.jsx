import {
  Building2,
  Compass,
  Landmark,
  Map,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import AttractionCard from "../components/AttractionCard.jsx";
import ContactForm from "../components/ContactForm.jsx";
import DownloadButton from "../components/DownloadButton.jsx";
import FoodCard from "../components/FoodCard.jsx";
import Gallery from "../components/Gallery.jsx";
import Hero from "../components/Hero.jsx";
import InfoCard from "../components/InfoCard.jsx";
import PhotoFrame from "../components/PhotoFrame.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import TravelTipCard from "../components/TravelTipCard.jsx";
import { cityContent } from "../data/cityContent.js";

export default function HomePage() {
  const overviewIcons = [Building2, Landmark, Map, Compass, Sparkles];

  return (
    <main>
      <Hero />

      <section id="about" className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Хотын тухай"
            title="Улаанбаатар хотын ерөнхий танилцуулга"
            intro="Доорх мэдээлэл нь нийтлэл, аяллын танилцуулга, QR кодтой товхимолын эхний загвар агуулга юм."
          />
          <div className="overview-grid">
            {cityContent.overview.map((item, index) => (
              <InfoCard
                key={item.title}
                icon={overviewIcons[index]}
                label={item.note || "Танилцуулга"}
                value={item.title}
                body={item.body}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="attractions" className="section blue-band">
        <div className="container">
          <SectionTitle
            eyebrow="Үзвэр, үйлчилгээний газрууд"
            title="Төлөөлөх үзэх газрууд"
            intro="Тасалбарын үнэ, цагийн хуваарь зэрэг түр мэдээллийг санаатайгаар оруулаагүй."
            align="center"
          />
          <div className="attraction-grid">
            {cityContent.attractions.map((attraction) => (
              <AttractionCard key={attraction.name} attraction={attraction} />
            ))}
          </div>
        </div>
      </section>

      <section id="culture" className="section">
        <div className="container culture-layout">
          <div>
            <SectionTitle
              eyebrow="Соёл ба амьдрал"
              title="Уламжлал ба орчин үеийн хотын хэмнэл"
              intro="Улаанбаатар хотын соёлын өнгө төрхийг энгийн, баталгаажуулах боломжтой тайлбараар харууллаа."
            />
            <div className="culture-list">
              {cityContent.cultureSections.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
          <PhotoFrame
            className="culture-photo"
            label="Улаанбаатарын соёл, хотын амьдралын зураг"
            title="Соёлын зураг"
          />
        </div>
      </section>

      <section className="section warm-band">
        <div className="container">
          <SectionTitle
            eyebrow="Үндэсний хоол"
            title="Амталж үзэх жишээ хоолнууд"
            intro="Эдгээр нь хотод танилцуулах боломжтой монгол хоолны жишээ агуулга юм."
            align="center"
          />
          <div className="food-grid">
            {cityContent.foods.map((food) => (
              <FoodCard key={food.name} food={food} />
            ))}
          </div>
        </div>
      </section>

      <section id="tips" className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Аяллын зөвлөмж"
            title="Зочдод хэрэгтэй ерөнхий мэдээлэл"
            intro="Үнэ, цагийн хуваарь, бодит чиглэл зэрэг өөрчлөгдөх мэдээллийг оруулаагүй бөгөөд нийтлэхийн өмнө шинэчилнэ."
          />
          <div className="tips-grid">
            {cityContent.tips.map((tip) => (
              <TravelTipCard key={tip.title} tip={tip} />
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="section blue-band">
        <div className="container">
          <SectionTitle
            eyebrow="Зургийн цомог"
            title="Солих боломжтой зурган хэсгүүд"
            intro="Одоогоор зураг байрлуулах хэсгийг загвараар харуулсан. Нийтлэхдээ эрхтэй, өндөр чанартай зургаар солино."
            align="center"
          />
          <Gallery items={cityContent.gallery} />
        </div>
      </section>

      <section id="location" className="section">
        <div className="container location-layout">
          <div>
            <SectionTitle
              eyebrow="Байршил"
              title={cityContent.location.title}
              intro={cityContent.location.intro}
            />
            <div className="location-cards">
              {cityContent.location.cards.map((card) => (
                <InfoCard
                  key={card.title}
                  icon={Map}
                  label="Байршлын мэдээлэл"
                  value={card.title}
                  body={card.body}
                />
              ))}
            </div>
          </div>
          <div className="map-placeholder" role="img" aria-label="Газрын зураг">
            <Map size={42} aria-hidden="true" />
            <strong>{cityContent.location.mapLabel}</strong>
            <span>API түлхүүргүй, тохируулах боломжтой хэсэг</span>
          </div>
        </div>
      </section>

      <section id="qr-preview" className="section qr-cta">
        <div className="container cta-panel">
          <div>
            <p className="eyebrow">QR код</p>
            <h2>Сайт болон PDF товхимолд зориулсан хоёр тусдаа QR код</h2>
            <p>
              Эцсийн байршуулалтын дараа веб сайтын холбоос болон PDF-ийн
              байнгын холбоосыг тусад нь тохируулж QR кодыг дахин үүсгэнэ.
            </p>
          </div>
          <div className="cta-actions">
            <Link className="button primary" to="/qr">
              QR код харах
              <ShieldCheck size={18} aria-hidden="true" />
            </Link>
            <DownloadButton className="button light" />
          </div>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="container contact-layout">
          <div>
            <SectionTitle
              eyebrow="Холбоо барих"
              title={cityContent.contact.title}
              intro={cityContent.contact.intro}
            />
            <div className="verification-box">
              <h3>Нийтлэхээс өмнө баталгаажуулах зүйлс</h3>
              <ul>
                {cityContent.verificationItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
