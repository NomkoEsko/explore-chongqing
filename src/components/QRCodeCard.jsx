import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { Download, Link as LinkIcon } from "lucide-react";

export default function QRCodeCard({
  title,
  description,
  url,
  configured,
  autoResolved = false,
  filename,
}) {
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState("");

  const displayUrl = useMemo(() => url || "URL тохируулаагүй байна", [url]);

  useEffect(() => {
    if (!url) {
      setDataUrl("");
      setError("QR үүсгэх URL тохируулаагүй байна.");
      return;
    }

    QRCode.toDataURL(url, {
      width: 720,
      margin: 2,
      color: {
        dark: "#0b2a55",
        light: "#ffffff",
      },
    })
      .then((value) => {
        setDataUrl(value);
        setError("");
      })
      .catch(() => {
        setDataUrl("");
        setError("QR код үүсгэх үед алдаа гарлаа.");
      });
  }, [url]);

  return (
    <article className="qr-card">
      <div className="qr-image-wrap">
        {dataUrl ? (
          <img src={dataUrl} alt={`${title} QR код`} />
        ) : (
          <div className="qr-placeholder">QR код</div>
        )}
      </div>
      <div className="qr-copy">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="url-line">
          <LinkIcon size={16} aria-hidden="true" />
          <span>{displayUrl}</span>
        </div>
        {!url ? (
          <p className="config-warning">
            Нийтийн URL тохируулаагүй байна. Vercel дээр байршуулсны дараа
            орчны хувьсагч оруулах эсвэл байршуулсан домэйноор автоматаар
            үүсгэнэ.
          </p>
        ) : null}
        {url && autoResolved ? (
          <p className="config-warning">
            Орчны хувьсагч тохируулаагүй тул одоогийн байршуулсан домэйноор QR
            код үүсгэж байна.
          </p>
        ) : null}
        {url && !configured && !autoResolved ? (
          <p className="config-warning">
            Нийтийн URL тохиргоог шалгана уу. Эцсийн QR кодод localhost эсвэл
            127.0.0.1 ашиглахгүй.
          </p>
        ) : null}
        {error ? <p className="config-warning">{error}</p> : null}
        <a
          className={`button primary ${dataUrl ? "" : "disabled"}`}
          href={dataUrl || undefined}
          download={filename}
          aria-disabled={!dataUrl}
        >
          <Download size={18} aria-hidden="true" />
          QR код татах
        </a>
      </div>
    </article>
  );
}
