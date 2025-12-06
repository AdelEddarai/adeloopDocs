"use client"

import type React from "react"
import { useEffect, useState, useCallback, useRef } from "react"
import { Play, Plus, Square, RotateCcw, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

type CellPhase = "idle" | "revealing" | "executing" | "complete"

interface CellConfig {
  code: string[]
  outputType: "table" | "bar-chart" | "line-chart" | "text"
}

const CELLS: CellConfig[] = [
  {
    code: ["import pandas as pd", "import adeloop.ai as ai", "", "df = ai.analyze('sales_data.csv')", "df.head()"],
    outputType: "table",
  },
  {
    code: ["# AI-powered insights", "insights = ai.generate_insights(df)", "print(insights.summary)"],
    outputType: "text",
  },
  {
    code: ["import matplotlib.pyplot as plt", "", "ai.plot(df, type='bar',", "        x='month', y='revenue')"],
    outputType: "bar-chart",
  },
  {
    code: ["# Predictive analytics", "forecast = ai.predict(df['users'])", "ai.plot(forecast, type='line')"],
    outputType: "line-chart",
  },
]

const LINE_REVEAL_DELAY = 60 // Faster line reveal
const EXECUTION_TIME = 700
const CELL_PAUSE = 250
const RESTART_DELAY = 3000

const JUPYTER_STYLES = `
@keyframes jupyter-skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
@keyframes jupyter-fade-slide-in {
  from { opacity: 0; transform: translateX(-6px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes jupyter-fade-slide-down {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes jupyter-bar-grow {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}
@keyframes jupyter-line-draw {
  from { stroke-dashoffset: 200; }
  to { stroke-dashoffset: 0; }
}
@keyframes jupyter-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes jupyter-cell-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0); }
  50% { box-shadow: 0 0 16px 2px rgba(34, 211, 238, 0.1); }
}

.jupyter-scroll {
  scrollbar-width: none;
}
.jupyter-scroll::-webkit-scrollbar {
  display: none;
}
`

function SkeletonBar({
  className,
  style,
  pulse = true,
}: { className?: string; style?: React.CSSProperties; pulse?: boolean }) {
  return (
    <div
      className={cn("rounded bg-muted/40 dark:bg-zinc-800/60", className)}
      style={{
        ...style,
        ...(pulse ? { animation: "jupyter-skeleton-pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite" } : {}),
      }}
    />
  )
}

export function JupyterIllustration() {
  const [phases, setPhases] = useState<CellPhase[]>(CELLS.map(() => "idle"))
  const [revealedLines, setRevealedLines] = useState<number[]>(CELLS.map(() => 0))
  const [execNumbers, setExecNumbers] = useState<(number | null)[]>(CELLS.map(() => null))
  const animationRef = useRef<boolean>(true)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

  const runDemo = useCallback(async () => {
    setPhases(CELLS.map(() => "idle"))
    setRevealedLines(CELLS.map(() => 0))
    setExecNumbers(CELLS.map(() => null))

    await sleep(400)

    for (let i = 0; i < CELLS.length; i++) {
      if (!animationRef.current) return

      const cell = CELLS[i]

      setPhases((p) => p.map((phase, idx) => (idx === i ? "revealing" : phase)))

      for (let line = 1; line <= cell.code.length; line++) {
        if (!animationRef.current) return
        setRevealedLines((r) => r.map((l, idx) => (idx === i ? line : l)))
        await sleep(LINE_REVEAL_DELAY)
      }

      await sleep(80)

      setPhases((p) => p.map((phase, idx) => (idx === i ? "executing" : phase)))
      setExecNumbers((n) => n.map((num, idx) => (idx === i ? i + 1 : num)))

      await sleep(EXECUTION_TIME)

      setPhases((p) => p.map((phase, idx) => (idx === i ? "complete" : phase)))

      await sleep(CELL_PAUSE)
    }

    await sleep(RESTART_DELAY)
  }, [])

  useEffect(() => {
    animationRef.current = true
    let running = true

    const loop = async () => {
      while (running && animationRef.current) {
        await runDemo()
      }
    }

    loop()

    return () => {
      running = false
      animationRef.current = false
    }
  }, [runDemo])

  // Auto-scroll notebook viewport as cells reveal and outputs render
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({
      top: el.scrollHeight,
      behavior: "smooth",
    })
  }, [phases, revealedLines, execNumbers])

  const isRunning = phases.some((p) => p === "revealing" || p === "executing")

  return (
    <section className="w-full overflow-hidden py-10 sm:py-12 md:py-14">
      <style dangerouslySetInnerHTML={{ __html: JUPYTER_STYLES }} />
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:gap-12 w-full">
          {/* Top: copy about Adeloop + AI */}
          <div className="space-y-4 sm:space-y-5 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" />
              AI-native Jupyter notebooks, fully managed
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 dark:from-emerald-300 dark:via-cyan-300 dark:to-blue-400 light:from-emerald-600 light:via-cyan-600 light:to-blue-700">
                How Adeloop notebooks collaborate with AI
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl">
                Adeloop wraps a familiar Jupyter-style notebook with an AI assistant that sits
                in-line with your code and results, helping you explore data, summarize insights,
                and generate visualizations without leaving the notebook.
              </p>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2 group">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex-shrink-0" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                 Upload ipynb extension and continue doing data analysis with the help of AI
                </span>
              </li>
              <li className="flex gap-2 group">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex-shrink-0" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                  Share notebooks to GenIDE to generate a dashboard report in order to share it to other teams.
                </span>
              </li>
            </ul>
          </div>

          {/* Bottom: notebook illustration */}
          <div className="w-full max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 rounded-2xl sm:rounded-3xl blur-2xl sm:blur-3xl" />

              <div className="relative rounded-xl sm:rounded-2xl border border-border/70 dark:border-zinc-800/60 bg-card/95 dark:bg-zinc-950 shadow-2xl overflow-hidden backdrop-blur-xl transition-colors">
                {/* Title bar - responsive */}
                <div className="bg-muted/70 dark:bg-zinc-900/80 backdrop-blur px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between border-b border-border/60 dark:border-zinc-800/60 transition-colors">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex gap-1 sm:gap-1.5">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-muted-foreground/50 dark:bg-zinc-700" />
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-muted-foreground/50 dark:bg-zinc-700" />
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-muted-foreground/50 dark:bg-zinc-700" />
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" />
                      <span className="text-muted-foreground text-[10px] sm:text-xs font-medium truncate">
                        adeloop_analysis.ipynb
                      </span>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-medium transition-all duration-300",
                      isRunning ? "bg-cyan-500/10 text-cyan-500" : "bg-muted/60 text-muted-foreground dark:bg-zinc-800/50 dark:text-zinc-500",
                    )}
                  >
                    <div
                      className={cn(
                        "w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-colors",
                        isRunning ? "bg-cyan-400" : "bg-muted-foreground/50 dark:bg-zinc-600",
                      )}
                      style={isRunning ? { animation: "jupyter-skeleton-pulse 1s ease-in-out infinite" } : undefined}
                    />
                    {isRunning ? "Running" : "Ready"}
                  </div>
                </div>

                {/* Toolbar - responsive */}
                <div className="bg-muted/40 dark:bg-zinc-900/40 px-2 sm:px-3 py-1 sm:py-1.5 flex items-center gap-0.5 border-b border-border/50 dark:border-zinc-800/40 transition-colors">
                  <ToolbarBtn icon={<Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />} />
                  <ToolbarBtn icon={<Play className="w-3 h-3 sm:w-3.5 sm:h-3.5" />} active={isRunning} />
                  <ToolbarBtn icon={<Square className="w-3 h-3 sm:w-3.5 sm:h-3.5" />} />
                  <ToolbarBtn icon={<RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />} />
                  <div className="ml-1.5 sm:ml-2 px-1.5 sm:px-2 py-0.5 rounded bg-muted/60 dark:bg-zinc-800/50 text-muted-foreground dark:text-zinc-500 text-[9px] sm:text-[10px] font-medium transition-colors">
                    Python 3
                  </div>
                </div>

                {/* Cells - responsive with constrained height, hidden scrollbar */}
                <div
                  ref={scrollRef}
                  className="jupyter-scroll p-2.5 sm:p-3 md:p-4 space-y-2 sm:space-y-2.5 md:space-y-3 max-h-[400px] sm:max-h-[450px] md:max-h-[500px] overflow-y-auto bg-gradient-to-b from-background to-muted/30 dark:from-zinc-950 dark:to-zinc-900/20 transition-colors"
                >
                  {CELLS.map((cell, i) => (
                    <Cell
                      key={i}
                      config={cell}
                      phase={phases[i]}
                      revealedLines={revealedLines[i]}
                      execNumber={execNumbers[i]}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ToolbarBtn({ icon, active }: { icon: React.ReactNode; active?: boolean }) {
  return (
    <button
      className={cn(
        "p-1 sm:p-1.5 rounded-md transition-colors",
        active
          ? "bg-cyan-500/20 text-cyan-500"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50 dark:hover:bg-zinc-800/50",
      )}
    >
      {icon}
    </button>
  )
}

interface CellProps {
  config: CellConfig
  phase: CellPhase
  revealedLines: number
  execNumber: number | null
}

function Cell({ config, phase, revealedLines, execNumber }: CellProps) {
  const isActive = phase === "revealing" || phase === "executing"
  const showOutput = phase === "executing" || phase === "complete"

  return (
    <div
      className={cn(
        "transition-all duration-300",
        isActive ? "opacity-100" : phase === "complete" ? "opacity-80" : "opacity-30",
      )}
    >
      <div className="flex gap-2 sm:gap-2.5 md:gap-3">
        {/* Execution number - responsive */}
        <div className="w-7 sm:w-8 md:w-10 flex-shrink-0 pt-2 sm:pt-2.5 text-right">
          <span
            className={cn(
              "font-mono text-[9px] sm:text-[10px] transition-colors",
              phase === "executing" ? "text-cyan-400" : "text-muted-foreground dark:text-zinc-700",
            )}
          >
            {phase === "executing" ? (
              <span className="inline-flex">
                [<span style={{ animation: "jupyter-skeleton-pulse 1s ease-in-out infinite" }}>*</span>]:
              </span>
            ) : execNumber ? (
              `[${execNumber}]:`
            ) : (
              "[ ]:"
            )}
          </span>
        </div>

        <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-2">
          {/* Code block - responsive */}
          <div
            className={cn(
              "relative rounded-md sm:rounded-lg border transition-all duration-300 overflow-hidden",
              isActive
                ? "border-cyan-500/30 bg-muted/70 dark:bg-zinc-900/80"
                : "border-border/60 dark:border-zinc-800/50 bg-muted/40 dark:bg-zinc-900/40",
            )}
            style={isActive ? { animation: "jupyter-cell-glow 2s ease-in-out infinite" } : undefined}
          >
            {isActive && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-cyan-500" />}

            <div className="p-2 sm:p-2.5 md:p-3 font-mono text-[10px] sm:text-xs space-y-0.5 sm:space-y-1 min-h-[32px] sm:min-h-[40px] text-foreground/90 dark:text-zinc-200">
              {config.code.map((line, li) => (
                <div key={li} className="h-3.5 sm:h-4 flex items-center">
                  {li < revealedLines ? (
                    <span className="truncate" style={{ animation: "jupyter-fade-slide-in 120ms ease-out forwards" }}>
                      <SyntaxHL text={line} />
                    </span>
                  ) : (
                    <SkeletonBar
                      className="h-2.5 sm:h-3 bg-muted-foreground/30 dark:bg-zinc-800/60"
                      style={{ width: `${Math.min(Math.max(line.length * 5, 30), 90)}%` }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Output */}
          {showOutput && (
            <div style={{ animation: "jupyter-fade-slide-down 250ms ease-out forwards" }}>
              <OutputDisplay type={config.outputType} isComplete={phase === "complete"} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SyntaxHL({ text }: { text: string }) {
  if (!text.trim()) return <span>&nbsp;</span>

  const keywords = ["import", "as", "from", "def", "class", "return", "if", "for", "in", "print", "type"]
  const parts = text.split(/(\s+|[(),.='[\]#])/)

  return (
    <span className="text-zinc-300">
      {parts.map((part, i) => {
        if (keywords.includes(part))
          return (
            <span key={i} className="text-pink-400">
              {part}
            </span>
          )
        if (part.startsWith("#"))
          return (
            <span key={i} className="text-zinc-600">
              {part}
            </span>
          )
        if (part.startsWith("'") || part.startsWith('"'))
          return (
            <span key={i} className="text-amber-300">
              {part}
            </span>
          )
        if (/^[a-z_]+\(/.test(part))
          return (
            <span key={i} className="text-cyan-300">
              {part}
            </span>
          )
        if (part === "ai" || part === "pd" || part === "plt")
          return (
            <span key={i} className="text-violet-400">
              {part}
            </span>
          )
        if (part.includes(".")) {
          const [obj, method] = part.split(".")
          return (
            <span key={i}>
              <span className="text-violet-400">{obj}</span>
              <span className="text-zinc-500">.</span>
              <span className="text-cyan-300">{method}</span>
            </span>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </span>
  )
}

const TABLE_DATA = [
  { month: "Jan", revenue: "$12.4K", users: "1,245", growth: "+12%" },
  { month: "Feb", revenue: "$15.2K", users: "1,567", growth: "+18%" },
  { month: "Mar", revenue: "$18.7K", users: "2,103", growth: "+24%" },
  { month: "Apr", revenue: "$22.1K", users: "2,891", growth: "+31%" },
]

const BAR_DATA = [
  { label: "Jan", value: 45, amount: "$12.4K" },
  { label: "Feb", value: 55, amount: "$15.2K" },
  { label: "Mar", value: 68, amount: "$18.7K" },
  { label: "Apr", value: 80, amount: "$22.1K" },
  { label: "May", value: 100, amount: "$28.5K" },
]

const INSIGHTS_TEXT = [
  "Revenue up +127% over 5 months",
  "User growth accelerating at 177%",
  "Recommend: Scale marketing 40%",
]

function OutputDisplay({ type, isComplete }: { type: CellConfig["outputType"]; isComplete: boolean }) {
  if (!isComplete) {
    return <OutputSkeleton type={type} />
  }

  if (type === "table") {
    return (
      <div
        className="rounded-md sm:rounded-lg border border-border/70 dark:border-zinc-800/50 bg-muted/40 dark:bg-zinc-900/30 overflow-hidden"
        style={{ animation: "jupyter-fade-in 250ms ease-out forwards" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-[9px] sm:text-[10px] font-mono">
            <thead>
              <tr className="border-b border-border/50 dark:border-zinc-800/50 bg-muted/30 dark:bg-zinc-800/30">
                <th className="px-2 sm:px-3 py-1 sm:py-1.5 text-left text-zinc-500 font-medium">#</th>
                <th className="px-2 sm:px-3 py-1 sm:py-1.5 text-left text-zinc-500 font-medium">month</th>
                <th className="px-2 sm:px-3 py-1 sm:py-1.5 text-left text-zinc-500 font-medium">revenue</th>
                <th className="px-2 sm:px-3 py-1 sm:py-1.5 text-left text-zinc-500 font-medium hidden sm:table-cell">
                  users
                </th>
                <th className="px-2 sm:px-3 py-1 sm:py-1.5 text-left text-zinc-500 font-medium">growth</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_DATA.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-border/30 dark:border-zinc-800/30 last:border-0"
                  style={{ animation: `jupyter-fade-slide-in 150ms ease-out ${i * 40}ms forwards`, opacity: 0 }}
                >
                  <td className="px-2 sm:px-3 py-1 sm:py-1.5 text-zinc-600">{i}</td>
                  <td className="px-2 sm:px-3 py-1 sm:py-1.5 text-zinc-400">{row.month}</td>
                  <td className="px-2 sm:px-3 py-1 sm:py-1.5 text-cyan-400">{row.revenue}</td>
                  <td className="px-2 sm:px-3 py-1 sm:py-1.5 text-zinc-300 hidden sm:table-cell">{row.users}</td>
                  <td className="px-2 sm:px-3 py-1 sm:py-1.5 text-emerald-400">{row.growth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  if (type === "text") {
    return (
      <div
        className="rounded-md sm:rounded-lg border border-border/70 dark:border-zinc-800/50 bg-muted/40 dark:bg-zinc-900/30 p-2 sm:p-2.5 md:p-3 space-y-1"
        style={{ animation: "jupyter-fade-in 250ms ease-out forwards" }}
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyan-400" />
          <span className="text-[9px] sm:text-[10px] font-medium text-cyan-400">AI Insights</span>
        </div>
        {INSIGHTS_TEXT.map((text, i) => (
          <div
            key={i}
            className="text-[9px] sm:text-[10px] text-zinc-400 flex items-start gap-1.5"
            style={{ animation: `jupyter-fade-slide-in 150ms ease-out ${i * 60}ms forwards`, opacity: 0 }}
          >
            <span className="text-cyan-500">•</span>
            <span>{text}</span>
          </div>
        ))}
      </div>
    )
  }

  if (type === "bar-chart") {
    return (
      <div
        className="rounded-md sm:rounded-lg border border-border/70 dark:border-zinc-800/50 bg-muted/40 dark:bg-zinc-900/30 p-2.5 sm:p-3 md:p-4"
        style={{ animation: "jupyter-fade-in 250ms ease-out forwards" }}
      >
        {/* Chart title matching the code */}
        <div className="text-[9px] sm:text-[10px] text-zinc-500 mb-2 sm:mb-3">
          <span className="text-zinc-400 font-medium">Revenue by Month</span>
          <span className="text-zinc-600 ml-1.5">— ai.plot(df, type='bar')</span>
        </div>

        {/* Y-axis label */}
        <div className="flex">
          <div className="flex flex-col justify-between h-16 sm:h-20 text-[7px] sm:text-[8px] text-zinc-600 pr-1.5 sm:pr-2">
            <span>$30K</span>
            <span>$20K</span>
            <span>$10K</span>
            <span>$0</span>
          </div>

          {/* Bars */}
          <div className="flex-1 flex items-end justify-around gap-1 sm:gap-1.5 h-16 sm:h-20 border-l border-b border-border/50 dark:border-zinc-800/50 pl-1.5 sm:pl-2 pb-1">
            {BAR_DATA.map((bar, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5 flex-1 max-w-8 sm:max-w-10">
                <div
                  className="w-full rounded-t bg-gradient-to-t from-cyan-600 to-cyan-400"
                  style={{
                    height: `${bar.value}%`,
                    transformOrigin: "bottom",
                    animation: `jupyter-bar-grow 350ms ease-out ${i * 50}ms forwards`,
                    transform: "scaleY(0)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* X-axis labels (months) */}
        <div className="flex justify-around pl-6 sm:pl-8 mt-1 text-[7px] sm:text-[8px] text-zinc-500">
          {BAR_DATA.map((bar, i) => (
            <span key={i} className="flex-1 max-w-8 sm:max-w-10 text-center">
              {bar.label}
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (type === "line-chart") {
    return (
      <div
        className="rounded-md sm:rounded-lg border border-border/70 dark:border-zinc-800/50 bg-muted/40 dark:bg-zinc-900/30 p-2.5 sm:p-3 md:p-4"
        style={{ animation: "jupyter-fade-in 250ms ease-out forwards" }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="text-[9px] sm:text-[10px] text-zinc-400 font-medium">User Growth Forecast</div>
          <div className="flex items-center gap-1 text-[7px] sm:text-[8px] text-cyan-400/70">
            <div className="w-3 border-t border-dashed border-cyan-400/50" />
            <span>forecast</span>
          </div>
        </div>

        <div className="h-14 sm:h-16 md:h-20 relative flex">
          {/* Y-axis */}
          <div className="flex flex-col justify-between text-[7px] sm:text-[8px] text-zinc-600 pr-1.5 sm:pr-2 py-0.5">
            <span>5K</span>
            <span>3K</span>
            <span>1K</span>
          </div>

          {/* Chart area */}
          <div className="flex-1 relative border-l border-b border-border/50 dark:border-zinc-800/50">
            {/* Grid lines */}
            {[0, 1, 2].map((i) => (
              <div key={i} className="absolute w-full h-px bg-zinc-800/30" style={{ top: `${i * 50}%` }} />
            ))}

            {/* SVG Chart */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Area */}
              <path
                d="M 0 42 L 20 36 L 40 28 L 60 18 L 80 10 L 100 5 L 100 50 L 0 50 Z"
                fill="url(#areaGrad)"
                style={{ animation: "jupyter-fade-in 400ms ease-out forwards" }}
              />
              {/* Line */}
              <path
                d="M 0 42 L 20 36 L 40 28 L 60 18 L 80 10 L 100 5"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="200"
                style={{ animation: "jupyter-line-draw 600ms ease-out forwards" }}
              />
            </svg>

            {/* Data points */}
            {[
              { x: 0, y: 84 },
              { x: 20, y: 72 },
              { x: 40, y: 56 },
              { x: 60, y: 36 },
              { x: 80, y: 20 },
              { x: 100, y: 10 },
            ].map((point, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full border border-background dark:border-zinc-900"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  transform: "translate(-50%, -50%)",
                  animation: `jupyter-fade-in 150ms ease-out ${i * 60}ms forwards`,
                  opacity: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between pl-6 sm:pl-8 mt-1 text-[7px] sm:text-[8px] text-zinc-500">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>
    )
  }

  return null
}

function OutputSkeleton({ type }: { type: CellConfig["outputType"] }) {
  if (type === "table") {
    return (
      <div className="rounded-md sm:rounded-lg border border-border/70 dark:border-zinc-800/50 bg-muted/40 dark:bg-zinc-900/30 p-2 sm:p-2.5 space-y-1.5 sm:space-y-2">
        <div className="flex gap-2 sm:gap-4 pb-1.5 border-b border-border/30 dark:border-zinc-800/30">
          {[8, 15, 18, 15, 12].map((w, i) => (
            <SkeletonBar
              key={i}
              className="h-2 sm:h-2.5 bg-muted-foreground/40 dark:bg-zinc-700/60"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
        {[1, 2, 3, 4].map((row) => (
          <div key={row} className="flex gap-2 sm:gap-4">
            {[8, 15, 18, 15, 12].map((w, i) => (
              <SkeletonBar
                key={i}
                className="h-2 sm:h-2.5 bg-muted-foreground/30 dark:bg-zinc-800/60"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
        ))}
      </div>
    )
  }

  if (type === "text") {
    return (
      <div className="rounded-md sm:rounded-lg border border-border/70 dark:border-zinc-800/50 bg-muted/40 dark:bg-zinc-900/30 p-2 sm:p-2.5 space-y-1.5">
        <SkeletonBar className="h-2 w-16 bg-muted-foreground/40 dark:bg-zinc-700/60" />
        {[85, 70, 60].map((w, i) => (
          <SkeletonBar
            key={i}
            className="h-2 bg-muted-foreground/25 dark:bg-zinc-800/50"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
    )
  }

  if (type === "bar-chart") {
    const heights = [45, 55, 68, 80, 100]
    return (
      <div className="rounded-md sm:rounded-lg border border-border/70 dark:border-zinc-800/50 bg-muted/40 dark:bg-zinc-900/30 p-2.5 sm:p-3 md:p-4">
        <SkeletonBar className="h-2 w-24 mb-2 sm:mb-3 bg-zinc-700/60" />
        <div className="flex">
          <div className="flex flex-col justify-between h-16 sm:h-20 pr-1.5 sm:pr-2">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonBar key={i} className="h-1.5 w-5 bg-zinc-800/40" pulse={false} />
            ))}
          </div>
          <div className="flex-1 flex items-end justify-around gap-1 sm:gap-1.5 h-16 sm:h-20 border-l border-b border-border/40 dark:border-zinc-800/30 pl-1.5 sm:pl-2 pb-1">
            {heights.map((h, i) => (
              <SkeletonBar
                key={i}
                className="flex-1 max-w-8 sm:max-w-10 rounded-t bg-zinc-700/40"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-around pl-6 sm:pl-8 mt-1.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <SkeletonBar
              key={i}
              className="h-1.5 w-4 bg-zinc-800/40 flex-1 max-w-8 sm:max-w-10 mx-auto"
              pulse={false}
            />
          ))}
        </div>
      </div>
    )
  }

  if (type === "line-chart") {
    return (
      <div className="rounded-md sm:rounded-lg border border-border/70 dark:border-zinc-800/50 bg-muted/40 dark:bg-zinc-900/30 p-2.5 sm:p-3 md:p-4">
        <div className="flex justify-between items-center mb-2">
          <SkeletonBar className="h-2 w-28 bg-zinc-700/60" />
          <SkeletonBar className="h-2 w-12 bg-zinc-800/40" pulse={false} />
        </div>
        <div className="h-14 sm:h-16 md:h-20 relative flex">
          <div className="flex flex-col justify-between pr-1.5 sm:pr-2 py-0.5">
            {[1, 2, 3].map((i) => (
              <SkeletonBar key={i} className="h-1.5 w-4 bg-zinc-800/40" pulse={false} />
            ))}
          </div>
          <div className="flex-1 relative border-l border-b border-border/40 dark:border-zinc-800/30">
            {[0, 1, 2].map((i) => (
              <div key={i} className="absolute w-full h-px bg-zinc-800/20" style={{ top: `${i * 50}%` }} />
            ))}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
              <path
                d="M 0 42 Q 25 35, 50 22 T 100 5"
                fill="none"
                stroke="#3f3f46"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ animation: "jupyter-skeleton-pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}
              />
            </svg>
          </div>
        </div>
        <div className="flex justify-between pl-6 sm:pl-8 mt-1.5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonBar key={i} className="h-1.5 w-4 bg-zinc-800/40" pulse={false} />
          ))}
        </div>
      </div>
    )
  }

  return null
}
