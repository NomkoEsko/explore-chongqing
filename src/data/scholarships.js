import { universities } from "./universities.js";

export const scholarshipNotice =
  "Тэтгэлэг, элсэлт, багтах зүйлс жил бүр өөрчлөгдөж болно. Зарим сургуульд CSC, Mayor Scholarship, University Scholarship-ийг давхар авахгүй, нэг төрлийг сонгох нөхцөл үйлчилдэг тул өргөдөл гаргахаас өмнө тухайн сургуулийн хамгийн сүүлийн албан зарлалыг заавал шалгана.";

export const scholarshipFilters = [
  { id: "all", label: "Бүгд" },
  { id: "Bachelor", label: "Бакалавр" },
  { id: "Master", label: "Магистр" },
  { id: "PhD", label: "Доктор" },
  { id: "CSC", label: "CSC" },
  { id: "Mayor", label: "Хотын" },
  { id: "University Scholarship", label: "Сургуулийн" },
];

export const scholarshipComparison = universities.flatMap((university) =>
  university.scholarships.map((scholarship) => ({
    ...scholarship,
    id: `${university.id}-${scholarship.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    universityId: university.id,
    universityNameMn: university.nameMn,
    universityNameZh: university.nameZh,
    universityNameEn: university.nameEn,
    abbreviation: university.abbreviation,
    officialUrl: university.officialUrl,
  })),
);
