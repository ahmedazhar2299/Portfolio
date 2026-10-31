import type { ProjectVisual as Visual } from "../data/portfolioSections"

function Arrow({ x, y, length = 32 }: { x: number; y: number; length?: number }) {
  return <path className="diagram-route" d={`M${x} ${y}h${length}m-6-5 6 5-6 5`} />
}

function Tile({ x, y, width, label, accent = false }: { x: number; y: number; width: number; label: string; accent?: boolean }) {
  return <g>
    <rect className={accent ? "diagram-accent" : "diagram-node"} x={x} y={y} width={width} height="38" rx="8" />
    <text className={accent ? "diagram-accent-text" : undefined} x={x + width / 2} y={y + 24} textAnchor="middle">{label}</text>
  </g>
}

// Static schematics explain each workflow without suggesting measured results.
export function ProjectVisual({ kind }: { kind: Visual }) {
  return <svg className="project-illustration" viewBox="0 0 460 224" fill="none" aria-hidden="true" focusable="false">
    <rect className="diagram-panel" x="24" y="22" width="412" height="180" rx="14" />
    {kind === "graph" && <>
      <text className="diagram-heading" x="44" y="49">Package dependencies</text>
      <text className="diagram-caption" x="416" y="49" textAnchor="end">Python</text>
      <path className="diagram-line" d="M99 96v-14h262v14M230 134v16h131v-16" />
      <Arrow x={150} y={115} length={29} /><Arrow x={281} y={115} length={29} />
      <Tile x={48} y={96} width={102} label="Current" />
      <Tile x={179} y={96} width={102} label="Compatible" accent />
      <Tile x={310} y={96} width={102} label="Target" />
      <circle className="diagram-fill" cx="230" cy="82" r="3" />
      <path className="diagram-route" d="m46 175 4 4 8-9" />
      <text className="diagram-caption" x="68" y="180">Version-aware upgrade paths</text>
    </>}
    {kind === "signal" && <>
      <text className="diagram-heading" x="44" y="49">Motion signals</text>
      <text className="diagram-caption" x="416" y="49" textAnchor="end">IMU</text>
      {[83, 115, 147].map((y, i) => <g key={y}>
        <text className="diagram-caption" x="46" y={y + 4}>{["x", "y", "z"][i]}</text>
        <path className="diagram-grid-line" d={`M70 ${y}h342`} />
      </g>)}
      {[128, 196, 264, 332, 400].map(x => <path className="diagram-grid-line" key={x} d={`M${x} 66v93`} />)}
      <path className="diagram-route" d="M70 83h16q8 0 13-11t13 0 13 11 13-11 13 0 13 11 13-11 13 0 13 11 13-11 13 0 13 11 13-11 13 0 13 11 13-11 13 0 13 11 13-11 13 0h14" />
      <path className="diagram-route diagram-secondary" d="M70 115h16q8 0 13 8t13 0 13-8 13 8 13 0 13-8 13 8 13 0 13-8 13 8 13 0 13-8 13 8 13 0 13-8 13 8 13 0 13-8 13 8 13 0h14" />
      <path className="diagram-route" d="M70 147h16q8 0 13-6t13 0 13 6 13-6 13 0 13 6 13-6 13 0 13 6 13-6 13 0 13 6 13-6 13 0 13 6 13-6 13 0 13 6 13-6 13 0h14" />
      <text className="diagram-caption" x="44" y="182">Wearable + phone</text>
      <Arrow x={218} y={177} length={28} />
      <text className="diagram-caption" x="268" y="182">Gait features</text>
    </>}
    {kind === "simd" && <>
      <text className="diagram-heading" x="44" y="49">Sobel / Laplacian</text>
      <text className="diagram-caption" x="416" y="49" textAnchor="end">ARM NEON</text>
      {Array.from({ length: 25 }, (_, i) => {
        const row = Math.floor(i / 5), col = i % 5
        const inside = row >= 1 && row <= 3 && col >= 1 && col <= 3
        const edge = inside && (row === 1 || row === 3 || col === 1 || col === 3)
        return <g key={i}>
          <rect className={inside ? "diagram-pixel-dark" : "diagram-pixel"} x={66 + col * 17} y={67 + row * 17} width="14" height="14" rx="2" />
          <rect className={edge ? "diagram-pixel-dark" : "diagram-pixel"} x={310 + col * 17} y={67 + row * 17} width="14" height="14" rx="2" />
        </g>
      })}
      <Arrow x={162} y={106} length={27} />
      <rect className="diagram-node" x="203" y="72" width="91" height="68" rx="9" />
      {[0, 1, 2, 3].map(i => <rect className="diagram-accent" key={i} x={214 + i * 18} y="85" width="12" height="28" rx="3" />)}
      <text className="diagram-caption" x="248" y="130" textAnchor="middle">128 bit</text>
      <text className="diagram-caption" x="107" y="181" textAnchor="middle">Pixels</text>
      <text className="diagram-caption" x="248" y="181" textAnchor="middle">Parallel kernels</text>
      <text className="diagram-caption" x="351" y="181" textAnchor="middle">Edges</text>
    </>}
    {kind === "shield" && <>
      <text className="diagram-heading" x="44" y="49">Listing risk assessment</text>
      <Tile x={44} y={71} width={141} label="Listing text" />
      <Tile x={44} y={125} width={141} label="Listing data" />
      <path className="diagram-line" d="M185 90h25q10 0 10 10v34q0 10-10 10h-25" />
      <Arrow x={220} y={114} length={26} />
      <rect className="diagram-node" x="262" y="71" width="154" height="92" rx="10" />
      <text className="diagram-heading" x="339" y="100" textAnchor="middle">XGBoost</text>
      <path className="diagram-grid-line" d="M278 113h122" />
      <text x="339" y="141" textAnchor="middle">Risk score</text>
      <text className="diagram-caption" x="44" y="184">Text + structured features</text>
    </>}
    {kind === "imaging" && <>
      <text className="diagram-heading" x="44" y="49">Image reconstruction</text>
      <text className="diagram-caption" x="416" y="49" textAnchor="end">Pix2CT</text>
      <Tile x={44} y={81} width={101} label="CT input" />
      <Arrow x={155} y={100} length={22} />
      <Tile x={187} y={81} width={101} label="Pix2Pix" accent />
      <Arrow x={298} y={100} length={22} />
      <Tile x={330} y={81} width={86} label="Output" />
      <path className="diagram-line" d="M94 119v40h57" />
      <Tile x={151} y={140} width={137} label="MobileNetV2" />
      <Arrow x={298} y={159} length={22} />
      <text className="diagram-caption" x="330" y="164">Classify</text>
    </>}
    {kind === "queue" && <>
      <text className="diagram-heading" x="44" y="49">SVG to physical print</text>
      <rect className="diagram-node" x="44" y="72" width="84" height="80" rx="9" />
      <path className="diagram-route" d="M61 90h49v35H61zM68 116l10-17 11 13 8-8 7 12" />
      <text className="diagram-caption" x="86" y="141" textAnchor="middle">SVG</text>
      <Arrow x={138} y={111} length={24} />
      <rect className="diagram-node" x="174" y="72" width="112" height="80" rx="9" />
      {[0, 1, 2].map(i => <rect className="diagram-accent" key={i} x={188 + i * 29} y="86" width="22" height="26" rx="4" />)}
      <text x="230" y="138" textAnchor="middle">SQS queue</text>
      <Arrow x={296} y={111} length={24} />
      <rect className="diagram-node" x="332" y="72" width="84" height="80" rx="9" />
      <path className="diagram-route" d="M348 119V89h52v30m-59 0h66m-33-30v17m-5 6h10" />
      <text className="diagram-caption" x="374" y="141" textAnchor="middle">Print</text>
      <text className="diagram-caption" x="44" y="182">Django</text><text className="diagram-caption" x="230" y="182" textAnchor="middle">S3 + SQS + RDS</text><text className="diagram-caption" x="416" y="182" textAnchor="end">G-code</text>
    </>}
  </svg>
}
