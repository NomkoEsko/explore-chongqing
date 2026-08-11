import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand footer-brand" to="/">
            <img className="brand-logo" src="/images/icon/site-logo.webp" alt="" aria-hidden="true" />
            <strong>Чунчин</strong>
          </Link>
          <p>Аялах / Суралцах</p>
          <small>Чунчин хот ба суралцах боломжийг газрын зурагтай холбосон интерактив хөтөч.</small>
        </div>
        <div>
          <h2>Цэс</h2>
          <Link to="/about">Чунчины тухай</Link>
          <Link to="/universities">Их сургуулиуд</Link>
          <Link to="/scholarships">Тэтгэлэг</Link>
          <Link to="/mongolian-students">Оюутны холбоо</Link>
        </div>
        <div>
          <h2>Судлах</h2>
          <Link to="/attractions">Онцлох газрууд</Link>
          <Link to="/food">Хоол</Link>
          <Link to="/map">Газрын зураг</Link>
        </div>
      </div>
    </footer>
  );
}
