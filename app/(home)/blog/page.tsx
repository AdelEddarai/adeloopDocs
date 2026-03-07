import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRightIcon, Calendar, Clock, ExternalLink, Sparkles } from "lucide-react"
import { HexBackground } from "../HexBackground"
import { Button } from "@/components/ui/button"
import Footer from "../Footer"

interface Article {
    id: string | number
    title: string
    description: string
    url: string
    coverImage: string
    publishedAt: string
    readingTime?: number | string
    source: "Dev.to" | "Hashnode"
    tags?: string[]
}

async function getDevToArticles(): Promise<Article[]> {
    try {
        const res = await fetch("https://dev.to/api/articles?username=adeloop", {
            next: { revalidate: 3600 },
        })
        if (!res.ok) throw new Error("Failed to fetch Dev.to articles")
        const data = await res.json()
        return data.map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            url: item.url,
            coverImage: item.cover_image || item.social_image,
            publishedAt: item.published_at,
            readingTime: item.reading_time_minutes,
            source: "Dev.to",
            tags: item.tag_list,
        }))
    } catch (error) {
        console.error(error)
        return []
    }
}

async function getHashnodeArticles(): Promise<Article[]> {
    const query = `
    query Publication {
      publication(host: "adeloop.hashnode.dev") {
        posts(first: 10) {
          edges {
            node {
              id
              title
              brief
              slug
              coverImage {
                url
              }
              publishedAt
              readTimeInMinutes
              tags {
                name
              }
            }
          }
        }
      }
    }
  `

    try {
        const res = await fetch("https://gql.hashnode.com", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query }),
            next: { revalidate: 3600 },
        })

        if (!res.ok) throw new Error("Failed to fetch Hashnode articles")
        const { data } = await res.json()

        if (!data?.publication?.posts?.edges) return []

        return data.publication.posts.edges.map(({ node }: any) => ({
            id: node.id,
            title: node.title,
            description: node.brief,
            url: `https://adeloop.hashnode.dev/${node.slug}`,
            coverImage: node.coverImage?.url,
            publishedAt: node.publishedAt,
            readingTime: node.readTimeInMinutes,
            source: "Hashnode",
            tags: node.tags?.map((t: any) => t.name),
        }))
    } catch (error) {
        console.error(error)
        return []
    }
}

function BlogCard({ article }: { article: Article }) {
    const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })

    return (
        <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col h-full rounded-2xl border border-border bg-card/40 overflow-hidden hover:bg-card hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5 active:scale-[0.98]"
        >
            <div className="relative aspect-[16/9] overflow-hidden">
                {article.coverImage ? (
                    <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Sparkles className="size-8 text-primary/20" />
                    </div>
                )}
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                    {article.source}
                    <ExternalLink className="size-2.5" />
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-3 font-medium">
                    <div className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {date}
                    </div>
                    {article.readingTime && (
                        <div className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {article.readingTime} min read
                        </div>
                    )}
                </div>

                <h3 className="text-base font-bold leading-tight text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                    {article.title}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                    {article.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                    {article.tags?.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-full bg-primary/5 border border-primary/10 text-[9px] font-bold text-primary/80">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        </a>
    )
}

export default async function BlogPage() {
    const [devTo, hashnode] = await Promise.all([
        getDevToArticles(),
        getHashnodeArticles(),
    ])

    const allArticles = [...devTo, ...hashnode].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-transparent text-foreground selection:bg-primary/20 selection:text-primary flex flex-col">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.4] invert dark:invert-0">
                <HexBackground />
            </div>

            <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-24 pb-20">
                <div className="max-w-3xl mb-16">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary mb-4">
                        <Sparkles className="size-3" />
                        Latest Updates
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
                        Adeloop <span className="text-primary">Insights</span>
                    </h1>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                        Thoughts, tutorials, and engineering updates from the Adeloop team. Dive deep into the future of data analytics, RAG architectures, and AI-native workflows.
                    </p>
                </div>

                {allArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {allArticles.map((article) => (
                            <BlogCard key={article.id} article={article} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 border border-dashed border-border rounded-2xl bg-card/20">
                        <p className="text-muted-foreground">No articles found. Check back soon!</p>
                    </div>
                )}

                {/* Bottom CTA */}
                <div className="mt-24 rounded-2xl border border-border bg-primary/5 py-12 px-6 text-center">
                    <h2 className="text-xl font-bold tracking-tight text-foreground mb-2">
                        Stay in the loop
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto mb-8">
                        Follow our journey on Dev.to and Hashnode for the latest technical deep-dives.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <a href="https://dev.to/adeloop" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="h-9 rounded-full px-5 text-xs font-medium">
                                Dev.to
                            </Button>
                        </a>
                        <a href="https://adeloop.hashnode.dev/" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="h-9 rounded-full px-5 text-xs font-medium">
                                Hashnode
                            </Button>
                        </a>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
