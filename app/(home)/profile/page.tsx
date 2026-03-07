import React from "react"
import Link from "next/link"
import Image from "next/image"
import {
    Github,
    Linkedin,
    Mail,
    MapPin,
    Link as LinkIcon,
    Twitter,
    BookOpen,
    Star,
    Code2,
    ExternalLink,
    Sparkles,
    Zap,
    Layout,
    Globe,
    Terminal,
    Cpu,
    ArrowRightIcon
} from "lucide-react"
import { HexBackground } from "../HexBackground"
import { Button } from "@/components/ui/button"
import Footer from "../Footer"

interface Article {
    id: string | number
    title: string
    url: string
    publishedAt: string
    source: "Dev.to" | "Hashnode"
}

// Reuse the fetching logic from blog/page.tsx (simplified for profile activity)
async function getRecentArticles(): Promise<Article[]> {
    try {
        const devToRes = await fetch("https://dev.to/api/articles?username=adeloop", { next: { revalidate: 3600 } })
        const devTo = await devToRes.json()
        return devTo.slice(0, 3).map((item: any) => ({
            id: item.id,
            title: item.title,
            url: item.url,
            publishedAt: item.published_at,
            source: "Dev.to" as const,
        }))
    } catch (e) {
        return []
    }
}

export default async function ProfilePage() {
    const recentArticles = await getRecentArticles()

    return (
        <div className="relative min-h-screen w-full flex flex-col pt-20">
            {/* <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.2] dark:opacity-[0.1]">
                <HexBackground />
            </div> */}

            <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 pb-32">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-8 md:mt-12">

                    {/* Sidebar - Personal Info */}
                    <aside className="w-full lg:w-[280px] shrink-0 space-y-6">
                        <div className="space-y-4">
                            <div className="relative w-48 h-48 lg:w-full lg:h-auto lg:aspect-square mx-auto lg:mx-0 rounded-full lg:rounded-2xl border-4 border-background shadow-xl overflow-hidden group">
                                <Image
                                    src="/adele.jpg"
                                    alt="Adel Eddarai"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="text-center lg:text-left space-y-1">
                                <h1 className="text-2xl font-bold tracking-tight text-foreground">Adel Eddarai</h1>
                                <p className="text-lg text-muted-foreground font-medium italic opacity-80">@Adeloop Founder</p>
                            </div>
                        </div>

                        <p className="text-sm leading-relaxed text-foreground/90 font-medium lg:text-left text-center px-4 lg:px-0">
                            Full-stack Web Developer & AI Builder. Designing scalable SaaS and intelligent automation systems.
                        </p>

                        <div className="flex flex-col gap-2.5 px-4 lg:px-0 pt-2 border-t lg:border-t-0 border-border">
                            <a href="https://github.com/AdelEddarai" target="_blank" className="flex items-center gap-3 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors">
                                <Github className="size-4" />
                                GitHub
                            </a>
                            <a href="https://www.linkedin.com/in/lee-adel-226512289/" target="_blank" className="flex items-center gap-3 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="size-4" />
                                LinkedIn
                            </a>
                            <a href="mailto:adeleddarai29@gmail.com" target="_blank" className="flex items-center gap-3 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors">
                                <Mail className="size-4" />
                                Email
                            </a>
                            <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
                                <MapPin className="size-4 text-primary/60" />
                                Marrakech, Morocco
                            </div>
                        </div>

                        <div className="space-y-3 px-4 lg:px-0 pt-6">
                            <h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Expertise</h3>
                            <div className="flex flex-wrap gap-1.5">
                                {["Next.js", "TypeScript", "FastAPI", "Python", "RAG", "LLMs", "Autonomous Agents", "DuckDB", "Postgres"].map((tech) => (
                                    <span key={tech} className="px-2 py-0.5 rounded-full bg-primary/5 border border-primary/10 text-[9px] font-bold text-primary/80">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 space-y-10 min-w-0">

                        {/* README Section */}
                        <section className="rounded-xl border border-border bg-card/60 p-6 md:p-10 shadow-sm">
                            <div className="flex items-center gap-2 mb-8 border-b border-border pb-4">
                                <BookOpen className="size-4 text-muted-foreground" />
                                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">README.md</h2>
                            </div>

                            <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:text-foreground/90">
                                <h3 className="text-xl md:text-2xl font-bold mb-4">Hello World! I'm Adel 🇲🇦</h3>
                                <p className="mb-4 text-[15px]">
                                    I specialize in designing and engineering scalable SaaS platforms that combine modern web technologies with intelligent automation.
                                    My expertise spans React, Next.js, and Python, with a strong focus on building AI-powered systems using
                                    <strong> LLMs, RAG architectures, and autonomous agents</strong>.
                                </p>
                                <p className="mb-4 text-[15px]">
                                    I don’t just build interfaces — I build systems that think, automate, and scale. My current focus is <strong>AdeloopAgent</strong>, an automation engine that handles real-time data triggers for big data scenarios where tools like Google Sheets fall short.
                                </p>
                                <p className="mb-4 text-[15px]">
                                    My mission is simple:
                                    <strong> Build high-impact products that solve real business problems using AI and autonomous automation.</strong>
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 not-prose">
                                    <div className="p-4 rounded-lg bg-background/50 border border-border/80 flex gap-4 items-start group">
                                        <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                            <Zap className="size-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold mb-1">Founder @ Adeloop</h4>
                                            <p className="text-xs text-muted-foreground">Alternative to traditional analytics. Unified platform for notebooks & reports.</p>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-background/50 border border-border/80 flex gap-4 items-start group">
                                        <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                            <Globe className="size-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold mb-1">Founder @ Bytona</h4>
                                            <p className="text-xs text-muted-foreground">AI-powered proptech marketplace for streamlined real estate transactions.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Pinned Projects Section */}
                        <section className="space-y-5">
                            <div className="flex items-center gap-2 px-1">
                                <Star className="size-4 text-yellow-500" />
                                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Pinned Projects</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Adeloop */}
                                <div className="group relative rounded-[20px] p-[1.5px] overflow-hidden shadow-sm transition-all hover:shadow-xl  flex flex-col">
                                    <div className="absolute inset-[-100%] transition-opacity duration-500 opacity-[0.1] animate-[spin_4s_linear_infinite]" />
                                    <div className="relative h-full bg-card rounded-[18.5px] flex flex-col overflow-hidden">
                                        <div className="relative h-32 w-full overflow-hidden border-b border-border/50">
                                            <Image
                                                src="/adeloopnotebook.png"
                                                alt="Adeloop Preview"
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="p-5 pt-4 flex flex-col flex-1">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                                    <Terminal className="size-4.5" />
                                                </div>
                                                <a href="/" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                                                    <ExternalLink className="size-4" />
                                                </a>
                                            </div>
                                            <h3 className="text-base font-bold mb-1.5 group-hover:text-primary transition-colors">Adeloop</h3>
                                            <p className="text-[13px] text-muted-foreground mb-4 leading-relaxed flex-1">
                                                Full-stack analytics platform integrating DuckDB and RAG to unify internal data tools.
                                            </p>
                                            <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground border-t border-border/40 pt-3">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="h-2 w-2 rounded-full bg-primary" />
                                                    Next.js
                                                </div>
                                                <div className="flex items-center gap-1.5 text-primary/80">
                                                    <Star className="size-3 fill-current" />
                                                    Live
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* AdeloopAgent */}
                                <div className="group relative rounded-[20px] p-[1.5px] overflow-hidden shadow-sm transition-all hover:shadow-xl hover:shadow-blue-500/10 flex flex-col">
                                    <div className="absolute inset-[-100%] transition-opacity duration-500 opacity-[0.1]  animate-[spin_4s_linear_infinite]" />
                                    <div className="relative h-full bg-card rounded-[18.5px] flex flex-col overflow-hidden">
                                        <div className="relative h-32 w-full overflow-hidden border-b border-border/50">
                                            <Image
                                                src="/aiagent.png"
                                                alt="AdeloopAgent Preview"
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="p-5 pt-4 flex flex-col flex-1">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="h-9 w-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                                                    <Zap className="size-4.5" />
                                                </div>
                                                <span className="text-blue-500/80 text-[10px] font-bold uppercase tracking-wider">New</span>
                                            </div>
                                            <h3 className="text-base font-bold mb-1.5 group-hover:text-blue-500 transition-colors">AdeloopAgent</h3>
                                            <p className="text-[13px] text-muted-foreground mb-4 leading-relaxed flex-1">
                                                N8N-inspired automation for big data. Real-time AI triggers for high-volume data streams.
                                            </p>
                                            <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground border-t border-border/40 pt-3">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                                                    Automation
                                                </div>
                                                <div className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[8px] uppercase">
                                                    Beta
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bytona */}
                                <div className="group relative rounded-[20px] p-[1.5px] overflow-hidden transition-all hover:shadow-xl hover:shadow-emerald-500/10 flex flex-col">
                                    <div className="absolute inset-[-100%] transition-opacity duration-500 opacity-[0.1] animate-[spin_4s_linear_infinite]" />
                                    <div className="relative h-full bg-card rounded-[18.5px] flex flex-col overflow-hidden">
                                        <div className="relative h-32 w-full overflow-hidden border-b border-border/50">
                                            <Image
                                                src="/bytona.png"
                                                alt="Bytona Preview"
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="p-5 pt-4 flex flex-col flex-1">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                                    <Cpu className="size-4.5" />
                                                </div>
                                                <a href="https://bytona.netlify.app" target="_blank" className="text-muted-foreground hover:text-emerald-500 transition-colors">
                                                    <ExternalLink className="size-4" />
                                                </a>
                                            </div>
                                            <h3 className="text-base font-bold mb-1.5 group-hover:text-emerald-500 transition-colors">Bytona</h3>
                                            <p className="text-[13px] text-muted-foreground mb-4 leading-relaxed flex-1">
                                                AI-driven marketplace for real estate, automating listing valuation and match-making algorithms.
                                            </p>
                                            <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground border-t border-border/40 pt-3 mt-auto">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                                    React & Node
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Globe className="size-3" />
                                                    Live
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Latest Blogs Activity Section */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2 px-1">
                                <Star className="size-4 text-primary" />
                                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Recent Activity (Blogs)</h2>
                            </div>

                            <div className="space-y-3">
                                {recentArticles.length > 0 ? (
                                    recentArticles.map((post) => (
                                        <a
                                            key={post.id}
                                            href={post.url}
                                            target="_blank"
                                            className="group flex items-center justify-between p-4 rounded-xl border border-border bg-card/40 hover:bg-card hover:border-primary/40 transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary/60 group-hover:text-primary transition-colors">
                                                    <BookOpen className="size-4" />
                                                </div>
                                                <div className="space-y-0.5">
                                                    <h4 className="text-sm font-bold group-hover:text-primary transition-colors">{post.title}</h4>
                                                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                                                        <span>•</span>
                                                        <span className="font-bold">{post.source}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <ArrowRightIcon className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                        </a>
                                    ))
                                ) : (
                                    <p className="text-xs text-muted-foreground pl-1">No recent activity to show.</p>
                                )}
                                <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-primary px-1 hover:underline">
                                    View all posts
                                    <ArrowRightIcon className="size-3" />
                                </Link>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
