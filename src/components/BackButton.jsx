import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { requestListScrollRestore } from "../utils/scrollRestoration.js";

export default function BackButton({ to = "/map", children = "Газрын зураг руу буцах", restoreScroll = false }) {
  function handleClick() {
    if (restoreScroll && typeof to === "string") {
      requestListScrollRestore(to);
    }
  }

  return (
    <Link className="back-link" to={to} onClick={handleClick}>
      <ArrowLeft size={18} aria-hidden="true" />
      {children}
    </Link>
  );
}
