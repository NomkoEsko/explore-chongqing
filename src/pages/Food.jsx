import PageHero from "../components/PageHero.jsx";
import PlaceCard from "../components/PlaceCard.jsx";
import { foods } from "../data/food.js";
import { saveListScrollPosition } from "../utils/scrollRestoration.js";

function spicyLabel(level) {
  const labels = ["Зөөлөн", "Дунд", "Халуун"];
  return `Халуун ногоо: ${labels[level - 1] || "Дунд"}`;
}

export default function Food() {
  return (
    <main>
      
      <section className="section">
        <div className="container card-grid">
          {foods.map((food) => (
            <PlaceCard
              key={food.id}
              item={food}
              to={`/food/${food.id}`}
              meta={spicyLabel(food.spicyLevel)}
              cta="Дэлгэрэнгүй"
              onClick={() => saveListScrollPosition("/food")}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
