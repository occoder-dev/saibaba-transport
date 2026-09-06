"use client";

import { motion } from "framer-motion";

type Node = {
  label: string;
  x: number;
  y: number;
  hq?: boolean;
};

// Illustrative, not geographic - a stylized read of the branch network built
// around our real branch cities. Weighted toward the right two-thirds of the
// viewBox so a left-side scrim can keep text clean without cropping any node.
const nodes: Node[] = [
  { label: "SURAT · HQ", x: 480, y: 560, hq: true },
  { label: "MUZAFFARPUR", x: 760, y: 360 },
  { label: "DARBHANGA", x: 980, y: 190 },
  { label: "PATNA", x: 1080, y: 420 },
  { label: "VARANASI", x: 680, y: 500 },
  { label: "ARRAH", x: 880, y: 620 },
  { label: "SIWAN", x: 1260, y: 260 },
  { label: "GOPALGANJ", x: 1150, y: 560 },
];

// Background edges - the quiet, static shape of the network.
const edges: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [1, 4],
  [4, 5],
  [3, 6],
  [3, 7],
];

// The animated "shipment in motion" path, drawn over the network.
const activePath = "M480 560 L760 360 L1080 420 L1260 260";

export function NetworkGraph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1400 800"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden
    >
      <defs>
        <radialGradient id="ng-hq-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* static network shape */}
      <g stroke="#82817f" strokeOpacity="0.4" strokeWidth="1.5">
        {edges.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} />
        ))}
      </g>

      {/* faint dashed guide for the active route */}
      <path d={activePath} fill="none" stroke="#db2319" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" />

      {/* traveling pulse along the active route */}
      <motion.path
        d={activePath}
        fill="none"
        stroke="#f04a3f"
        strokeWidth="2.5"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="0.05 0.95"
        initial={{ pathOffset: 0 }}
        animate={{ pathOffset: 1 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

      {/* nodes */}
      {nodes.map((node) => (
        <g key={node.label}>
          {node.hq && <circle cx={node.x} cy={node.y} r={34} fill="url(#ng-hq-glow)" />}
          {node.hq && (
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={7}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1.5"
              animate={{ scale: [1, 2.1, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            />
          )}
          <circle cx={node.x} cy={node.y} r={node.hq ? 6 : 4.5} fill={node.hq ? "#fbbf24" : "#db2319"} />
          <text
            x={node.x + (node.x > 1150 ? -14 : 14)}
            y={node.y + 4}
            textAnchor={node.x > 1150 ? "end" : "start"}
            fontFamily="var(--font-manrope, sans-serif)"
            fontSize="15"
            fontWeight={node.hq ? 700 : 500}
            letterSpacing="0.03em"
            fill={node.hq ? "#ffffff" : "rgba(255,255,255,0.6)"}
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
