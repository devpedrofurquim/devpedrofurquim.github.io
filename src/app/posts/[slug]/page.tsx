'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react'

type Article = {
    id: string
    title: string
    date: string
    tags: string[]
    slug: string
    content: string
    readTime?: string
    excerpt?: string
}

export default function BlogPostPage() {
    const params = useParams()
    const slug = params.slug as string

    const [article, setArticle] = useState<Article | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/notion/blogs/${slug}`)

                if (!res.ok) {
                    throw new Error('Article not found')
                }

                const data = await res.json()
                setArticle(data)
            } catch (error) {
                console.error('Error fetching article:', error)
                setError(error instanceof Error ? error.message : 'Failed to load article')
            } finally {
                setLoading(false)
            }
        }

        if (slug) {
            fetchArticle()
        }
    }, [slug])

    if (loading) {
        return (
            <main className="mx-auto max-w-4xl px-6 py-12">
                <div className="text-center py-16">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <p className="text-muted-foreground mt-4 text-sm">Loading article...</p>
                </div>
            </main>
        )
    }

    if (error || !article) {
        return (
            <main className="mx-auto max-w-4xl px-6 py-12">
                <div className="text-center py-16">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-xl font-bold text-red-600 dark:text-red-400">
                            Article Not Found
                        </h1>
                        <p className="text-muted-foreground">
                            The article you're looking for doesn't exist or has been moved.
                        </p>
                        <Link
                            href="/posts"
                            className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-blue-400 hover:text-blue-500 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Posts
                        </Link>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="mx-auto max-w-4xl px-6 py-12 space-y-12">
            {/* Back navigation */}
            <div>
                <Link
                    href="/posts"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-blue-400 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Posts
                </Link>
            </div>

            {/* Article header */}
            <header className="space-y-8">
                {/* Article meta */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <time>
                            {new Date(article.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                    </div>

                    {article.readTime && (
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{article.readTime}</span>
                        </div>
                    )}
                </div>

                {/* Article title */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                        {article.title}
                    </h1>

                    {article.excerpt && (
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                            {article.excerpt}
                        </p>
                    )}
                </div>

                {/* Tags */}
                {article.tags.length > 0 && (
                    <div className="flex items-center gap-3">
                        <Tag className="w-4 h-4 text-muted-foreground" />
                        <div className="flex flex-wrap gap-2">
                            {article.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="text-xs px-3 py-1 bg-gray-400/10 border border-gray-400 font-medium"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Divider */}
                <div className="w-24 h-px bg-blue-400 opacity-80" />
            </header>

            {/* Article content */}
            <article className="prose prose-lg dark:prose-invert max-w-none">
                <div
                    className="blog-content space-y-6 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </article>

            {/* Footer navigation */}
            <footer className="pt-12 border-t border-gray-400">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <Link
                        href="/posts"
                        className="inline-flex items-center gap-3 text-sm font-medium text-blue-400 hover:text-blue-500 transition-all duration-300 group border border-gray-400 hover:border-blue-400 px-6 py-3 hover:bg-blue-400/5"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>All Articles</span>
                    </Link>

                    <div className="text-center space-y-2">
                        <p className="text-sm text-muted-foreground">Enjoyed this article?</p>
                        <a
                            href="https://twitter.com/intent/tweet?text=Check out this article by @pedro_furquim"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-500 transition-colors"
                        >
                            Share on Twitter
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </footer>
        </main>
    )
}
