import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Facebook, Instagram, Menu, X } from "lucide-react";

const links = [
  { label: "Нүүр", to: "/" },
  { label: "Чунчиний тухай", to: "/about" },
  { label: "Их сургуулиуд", to: "/universities" },
  { label: "Тэтгэлэг", to: "/scholarships" },
  { label: "Онцлох газрууд", to: "/attractions" },
  { label: "Хоол", to: "/food" },
  { label: "Оюутны холбоо", to: "/mongolian-students" },
  { label: "Газрын зураг", to: "/map" },
];

const socialLinks = {
  instagram: "https://www.instagram.com/chongqing_chmoh/",
  facebook: "https://www.facebook.com/share/1V6f9dqf1u/?mibextid=wwXIfr",
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link className="brand" to="/" aria-label="Чунчин нүүр хуудас">
          <img className="brand-logo" src="/images/icon/site-logo.webp" alt="" aria-hidden="true" />
          <strong>Чунчин</strong>
        </Link>
        <nav className={`main-nav ${open ? "open" : ""}`} aria-label="Үндсэн цэс">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="header-socials" aria-label="Нийгмийн холбоосууд">
          <a
            className="header-social-link"
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram size={18} aria-hidden="true" />
          </a>
          {socialLinks.facebook ? (
            <a
              className="header-social-link"
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook size={18} aria-hidden="true" />
            </a>
          ) : (
            <button className="header-social-link is-disabled" type="button" aria-label="Facebook" disabled>
              <Facebook size={18} aria-hidden="true" />
            </button>
          )}
        </div>
        <button
          className="icon-button menu-button"
          type="button"
          aria-label={open ? "Цэс хаах" : "Цэс нээх"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
