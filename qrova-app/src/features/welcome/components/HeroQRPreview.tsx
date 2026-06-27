const CELL = 8;
const CORAL = "#F4623A";

function buildQRGrid(): boolean[][] {
  const g: boolean[][] = Array.from({ length: 21 }, () => Array(21).fill(false));

  function addFinder(r0: number, c0: number) {
    for (let dr = 0; dr < 7; dr++) {
      for (let dc = 0; dc < 7; dc++) {
        const border = dr === 0 || dr === 6 || dc === 0 || dc === 6;
        const inner = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4;
        if (border || inner) g[r0 + dr][c0 + dc] = true;
      }
    }
  }

  addFinder(0, 0);
  addFinder(0, 14);
  addFinder(14, 0);

  // Timing patterns
  for (let i = 8; i <= 12; i += 2) {
    g[6][i] = true;
    g[i][6] = true;
  }

  // Dark module
  g[13][8] = true;

  // Data modules (visual fill — not a real QR payload)
  const data: [number, number][] = [
    [0,8],[0,10],[0,12],
    [1,9],[1,11],[1,13],
    [2,8],[2,10],[2,12],
    [3,9],[3,11],[3,13],
    [4,8],[4,10],[4,12],
    [5,9],[5,11],[5,13],
    [7,8],[7,10],[7,12],[7,14],[7,16],[7,18],[7,20],
    [8,2],[8,4],[8,8],[8,11],[8,13],[8,15],[8,17],[8,19],
    [9,0],[9,2],[9,4],[9,9],[9,11],[9,13],[9,16],[9,18],[9,20],
    [10,1],[10,3],[10,10],[10,12],[10,14],[10,17],[10,19],
    [11,0],[11,2],[11,4],[11,9],[11,11],[11,13],[11,16],[11,18],[11,20],
    [12,1],[12,3],[12,10],[12,12],[12,15],[12,17],[12,19],
    [13,0],[13,2],[13,4],[13,9],[13,11],[13,14],[13,16],[13,18],
    [14,8],[14,10],[14,12],[14,16],[14,18],[14,20],
    [15,7],[15,9],[15,11],[15,13],[15,15],[15,17],[15,19],
    [16,8],[16,10],[16,12],[16,14],[16,16],[16,18],[16,20],
    [17,7],[17,9],[17,11],[17,13],[17,15],[17,17],[17,19],
    [18,8],[18,10],[18,12],[18,14],[18,16],[18,18],
    [19,7],[19,9],[19,11],[19,13],[19,15],[19,17],[19,19],
    [20,8],[20,10],[20,12],[20,14],[20,16],[20,18],[20,20],
  ];
  data.forEach(([r, c]) => { g[r][c] = true; });

  return g;
}

const QRCodeSVG = () => {
  const grid = buildQRGrid();
  const size = 21 * CELL;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-label="Código QR de ejemplo"
    >
      <rect width={size} height={size} fill="white" />
      {grid.flatMap((row, r) =>
        row.map((filled, c) =>
          filled ? (
            <rect
              key={`${r}-${c}`}
              x={c * CELL}
              y={r * CELL}
              width={CELL}
              height={CELL}
              fill={CORAL}
            />
          ) : null,
        ),
      )}
    </svg>
  );
};

const STATS = [
  { value: "482", label: "Escaneos" },
  { value: "5", label: "Países" },
  { value: "+38", label: "Esta semana" },
] as const;

const HeroQRPreview = () => (
  <div className="relative">
    {/* Glow */}
    <div className="absolute inset-0 bg-coral-400/10 blur-3xl rounded-full scale-75" />

    {/* Card */}
    <div className="relative bg-surface-raised rounded-2xl shadow-2xl border border-stroke-subtle p-5 w-72">
      {/* URL bar */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs text-fg-muted">qrova.app/r/mi-qr</span>
        <div className="flex items-center gap-1 bg-success-light text-success-text rounded-full px-2 py-0.5 text-xs font-medium">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          Activo
        </div>
      </div>

      {/* QR code — white background always for readability */}
      <div className="flex justify-center rounded-xl overflow-hidden bg-white p-2 border border-stroke-subtle">
        <QRCodeSVG />
      </div>

      {/* CTA button */}
      <div className="mt-4 bg-brand-light border border-stroke-subtle rounded-lg px-4 py-2.5 text-center">
        <p className="text-coral-500 font-semibold text-sm">Ver Menú</p>
        <p className="text-fg-muted text-xs font-mono mt-0.5">mibodega.com/menu</p>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 divide-x divide-stroke-subtle">
        {STATS.map(({ value, label }) => (
          <div key={label} className="text-center px-2">
            <p className="text-fg-primary font-bold text-base">{value}</p>
            <p className="text-fg-muted text-xs">{label}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default HeroQRPreview;
