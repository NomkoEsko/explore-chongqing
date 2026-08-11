const levelLabels = {
  Bachelor: "Бакалавр",
  Master: "Магистр",
  PhD: "Доктор",
  "Chinese language": "Хятад хэлний сургалт",
  "Language student": "Хэлний бэлтгэл",
  "Graduate programs": "Магистр/докторын хөтөлбөр",
  "Current international students": "Одоогийн гадаад оюутан",
};

const scholarshipTypeLabels = {
  CSC: "CSC",
  CIS: "CIS",
  Mayor: "Хотын тэтгэлэг",
  Joint: "Хамтарсан тэтгэлэг",
  "University Scholarship": "Сургуулийн тэтгэлэг",
};

const academicTagLabels = {
  AI: "Хиймэл оюун",
  Architecture: "Архитектур",
  Agriculture: "Хөдөө аж ахуй",
  Arts: "Урлаг",
  Automotive: "Автомашин",
  "Automotive Engineering": "Автомашины инженерчлэл",
  Automation: "Автоматжуулалт",
  Business: "Бизнес",
  Chinese: "Хятад хэл",
  "Chinese Language": "Хятад хэл",
  "Chinese-taught programs": "Хятад хэлээр заадаг хөтөлбөрүүд",
  Computer: "Компьютер",
  "Computer Science": "Компьютерын шинжлэх ухаан",
  Cybersecurity: "Кибер аюулгүй байдал",
  Design: "Дизайн",
  Economics: "Эдийн засаг",
  Education: "Боловсрол",
  "English-taught options": "Англи хэлээр заадаг сонголтууд",
  "English-taught programs": "Англи хэлээр заадаг хөтөлбөрүүд",
  Engineering: "Инженерчлэл",
  "Fine Arts": "Дүрслэх урлаг",
  Finance: "Санхүү",
  "Foreign Languages": "Гадаад хэл",
  Humanities: "Хүмүүнлэгийн ухаан",
  "International Business": "Олон улсын бизнес",
  "International Chinese Education": "Олон улсын хятад хэлний боловсрол",
  "International Education": "Олон улсын боловсрол",
  "International Politics": "Олон улсын улс төр",
  "International Relations": "Олон улсын харилцаа",
  "International Studies": "Олон улсын судлал",
  "International Trade": "Олон улсын худалдаа",
  "Intercultural Communication": "Соёл хоорондын харилцаа",
  Journalism: "Сэтгүүл зүй",
  Law: "Хууль",
  Logistics: "Логистик",
  Manufacturing: "Үйлдвэрлэл",
  Mathematics: "Математик",
  Mechanical: "Механик",
  "Mechanical Engineering": "Механик инженерчлэл",
  "Political Science": "Улс төрийн шинжлэх ухаан",
  Psychology: "Сэтгэл судлал",
  "Public Administration": "Төрийн удирдлага",
  Sciences: "Шинжлэх ухаан",
  Software: "Программ хангамж",
  "Software Engineering": "Программ хангамжийн инженерчлэл",
  Telecommunications: "Харилцаа холбоо",
  "Telecommunications Engineering": "Харилцаа холбооны инженерчлэл",
  Tourism: "Аялал жуулчлал",
  "Tourism Management": "Аялал жуулчлалын менежмент",
  Translation: "Орчуулга",
  Transportation: "Зам тээвэр",
  "Transportation Engineering": "Зам тээврийн инженерчлэл",
  "Applied Sciences": "Хэрэглээний шинжлэх ухаан",
  "Applied undergraduate programs": "Практик чиглэлийн бакалаврын хөтөлбөрүүд",
  "Bridge Engineering": "Гүүрийн инженерчлэл",
  "E-commerce": "Цахим худалдаа",
  "Teacher-related fields": "Багшийн чиглэл",
};

export function formatStudyLevel(level) {
  return levelLabels[level] || level;
}

export function formatStudyLevels(levels = []) {
  return levels.map(formatStudyLevel).join(" / ");
}

export function formatScholarshipType(type) {
  return scholarshipTypeLabels[type] || type;
}

export function formatAcademicTag(tag) {
  return academicTagLabels[tag] || tag;
}

export function formatBcurRank(rankData) {
  if (!rankData?.rank || typeof rankData.score !== "number") return null;
  return `2026 BCUR #${rankData.rank} · ${rankData.score.toFixed(1)}`;
}
