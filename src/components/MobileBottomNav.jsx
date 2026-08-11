import { GraduationCap, Home, Map, Sparkles, UsersRound } from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  { label: "Нүүр", to: "/", icon: Home },
  { label: "Сургууль", to: "/universities", icon: GraduationCap },
  { label: "Тэтгэлэг", to: "/scholarships", icon: Sparkles },
  { label: "Оюутнууд", to: "/mongolian-students", icon: UsersRound },
  { label: "Газрын зураг", to: "/map", icon: Map },
];

export default function MobileBottomNav() {
  return (
    <nav className="mobile-bottom-nav" aria-label="Гар утасны үндсэн цэс">
      {items.map(({ label, to, icon: Icon }) => (
        <NavLink key={to} to={to}>
          <Icon size={17} aria-hidden="true" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
