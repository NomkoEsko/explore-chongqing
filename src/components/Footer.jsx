import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand footer-brand" to="/">
            <img className="brand-logo" src="/images/icon/site-logo.webp" alt="" aria-hidden="true" />
            <strong>Explore Chongqing</strong>
          </Link>
          <p>Аялах / Суралцах / Таних</p>
          <small>Чунчин хот ба суралцах боломжийг газрын зурагтай холбосон интерактив хөтөч.</small>
        </div>
        <div>
          <h2>Цэс</h2>
          <Link to="/about">Чунчины тухай</Link>
          <Link to="/universities">Их сургуулиуд</Link>
          <Link to="/scholarships">Тэтгэлэг</Link>
          <Link to="/mongolian-students">Монгол оюутнууд</Link>
        </div>
        <div>
          <h2>Судлах</h2>
          <Link to="/attractions">Аяллын газрууд</Link>
          <Link to="/food">Хоол</Link>
          <Link to="/map">Газрын зураг</Link>
          <a href="/image-credits.html">Зургийн эх сурвалж</a>
          <small>Тэтгэлэг, элсэлт, аяллын мэдээллийг нийтлэхээс өмнө албан эх сурвалжаас баталгаажуулна.</small>
        </div>
      </div>
    </footer>
  );
}
