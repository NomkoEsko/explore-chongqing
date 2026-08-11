import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton.jsx";
import InfoGrid from "../components/InfoGrid.jsx";
import PageHero from "../components/PageHero.jsx";
import { foods } from "../data/food.js";

function spicyLabel(level) {
  const labels = ["Зөөлөн", "Дунд", "Халуун"];
  return labels[level - 1] || "Дунд";
}

export default function FoodDetail() {
  const { id } = useParams();
  const food = foods.find((item) => item.id === id);

  if (!food) {
    return (
      <main className="not-found-page">
        <div className="container narrow">
          <BackButton>Газрын зураг руу буцах</BackButton>
          <h1>Байршил олдсонгүй</h1>
          <p>Энэ хоолны мэдээлэл одоогийн Чунчин өгөгдөлд байхгүй байна.</p>
        </div>
      </main>
    );
  }

  const infoItems = [
    { label: "Халуун түвшин", value: spicyLabel(food.spicyLevel) },
    { label: "Амтлах газар", value: food.whereToTry },
    { label: "Захиалах зөвлөмж", value: food.tip },
  ];

  if (food.culturalTip) {
    infoItems.push({ label: "Соёлын зөвлөмж", value: food.culturalTip });
  }

  return (
    <main>
      <PageHero
        eyebrow="Хоол"
        title={food.nameMn}
        subtitle={`${food.nameZh} / ${food.nameEn}`}
        image={food.image}
        imagePosition={food.imagePosition}
      >
        {/* <p>{food.description}</p> */}
        <div className="hero-actions">
          <BackButton to="/food" restoreScroll>Хоол</BackButton>
        </div>
      </PageHero>
      <section className="section">
        <div className="container detail-grid">
          <article className="content-panel">
            <p className="eyebrow">Танилцуулга</p>
            <p>{food.overview}</p>
          </article>
          <InfoGrid items={infoItems} />
        </div>
      </section>
      {food.spiceOptions?.length ? (
        <section className="section split-section">
          <div className="container">
            <article className="content-panel">
              <p className="eyebrow">Захиалах хэллэг</p>
              <h2>Халуун ногооны түвшин</h2>
              <div className="tag-list">
                {food.spiceOptions.map((option) => (
                  <span key={option}>{option}</span>
                ))}
              </div>
            </article>
          </div>
        </section>
      ) : null}
    </main>
  );
}
