import PhotoPlaceholder from './PhotoPlaceholder';

export default function FoodCard({ details }) {
  const bookingNote = details.bookingNote?.trim() || 'Booking information is not available.';

  return (
    <article className="card food">
      <div className="card-body">
        <p className="eyebrow category">Food</p>
        <h2>{details.restaurantName}</h2>
        <p className="meal-label">{details.mealType} · {details.priceRange}</p>
        <p className="meta">
          {details.cuisine} in {details.neighbourhood} · about ${details.estimatedCostForTwoUsd} USD for two
        </p>
        <p className="detail">{bookingNote}</p>
      </div>
      <PhotoPlaceholder />
    </article>
  );
}
