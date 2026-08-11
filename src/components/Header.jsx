import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Нүүр", to: "/" },
  { label: "Чунчины тухай", to: "/about" },
  { label: "Их сургуулиуд", to: "/universities" },
  { label: "Тэтгэлэг", to: "/scholarships" },
  { label: "Аяллын газрууд", to: "/attractions" },
  { label: "Хоол", to: "/food" },
  { label: "Монгол оюутнууд", to: "/mongolian-students" },
  { label: "Газрын зураг", to: "/map" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link className="brand" to="/" aria-label="Explore Chongqing нүүр хуудас">
          <span>CQ</span>
          <strong>Explore Chongqing</strong>
        </Link>
        <nav className={`main-nav ${open ? "open" : ""}`} aria-label="Үндсэн цэс">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"}>
              {link.label}
            </NavLink>
          ))}
        </nav>
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
