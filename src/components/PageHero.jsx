import ImageFrame from "./ImageFrame.jsx";

export default function PageHero({ eyebrow, title, subtitle, image, imagePosition, label, children }) {
  return (
    <section className="page-hero">
      <div className="container page-hero-grid">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {subtitle ? <p className="hero-subtitle">{subtitle}</p> : null}
          {children}
        </div>
        <ImageFrame src={image} alt={title} label={label || title} className="hero-image" position={imagePosition} />
      </div>
    </section>
  );
}
