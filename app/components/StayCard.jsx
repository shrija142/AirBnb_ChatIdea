import PhotoPlaceholder from './PhotoPlaceholder';

export default function StayCard({ details }) {
  return (
    <article className="card stay">
      <PhotoPlaceholder />
      <div className="card-body">
        <p className="eyebrow category">Stay</p>
        <div className="stay-heading">
          <h2>{details.dates}</h2>
          <p className="meta stay-price">${details.nightlyPriceUsd} USD / night</p>
        </div>
        <p className="meta">{details.nights} nights · {details.neighbourhood}, Kyoto</p>
        <p className="listing">{details.listingTitle}</p>
        <p className="detail">{details.description}</p>
      </div>
    </article>
  );
}
