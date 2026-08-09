export default function InfoCard({ icon: Icon, label, value, body }) {
  return (
    <article className="info-card">
      {Icon ? (
        <div className="icon-badge" aria-hidden="true">
          <Icon size={20} />
        </div>
      ) : null}
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        {body ? <span>{body}</span> : null}
      </div>
    </article>
  );
}
