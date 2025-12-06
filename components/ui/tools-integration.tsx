"use client"

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AdeloopIcon,
  DuckDBIcon,
  PostgresIcon,
  MongoIcon,
  SupabaseIcon,
  DatabricksIcon,
  SnowflakeIcon,
  GeminiIcon,
  GitHubIcon,
} from "./brandicons";

// -----------------------------------------------------------------------------
// Constants & Configuration
// -----------------------------------------------------------------------------

// Layout Dimensions
const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 500;
const CARD_WIDTH = 240;
const CARD_HEIGHT = 64;
const HUB_SIZE = 160;

// Calculated Center
const CENTER_X = CANVAS_WIDTH / 2;
const CENTER_Y = CANVAS_HEIGHT / 2;

// Vertical spacing for the 4 items
// We center them around the middle.
// Offsets from Y center: -135, -45, +45, +135
const ITEM_Y_OFFSETS = [-135, -45, 45, 135];

// X positions
const LEFT_CARD_X = 0; // Left edge of left cards
const RIGHT_CARD_X = CANVAS_WIDTH - CARD_WIDTH; // Left edge of right cards

// Connection Points (Where the dots are)
const LEFT_DOT_X = LEFT_CARD_X + CARD_WIDTH; // Right edge of left cards
const RIGHT_DOT_X = RIGHT_CARD_X; // Left edge of right cards

const HUB_LEFT_CONNECTION_X = CENTER_X - (HUB_SIZE / 2) - 10; // Slightly outside hub visual
const HUB_RIGHT_CONNECTION_X = CENTER_X + (HUB_SIZE / 2) + 10;

// Data
const LEFT_TOOLS = [
  { id: "github", icon: GitHubIcon, name: "GitHub", color: "#ffffff" },
  { id: "postgres", icon: PostgresIcon, name: "Postgres", color: "#336791" },
  { id: "mongo", icon: MongoIcon, name: "MongoDB", color: "#00ED64" },
  { id: "supabase", icon: SupabaseIcon, name: "Supabase", color: "#3ECF8E" },
];

const RIGHT_TOOLS = [
  { id: "duckdb", icon: DuckDBIcon, name: "DuckDB", color: "#FFF000" },
  { id: "databricks", icon: DatabricksIcon, name: "Databricks", color: "#FF3621" },
  { id: "snowflake", icon: SnowflakeIcon, name: "Snowflake", color: "#29B5E8" },
  { id: "gemini", icon: GeminiIcon, name: "Gemini", color: "#4E75F6" },
];

// -----------------------------------------------------------------------------
// Sub-Components
// -----------------------------------------------------------------------------

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const ToolCard = ({
  icon: Icon,
  name,
  x,
  y,
  side,
}: {
  icon: any;
  name: string;
  color: string;
  x: number;
  y: number;
  side: "left" | "right";
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: y - CARD_HEIGHT / 2, // Center vertically on the point
        left: x,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
      }}
      className={cn(
        "group flex items-center gap-3 p-3 rounded-xl border border-white/5  backdrop-blur-md shadow-lg transition-all duration-300 hover:bg-zinc-800 hover:border-white/10 hover:shadow-emerald-500/10 hover:-translate-y-1 z-20",
        side === "right" && "flex-row-reverse text-right"
      )}
    >
      {/* Icon */}
      <div className="relative flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 group-hover:scale-105 transition-transform">
        <Icon className="w-5 h-5 opacity-80 group-hover:opacity-100 text-white" />
      </div>

      {/* Text */}
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-sm font-semibold text-zinc-100 group-hover:text-white truncate">
          {name}
        </span>
        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium group-hover:text-emerald-400 transition-colors">
          Connected
        </span>
      </div>

      {/* Connection Dot */}
      {/* 
         We place the dot absolutely relative to the CARD, 
         but we ensure it aligns with the global coordinates calculated for the SVG.
      */}
      <div
        className={cn(
          "absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-zinc-950 group-hover:bg-emerald-400 transition-colors shadow-[0_0_0_4px_rgba(0,0,0,0.3)] z-30",
          side === "left" ? "-right-[6px]" : "-left-[6px]"
        )}
      />
    </div>
  );
};

interface BeamProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay: number;
}

const AnimatedBeam: React.FC<BeamProps> = ({ startX, startY, endX, endY, delay }) => {
  // Control Points for smooth Bezier curve
  // We want the line to exit horizontally from the card, and enter horizontally into the hub.
  const dist = Math.abs(endX - startX);
  const cp1X = startX + (endX > startX ? dist * 0.5 : -dist * 0.5);
  const cp1Y = startY;
  const cp2X = endX - (endX > startX ? dist * 0.5 : -dist * 0.5);
  const cp2Y = endY;

  const pathD = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id={`grad-${startX}-${startY}`} gradientUnits="userSpaceOnUse" x1={startX} y1={startY} x2={endX} y2={endY}>
             <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
             <stop offset="20%" stopColor="#10b981" stopOpacity="1" />
             <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
          
          {/* Mask for the comet effect */}
          <mask id={`mask-${startX}-${startY}`}>
             <motion.path
                d={pathD}
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, pathOffset: 1 }} // Start hidden (offset 1 means pushed off end)
                animate={{ pathLength: [0, 0.3, 0], pathOffset: [0, 0, 0] }} // This logic is tricky with pathOffset, let's use dasharray
             />
          </mask>
        </defs>

        {/* 1. Static dim path (The track) */}
        <path 
            d={pathD} 
            fill="none" 
            stroke="rgba(255,255,255,0.05)" 
            strokeWidth="1" 
        />

        {/* 2. Traveling Particle/Comet 
            We use strokeDasharray to create a 'packet' and animate strokeDashoffset.
            The packet moves from Start to End.
        */}
        <motion.path
          d={pathD}
          fill="none"
          stroke={`url(#grad-${startX}-${startY})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="10 1000" // 10px dash, huge gap
          // For Left side (Left -> Right): Offset starts at X and goes to X-Length? 
          // SVG paths have direction. M start -> End.
          // 0 offset means the dash starts at the beginning.
          // Negative offset moves the dash "forward" along the path.
          initial={{ strokeDashoffset: 0, opacity: 0 }}
          animate={{ 
            strokeDashoffset: [0, -500], // Approx length of curve
            opacity: [0, 1, 0] 
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            delay: delay,
            repeatDelay: 0.5
          }}
        />
        
        {/* 3. Small glowing dot at the head of the stream for extra "tech" feel */}
         <motion.circle 
           r="2" 
           fill="#10b981"
           cx={endX}
           cy={endY}
           initial={{ opacity: 0 }}
           animate={{ 
             cx: [startX, endX],
             cy: [startY, endY],
             opacity: [0, 1, 0] 
           }}
           transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            delay: delay,
            repeatDelay: 0.5
           }}
         />
      </svg>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export default function ToolsIntegration() {
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating((prev) => !prev);
    }, 3000); // Pulse every 3 seconds (matching beam animation)

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full py-20 overflow-hidden flex flex-col items-center justify-center">
      
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mb-10 w-full">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs font-medium mb-4 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Universal Connector
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Integrated Data <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Adeloop</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Ingest, process, and analyze data from any source. Adeloop unifies your stack into one cohesive operational layer.
        </p>
      </div>

      {/* 
        The Diagram Container 
        We use a strict width/height container that scales down on mobile.
        This preserves the exact coordinate mapping between HTML elements and SVGs.
      */}
      <div className="w-full flex justify-center overflow-visible my-8">
        <div 
          className="relative shrink-0 origin-center md:origin-top transform scale-[0.5] sm:scale-[0.7] md:scale-100 transition-transform duration-500"
          style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
        >
          
          {/* --- CENTER HUB --- */}
          <div 
            className="absolute z-30"
            style={{ 
              top: CENTER_Y - HUB_SIZE / 2, 
              left: CENTER_X - HUB_SIZE / 2, 
              width: HUB_SIZE, 
              height: HUB_SIZE 
            }}
          >
             <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="relative w-full h-full"
             >
                {/* Spinning Rings */}
                <div className="absolute inset-[-20px] rounded-full border border-emerald-500/10 animate-[spin_8s_linear_infinite]" />
                <div className="absolute inset-[-40px] rounded-full border border-blue-500/10 animate-[spin_12s_linear_infinite_reverse] opacity-50" />
                
                {/* Glow - Pulses when animating */}
                <motion.div 
                  className="absolute inset-0 rounded-full bg-emerald-500/20 blur-3xl"
                  animate={{
                    opacity: isAnimating ? [0.2, 0.5, 0.2] : 0.2,
                    scale: isAnimating ? [1, 1.15, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Core Body */}
                <motion.div 
                  className="absolute inset-0 rounded-full bg-gradient-to-b from-zinc-800 to-zinc-950 border border-zinc-700 shadow-2xl flex items-center justify-center"
                  animate={{
                    boxShadow: isAnimating 
                      ? ["0 0 0 rgba(16,185,129,0)", "0 0 30px rgba(16,185,129,0.4)", "0 0 0 rgba(16,185,129,0)"]
                      : "0 0 0 rgba(16,185,129,0)"
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                  }}
                >
                   <div className="absolute inset-2 rounded-full border border-white/5" />
                   <div className="relative p-6 rounded-full shadow-inner border border-white/5">
                      <AdeloopIcon className="w-20 h-20" />
                   </div>
                </motion.div>
             </motion.div>

             {/* Label */}
             <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 text-center w-40">
                <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">Control Plane</p>
                <p className="text-white font-bold text-lg">Adeloop Core</p>
             </div>
          </div>


          {/* --- LEFT SIDE (Sources) --- */}
          {LEFT_TOOLS.map((tool, i) => {
             const y = CENTER_Y + ITEM_Y_OFFSETS[i];
             return (
               <React.Fragment key={tool.id}>
                 <motion.div
                   initial={{ opacity: 0, x: -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                 >
                    <ToolCard 
                        {...tool} 
                        x={LEFT_CARD_X} 
                        y={y} 
                        side="left" 
                    />
                 </motion.div>
                 {/* Connection Beam (Starts at Right Dot, Ends at Hub Left) */}
                 <AnimatedBeam 
                    startX={LEFT_DOT_X} 
                    startY={y} 
                    endX={HUB_LEFT_CONNECTION_X} 
                    endY={CENTER_Y} 
                    delay={i * 0.2}
                 />
               </React.Fragment>
             );
          })}


          {/* --- RIGHT SIDE (Destinations) --- */}
          {RIGHT_TOOLS.map((tool, i) => {
             const y = CENTER_Y + ITEM_Y_OFFSETS[i];
             return (
               <React.Fragment key={tool.id}>
                 <motion.div
                   initial={{ opacity: 0, x: 30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.4 + i * 0.1 }}
                 >
                    <ToolCard 
                        {...tool} 
                        x={RIGHT_CARD_X} 
                        y={y} 
                        side="right" 
                    />
                 </motion.div>
                 {/* Connection Beam (Starts at Left Dot of Right Card, Ends at Hub Right) */}
                 <AnimatedBeam 
                    startX={RIGHT_DOT_X} 
                    startY={y} 
                    endX={HUB_RIGHT_CONNECTION_X} 
                    endY={CENTER_Y} 
                    delay={0.4 + i * 0.2}
                 />
               </React.Fragment>
             );
          })}

        </div>
      </div>
    </section>
  );
}