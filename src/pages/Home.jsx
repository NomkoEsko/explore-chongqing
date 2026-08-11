import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Flame,
  GraduationCap,
  Landmark,
  MapPinned,
  Sparkles,
  UsersRound,
  Utensils,
} from "lucide-react";
import { attractions } from "../data/attractions.js";
import { foods } from "../data/food.js";
import { universities } from "../data/universities.js";

const categories = [
  {
    title: "Чунчины тухай",
    text: "Хот, амьдрал, уур амьсгал",
    to: "/about",
    icon: Building2,
    tone: "city",
  },
  {
    title: "Их сургуулиуд",
    text: `${universities.length} сургуулийг судлах`,
    to: "/universities",
    icon: GraduationCap,
    tone: "study",
  },
  {
    title: "Тэтгэлэг",
    text: "Тэтгэлгийн боломжууд",
    to: "/scholarships",
    icon: Sparkles,
    tone: "scholarship",
  },
  {
    title: "Онцлох газрууд",
    text: "Алдартай газар, Citywalk, зураг авах цэгүүд",
    to: "/attractions",
    icon: Landmark,
    tone: "travel",
  },
  {
    title: "Хоол",
    text: "Чунчины алдарт амтууд",
    to: "/food",
    icon: Utensils,
    tone: "food",
  },
  {
    title: "Оюутны холбоо",
    text: "Монгол оюутнууд",
    to: "/mongolian-students",
    icon: UsersRound,
    tone: "students",
  },
];

const why = ["山城 — Уулын хот", "Халуун тогоо ба Xiaomian", "582 км төмөр замын транзит", "75 дээд сургууль", "Харьцангуй боломжийн амьдрал"];

export default function Home() {
  return (
    <main className="home-hub">
      <section className="home-hero">
        <div className="container">
          <div className="home-hero-copy">
            <p className="eyebrow">Чунчин</p>
            <h1>Welcome to Чунчин</h1>
            {/* <p>
              Суралцах, тэтгэлэг, аялал, хоол, Монгол оюутны орчныг нэг дороос
              сонгож үзэх гар утсанд ээлтэй хөтөч.
            </p> */}
          </div>

          <div className="hub-grid" aria-label="Чунчин үндсэн ангиллууд">
            {categories.map(({ title, text, to, icon: Icon, tone }) => (
              <Link className={`hub-card ${tone}`} key={title} to={to}>
                <span className="hub-icon">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <span className="hub-copy">
                  <strong>{title}</strong>
                  <small>{text}</small>
                </span>
                <ArrowRight className="hub-arrow" size={18} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-panels">
        <div className="container">
          <div className="home-proof">
            <div>
              <span>{universities.length}</span>
              <p>их сургууль</p>
            </div>
            <div>
              <span>{universities.reduce((total, university) => total + university.scholarships.length, 0)}</span>
              <p>тэтгэлгийн мэдээлэл</p>
            </div>
            <div>
              <span>{attractions.length}</span>
              <p>аяллын газар</p>
            </div>
            <div>
              <span>{foods.length}</span>
              <p>гол амт</p>
            </div>
          </div>

          <div className="why-panel">
            <div>
              <p className="eyebrow">Чунчин яагаад онцгой вэ?</p>
              <h2>Шөнийн гэрэл, халуун амт, гол мөрөн, оюутны амьдрал нэг хотод багтдаг.</h2>
            </div>
            <div className="why-list">
              {why.map((item) => (
                <span key={item}>
                  <Flame size={16} aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="map-strip">
            <div>
              <p className="eyebrow">Газрын зураг</p>
              <h2>Байршлаар нь харах хэрэгтэй үед интерактив зураг бэлэн.</h2>
            </div>
            <Link className="button primary" to="/map">
              <MapPinned size={18} aria-hidden="true" />
              Газрын зураг нээх
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
