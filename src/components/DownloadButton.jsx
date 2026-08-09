import { Download } from "lucide-react";
import { PDF_LOCAL_PATH } from "../config/publicUrls.js";

export default function DownloadButton({
  children = "PDF танилцуулга татах",
  className = "button secondary",
}) {
  return (
    <a className={className} href={PDF_LOCAL_PATH} download>
      <Download size={18} aria-hidden="true" />
      {children}
    </a>
  );
}
