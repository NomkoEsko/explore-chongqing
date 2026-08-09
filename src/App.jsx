import { useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import BackToTop from "./components/BackToTop.jsx";
import HomePage from "./pages/HomePage.jsx";
import QRPage from "./pages/QRPage.jsx";

function ScrollAndTitle() {
  const location = useLocation();

  useEffect(() => {
    const title =
      location.pathname === "/qr"
        ? "QR код | Улаанбаатар хотын танилцуулга"
        : "Улаанбаатар хотын танилцуулга";
    document.title = title;

    if (location.hash) {
      window.setTimeout(() => {
        document
          .querySelector(location.hash)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return null;
}

function NotFoundPage() {
  return (
    <main className="page-shell not-found">
      <div className="container narrow">
        <p className="eyebrow">Хуудас олдсонгүй</p>
        <h1>Ийм хаягтай хуудас одоогоор байхгүй байна.</h1>
        <p>
          Доорх товчоор нүүр хуудас руу буцаж Улаанбаатар хотын танилцуулгыг
          үргэлжлүүлэн үзнэ үү.
        </p>
        <Link className="button primary" to="/">
          <ArrowLeft size={18} aria-hidden="true" />
          Нүүр хуудас руу буцах
        </Link>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <>
      <ScrollAndTitle />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/qr" element={<QRPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <BackToTop />
    </>
  );
}
