const MARQUEE_ITEMS = [
  'MERN Full-Stack',
  'TechXcelerate 2025 · 3rd Place',
  'React.js · Node.js · Express.js',
  'Python · Flask · SQLite',
  'MongoDB · MySQL · REST APIs',
  'Data Structures · OOP · DBMS',
];

export function MarqueeRibbon() {
  return (
    <div
      aria-label="Core engineering disciplines"
      className="border-y border-slate-800 bg-[#0F172A] text-slate-100 overflow-hidden py-3.5 select-none"
    >
      <div className="animate-marquee flex items-center gap-8">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
          <span
            key={`${item}-${idx}`}
            className="inline-flex items-center gap-8 text-xs md:text-sm font-medium tracking-wide whitespace-nowrap shrink-0"
          >
            <span className="text-slate-200">{item}</span>
            <span
              aria-hidden="true"
              className={
                idx % 3 === 0
                  ? 'text-[#38BDF8]'
                  : idx % 3 === 1
                  ? 'text-[#34D399]'
                  : 'text-[#FBBF24]'
              }
            >
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
