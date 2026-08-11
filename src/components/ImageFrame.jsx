import { useState } from "react";

export default function ImageFrame({ src, alt, label, className = "", position }) {
  const [failed, setFailed] = useState(false);
  const imageStyle = position ? { objectPosition: position } : undefined;

  return (
    <div className={`image-frame ${className}`}>
      {src && !failed ? (
        <img src={src} alt={alt} loading="lazy" style={imageStyle} onError={() => setFailed(true)} />
      ) : null}
      <div className="image-fallback" aria-hidden={src && !failed ? "true" : "false"}>
        <span>{label || alt}</span>
        <small>Чунчины зураг</small>
      </div>
    </div>
  );
}
