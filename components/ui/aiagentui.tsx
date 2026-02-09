"use client"

import React, { useEffect, useState } from "react";
import {
  Database,
  Brain,
  Wrench,
  Mail,
  MessageSquare,
  Code,
  Terminal as TerminalIcon,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  ChevronRight,
  MousePointer2,
} from "lucide-react";

/** Utility for class merging */
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const nodes = [
  { id: "data", title: "Data Source", subtitle: "API", icon: Database, x: 60, y: 100 },
  { id: "ai", title: "AI Analytics", subtitle: "GPT-4", icon: Brain, x: 185, y: 100 },
  { id: "transform", title: "Transform", subtitle: "Format", icon: Wrench, x: 310, y: 100 },
  { id: "execute", title: "Execute", subtitle: "Run", icon: Code, x: 435, y: 100 },
  { id: "slack", title: "Slack", subtitle: "Notify", icon: MessageSquare, x: 560, y: 50 },
  { id: "gmail", title: "Gmail", subtitle: "Send", icon: Mail, x: 560, y: 150 },
];

const connections = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 3, to: 5 },
];

const terminalLogs = [
  { step: 0, text: "$ Fetching data from API..." },
  { step: 0, text: "  GET https://api.data.io/v1/metrics" },
  { step: 1, text: "$ Running AI analysis..." },
  { step: 1, text: "  Processing 2,847 records..." },
  { step: 2, text: "$ Transforming data..." },
  { step: 2, text: "  Formatting for output..." },
  { step: 3, text: "$ Executing code block..." },
  { step: 3, text: "  Generating dashboard..." },
  { step: 4, text: "$ Sending notifications..." },
  { step: 5, text: "  Done in 3.2s" },
];

interface Point {
  x: number;
  y: number;
}

function Particles({ from, to }: { from: Point; to: Point }) {
  const [particles, setParticles] = useState<{ id: number; t: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => {
        const updated = prev.map((p) => ({ ...p, t: p.t + 0.04 })).filter((p) => p.t < 1);
        if (prev.length < 2 && Math.random() > 0.4) {
          return [...updated, { id: Date.now(), t: 0 }];
        }
        return updated;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const sx = from.x + 50;
  const sy = from.y;
  const ex = to.x - 50;
  const ey = to.y;
  const mx = (sx + ex) / 2;

  const getPos = (t: number) => ({
    x:
      (1 - t) ** 3 * sx +
      3 * (1 - t) ** 2 * t * (sx + (mx - sx) * 0.5) +
      3 * (1 - t) * t ** 2 * (ex - (ex - mx) * 0.5) +
      t ** 3 * ex,
    y: (1 - t) ** 3 * sy + 3 * (1 - t) ** 2 * t * sy + 3 * (1 - t) * t ** 2 * ey + t ** 3 * ey,
  });

  return (
    <g>
      {particles.map((p) => {
        const pos = getPos(p.t);
        const opacity = 1 - Math.abs(p.t - 0.5) * 2;
        return (
          <g key={p.id}>
            <circle cx={pos.x} cy={pos.y} r={3} className="fill-blue-500" opacity={opacity * 0.3} />
            <circle cx={pos.x} cy={pos.y} r={1.5} className="fill-blue-400" opacity={opacity * 0.7} />
          </g>
        );
      })}
    </g>
  );
}

export function AIWorkflowDemo() {
  const [activeNode, setActiveNode] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [resultAnimated, setResultAnimated] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const sequence = [0, 1, 2, 3, 4, 5];
    let step = 0;

    const runStep = () => {
      if (isPaused) return;

      if (step < sequence.length) {
        setActiveNode(sequence[step]);
        if (step > 0) setCompleted((prev) => [...new Set([...prev, sequence[step - 1]])]);

        const logs = terminalLogs.filter((l) => l.step === step).map((l) => l.text);
        setVisibleLogs((prev) => [...prev.slice(-4), ...logs]);

        if (step === sequence.length - 1) {
          setTimeout(() => {
            setShowResult(true);
            setTimeout(() => setResultAnimated(true), 100);
            setIsPaused(true);
          }, 600);
        }
        step++;
      } else {
        setCompleted([]);
        setActiveNode(0);
        setVisibleLogs([]);
        setShowResult(false);
        setResultAnimated(false);
        step = 1;
      }
    };

    const interval = setInterval(runStep, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setCompleted([]);
        setActiveNode(0);
        setVisibleLogs([]);
        setShowResult(false);
        setResultAnimated(false);
        setIsPaused(false);
      }, 4000);
      return () => clearTimeout(pauseTimer);
    }
  }, [isPaused]);

  const getStatus = (i: number) => {
    if (completed.includes(i)) return "done";
    if (activeNode === i) return "active";
    return "idle";
  };

  const getLineStatus = (from: number, to: number) => {
    if (completed.includes(from) && completed.includes(to)) return "done";
    if (completed.includes(from) && activeNode === to) return "active";
    return "idle";
  };

  return (
    <div className="w-full p-4 sm:p-6 md:p-8 flex flex-col items-center space-y-6 text-foreground">
      <header className="text-center max-w-2xl px-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
          AI Workflow Pipeline
        </h1>
        <p className="text-zinc-500 text-xs sm:text-sm md:text-base font-medium max-w-md mx-auto leading-relaxed">
          Interactive visualization of autonomous multi-agent data processing and intelligent alerting.
        </p>
      </header>

      <main className="w-full max-w-4xl flex flex-col gap-6 items-stretch">
        {/* Workflow & Terminal Section */}
        <div className="flex-1 w-full space-y-6 min-w-0">
          {/* Workflow Canvas Area */}
          <div className="group relative">
             <div className="absolute -inset-0.5 rounded-2xl opacity-20 group-hover:opacity-30 transition duration-700"></div>
             <div className="relative pb-4">
               <div className="w-full mx-auto aspect-[650/200] relative rounded-2xl border border-zinc-800/60 bg-zinc-950/30 overflow-hidden backdrop-blur-md">
                 {/* Decorative Grid */}
                 <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                   style={{ backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                 
                 <svg className="absolute inset-0 h-full w-full" viewBox="0 0 650 200" preserveAspectRatio="xMidYMid meet">
                   {connections.map((c, i) => {
                     const from = nodes[c.from];
                     const to = nodes[c.to];
                     const sx = from.x + 50, sy = from.y, ex = to.x - 50, ey = to.y;
                     const mx = (sx + ex) / 2;
                     const path = `M ${sx} ${sy} C ${sx + (mx - sx) * 0.5} ${sy}, ${ex - (ex - mx) * 0.5} ${ey}, ${ex} ${ey}`;
                     const status = getLineStatus(c.from, c.to);

                     return (
                       <g key={i}>
                         <path
                           d={path}
                           fill="none"
                           strokeWidth={2.5}
                           className={cn(
                             "transition-all duration-500",
                             status === "idle" && "stroke-zinc-800/50",
                             status === "active" && "stroke-blue-500 [stroke-dasharray:8,4] animate-[dash_1s_infinite_linear]",
                             status === "done" && "stroke-emerald-500/30"
                           )}
                         />
                         {status === "active" && <Particles from={from} to={to} />}
                       </g>
                     );
                   })}
                 </svg>

                 <div className="absolute inset-0 pointer-events-none">
                   {nodes.map((node, i) => {
                     const status = getStatus(i);
                     const Icon = node.icon;

                     return (
                       <div
                         key={node.id}
                         className="absolute"
                         style={{ 
                           left: `${(node.x / 650) * 100}%`, 
                           top: `${(node.y / 200) * 100}%`, 
                           transform: "translate(-50%, -50%)" 
                         }}
                       >
                         <div
                           className={cn(
                             "relative flex w-[96px] items-center gap-2 rounded-xl border-2 bg-zinc-900/90 p-2 transition-all duration-500 shadow-xl",
                             status === "idle" && "border-zinc-800 opacity-40 scale-95",
                             status === "active" && "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-110 z-20",
                             status === "done" && "border-emerald-500/40 opacity-100 scale-100"
                           )}
                         >
                           {status === "active" && (
                             <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
                               <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-blue-400/10 to-transparent animate-shimmer" />
                             </div>
                           )}

                           <div
                             className={cn(
                               "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors shadow-inner",
                               status === "idle" && "bg-zinc-800",
                               status === "active" && "bg-blue-600/20 text-blue-400",
                               status === "done" && "bg-emerald-600/20 text-emerald-400"
                             )}
                           >
                             <Icon className="h-5 w-5" />
                           </div>

                           <div className="min-w-0 flex-1">
                             <p className="truncate text-[11px] font-bold tracking-tight text-zinc-100">{node.title}</p>
                             <p className={cn(
                               "truncate text-[9px] font-semibold uppercase tracking-wider",
                               status === "active" ? "text-blue-400 animate-pulse" : "text-zinc-500"
                             )}>
                               {node.subtitle}
                             </p>
                           </div>

                           <div
                             className={cn(
                               "absolute -right-1.5 -top-1.5 h-3.5 w-3.5 rounded-full border-2 border-zinc-900 transition-all duration-300 shadow-lg",
                               status === "idle" && "bg-zinc-700",
                               status === "active" && "bg-blue-500 ring-4 ring-blue-500/20",
                               status === "done" && "bg-emerald-500"
                             )}
                           />
                         </div>
                       </div>
                     );
                   })}
                 </div>
               </div>
               
               {/* Mobile scroll hint */}
               <div className="flex lg:hidden items-center justify-center gap-2 mt-2 text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                 <MousePointer2 className="h-3 w-3" />
                 Swipe to explore workflow
               </div>
             </div>
          </div>

          {/* Terminal Section */}
          <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-2xl overflow-hidden backdrop-blur-xl transition-all hover:border-zinc-700/50">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-zinc-800 bg-zinc-900/40">
              <div className="flex gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              </div>
              <div className="flex items-center gap-2 ml-4 px-3 py-1 rounded-md bg-zinc-800/50">
                <TerminalIcon className="h-3.5 w-3.5 text-blue-400" />
                <span className="text-[10px] sm:text-xs text-zinc-400 font-mono font-medium">pipeline@ai-engine: ~</span>
              </div>
            </div>
            <div className="p-5 h-[120px] sm:h-[140px] font-mono text-[10px] sm:text-[12px] leading-relaxed overflow-y-auto scrollbar-hide">
              {visibleLogs.map((log, i) => (
                <div
                  key={i}
                  className={cn(
                    "transition-all duration-300 py-0.5",
                    log.startsWith("$") ? "text-blue-400 font-semibold" : "text-zinc-500 pl-4 border-l border-zinc-800 ml-1.5",
                    log.includes("Done") && "text-emerald-400 font-bold mt-2 bg-emerald-500/5 py-1 px-2 rounded w-fit"
                  )}
                >
                  {log}
                </div>
              ))}
              {visibleLogs.length > 0 && !visibleLogs[visibleLogs.length - 1]?.includes("Done") && (
                <span className="inline-block w-2 h-4 bg-blue-500/80 animate-[pulse_0.6s_infinite] ml-1.5 align-middle" />
              )}
            </div>
          </div>
        </div>

        {/* Dashboard Section (always below terminal) */}
        <aside
          className={cn(
            "w-full rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden shadow-2xl transition-all duration-700 backdrop-blur-xl",
            showResult ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
          )}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/20 shadow-inner">
                <Activity className="h-4 w-4 text-blue-400" />
              </div>
              <span className="text-sm font-bold tracking-tight text-zinc-100">Live Insights</span>
            </div>
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, label: "Reach", value: "2.8k", color: "text-blue-400", bg: "bg-blue-500/10" },
                { icon: DollarSign, label: "Revenue", value: "$48k", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                { icon: TrendingUp, label: "Growth", value: "+24%", color: "text-indigo-400", bg: "bg-indigo-500/10" },
                { icon: MessageSquare, label: "Alerts", value: "12", color: "text-orange-400", bg: "bg-orange-500/10" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={cn(
                    "p-4 rounded-2xl bg-zinc-800/40 border border-zinc-700/50 transition-all duration-700 hover:border-zinc-600/50 group",
                    resultAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  )}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className={cn("p-2 w-fit rounded-xl mb-3 shadow-sm transition-transform group-hover:scale-110", stat.bg)}>
                    <stat.icon className={cn("h-4 w-4", stat.color)} />
                  </div>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                  {resultAnimated ? (
                    <p className="text-xl font-black text-zinc-50 tracking-tight">{stat.value}</p>
                  ) : (
                    <div className="h-6 w-12 rounded-lg bg-zinc-800 animate-pulse mt-1" />
                  )}
                </div>
              ))}
            </div>

            <div
              className={cn(
                "p-5 rounded-2xl bg-zinc-800/40 border border-zinc-700/50 transition-all duration-1000",
                resultAnimated ? "opacity-100 scale-100" : "opacity-0 scale-95"
              )}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="flex items-center justify-between mb-5">
                <p className="text-[10px] text-zinc-400 font-black uppercase tracking-[0.2em]">Efficiency Trend</p>
                <TrendingUp className="h-3 w-3 text-zinc-600" />
              </div>
              <div className="flex items-end gap-1.5 h-16">
                {[30, 60, 40, 75, 50, 85, 65, 90, 55, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-blue-600/80 to-blue-400 rounded-full transition-all duration-[1.5s] ease-out shadow-lg"
                    style={{
                      height: resultAnimated ? `${h}%` : "5%",
                      transitionDelay: `${500 + i * 50}ms`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div
              className={cn(
                "flex items-center justify-between p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 transition-all duration-700 group cursor-pointer hover:bg-emerald-500/15",
                resultAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
              style={{ transitionDelay: "800ms" }}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                   <div className="absolute inset-0 bg-emerald-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
                   <div className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs text-emerald-400 font-black uppercase tracking-widest">Workflow Ready</span>
              </div>
              <ChevronRight className="h-4 w-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </aside>
      </main>

      <footer className="w-full max-w-7xl pt-8 pb-12 px-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-zinc-900">
        <div className="flex items-center gap-4 opacity-40 hover:opacity-100 transition-opacity">
           <div className="h-2 w-2 rounded-full bg-blue-500" />
           <span className="text-[10px] font-mono tracking-tighter text-zinc-400 uppercase">System Status: Optimal</span>
        </div>
        <div className="text-zinc-700 text-[10px] font-mono uppercase tracking-[0.3em]">
          &copy; 2024 AI Workflow • Engine v2.4
        </div>
      </footer>

      <style>{`
        @keyframes dash {
          from { stroke-dashoffset: 60; }
          to { stroke-dashoffset: 0; }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default AIWorkflowDemo;
