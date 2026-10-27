export function Mark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 40 44" aria-hidden="true" focusable="false">
      <circle cx="13" cy="9" r="8" className="fill-violet" />
      <circle cx="27" cy="9" r="8" className="fill-violet" />
      <circle cx="11" cy="25" r="6.5" className="fill-rose" />
      <circle cx="20" cy="22" r="6.5" className="fill-rose" />
      <circle cx="29" cy="25" r="6.5" className="fill-rose" />
      <circle cx="20" cy="38" r="5.5" className="fill-sun" />
    </svg>
  );
}
