import BackButton from "../components/BackButton.jsx";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="container narrow">
        <BackButton>Газрын зураг руу буцах</BackButton>
        <h1>Хуудас олдсонгүй</h1>
        <p>Таны нээсэн хуудас Explore Chongqing сайтад байхгүй байна.</p>
      </div>
    </main>
  );
}
