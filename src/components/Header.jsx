import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import { cityContent } from "../data/cityContent.js";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("ub-theme") || "light";
  });
  const location = useLocation();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("ub-theme", theme);
  }, [theme]);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link className="brand" to="/#home" aria-label="Нүүр хуудас">
          <span>UB</span>
          <strong>Улаанбаатар</strong>
        </Link>

        <nav className={`main-nav ${open ? "open" : ""}`} aria-label="Үндсэн цэс">
          {cityContent.nav.map((item) => (
            <Link key={item.label} to={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="icon-button"
            type="button"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Өнгөний горим солих"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button
            className="icon-button mobile-only"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Цэс хаах" : "Цэс нээх"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
