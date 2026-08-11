import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Route, Routes, useLocation, useNavigationType } from "react-router-dom";
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

const ROUTE_TRANSITION_MS = 220;

function scrollToTopInstantly() {
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  root.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
  root.style.scrollBehavior = previousScrollBehavior;
}

function getRouteDepth(pathname) {
  return pathname.split("/").filter(Boolean).length;
}

function getRouteDirection(from, to, navigationType) {
  if (navigationType === "POP") return "back";
  const fromRoot = from.pathname.split("/").filter(Boolean)[0] || "";
  const toRoot = to.pathname.split("/").filter(Boolean)[0] || "";

  if (fromRoot === toRoot && getRouteDepth(to.pathname) < getRouteDepth(from.pathname)) {
    return "back";
  }

  return "forward";
}

function ScrollAndTitle() {
  const location = useLocation();

  useEffect(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    let title = "Чунчин";
    if (segments[0] === "universities" && segments[1]) {
      title = `${universities.find((item) => item.id === segments[1])?.nameMn || "Их сургууль"} | Чунчин`;
    } else if (segments[0] === "universities") {
      title = "Чунчинд суралцах | Чунчин";
    } else if (segments[0] === "attractions" && segments[1]) {
      title = `${attractions.find((item) => item.id === segments[1])?.nameMn || "Аяллын газар"} | Чунчин`;
    } else if (segments[0] === "attractions") {
      title = "Чунчины Онцлох газрууд | Чунчин";
    } else if (segments[0] === "food" && segments[1]) {
      title = `${foods.find((item) => item.id === segments[1])?.nameMn || "Хоол"} | Чунчин`;
    } else if (segments[0] === "food") {
      title = "Чунчины хоол | Чунчин";
    } else if (segments[0] === "scholarships") {
      title = "Тэтгэлэг | Чунчин";
    } else if (segments[0] === "about") {
      title = "Чунчины тухай | Чунчин";
    } else if (segments[0] === "mongolian-students") {
      title = "Оюутны холбоо | Чунчин";
    } else if (segments[0] === "map") {
      title = "Газрын зураг | Чунчин";
    }
    document.title = title;
  }, [location.pathname, location.search]);

  return null;
}

function PageRoutes({ location }) {
  return (
    <Routes location={location}>
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
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const activeLocationRef = useRef(location);
  const [routeState, setRouteState] = useState({
    current: location,
    previous: null,
    direction: "forward",
  });

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    const activeLocation = activeLocationRef.current;

    if (location.pathname === activeLocation.pathname) {
      activeLocationRef.current = location;
      setRouteState((state) => ({
        ...state,
        current: location,
        previous: null,
      }));
      return undefined;
    }

    const direction = getRouteDirection(activeLocation, location, navigationType);
    scrollToTopInstantly();
    window.dispatchEvent(new CustomEvent("route-transition-start"));
    activeLocationRef.current = location;
    setRouteState({
      current: location,
      previous: activeLocation,
      direction,
    });

    const transitionTimer = window.setTimeout(() => {
      setRouteState((state) => {
        if (state.current.key !== location.key) return state;
        scrollToTopInstantly();
        window.dispatchEvent(new CustomEvent("route-transition-end"));
        return {
          ...state,
          previous: null,
        };
      });
    }, ROUTE_TRANSITION_MS);
    window.requestAnimationFrame(scrollToTopInstantly);

    return () => window.clearTimeout(transitionTimer);
  }, [location, navigationType]);

  const isAnimating = Boolean(routeState.previous);

  return (
    <div
      className={`route-transition-shell ${isAnimating ? "is-animating" : ""}`}
      data-direction={routeState.direction}
    >
      {routeState.previous ? (
        <div className="route-page route-page-exit" key={`exit-${routeState.previous.key}`}>
          <PageRoutes location={routeState.previous} />
        </div>
      ) : null}
      <div className="route-page route-page-enter" key={routeState.current.key}>
        <PageRoutes location={routeState.current} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <MainLayout>
      <ScrollAndTitle />
      <AnimatedRoutes />
    </MainLayout>
  );
}
