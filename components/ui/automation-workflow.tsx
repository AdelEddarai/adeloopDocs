"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Database, LineChart, FileSpreadsheet, Server, Zap, Webhook, Bot, CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GitHubIcon } from "./brandicons"

// -----------------------------------------------------------------------------
// Data Configuration
// -----------------------------------------------------------------------------

const dataSources = [
  { 
    id: "csv",
    icon: FileSpreadsheet, 
    label: "CSV / Excel", 
    color: "text-blue-400", 
    bg: "bg-blue-500/10",
  },
  { 
    id: "postgres",
    icon: Database, 
    label: "PostgreSQL", 
    color: "text-emerald-400", 
    bg: "bg-emerald-500/10",
  },
  { 
    id: "mysql",
    icon: Server, 
    label: "MySQL", 
    color: "text-orange-400", 
    bg: "bg-orange-500/10",
  },
  { 
    id: "snowflake",
    icon: Database, 
    label: "Snowflake", 
    color: "text-cyan-400", 
    bg: "bg-cyan-500/10",
  },
]

const destinations = [
  { 
    id: "dashboard",
    icon: LineChart, 
    label: "Dashboards", 
    color: "text-indigo-400", 
    bg: "bg-indigo-500/10",
  },
  { 
    id: "github",
    icon: GitHubIcon, 
    label: "GitHub Actions", 
    color: "text-white", 
    bg: "bg-zinc-500/10",
  },
  { 
    id: "api",
    icon: Webhook, 
    label: "Rest API", 
    color: "text-pink-400", 
    bg: "bg-pink-500/10",
  },
  { 
    id: "ai",
    icon: Bot, 
    label: "AI Agents", 
    color: "text-violet-400", 
    bg: "bg-violet-500/10",
  },
]

interface PathData {
  id: string
  d: string
}

type Phase = 'input' | 'processing' | 'output';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export default function AutomationWorkflow() {
  const [sourcePaths, setSourcePaths] = useState<PathData[]>([])
  const [destPaths, setDestPaths] = useState<PathData[]>([])
  
  // Animation State
  const [phase, setPhase] = useState<Phase>('input');

  const containerRef = useRef<HTMLDivElement>(null)
  const sourceRefs = useRef<(HTMLDivElement | null)[]>([])
  const destRefs = useRef<(HTMLDivElement | null)[]>([])
  const adeloopRef = useRef<HTMLDivElement>(null)

  // ---------------------------------------------------------------------------
  // Animation Loop Logic
  // ---------------------------------------------------------------------------
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const runSequence = () => {
      // 1. Input Phase: Data travels from Source -> Hub
      setPhase('input');
      
      // Duration of travel (approx 2s)
      timeoutId = setTimeout(() => {
        
        // 2. Processing Phase: Hub works on data
        setPhase('processing');
        
        // Duration of processing (1.5s)
        timeoutId = setTimeout(() => {
          
          // 3. Output Phase: Data travels Hub -> Destination
          setPhase('output');
          
          // Duration of travel (approx 2s) + Pause (1s)
          timeoutId = setTimeout(() => {
            runSequence(); // Loop
          }, 3000); 

        }, 1500);

      }, 2000);
    };

    runSequence();

    return () => clearTimeout(timeoutId);
  }, []);

  // ---------------------------------------------------------------------------
  // Path Calculation Logic
  // ---------------------------------------------------------------------------
  const calculatePaths = useCallback(() => {
    if (!containerRef.current || !adeloopRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const adeloopRect = adeloopRef.current.getBoundingClientRect()

    // Adeloop icon relative center
    const adeloopCenterX = adeloopRect.left + adeloopRect.width / 2 - containerRect.left
    const adeloopCenterY = adeloopRect.top + adeloopRect.height / 2 - containerRect.top

    // --- Source Paths (Left -> Hub) ---
    const newSourcePaths: PathData[] = []
    sourceRefs.current.forEach((ref, index) => {
      if (!ref) return
      const rect = ref.getBoundingClientRect()
      
      // Start at the right edge of the card
      const startX = rect.right - containerRect.left
      const startY = rect.top + rect.height / 2 - containerRect.top
      
      // End at the left edge of the hub circle
      const endX = adeloopCenterX - (adeloopRect.width / 2) + 10
      
      // Control points for a smooth S-curve
      const dist = Math.abs(endX - startX)
      const cp1X = startX + dist * 0.5
      const cp1Y = startY
      const cp2X = endX - dist * 0.5
      const cp2Y = adeloopCenterY

      newSourcePaths.push({
        id: `source-path-${index}`,
        d: `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${adeloopCenterY}`,
      })
    })

    // --- Destination Paths (Hub -> Right) ---
    const newDestPaths: PathData[] = []
    destRefs.current.forEach((ref, index) => {
      if (!ref) return
      const rect = ref.getBoundingClientRect()
      
      // Start at right edge of hub
      const startX = adeloopCenterX + (adeloopRect.width / 2) - 10
      // End at left edge of card
      const endX = rect.left - containerRect.left
      const endY = rect.top + rect.height / 2 - containerRect.top

      const dist = Math.abs(endX - startX)
      const cp1X = startX + dist * 0.5
      const cp1Y = adeloopCenterY
      const cp2X = endX - dist * 0.5
      const cp2Y = endY

      newDestPaths.push({
        id: `dest-path-${index}`,
        d: `M ${startX} ${adeloopCenterY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`,
      })
    })

    setSourcePaths(newSourcePaths)
    setDestPaths(newDestPaths)
  }, [])

  useEffect(() => {
    const timer = setTimeout(calculatePaths, 100)
    const observer = new ResizeObserver(() => {
        requestAnimationFrame(calculatePaths)
    })
    
    if (containerRef.current) {
        observer.observe(containerRef.current)
    }

    window.addEventListener("resize", calculatePaths)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", calculatePaths)
      observer.disconnect()
    }
  }, [calculatePaths])

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 blur-[100px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-4 bg-zinc-900/50 text-zinc-400 border-zinc-800 backdrop-blur-sm">
             <Zap className="mr-1 h-3 w-3 text-emerald-400" />
             Pipeline Automation
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Connect, Transform, Deliver.
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
             Stream data from any source directly into your apps, dashboards, and AI agents.
          </p>
        </motion.div>

        {/* Workflow Canvas */}
        <div className="relative">
          <div className="relative overflow-hidden backdrop-blur-sm p-4 sm:p-8">
              
              {/* Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />

              {/* Layout Container */}
              <div ref={containerRef} className="relative min-h-[500px] flex items-center justify-between gap-8 sm:gap-12 md:gap-24">
                
                {/* SVG Overlay for Cables */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                  <defs>
                     <linearGradient id="stream-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                        <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
                     </linearGradient>
                     <linearGradient id="stream-gradient-out" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                        <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
                     </linearGradient>
                  </defs>

                  {/* Sources -> Hub Connections */}
                  {sourcePaths.map((path, index) => (
                    <g key={path.id}>
                      <path d={path.d} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeLinecap="round" />
                      {/* Only animate if in Input phase */}
                      <motion.path
                        d={path.d}
                        fill="none"
                        stroke="url(#stream-gradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="40 400" 
                        initial={{ strokeDashoffset: 440, opacity: 0 }}
                        animate={ phase === 'input' ? { 
                            strokeDashoffset: [440, 0], 
                            opacity: [0, 1, 0] 
                        } : { opacity: 0 }}
                        transition={{
                          duration: 1.5,
                          ease: "easeInOut",
                          delay: index * 0.1, // Stagger slightly
                        }}
                      />
                    </g>
                  ))}

                  {/* Hub -> Destination Connections */}
                  {destPaths.map((path, index) => (
                    <g key={path.id}>
                      <path d={path.d} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeLinecap="round" />
                      {/* Only animate if in Output phase */}
                      <motion.path
                        d={path.d}
                        fill="none"
                        stroke="url(#stream-gradient-out)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="40 400"
                        initial={{ strokeDashoffset: 440, opacity: 0 }}
                        animate={ phase === 'output' ? { 
                            strokeDashoffset: [440, 0], 
                            opacity: [0, 1, 0] 
                        } : { opacity: 0 }}
                        transition={{
                          duration: 1.5,
                          ease: "easeInOut",
                          delay: index * 0.1,
                        }}
                      />
                    </g>
                  ))}
                </svg>

                {/* --- Left Column: SOURCES --- */}
                <div className="flex flex-col justify-center gap-6 z-10 w-48">
                  <div className="text-center mb-2">
                     <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold">Inputs</span>
                  </div>
                  {dataSources.map((item, index) => (
                    <motion.div
                      key={item.id}
                      ref={(el) => { sourceRefs.current[index] = el }}
                      animate={ phase === 'input' ? { x: [0, 5, 0] } : {} }
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group relative"
                    >
                      <div className={`flex items-center gap-3 p-3 rounded-lg border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 hover:border-zinc-700 transition-all cursor-default`}>
                        <div className={`p-2 rounded-md ${item.bg} ${item.color}`}>
                          <item.icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-zinc-300 group-hover:text-white">{item.label}</span>
                      </div>
                      {/* Connection Dot */}
                      <div className={`absolute top-1/2 -right-1.5 w-2.5 h-2.5 rounded-full border border-zinc-700 transition-colors duration-500 ${phase === 'input' ? 'bg-emerald-400 border-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-zinc-800'}`} />
                    </motion.div>
                  ))}
                </div>

                {/* --- Center: ADELOOP CORE --- */}
                <div className="relative z-20 flex-shrink-0">
                   {/* Processing Glow Ring */}
                   <motion.div 
                     className="absolute inset-0 rounded-3xl bg-emerald-500/30 blur-xl"
                     animate={{ opacity: phase === 'processing' ? 1 : 0, scale: phase === 'processing' ? 1.2 : 0.8 }}
                     transition={{ duration: 0.5 }}
                   />

                   <motion.div 
                     ref={adeloopRef}
                     animate={{ 
                        borderColor: phase === 'processing' ? "rgba(16, 185, 129, 0.5)" : "rgba(39, 39, 42, 1)",
                        boxShadow: phase === 'processing' ? "0 0 30px rgba(16, 185, 129, 0.2)" : "0 0 0 rgba(0,0,0,0)"
                     }}
                     className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 flex flex-col items-center justify-center relative overflow-hidden z-10"
                   >
                      {/* Processing State Content */}
                      <AnimatePresence mode="wait">
                        {phase === 'processing' ? (
                            <motion.div 
                                key="processing"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/90"
                            >
                                <div className="relative w-12 h-12 flex items-center justify-center mb-2">
                                    <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30 animate-[spin_3s_linear_infinite]" />
                                    <div className="absolute inset-1 rounded-full border-2 border-emerald-400/50 border-t-transparent animate-[spin_1s_linear_infinite]" />
                                    <Zap className="w-5 h-5 text-emerald-400 fill-emerald-400" />
                                </div>
                                <span className="text-[10px] font-bold text-emerald-400 tracking-widest animate-pulse">PROCESSING</span>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center"
                            >
                                <div className="relative p-3 mb-2 rounded-2xl bg-zinc-900 border border-zinc-800">
                                    <Zap className="w-8 h-8 md:w-10 md:h-10 text-emerald-500" />
                                </div>
                                <div className="text-center">
                                    <div className="text-xs font-bold text-white tracking-wide">ADELOOP</div>
                                    <div className="text-[9px] text-zinc-500 uppercase tracking-wider">Engine</div>
                                </div>
                            </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {/* Status Indicator Dot */}
                      <motion.div 
                        className="absolute top-3 right-3 w-2 h-2 rounded-full"
                        animate={{ 
                            backgroundColor: phase === 'processing' ? '#34d399' : '#52525b', // Emerald-400 vs Zinc-600
                            scale: phase === 'processing' ? [1, 1.5, 1] : 1
                        }}
                        transition={ phase === 'processing' ? { repeat: Infinity, duration: 1 } : {}}
                      />
                   </motion.div>
                </div>

                {/* --- Right Column: DESTINATIONS --- */}
                <div className="flex flex-col justify-center gap-6 z-10 w-48">
                  <div className="text-center mb-2">
                     <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold">Outputs</span>
                  </div>
                  {destinations.map((item, index) => (
                    <motion.div
                      key={item.id}
                      ref={(el) => { destRefs.current[index] = el }}
                      animate={ phase === 'output' ? { x: [0, 5, 0] } : {} }
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="group relative"
                    >
                      {/* Connection Dot (Left Side) */}
                      <div className={`absolute top-1/2 -left-1.5 w-2.5 h-2.5 rounded-full border border-zinc-700 transition-colors duration-500 z-20 ${phase === 'output' ? 'bg-blue-400 border-blue-400 shadow-[0_0_8px_#60a5fa]' : 'bg-zinc-800'}`} />

                      <div className={`flex flex-row-reverse items-center gap-3 p-3 rounded-lg border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 hover:border-zinc-700 transition-all cursor-default text-right`}>
                        <div className={`p-2 rounded-md ${item.bg} ${item.color}`}>
                          <item.icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-zinc-300 group-hover:text-white">{item.label}</span>
                      </div>
                      
                      {/* Success Checkmark (Appears briefly after output) */}
                      <motion.div
                         className="absolute -right-6 top-1/2 -translate-y-1/2"
                         initial={{ opacity: 0, scale: 0 }}
                         animate={ phase === 'output' ? { opacity: [0, 1, 0], scale: [0.5, 1, 0.5] } : { opacity: 0 }}
                         transition={{ duration: 1.5, delay: 1 + index * 0.1 }}
                      >
                         <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

              </div>

          </div>
        </div>
      </div>
    </section>
  )
}