import PageHero from "../components/PageHero.jsx";
import PlaceCard from "../components/PlaceCard.jsx";
import { foods } from "../data/food.js";

function spicyLabel(level) {
  const labels = ["Зөөлөн", "Дунд", "Халуун"];
  return `Халуун ногоо: ${labels[level - 1] || "Дунд"}`;
}

export default function Food() {
  return (
    <main>
      <PageHero
        eyebrow="Хоолны хөтөч"
        title="Чунцины 7 гол амт"
        subtitle="重庆火锅, 重庆小面, 辣子鸡, 烤鱼, 串串, 酸辣粉, 抄手."
        image={foods[0].image}
        imagePosition={foods[0].imagePosition}
        label="Чунцин халуун тогоо"
      >
        <p>
          Хоол бүр тусдаа дэлгэрэнгүй хуудсаар соёл, амтлах газар,
          захиалах зөвлөмж, халуун ногооны түвшний тайлбартай.
        </p>
      </PageHero>
      <section className="section">
        <div className="container card-grid">
          {foods.map((food) => (
            <PlaceCard
              key={food.id}
              item={food}
              to={`/food/${food.id}`}
              meta={spicyLabel(food.spicyLevel)}
              cta="Дэлгэрэнгүй"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
