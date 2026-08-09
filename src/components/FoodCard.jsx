import PhotoFrame from "./PhotoFrame.jsx";

export default function FoodCard({ food }) {
  return (
    <article className="food-card">
      <PhotoFrame compact label={food.imageLabel} title={food.name} />
      <div>
        <h3>{food.name}</h3>
        <p>{food.intro}</p>
      </div>
    </article>
  );
}
