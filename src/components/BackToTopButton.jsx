import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChevronUp } from "lucide-react";

const SCROLL_THRESHOLD = 560;
const MIN_SCROLL_DISTANCE = SCROLL_THRESHOLD + 240;

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  const updateVisibility = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const maxScroll = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
    ) - window.innerHeight;

    setVisible(scrollTop > SCROLL_THRESHOLD && maxScroll > MIN_SCROLL_DISTANCE);
  }, []);

  useEffect(() => {
    let frame = 0;
    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateVisibility);
    };
    const hideDuringRouteChange = () => setVisible(false);

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("orientationchange", scheduleUpdate);
    window.addEventListener("route-transition-start", hideDuringRouteChange);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("orientationchange", scheduleUpdate);
      window.removeEventListener("route-transition-start", hideDuringRouteChange);
    };
  }, [location.pathname, location.search, updateVisibility]);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <button
      className={`back-to-top-button ${visible ? "is-visible" : ""}`}
      type="button"
      aria-label="Дээш буцах"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={handleClick}
    >
      <ChevronUp size={21} strokeWidth={2.6} aria-hidden="true" />
    </button>
  );
}
