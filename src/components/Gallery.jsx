import { useEffect, useState } from "react";
import { X } from "lucide-react";
import PhotoFrame from "./PhotoFrame.jsx";

export default function Gallery({ items }) {
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") setActiveItem(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <div className="gallery-grid">
        {items.map((item) => (
          <button
            className="gallery-item"
            type="button"
            key={item.title}
            onClick={() => setActiveItem(item)}
          >
            <PhotoFrame compact label={item.imageLabel} title={item.title} />
          </button>
        ))}
      </div>

      {activeItem ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeItem.title} зураг`}
        >
          <button
            className="lightbox-backdrop"
            type="button"
            aria-label="Зураг хаах"
            onClick={() => setActiveItem(null)}
          />
          <div className="lightbox-panel">
            <button
              className="icon-button close-lightbox"
              type="button"
              aria-label="Зураг хаах"
              onClick={() => setActiveItem(null)}
            >
              <X size={22} />
            </button>
            <PhotoFrame
              label={activeItem.imageLabel}
              title={activeItem.title}
              className="lightbox-photo"
            />
            <h3>{activeItem.title}</h3>
            <p>Энд албан эрхтэй, өндөр чанартай зураг байрлуулах боломжтой.</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
