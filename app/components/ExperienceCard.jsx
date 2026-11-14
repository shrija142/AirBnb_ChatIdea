import PhotoPlaceholder from './PhotoPlaceholder';

export default function ExperienceCard({ details }) {
  const meetingPoint = details.meetingPoint.replace(/^Outside/, 'outside');
  return (
    <article className="card experience">
      <PhotoPlaceholder />
      <div className="card-body">
        <p className="eyebrow category">Experience</p>
        <h2>{details.activityName}</h2>
        <p className="meta">
          <span className="date-label">{details.date}</span>
          {' '}{details.startTime} · {details.durationHours} hours
        </p>
        <p className="detail">Meet {meetingPoint} · ${details.pricePerGuestUsd} USD / guest</p>
      </div>
    </article>
  );
}
