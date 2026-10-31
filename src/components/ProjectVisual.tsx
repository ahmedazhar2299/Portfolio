import type { ProjectVisual as Visual } from "../data/portfolioSections"

// Structural illustrations, rather than simulated result plots.
export function ProjectVisual({ kind }: { kind: Visual }) {
  return <svg className="project-illustration" viewBox="0 0 460 224" fill="none" aria-hidden="true">
    {kind === "graph" && <>
      <path className="diagram-line" d="M83 68h74q20 0 20 20v48q0 20 20 20h36m-56-47h90q18 0 18-18V68h59M84 156h73m111 0h76" />
      <path className="diagram-route" d="M83 68h74q20 0 20 20v48q0 20 20 20h147" />
      {[[45, 45, "package"], [45, 134, "v1.0"], [211, 134, "v1.1"], [307, 45, "v2.0"], [307, 134, "v2.1"]].map(([x, y, label]) => <g key={label}><rect className="diagram-node" x={x} y={y} width="104" height="45" rx="13" /><text x={Number(x) + 52} y={Number(y) + 27} textAnchor="middle">{label}</text></g>)}
      <circle className="diagram-fill" cx="177" cy="68" r="6" /><circle className="diagram-fill" cx="285" cy="156" r="6" />
      <path className="diagram-check" d="m377 143 5 5 9-10" />
    </>}
    {kind === "signal" && <>
      <rect className="diagram-panel" x="62" y="32" width="99" height="158" rx="22" />
      <path className="diagram-line" d="M95 44h32M100 177h23" />
      <path className="diagram-route" d="M74 116h11l7-23 9 49 10-65 11 49 8-22 8 12h12" />
      <path className="diagram-line" d="M184 55h201M184 109h201M184 163h201M206 39v141m54-141v141m54-141v141m54-141v141" opacity=".32" />
      <path className="diagram-route" d="m183 115 13-5 11-30 9 46 10-19 10 4 11-35 12 58 12-20 12-4 12-43 12 70 13-24 12-4 12-36 11 51 13-14 11-2" />
      <circle className="diagram-fill" cx="385" cy="108" r="5" />
    </>}
    {kind === "simd" && <>
      <text x="86" y="45" textAnchor="middle">scalar</text><text x="295" y="45" textAnchor="middle">vectorized</text>
      {[0, 1, 2, 3].map(row => <g key={row}><rect className="diagram-node" x="62" y={62 + row * 34} width="48" height="23" rx="6" /><rect className={row === 1 ? "diagram-fill" : "diagram-node"} x="196" y={62 + row * 34} width="43" height="23" rx="6" /><rect className="diagram-node" x="246" y={62 + row * 34} width="43" height="23" rx="6" /><rect className="diagram-node" x="296" y={62 + row * 34} width="43" height="23" rx="6" /><rect className="diagram-node" x="346" y={62 + row * 34} width="43" height="23" rx="6" /></g>)}
      <path className="diagram-route" d="M132 113h39m-8-7 8 7-8 7" />
    </>}
    {kind === "shield" && <>
      <rect className="diagram-panel" x="58" y="56" width="118" height="112" rx="15" />
      <path className="diagram-line" d="M75 80h48m-48 17h82m-82 17h68m-68 17h54M176 112h63" />
      <path className="diagram-shield" d="m299 35 64 25v51c0 37-35 64-64 79-29-15-64-42-64-79V60l64-25Z" />
      <path className="diagram-route" d="m277 110 16 17 31-34" />
      <circle className="diagram-node" cx="377" cy="168" r="20" /><path className="diagram-route" d="M377 160v10m0 5v1" />
    </>}
    {kind === "imaging" && <>
      {[66, 279].map((x, i) => <g key={x}><rect className="diagram-panel" x={x} y="36" width="115" height="140" rx="15" /><ellipse className="diagram-node" cx={x + 57} cy="104" rx="38" ry="46" /><path className="diagram-line" d={`M${x + 57} 66v75m-7-67q-31 20-12 49m25-49q31 20 12 49m-39-23 14 8m12 0 14-8`} opacity={i ? 1 : .35} /><text x={x + 57} y="202" textAnchor="middle">{i ? "reconstruction" : "input"}</text></g>)}
      <path className="diagram-route" d="M202 106h55m-9-8 9 8-9 8" /><text x="230" y="89" textAnchor="middle">GAN</text>
    </>}
    {kind === "queue" && <>
      <rect className="diagram-node" x="36" y="75" width="83" height="69" rx="16" /><text x="77" y="115" textAnchor="middle">SVG</text>
      <path className="diagram-route" d="M130 109h41m-7-7 7 7-7 7m119 0h40m-7-7 7 7-7 7" />
      <rect className="diagram-panel" x="181" y="55" width="100" height="109" rx="17" />
      {[77, 100, 123].map(y => <rect className="diagram-node" key={y} x="199" y={y} width="64" height="13" rx="5" />)}
      <rect className="diagram-node" x="340" y="75" width="83" height="69" rx="16" /><path className="diagram-route" d="M361 123V96h40v27m-46 0h52m-26-37v15m-7 7h14" />
      <text x="230" y="194" textAnchor="middle">asynchronous job queue</text>
    </>}
  </svg>
}
