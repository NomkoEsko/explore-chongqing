import { CheckCircle2 } from "lucide-react";

export default function TravelTipCard({ tip }) {
  return (
    <article className="tip-card">
      <CheckCircle2 size={20} aria-hidden="true" />
      <div>
        <h3>{tip.title}</h3>
        <p>{tip.body}</p>
      </div>
    </article>
  );
}
