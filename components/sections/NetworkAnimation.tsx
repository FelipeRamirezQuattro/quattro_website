"use client";

import { motion } from "framer-motion";

// Node positions (x, y) in SVG viewBox 400×300
const NODES = [
  { id: 0, cx: 200, cy: 150 }, // center hub
  { id: 1, cx: 60, cy: 70 },
  { id: 2, cx: 340, cy: 70 },
  { id: 3, cx: 60, cy: 230 },
  { id: 4, cx: 340, cy: 230 },
  { id: 5, cx: 130, cy: 50 },
  { id: 6, cx: 270, cy: 50 },
  { id: 7, cx: 130, cy: 250 },
  { id: 8, cx: 270, cy: 250 },
  { id: 9, cx: 40, cy: 150 },
  { id: 10, cx: 360, cy: 150 },
];

// Edges between node ids
const EDGES = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
  [0, 7],
  [0, 8],
  [1, 5],
  [2, 6],
  [3, 7],
  [4, 8],
  [1, 9],
  [2, 10],
  [5, 6],
  [7, 8],
  [9, 3],
  [10, 4],
];

export default function NetworkAnimation() {
  return (
    <div className="relative w-full aspect-[4/3] max-w-md mx-auto">
      {/* Soft glow background */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-quattro-primary/10 to-quattro-accent/5" />

      <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden="true">
        {/* Edges */}
        {EDGES.map(([a, b], i) => {
          const from = NODES[a];
          const to = NODES[b];
          return (
            <motion.line
              key={i}
              x1={from.cx}
              y1={from.cy}
              x2={to.cx}
              y2={to.cy}
              stroke="rgba(23,84,154,0.35)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: i * 0.06, ease: "easeOut" }}
            />
          );
        })}

        {/* Nodes */}
        {NODES.map((node, i) => {
          const isHub = node.id === 0;
          const r = isHub ? 14 : 7;
          const color = isHub ? "rgb(23,84,154)" : "rgb(56,189,248)";
          const glowSize = isHub ? 22 : 12;

          return (
            <g key={node.id}>
              {/* Glow ring */}
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r={glowSize}
                fill="none"
                stroke={isHub ? "rgba(23,84,154,0.25)" : "rgba(56,189,248,0.2)"}
                strokeWidth="1"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.18 + 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Core circle */}
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r={r}
                fill={color}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.12, ease: "backOut" }}
              />
            </g>
          );
        })}

        {/* Center hub accent ring */}
        <motion.circle
          cx={200}
          cy={150}
          r={20}
          fill="none"
          stroke="rgba(56,189,248,0.4)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          animate={{ rotate: 360 }}
          style={{ transformOrigin: "200px 150px" }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}
