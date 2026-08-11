export function isUniversityRecord(item = {}) {
  return item.category === "university" || item.markerType === "university";
}

export function getUniversityPrimaryName(university = {}) {
  return (
    university.nameEn ||
    university.universityNameEn ||
    university.nameZh ||
    university.universityNameZh ||
    university.nameMn ||
    university.universityNameMn ||
    ""
  );
}

export function getUniversitySecondaryName(university = {}) {
  return university.nameZh || university.universityNameZh || "";
}

export function getLocationPrimaryName(location = {}) {
  if (isUniversityRecord(location)) return getUniversityPrimaryName(location);
  return location.nameMn || location.nameEn || location.nameZh || "";
}

export function getLocationSecondaryName(location = {}) {
  if (isUniversityRecord(location)) return getUniversitySecondaryName(location);
  return location.nameZh || "";
}
