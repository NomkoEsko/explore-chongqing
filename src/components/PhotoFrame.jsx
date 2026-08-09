export default function PhotoFrame({
  label,
  title,
  className = "",
  compact = false,
}) {
  return (
    <div
      className={`photo-frame ${compact ? "compact" : ""} ${className}`}
      role="img"
      aria-label={label}
    >
      <span>{title || label}</span>
      <small>Зураг солих хэсэг</small>
    </div>
  );
}
