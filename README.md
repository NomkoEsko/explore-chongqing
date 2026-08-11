# Explore Chongqing

React + Vite дээр хийсэн интерактив Chongqing хот, аялал, их сургууль, хоол, тэтгэлгийн guide веб сайт.

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Гол боломжууд

- Нүүр хуудсан дээр шууд харагдах Leaflet / OpenStreetMap интерактив газрын зураг
- University, Attraction, Food marker filter
- Marker hover popup, marker click detail route
- Universities, Attractions, Food, Scholarships, About Chongqing тусдаа page
- University / attraction / food detail pages
- `/?focus=...` query ашиглан marker дээр focus хийх боломж
- Mobile hamburger navigation, responsive card layout

## Data шинэчлэх

- Их сургуулиуд: `src/data/universities.js`
- Аяллын газрууд: `src/data/attractions.js`
- Хоолнууд: `src/data/food.js`
- Тэтгэлэг: `src/data/scholarships.js`

Зураг load хийхгүй бол fallback design гарна. Нийтлэхээс өмнө Chongqing-той холбоотой, ашиглах эрхтэй бодит зургаар солихыг зөвлөж байна.

## Байршуулах

1. `npm run build`
2. Vercel дээр framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. React Router refresh-д зориулсан `vercel.json` rewrite хадгалагдсан.

## Дараагийн хувилбарт сайжруулах зүйлс

- Бүх сургууль, тэтгэлэг, admission мэдээллийг official source-р баталгаажуулах
- Зургийн лиценз болон Chongqing relevance шалгах
- Илүү нарийн search/filter нэмэх
- Хятад / Монгол / Англи хэлний language switcher нэмэх
- Actual admissions links болон official contact links нэмэх
