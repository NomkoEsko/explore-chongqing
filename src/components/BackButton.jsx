import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function BackButton({ to = "/map", children = "Газрын зураг руу буцах" }) {
  return (
    <Link className="back-link" to={to}>
      <ArrowLeft size={18} aria-hidden="true" />
      {children}
    </Link>
  );
}
