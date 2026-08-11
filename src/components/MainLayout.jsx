import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import MobileBottomNav from "./MobileBottomNav.jsx";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <MobileBottomNav />
    </>
  );
}
