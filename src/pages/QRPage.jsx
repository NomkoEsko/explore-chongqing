import { Link } from "react-router-dom";
import { ArrowLeft, Printer } from "lucide-react";
import DownloadButton from "../components/DownloadButton.jsx";
import QRCodeCard from "../components/QRCodeCard.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import { getQrTargets } from "../config/publicUrls.js";

export default function QRPage() {
  const targets = getQrTargets();
  const missingConfig = !targets.website.configured || !targets.pdf.configured;
  const missingUrls = !targets.website.url || !targets.pdf.url;
  const sameUrl =
    targets.website.url && targets.pdf.url && targets.website.url === targets.pdf.url;

  return (
    <main className="page-shell qr-page">
      <section className="section">
        <div className="container">
          <Link className="back-link" to="/#home">
            <ArrowLeft size={18} aria-hidden="true" />
            Нүүр хуудас руу буцах
          </Link>
          <SectionTitle
            eyebrow="QR код"
            title="Сайт болон PDF товхимлын QR код"
            intro="Эдгээр карт нь хэвлэхэд тохиромжтой загвар бөгөөд хоёр өөр холбоосоор QR код үүсгэнэ."
          />

          {missingConfig ? (
            <div className="setup-alert">
              <strong>Тохиргооны сануулга</strong>
              <p>
                Нийтийн холбоос бүрэн тохируулаагүй байна. Байршуулах үед
                <code> VITE_WEBSITE_PUBLIC_URL </code> болон
                <code> VITE_PDF_PUBLIC_URL </code> утгыг өөрчилж, QR кодыг дахин
                татна уу.
              </p>
            </div>
          ) : null}

          {missingUrls ? (
            <div className="setup-alert danger">
              <strong>Локал QR код үүсгэхгүй</strong>
              <p>
                Одоогийн орчин localhost эсвэл 127.0.0.1 бол QR код үүсгэх URL
                хоосон үлдэнэ. Эцсийн QR кодыг зөвхөн Vercel-ийн нийтийн
                домэйн эсвэл VITE_WEBSITE_PUBLIC_URL, VITE_PDF_PUBLIC_URL
                тохиргоогоор үүсгэнэ.
              </p>
            </div>
          ) : null}

          {sameUrl ? (
            <div className="setup-alert danger">
              <strong>Анхааруулга</strong>
              <p>
                Сайтын QR болон PDF-ийн QR нэг ижил URL ашиглаж байна. Эцсийн
                хувилбарт хоёр тусдаа холбоос тохируулах шаардлагатай.
              </p>
            </div>
          ) : null}

          <div className="qr-grid printable">
            <QRCodeCard
              title="Веб сайт нээх QR код"
              description="Энэ QR код нь байршуулсан нүүр хуудсыг нээнэ."
              url={targets.website.url}
              configured={targets.website.configured}
              autoResolved={targets.website.autoResolved}
              filename="ulaanbaatar-website-qr.png"
            />
            <QRCodeCard
              title="PDF танилцуулга нээх QR код"
              description="Энэ QR код нь PDF товхимлын байнгын холбоосыг шууд нээнэ."
              url={targets.pdf.url}
              configured={targets.pdf.configured}
              autoResolved={targets.pdf.autoResolved}
              filename="ulaanbaatar-pdf-qr.png"
            />
          </div>

          <div className="qr-instructions">
            <Printer size={22} aria-hidden="true" />
            <div>
              <h2>Хэвлэх болон эцэслэх заавар</h2>
              <p>
                Эцсийн QR кодуудыг сайт байршуулсны дараа, PDF товхимол байнгын
                нийтийн холбоостой болсон үед дахин үүсгэж татна. PDF файл
                шинэчлэгдсэн бол PDF QR кодыг мөн дахин үүсгэнэ.
              </p>
              <DownloadButton className="button secondary" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
