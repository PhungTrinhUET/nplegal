// Biểu tượng nét mảnh 24×24, vẽ tay (không cần thư viện).
const P: Record<string, string> = {
  globe: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9M12 3c-2.5 2.5-3.8 5.5-3.8 9s1.3 6.5 3.8 9',
  building: 'M5 21V4h10v17M15 9h4v12M3 21h18M8 7.5h1.5M11 7.5h1.5M8 11h1.5M11 11h1.5M8 14.5h1.5M11 14.5h1.5M9.5 21v-3h1.5v3',
  handshake: 'M2.5 11l3.5-4 3 1.5 3-1.5 3 .5 3.5-1.5 3 4M5.5 13.5l3 3c.8.8 2 .8 2.7 0M8.5 12l3.5 3.5c.8.8 2 .8 2.7 0M11.5 10.5l3.7 3.7c.8.8 2 .8 2.7 0l1.6-1.7M12 7.5L9.3 10.2c-.7.7-.3 1.8.7 1.8 1.1 0 2-.6 2.8-1.3',
  clipboard: 'M8 4h8v3H8zM8 5.5H5.5V21h13V5.5H16M8.5 12l1.5 1.5 3-3M8.5 17h7',
  gavel: 'M13.5 3.5l6 6M11 6l6 6M12.3 4.7l-3.6 3.6M18.3 10.7l-3.6 3.6M10.7 9.3l-6.7 6.7 2 2 6.7-6.7M3 21h10',
  crane: 'M6 21V4l12 3H6M6 4l4 3M14 7v4M12.5 11h3v2.5h-3zM4 21h12M6 10h3M6 14h3M6 18h3',
  bulb: 'M9 17h6M10 20.5h4M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.3 1 2.1V17h5.2v-1.1c0-.8.4-1.6 1-2.1A6 6 0 0 0 12 3z',
  percent: 'M6 3.5h9l3.5 3.5v13.5H6zM15 3.5V7h3.5M9 17l6-6M9.5 11.5a.6.6 0 1 0 0 .1M14.5 16.5a.6.6 0 1 0 0 .1',
  bank: 'M3 9.5L12 4l9 5.5M4.5 9.5h15M6 10v7.5M10 10v7.5M14 10v7.5M18 10v7.5M3.5 20.5h17M4.5 18h15',
  bolt: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M13 6.5l-4 6h3l-1 5 4-6h-3z',
  users: 'M9 11a3 3 0 1 0 0-6a3 3 0 1 0 0 6M3.5 19c.5-3 2.7-5 5.5-5s5 2 5.5 5M16 11a2.5 2.5 0 1 0 0-5M17 14c2 .4 3.3 2.2 3.6 4.5',
  shield: 'M12 3l7.5 3v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6zM8.5 12l2.5 2.5 4.5-4.5',
  target: 'M12 4a8 8 0 1 0 8 8M12 8a4 4 0 1 0 4 4M12 12l7-7M16 5h3v3',
  chart: 'M4 20h16M6 17v-4M10 17V10M14 17v-5M18 17V7M5 11l5-4 4 3 5-5',
  briefcase: 'M3.5 7.5h17v12h-17zM9 7.5V5h6v2.5M3.5 12.5h17M11 12.5v2h2v-2',
  star: 'M9.5 11a3.5 3.5 0 1 0 0-7a3.5 3.5 0 1 0 0 7M3 20c.5-3.6 3-6 6.5-6 1 0 1.8.2 2.6.5M17.5 13l1.3 2.6 2.7.4-2 1.9.5 2.7-2.5-1.3-2.5 1.3.5-2.7-2-1.9 2.7-.4z',
  phone: 'M7 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A15.5 15.5 0 0 1 5 5.5a2 2 0 0 1 2-2z',
  mail: 'M3.5 5.5h17v13h-17zM3.5 6.5l8.5 6.5 8.5-6.5',
  pin: 'M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11zM12 12.5a2.5 2.5 0 1 0 0-5a2.5 2.5 0 1 0 0 5',
  clock: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M12 7v5l3 2',
  cap: 'M2.5 9L12 5l9.5 4-9.5 4zM6.5 10.8V15c1.5 1.3 3.4 2 5.5 2s4-.7 5.5-2v-4.2M21.5 9v5',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  quote: 'M10 7H6.5A1.5 1.5 0 0 0 5 8.5V12h4v5H5M19 7h-3.5A1.5 1.5 0 0 0 14 8.5V12h4v5h-4',
};

export function Icon({ name, size }: { name: string; size?: number }) {
  return (
    <svg className="ic" viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={P[name] ?? P.check} /></svg>
  );
}

/** Wordmark "NP Legal" bằng chữ serif; "Legal" màu nhấn. Ô logo xanh chỉ còn ở favicon. */
export function Wordmark() {
  return <span className="wordmark">NP <span>Legal</span></span>;
}
