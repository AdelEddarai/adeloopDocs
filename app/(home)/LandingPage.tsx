"use client"

import React, { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  BarChart3,
  Brain,
  ArrowRightIcon,
  Sparkles,
  Layers,
  MessageSquare,
  Workflow,
  BookOpen,
} from "lucide-react"
import { HexBackground } from "./HexBackground"
import { Button } from "@/components/ui/button"
import Footer from "./Footer"
import { StreamingAnalytics } from "./StreamingAnalytics"
import {
  DuckDBFlowIllustration,
  RAGFlowIllustration,
  DataIngestionIllustration,
  AgentWorkflowIllustration,
  SemanticLayerIllustration,
} from "./illustrations/DataIllustrations"

const gettingStarted = "/notebook1.png"

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true)
        ob.disconnect()
      }
    }, { threshold: 0.06 })
    if (ref.current) ob.observe(ref.current)
    return () => ob.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-transparent text-foreground selection:bg-primary/20 selection:text-primary flex flex-col">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.4] invert dark:invert-0">
        <HexBackground />
      </div>

      <main className="relative z-10 flex-1 w-full max-w-[1280px] mx-auto px-5 sm:px-8">

        {/* Hero */}
        <section className="pt-14 sm:pt-20 pb-16 sm:pb-24 lg:pb-32">
          <div className="flex flex-col items-center text-center">
            <FadeIn>
              <Link
                href="/docs/adeloop"
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold text-foreground/95 hover:bg-primary/15 hover:border-primary/40 transition-colors"
              >
                <Sparkles className="size-3.5 text-primary" />
                AI-native · DuckDB · RAG
                <ArrowRightIcon className="size-3 opacity-70" />
              </Link>
            </FadeIn>

            <FadeIn delay={100}>
              <h1 className="mt-10 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-foreground leading-[1.1] max-w-4xl mx-auto">
                Next-Generation
                <br />
                <span className="text-primary">Analytics & BI Platform</span>
              </h1>
            </FadeIn>

            <FadeIn delay={180}>
              <p className="mt-6 max-w-xl mx-auto text-sm sm:text-[15px] text-muted-foreground leading-relaxed tracking-tight">
                One workspace for SQL, natural language, and GenAI. Build dashboards and ship insights without switching tools.
              </p>
            </FadeIn>

            <FadeIn delay={260}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link href="/docs/adeloop">
                  <Button
                    className="h-9 rounded-full px-5 text-xs font-semibold bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/90 transition-colors"
                  >
                    Get started
                    <ArrowRightIcon className="ml-1.5 size-3" />
                  </Button>
                </Link>
                <Link href="mailto:adeleddarai29@gmail.com">
                  <Button variant="outline" className="h-9 rounded-full px-5 text-xs font-medium">
                    Contact sales
                  </Button>
                </Link>
              </div>
            </FadeIn>

            <div
              className={`mt-14 sm:mt-18 w-full max-w-7xl mx-auto transition-all duration-800 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="relative rounded-[16px] p-[1.5px] overflow-hidden shadow-2xl isolate group cursor-default">
                {/* Animated Border Background */}
                <div className="absolute inset-[-100%] transition-opacity duration-500 animate-[spin_4s_linear_infinite]"
                  style={{ background: 'conic-gradient(from 0deg, transparent 0 340deg, hsl(var(--primary)) 360deg)' }} />

                {/* Inner Window Wrapper */}
                <div className="relative bg-background rounded-[14.5px] overflow-hidden transition-transform duration-500 group-hover:scale-[0.995]">

                  <Image
                    src={gettingStarted}
                    alt="Adeloop platform"
                    width={1400}
                    height={785}
                    priority
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento features */}
        <section className="py-4 sm:py-6">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              <Link
                href="/docs/adeloop"
                className="group flex flex-col rounded-2xl border border-border bg-card/60 p-6 sm:p-7 hover:bg-card hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary mb-4">
                  <BarChart3 className="size-6" />
                </div>
                <h3 className="text-sm sm:text-[15px] font-semibold text-foreground mb-1.5">Analytics at scale</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  DuckDB-powered SQL. Sub-second queries on massive datasets.
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more
                  <ArrowRightIcon className="ml-1 size-4" />
                </span>
              </Link>

              <Link
                href="/docs/architecture/rag"
                className="group flex flex-col rounded-2xl border border-border bg-card/60 p-6 sm:p-7 hover:bg-card hover:border-primary/30 transition-all duration-300 md:mt-0"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary mb-4">
                  <Brain className="size-6" />
                </div>
                <h3 className="text-sm sm:text-[15px] font-semibold text-foreground mb-1.5">GenAI & RAG</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ask in plain language. Get charts, insights, and narratives from your data.
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more
                  <ArrowRightIcon className="ml-1 size-4" />
                </span>
              </Link>

              <Link
                href="/docs/adeloop"
                className="group flex flex-col rounded-2xl border border-border bg-card/60 p-6 sm:p-7 hover:bg-card hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary mb-4">
                  <Workflow className="size-6" />
                </div>
                <h3 className="text-sm sm:text-[15px] font-semibold text-foreground mb-1.5">Unified pipelines</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ETL, notebooks, and dashboards in one place. No context switching.
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more
                  <ArrowRightIcon className="ml-1 size-4" />
                </span>
              </Link>
            </div>
          </FadeIn>
        </section>

        {/* How it works — illustrations */}
        <section id="highlights" className="pt-12 sm:pt-16 pb-14 sm:pb-20 scroll-mt-20">
          <FadeIn>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-foreground text-center mb-2">
              How it works
            </h2>
            <p className="text-muted-foreground text-center text-sm sm:text-[15px] max-w-lg mx-auto mb-10">
              Architecture and flows from the docs, at a glance.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            <FadeIn delay={0}>
              <Link
                href="/docs/architecture/duckdb"
                className="group flex flex-col h-full rounded-2xl border-2 border-border bg-card/60 p-6 hover:bg-card hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-full min-h-[100px] flex items-center justify-center rounded-xl border border-border/60 bg-muted/50 p-4 mb-4 text-foreground overflow-visible">
                  <DuckDBFlowIllustration />
                </div>
                <h3 className="text-sm sm:text-[15px] font-semibold text-foreground mb-1">DuckDB architecture</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Client → API → DuckDB. Server-side SQL and Python interoperability.
                </p>
                <span className="mt-auto pt-3 inline-flex items-center text-xs font-medium text-primary">
                  Read in docs
                  <ArrowRightIcon className="ml-1 size-3.5" />
                </span>
              </Link>
            </FadeIn>
            <FadeIn delay={50}>
              <Link
                href="/docs/architecture/rag"
                className="group flex flex-col h-full rounded-2xl border-2 border-border bg-card/60 p-6 hover:bg-card hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-full min-h-[100px] flex items-center justify-center rounded-xl border border-border/60 bg-muted/50 p-4 mb-4 text-foreground overflow-visible">
                  <RAGFlowIllustration />
                </div>
                <h3 className="text-sm sm:text-[15px] font-semibold text-foreground mb-1">RAG & GenAI flow</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Docs → embed → vector DB → LLM → grounded answers.
                </p>
                <span className="mt-auto pt-3 inline-flex items-center text-xs font-medium text-primary">
                  Read in docs
                  <ArrowRightIcon className="ml-1 size-3.5" />
                </span>
              </Link>
            </FadeIn>
            <FadeIn delay={100}>
              <Link
                href="/docs/architecture/data-ingestion"
                className="group flex flex-col h-full rounded-2xl border-2 border-border bg-card/60 p-6 hover:bg-card hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-full min-h-[100px] flex items-center justify-center rounded-xl border border-border/60 bg-muted/50 p-4 mb-4 text-foreground overflow-visible">
                  <DataIngestionIllustration />
                </div>
                <h3 className="text-sm sm:text-[15px] font-semibold text-foreground mb-1">Data ingestion</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Files and external DBs → unified import → validation → storage.
                </p>
                <span className="mt-auto pt-3 inline-flex items-center text-xs font-medium text-primary">
                  Read in docs
                  <ArrowRightIcon className="ml-1 size-3.5" />
                </span>
              </Link>
            </FadeIn>
            <FadeIn delay={150}>
              <Link
                href="/docs/agents"
                className="group flex flex-col h-full rounded-2xl border-2 border-border bg-card/60 p-6 hover:bg-card hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-full min-h-[100px] flex items-center justify-center rounded-xl border border-border/60 bg-muted/50 p-4 mb-4 text-foreground overflow-visible">
                  <AgentWorkflowIllustration />
                </div>
                <h3 className="text-sm sm:text-[15px] font-semibold text-foreground mb-1">AI agents</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Trigger → retrieve (RAG) → reason → act → persist.
                </p>
                <span className="mt-auto pt-3 inline-flex items-center text-xs font-medium text-primary">
                  Read in docs
                  <ArrowRightIcon className="ml-1 size-3.5" />
                </span>
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* Live Data Stream */}
        <section className="pt-12 sm:pt-16 pb-14 sm:pb-20">
          <FadeIn>
            <StreamingAnalytics />
          </FadeIn>
        </section>

        {/* Capabilities + CTA block */}
        <section className="pt-20 sm:pt-28 pb-20 sm:pb-32">
          <div className="rounded-3xl border border-border bg-card/30 p-8 sm:p-12 lg:p-16 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <FadeIn>
                <div className="space-y-8">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider mb-6">
                      <Layers className="size-3" />
                      Semantic & ETL
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-[1.1]">
                      Built for <span className="text-primary">Data Engineers</span> & Teams
                    </h2>
                    <p className="mt-6 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl opacity-90">
                      Adeloop bridges the gap between raw data and AI insights. Build versioned semantic layers, automate real-time ETL triggers, and ship unified analytics.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { icon: MessageSquare, title: "AI-Powered SQL", text: "Natural language to sub-second DuckDB queries." },
                      { icon: Brain, title: "Semantic RAG", text: "Map business logic to your data structure." },
                      { icon: Workflow, title: "Live Automation", text: "Real-time AI triggers for high-volume streams." },
                      { icon: Layers, title: "Modern ETL", text: "Scale beyond spreadsheets with pythonic flows." },
                    ].map((item, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center gap-2.5">
                          <item.icon className="size-4.5 text-primary" />
                          <h4 className="text-sm font-bold">{item.title}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <Link href="/docs/adeloop">
                      <Button className="h-10 rounded-full px-6 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90">
                        Get started
                        <ArrowRightIcon className="ml-2 size-3.5" />
                      </Button>
                    </Link>
                    <Link href="/blog">
                      <Button variant="outline" className="h-10 rounded-full px-6 text-xs font-bold gap-2">
                        <BookOpen className="size-3.5" />
                        Explore our Blog
                      </Button>
                    </Link>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={100}>
                <div className="relative">
                  <div className="absolute -inset-10 bg-primary/10 blur-[80px] rounded-full opacity-20 animate-pulse" />
                  <div className="relative rounded-2xl border border-border/60 bg-background/50 p-6 sm:p-8 shadow-2xl backdrop-blur-sm group-hover:border-primary/20 transition-all duration-500">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/40">
                      <div className="flex gap-1.5">
                        <div className="size-2.5 rounded-full bg-red-400/20 border border-red-400/30" />
                        <div className="size-2.5 rounded-full bg-yellow-400/20 border border-yellow-400/30" />
                        <div className="size-2.5 rounded-full bg-green-400/20 border border-green-400/30" />
                      </div>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Semantic Flow</span>
                    </div>
                    <div className="w-full">
                      <SemanticLayerIllustration />
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="pb-24 sm:pb-32">
          <FadeIn>
            <div className="rounded-2xl border border-border bg-primary/5 py-12 sm:py-16 px-6 sm:px-10 text-center">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-foreground">
                Ready to ship better analytics?
              </h2>
              <p className="mt-2 text-sm sm:text-[15px] text-muted-foreground max-w-md mx-auto">
                Get started with the docs or talk to us for a walkthrough.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link href="/docs/adeloop">
                  <Button
                    className="h-9 rounded-full px-5 text-xs font-semibold bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/90 transition-colors"
                  >
                    Get started
                    <ArrowRightIcon className="ml-1.5 size-3" />
                  </Button>
                </Link>
                <Link href="mailto:adeleddarai29@gmail.com">
                  <Button variant="outline" className="h-9 rounded-full px-5 text-xs font-medium">
                    Contact sales
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </section>
      </main>

      <Footer />
    </div>
  )
}
