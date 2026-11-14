export default function PhotoPlaceholder() {
  return (
    <div className="photo grid place-items-center" aria-hidden="true">
      <svg width="25" height="23" viewBox="0 0 25 23" fill="none" stroke="currentColor" strokeWidth="1.1">
        <path d="M2 19 9 9l4 6 3-4 7 8H2Z" />
        <circle cx="17.5" cy="5.5" r="2.5" />
      </svg>
    </div>
  );
}
