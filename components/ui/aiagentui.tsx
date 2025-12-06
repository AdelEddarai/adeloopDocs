"use client"

import { useEffect, useState } from "react"
import {
  Database,
  Brain,
  Wrench,
  Mail,
  MessageSquare,
  Code,
  Terminal,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
} from "lucide-react"
import { cn } from "@/lib/utils"

const nodes = [
  { id: "data", title: "Data Source", subtitle: "API", icon: Database, x: 60, y: 100 },
  { id: "ai", title: "AI Analytics", subtitle: "GPT-4", icon: Brain, x: 185, y: 100 },
  { id: "transform", title: "Transform", subtitle: "Format", icon: Wrench, x: 310, y: 100 },
  { id: "execute", title: "Execute", subtitle: "Run", icon: Code, x: 435, y: 100 },
  { id: "slack", title: "Slack", subtitle: "Notify", icon: MessageSquare, x: 560, y: 50 },
  { id: "gmail", title: "Gmail", subtitle: "Send", icon: Mail, x: 560, y: 150 },
]

const connections = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 3, to: 5 },
]

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
]

function Particles({ from, to }: { from: { x: number; y: number }; to: { x: number; y: number } }) {
  const [particles, setParticles] = useState<{ id: number; t: number }[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => {
        const updated = prev.map((p) => ({ ...p, t: p.t + 0.04 })).filter((p) => p.t < 1)
        if (prev.length < 2 && Math.random() > 0.4) {
          return [...updated, { id: Date.now(), t: 0 }]
        }
        return updated
      })
    }, 30)
    return () => clearInterval(interval)
  }, [])

  const sx = from.x + 50,
    sy = from.y,
    ex = to.x - 50,
    ey = to.y
  const mx = (sx + ex) / 2

  const getPos = (t: number) => ({
    x:
      (1 - t) ** 3 * sx +
      3 * (1 - t) ** 2 * t * (sx + (mx - sx) * 0.5) +
      3 * (1 - t) * t ** 2 * (ex - (ex - mx) * 0.5) +
      t ** 3 * ex,
    y: (1 - t) ** 3 * sy + 3 * (1 - t) ** 2 * t * sy + 3 * (1 - t) * t ** 2 * ey + t ** 3 * ey,
  })

  return (
    <g>
      {particles.map((p) => {
        const pos = getPos(p.t)
        const opacity = 1 - Math.abs(p.t - 0.5) * 2
        return (
          <g key={p.id}>
            <circle cx={pos.x} cy={pos.y} r={4} fill="hsl(var(--primary))" opacity={opacity * 0.3} />
            <circle cx={pos.x} cy={pos.y} r={2} fill="hsl(var(--primary))" opacity={opacity * 0.7} />
          </g>
        )
      })}
    </g>
  )
}

export function AIWorkflowDemo() {
  const [activeNode, setActiveNode] = useState(0)
  const [completed, setCompleted] = useState<number[]>([])
  const [visibleLogs, setVisibleLogs] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)
  const [resultAnimated, setResultAnimated] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const sequence = [0, 1, 2, 3, 4, 5]
    let step = 0

    const runStep = () => {
      if (isPaused) return

      if (step < sequence.length) {
        setActiveNode(sequence[step])
        if (step > 0) setCompleted((prev) => [...new Set([...prev, sequence[step - 1]])])

        const logs = terminalLogs.filter((l) => l.step === step).map((l) => l.text)
        setVisibleLogs((prev) => [...prev.slice(-4), ...logs])

        if (step === sequence.length - 1) {
          setTimeout(() => {
            setShowResult(true)
            setTimeout(() => setResultAnimated(true), 100)
            setIsPaused(true)
          }, 600)
        }
        step++
      } else {
        // Reset and loop
        setCompleted([])
        setActiveNode(0)
        setVisibleLogs([])
        setShowResult(false)
        setResultAnimated(false)
        step = 1
      }
    }

    const interval = setInterval(runStep, 1000)

    return () => clearInterval(interval)
  }, [isPaused])

  useEffect(() => {
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setCompleted([])
        setActiveNode(0)
        setVisibleLogs([])
        setShowResult(false)
        setResultAnimated(false)
        setIsPaused(false)
      }, 4000) // Show result for 4 seconds before reset

      return () => clearTimeout(pauseTimer)
    }
  }, [isPaused])

  const getStatus = (i: number) => {
    if (completed.includes(i)) return "done"
    if (activeNode === i) return "active"
    return "idle"
  }

  const getLineStatus = (from: number, to: number) => {
    if (completed.includes(from) && completed.includes(to)) return "done"
    if (completed.includes(from) && activeNode === to) return "active"
    return "idle"
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex gap-4">
        {/* Left side: Workflow + Terminal */}
        <div className="flex-1 min-w-0">
          {/* Workflow Canvas */}
          <div className="relative h-[200px] w-full">
            <svg className="absolute inset-0 h-full w-full">
              {connections.map((c, i) => {
                const from = nodes[c.from],
                  to = nodes[c.to]
                const sx = from.x + 50,
                  sy = from.y,
                  ex = to.x - 50,
                  ey = to.y
                const mx = (sx + ex) / 2
                const path = `M ${sx} ${sy} C ${sx + (mx - sx) * 0.5} ${sy}, ${ex - (ex - mx) * 0.5} ${ey}, ${ex} ${ey}`
                const status = getLineStatus(c.from, c.to)

                return (
                  <g key={i}>
                    <path
                      d={path}
                      fill="none"
                      strokeWidth={2}
                      strokeDasharray={status === "active" ? "6 4" : "0"}
                      className={cn(
                        "transition-all duration-300",
                        status === "idle" && "stroke-muted-foreground/20",
                        status === "active" && "stroke-primary shadow-md shadow-primary/20",
                        status === "done" && "stroke-emerald-500/50",
                      )}
                    />
                    {status === "active" && <Particles from={from} to={to} />}
                  </g>
                )
              })}
            </svg>

            {nodes.map((node, i) => {
              const status = getStatus(i)
              const Icon = node.icon

              return (
                <div
                  key={node.id}
                  className="absolute"
                  style={{ left: node.x, top: node.y, transform: "translate(-50%, -50%)" }}
                >
                  <div
                    className={cn(
                      "relative flex w-[100px] items-center gap-2 rounded-lg border-2 bg-card p-2 transition-all duration-300",
                      status === "idle" && "border-border/50",
                      status === "active" && "border-primary shadow-md shadow-primary/20",
                      status === "done" && "border-emerald-500/50",
                    )}
                  >
                    {status === "active" && (
                      <div className="absolute inset-0 overflow-hidden rounded-lg">
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-[shimmer_1s_infinite]" />
                      </div>
                    )}

                    <div
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors",
                        status === "idle" && "bg-muted",
                        status === "active" && "bg-primary/10",
                        status === "done" && "bg-emerald-500/10",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-3.5 w-3.5 transition-colors",
                          status === "idle" && "text-muted-foreground",
                          status === "active" && "text-primary",
                          status === "done" && "text-emerald-500",
                        )}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10px] font-medium">{node.title}</p>
                      {status === "active" ? (
                        <div className="mt-0.5 h-1.5 w-8 animate-pulse rounded bg-primary/20" />
                      ) : (
                        <p className="truncate text-[9px] text-muted-foreground">{node.subtitle}</p>
                      )}
                    </div>

                    <div
                      className={cn(
                        "absolute -right-1 -top-1 h-2 w-2 rounded-full border-2 border-background",
                        status === "idle" && "bg-muted-foreground/30",
                        status === "active" && "bg-primary animate-pulse",
                        status === "done" && "bg-emerald-500",
                      )}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-2 rounded-lg border border-border/50 bg-card overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border/50 bg-muted/30">
              <Terminal className="h-3 w-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground font-medium">Terminal</span>
              <div className="ml-auto flex gap-1">
                <div className="h-2 w-2 rounded-full bg-red-500/50" />
                <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                <div className="h-2 w-2 rounded-full bg-emerald-500/50" />
              </div>
            </div>
            <div className="p-2 h-[72px] font-mono text-[10px] leading-relaxed">
              {visibleLogs.map((log, i) => (
                <div
                  key={i}
                  className={cn(
                    "text-muted-foreground transition-opacity duration-300",
                    log.startsWith("$") && "text-emerald-400",
                    log.includes("Done") && "text-primary",
                  )}
                >
                  {log}
                </div>
              ))}
              {visibleLogs.length > 0 && !visibleLogs[visibleLogs.length - 1]?.includes("Done") && (
                <span className="inline-block w-1.5 h-3 bg-primary animate-pulse" />
              )}
            </div>
          </div>
        </div>

        <div
          className={cn(
            "w-[220px] shrink-0 rounded-lg border border-border/50 bg-card overflow-hidden transition-all duration-500",
            showResult ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4",
          )}
        >
          <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border/50 bg-muted/30">
            <Activity className="h-3 w-3 text-primary" />
            <span className="text-[10px] font-medium">Result Dashboard</span>
          </div>

          <div className="p-3 space-y-2">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: Users, label: "Users", value: "2,847", color: "text-blue-500" },
                { icon: DollarSign, label: "Revenue", value: "$48.2K", color: "text-emerald-500" },
                { icon: TrendingUp, label: "Growth", value: "+24%", color: "text-primary" },
                { icon: Activity, label: "Active", value: "1,293", color: "text-orange-500" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={cn(
                    "p-2 rounded-md bg-muted/30 transition-all duration-300",
                    resultAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                  )}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <stat.icon className={cn("h-3 w-3 mb-1", stat.color)} />
                  <p className="text-[9px] text-muted-foreground">{stat.label}</p>
                  {resultAnimated ? (
                    <p className="text-xs font-semibold">{stat.value}</p>
                  ) : (
                    <div className="h-3 w-10 mt-0.5 rounded bg-muted animate-pulse" />
                  )}
                </div>
              ))}
            </div>

            {/* Mini Chart Skeleton */}
            <div
              className={cn(
                "p-2 rounded-md bg-muted/30 transition-all duration-500",
                resultAnimated ? "opacity-100" : "opacity-0",
              )}
              style={{ transitionDelay: "400ms" }}
            >
              <p className="text-[9px] text-muted-foreground mb-2">Weekly Trend</p>
              <div className="flex items-end gap-1 h-8">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-primary/60 rounded-sm transition-all duration-500"
                    style={{
                      height: resultAnimated ? `${h}%` : "10%",
                      transitionDelay: `${500 + i * 50}ms`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Status */}
            <div
              className={cn(
                "flex items-center gap-2 p-2 rounded-md bg-emerald-500/10 transition-all duration-300",
                resultAnimated ? "opacity-100" : "opacity-0",
              )}
              style={{ transitionDelay: "800ms" }}
            >
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-emerald-500 font-medium">Workflow Complete</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer { 100% { transform: translateX(200%); } }
        @keyframes dash { to { stroke-dashoffset: -10; } }
      `}</style>
    </div>
  )
}