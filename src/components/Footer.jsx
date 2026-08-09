import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { cityContent } from "../data/cityContent.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand footer-brand" to="/#home">
            <span>UB</span>
            <strong>Улаанбаатар</strong>
          </Link>
          <p>{cityContent.prototypeNotice}</p>
        </div>
        <div>
          <h2>Цэс</h2>
          <ul>
            {cityContent.nav.map((item) => (
              <li key={item.label}>
                <Link to={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Нийгмийн суваг</h2>
          <div className="social-links" aria-label="Нийгмийн сувгийн жишээ холбоос">
            <a href="#contact" aria-label="Имэйл">
              <Mail size={18} />
            </a>
            <a href="#contact" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="#contact" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="#contact" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          </div>
          <p>Албан дэлгэрэнгүй мэдээллийг нийтлэхээс өмнө заавал шалгана.</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <small>© 2026 Улаанбаатар хотын танилцуулга - загвар төсөл.</small>
      </div>
    </footer>
  );
}
