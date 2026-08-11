import { attractions } from "./attractions.js";
import { universities } from "./universities.js";

export const allLocations = [
  ...universities.map((item) => ({
    ...item,
    route: `/universities/${item.id}`,
    markerType: "university",
  })),
  ...attractions.map((item) => ({
    ...item,
    route: `/attractions/${item.id}`,
    markerType: "attraction",
  })),
];

export const mapCategories = [
  { id: "all", label: "Бүгд", countLabel: `${allLocations.length} байршил` },
  { id: "university", label: "Их сургууль", countLabel: `${universities.length} сургууль` },
  { id: "attraction", label: "Аяллын газар", countLabel: `${attractions.length} газар` },
];
