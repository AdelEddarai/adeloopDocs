"use client"

import React, { useId } from "react"

const strokeWidth = 1.5

/** DuckDB: Client → API → DuckDB */
export function DuckDBFlowIllustration({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "")
  const stroke = "currentColor"
  const primary = "hsl(var(--primary))"
  return (
    <svg
      viewBox="0 0 280 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: "100%", height: "100%", minHeight: "80px" }}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <marker id={`arrow-db-${id}`} markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <path d="M0 0 L8 3 L0 6 Z" fill={stroke} opacity={0.7} />
        </marker>
      </defs>
      <rect x="8" y="24" width="56" height="52" rx="8" stroke={stroke} strokeWidth={strokeWidth} opacity={0.9} />
      <path d="M12 36 h48 M12 44 h36 M12 52 h40" stroke={stroke} strokeWidth={1} opacity={0.5} />
      <text x="36" y="68" textAnchor="middle" fill={stroke} fontSize="9" fontWeight="600" opacity={0.9}>Client</text>
      <path d="M72 50 L98 50" stroke={stroke} strokeWidth={strokeWidth} opacity={0.6} markerEnd={`url(#arrow-db-${id})`} />
      <rect x="102" y="22" width="56" height="56" rx="8" stroke={stroke} strokeWidth={strokeWidth} opacity={0.9} />
      <text x="130" y="58" textAnchor="middle" fill={stroke} fontSize="9" fontWeight="600" opacity={0.9}>API</text>
      <path d="M166 50 L192 50" stroke={stroke} strokeWidth={strokeWidth} opacity={0.6} markerEnd={`url(#arrow-db-${id})`} />
      <rect x="196" y="20" width="76" height="60" rx="8" stroke={primary} strokeWidth={strokeWidth} opacity={0.95} />
      <ellipse cx="234" cy="42" rx="12" ry="8" stroke={primary} strokeWidth={1} opacity={0.7} />
      <path d="M224 58 L244 58 M234 50 L234 66" stroke={primary} strokeWidth={1} opacity={0.6} />
      <text x="234" y="78" textAnchor="middle" fill={stroke} fontSize="9" fontWeight="600" opacity={0.9}>DuckDB</text>
    </svg>
  )
}

/** RAG: Docs → Embed → Vector DB → LLM → Answer */
export function RAGFlowIllustration({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "")
  const stroke = "currentColor"
  const primary = "hsl(var(--primary))"
  return (
    <svg
      viewBox="0 0 320 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: "100%", height: "100%", minHeight: "80px" }}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <marker id={`arrow-rag-${id}`} markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <path d="M0 0 L8 3 L0 6 Z" fill={stroke} opacity={0.7} />
        </marker>
      </defs>
      <rect x="4" y="32" width="48" height="56" rx="6" stroke={stroke} strokeWidth={strokeWidth} opacity={0.85} />
      <path d="M12 44 L44 44 M12 52 L40 52 M12 60 L36 60" stroke={stroke} strokeWidth={1} opacity={0.5} />
      <text x="28" y="98" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="500" opacity={0.8}>Docs</text>
      <path d="M58 60 L82 60" stroke={stroke} strokeWidth={strokeWidth} opacity={0.6} markerEnd={`url(#arrow-rag-${id})`} />
      <rect x="86" y="38" width="52" height="44" rx="6" stroke={stroke} strokeWidth={strokeWidth} opacity={0.85} />
      <circle cx="112" cy="58" r="6" stroke={stroke} strokeWidth={1} opacity={0.6} />
      <path d="M98 72 L126 72" stroke={stroke} strokeWidth={1} opacity={0.5} />
      <text x="112" y="88" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="500" opacity={0.8}>Embed</text>
      <path d="M144 60 L168 60" stroke={stroke} strokeWidth={strokeWidth} opacity={0.6} markerEnd={`url(#arrow-rag-${id})`} />
      <rect x="172" y="28" width="56" height="64" rx="6" stroke={primary} strokeWidth={strokeWidth} opacity={0.9} />
      <path d="M182 42 L238 42 M182 52 L230 52 M182 62 L234 62 M182 72 L228 72" stroke={primary} strokeWidth={1} opacity={0.5} />
      <text x="200" y="96" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="500" opacity={0.8}>Vector DB</text>
      <path d="M234 60 L258 60" stroke={stroke} strokeWidth={strokeWidth} opacity={0.6} markerEnd={`url(#arrow-rag-${id})`} />
      <rect x="262" y="36" width="52" height="48" rx="6" stroke={stroke} strokeWidth={strokeWidth} opacity={0.85} />
      <path d="M272 50 L304 50 M272 60 L300 60 M272 70 L296 70" stroke={stroke} strokeWidth={1} opacity={0.5} />
      <text x="288" y="88" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="500" opacity={0.8}>LLM</text>
      <path d="M288 84 L288 100 L160 100 L160 84" stroke={primary} strokeWidth={strokeWidth} opacity={0.5} markerEnd={`url(#arrow-rag-${id})`} />
      <rect x="54" y="100" width="100" height="18" rx="4" fill={primary} fillOpacity={0.2} stroke={primary} strokeWidth={strokeWidth} opacity={0.9} />
      <text x="104" y="112" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="600" opacity={0.9}>Answer</text>
    </svg>
  )
}

/** Data ingestion: Files + DBs → Unified Import → Storage */
export function DataIngestionIllustration({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "")
  const stroke = "currentColor"
  const primary = "hsl(var(--primary))"
  return (
    <svg
      viewBox="0 0 300 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: "100%", height: "100%", minHeight: "80px" }}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <marker id={`arrow-ingest-${id}`} markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <path d="M0 0 L8 3 L0 6 Z" fill={stroke} opacity={0.7} />
        </marker>
      </defs>
      <rect x="8" y="20" width="52" height="32" rx="4" stroke={stroke} strokeWidth={strokeWidth} opacity={0.85} />
      <text x="34" y="38" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="500" opacity={0.8}>CSV</text>
      <rect x="8" y="58" width="52" height="32" rx="4" stroke={stroke} strokeWidth={strokeWidth} opacity={0.85} />
      <text x="34" y="76" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="500" opacity={0.8}>Excel</text>
      <rect x="72" y="28" width="52" height="44" rx="4" stroke={stroke} strokeWidth={strokeWidth} opacity={0.85} />
      <ellipse cx="98" cy="48" rx="8" ry="6" stroke={stroke} strokeWidth={1} opacity={0.5} />
      <text x="98" y="78" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="500" opacity={0.8}>Postgres</text>
      <path d="M66 36 L108 36" stroke={stroke} strokeWidth={strokeWidth} opacity={0.6} markerEnd={`url(#arrow-ingest-${id})`} />
      <path d="M66 66 L108 66" stroke={stroke} strokeWidth={strokeWidth} opacity={0.6} markerEnd={`url(#arrow-ingest-${id})`} />
      <path d="M66 50 L108 50" stroke={stroke} strokeWidth={strokeWidth} opacity={0.6} markerEnd={`url(#arrow-ingest-${id})`} />
      <rect x="118" y="28" width="72" height="54" rx="8" stroke={primary} strokeWidth={strokeWidth} opacity={0.9} />
      <path d="M128 42 L182 42 M128 52 L178 52 M128 62 L180 62 M128 72 L174 72" stroke={primary} strokeWidth={1} opacity={0.5} />
      <text x="154" y="88" textAnchor="middle" fill={stroke} fontSize="9" fontWeight="600" opacity={0.9}>Unified Import</text>
      <path d="M196 55 L220 55" stroke={stroke} strokeWidth={strokeWidth} opacity={0.6} markerEnd={`url(#arrow-ingest-${id})`} />
      <rect x="224" y="32" width="68" height="46" rx="6" stroke={stroke} strokeWidth={strokeWidth} opacity={0.85} />
      <path d="M234 44 L286 44 M234 54 L282 54 M234 64 L284 64" stroke={stroke} strokeWidth={1} opacity={0.5} />
      <text x="258" y="82" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="500" opacity={0.8}>Storage</text>
    </svg>
  )
}

/** Agent: Trigger → Retrieve → Reason → Act */
export function AgentWorkflowIllustration({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "")
  const stroke = "currentColor"
  const primary = "hsl(var(--primary))"
  return (
    <svg
      viewBox="0 0 340 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: "100%", height: "100%", minHeight: "80px" }}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <marker id={`arrow-agent-${id}`} markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <path d="M0 0 L8 3 L0 6 Z" fill={stroke} opacity={0.7} />
        </marker>
      </defs>
      <rect x="4" y="28" width="58" height="44" rx="6" stroke={stroke} strokeWidth={strokeWidth} opacity={0.85} />
      <circle cx="33" cy="48" r="4" fill={stroke} opacity={0.4} />
      <path d="M22 58 L44 58" stroke={stroke} strokeWidth={1} opacity={0.5} />
      <text x="33" y="78" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="500" opacity={0.8}>Trigger</text>
      <path d="M68 50 L92 50" stroke={stroke} strokeWidth={strokeWidth} opacity={0.6} markerEnd={`url(#arrow-agent-${id})`} />
      <rect x="96" y="26" width="58" height="48" rx="6" stroke={stroke} strokeWidth={strokeWidth} opacity={0.85} />
      <path d="M106 40 L148 40 M106 50 L144 50 M106 60 L146 60" stroke={stroke} strokeWidth={1} opacity={0.5} />
      <text x="125" y="78" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="500" opacity={0.8}>Retrieve</text>
      <path d="M160 50 L184 50" stroke={stroke} strokeWidth={strokeWidth} opacity={0.6} markerEnd={`url(#arrow-agent-${id})`} />
      <rect x="188" y="24" width="58" height="52" rx="6" stroke={primary} strokeWidth={strokeWidth} opacity={0.9} />
      <path d="M198 42 L244 42 M198 52 L242 52 M198 62 L240 62 M198 72 L244 72" stroke={primary} strokeWidth={1} opacity={0.5} />
      <text x="217" y="80" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="500" opacity={0.8}>Reason</text>
      <path d="M252 50 L276 50" stroke={stroke} strokeWidth={strokeWidth} opacity={0.6} markerEnd={`url(#arrow-agent-${id})`} />
      <rect x="280" y="28" width="52" height="44" rx="6" stroke={stroke} strokeWidth={strokeWidth} opacity={0.85} />
      <path d="M290 42 L328 42 M290 52 L324 52 M290 62 L326 62" stroke={stroke} strokeWidth={1} opacity={0.5} />
      <text x="306" y="78" textAnchor="middle" fill={stroke} fontSize="8" fontWeight="500" opacity={0.8}>Act</text>
    </svg>
  )
}
