import { mapCategories } from "../data/mapLocations.js";
import { GraduationCap, ListFilter, MapPin } from "lucide-react";

const icons = {
  all: ListFilter,
  university: GraduationCap,
  attraction: MapPin,
};

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="category-filter" aria-label="Газрын зургийн ангиллын шүүлтүүр">
      {mapCategories.map((category) => {
        const Icon = icons[category.id] || ListFilter;

        return (
          <button key={category.id} type="button" className={active === category.id ? "active" : ""} onClick={() => onChange(category.id)}>
            <Icon size={15} aria-hidden="true" />
            <span>{category.label}</span>
            <small>{category.countLabel}</small>
          </button>
        );
      })}
    </div>
  );
}
