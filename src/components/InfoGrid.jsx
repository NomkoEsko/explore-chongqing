export default function InfoGrid({ items }) {
  return (
    <div className="info-grid">
      {items.map((item) => (
        <article key={item.label}>
          <p>{item.label}</p>
          <strong>{item.value}</strong>
        </article>
      ))}
    </div>
  );
}
