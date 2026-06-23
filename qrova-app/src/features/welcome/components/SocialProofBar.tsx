const ITEMS = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M2 8a6 6 0 0 1 10.47-4M14 8a6 6 0 0 1-10.47 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M12 4l.5 2.5-2.5.5M4 12l-.5-2.5 2.5-.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "+52,000 escaneos este mes",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M2 8h12M8 2c-1.5 2-2 4-2 6s.5 4 2 6M8 2c1.5 2 2 4 2 6s-.5 4-2 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: "12 países",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M3 8l3.5 3.5L13 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "WCAG AA accesible",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M8 2v3M8 11v3M13 8h-3M6 8H3M11.5 4.5l-2.12 2.12M6.62 9.38 4.5 11.5M11.5 11.5 9.38 9.38M6.62 6.62 4.5 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: "Sin registro para empezar",
  },
] as const;

const SocialProofBar = () => (
  <div className="border-y border-gray-100 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {ITEMS.map(({ icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-2 text-sm text-gray-500"
          >
            <span className="text-gray-400">{icon}</span>
            {label}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default SocialProofBar;
