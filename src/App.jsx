import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "./components/MainLayout.jsx";
import About from "./pages/About.jsx";
import AttractionDetail from "./pages/AttractionDetail.jsx";
import Attractions from "./pages/Attractions.jsx";
import Food from "./pages/Food.jsx";
import FoodDetail from "./pages/FoodDetail.jsx";
import Home from "./pages/Home.jsx";
import MapPage from "./pages/MapPage.jsx";
import MongolianStudents from "./pages/MongolianStudents.jsx";
import NotFound from "./pages/NotFound.jsx";
import Scholarships from "./pages/Scholarships.jsx";
import Universities from "./pages/Universities.jsx";
import UniversityDetail from "./pages/UniversityDetail.jsx";
import { attractions } from "./data/attractions.js";
import { foods } from "./data/food.js";
import { universities } from "./data/universities.js";

function ScrollAndTitle() {
  const location = useLocation();

  useEffect(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    let title = "Explore Chongqing";
    if (segments[0] === "universities" && segments[1]) {
      title = `${universities.find((item) => item.id === segments[1])?.nameMn || "Их сургууль"} | Explore Chongqing`;
    } else if (segments[0] === "universities") {
      title = "Чунцинд суралцах | Explore Chongqing";
    } else if (segments[0] === "attractions" && segments[1]) {
      title = `${attractions.find((item) => item.id === segments[1])?.nameMn || "Аяллын газар"} | Explore Chongqing`;
    } else if (segments[0] === "attractions") {
      title = "Чунцины аяллын газрууд | Explore Chongqing";
    } else if (segments[0] === "food" && segments[1]) {
      title = `${foods.find((item) => item.id === segments[1])?.nameMn || "Хоол"} | Explore Chongqing`;
    } else if (segments[0] === "food") {
      title = "Чунцины хоол | Explore Chongqing";
    } else if (segments[0] === "scholarships") {
      title = "Тэтгэлэг | Explore Chongqing";
    } else if (segments[0] === "about") {
      title = "Чунцины тухай | Explore Chongqing";
    } else if (segments[0] === "mongolian-students") {
      title = "Монгол оюутнууд | Explore Chongqing";
    } else if (segments[0] === "map") {
      title = "Газрын зураг | Explore Chongqing";
    }
    document.title = title;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, location.search]);

  return null;
}

export default function App() {
  return (
    <MainLayout>
      <ScrollAndTitle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/universities" element={<Universities />} />
        <Route path="/universities/:id" element={<UniversityDetail />} />
        <Route path="/attractions" element={<Attractions />} />
        <Route path="/attractions/:id" element={<AttractionDetail />} />
        <Route path="/food" element={<Food />} />
        <Route path="/food/:id" element={<FoodDetail />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/about" element={<About />} />
        <Route path="/mongolian-students" element={<MongolianStudents />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}
