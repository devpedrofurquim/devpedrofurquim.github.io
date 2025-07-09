'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

type Video = {
    id: string
    title: string
    description: string
    thumbnail: string
    url: string
    publishDate: string
}

type Article = {
    id: string
    title: string
    date: string
    tags: string[]
    slug: string
}


export default function PostsPage() {
    const { resolvedTheme } = useTheme()
    const [videos, setVideos] = useState<Video[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [articles, setArticles] = useState<Article[]>([])
    const [articlesLoading, setArticlesLoading] = useState(true)

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setArticlesLoading(true)
                const res = await fetch('/api/notion/blogs')
                const data = await res.json()
                const sortedArticles = data
                    .sort((a: Article, b: Article) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 3)
                setArticles(sortedArticles)
            } catch (error) {
                console.error('Error fetching articles:', error)
                setArticles([])
            } finally {
                setArticlesLoading(false)
            }
        }

        fetchArticles()
    }, [])

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true)

                const response = await fetch('/api/youtube/recent')

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json()

                if (Array.isArray(data)) {
                    setVideos(data)
                    setError(null)
                } else {
                    console.error('API did not return an array:', data)
                    setError('Invalid response format')
                    setVideos([])
                }
            } catch (err) {
                console.error('Error fetching videos:', err)
                setError(err instanceof Error ? err.message : 'Unknown error')
                setVideos([])
            } finally {
                setLoading(false)
            }
        }

        fetchVideos()
    }, [])

    return (
        <main className="mx-auto max-w-4xl px-6 py-12 space-y-16">
            {/* Header */}
            <section className="text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Articles & Videos
                </h1>
                <div className="w-24 h-px bg-blue-400 mx-auto opacity-80" />
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Thoughts on development & creativity.
                </p>
            </section>

            {/* Articles */}
            <section className="space-y-12">
                <div className="flex items-center gap-6">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-400/60 to-transparent" />
                    <h2 className="text-2xl font-bold tracking-wide">Latest Articles</h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-400/60 to-transparent" />
                </div>

                {articlesLoading ? (
                    <div className="text-center py-16">
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <p className="text-muted-foreground mt-4 text-sm">Loading articles...</p>
                    </div>
                ) : articles.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-400/10 flex items-center justify-center">
                            <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <p className="text-muted-foreground italic">No articles available at the moment.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {articles.map((article, index) => (
                            <article key={article.id} className="group">
                                <Link href={`/posts/${article.slug}`} className="block">
                                    <div className="relative overflow-hidden">


                                        <div className="relative border-l-2 border-gray-400 group-hover:border-blue-400 transition-colors duration-300 pl-4 md:pl-8">
                                            {/* Mobile Layout */}
                                            <div className="md:hidden">
                                                <div className="space-y-3">


                                                    {/* Mobile title */}
                                                    <h3 className="text-lg font-bold leading-tight group-hover:translate-x-1 transition-transform duration-300">
                                                        {article.title}
                                                    </h3>

                                                    {/* Mobile tags */}
                                                    <div className="flex flex-wrap gap-2">
                                                        {article.tags.slice(0, 2).map((tag, tagIndex) => (
                                                            <span
                                                                key={tagIndex}
                                                                className="text-xs px-2 py-1 bg-gray-400/10 border border-gray-400 font-medium"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {article.tags.length > 2 && (
                                                            <span className="text-xs px-2 py-1 bg-gray-400/10 border border-gray-400 font-medium">
                                                                +{article.tags.length - 2}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Mobile read indicator */}
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-blue-400 transition-colors">
                                                        <div className="w-6 h-px bg-current group-hover:w-8 transition-all duration-300" />
                                                        <span className="font-medium">Read article</span>
                                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Desktop Layout */}
                                            <div className="hidden md:flex items-start gap-6">


                                                {/* Desktop content */}
                                                <div className="flex-1 py-2 space-y-3">
                                                    {/* Desktop date and tags row */}
                                                    <div className="flex items-center justify-between">
                                                        <time className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
                                                            {new Date(article.date).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric'
                                                            })}
                                                        </time>
                                                        <div className="flex gap-2">
                                                            {article.tags.slice(0, 2).map((tag, tagIndex) => (
                                                                <span
                                                                    key={tagIndex}
                                                                    className="text-xs px-2 py-1 bg-gray-400/10 border border-gray-400 font-medium"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                            {article.tags.length > 2 && (
                                                                <span className="text-xs px-2 py-1 bg-gray-400/10 border border-gray-400 font-medium">
                                                                    +{article.tags.length - 2}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Desktop title */}
                                                    <h3 className="text-xl font-bold leading-tight group-hover:translate-x-2 transition-transform duration-300">
                                                        {article.title}
                                                    </h3>

                                                    {/* Desktop read indicator */}
                                                    <div className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-blue-400 transition-colors">
                                                        <div className="w-8 h-px bg-current group-hover:w-12 transition-all duration-300" />
                                                        <span className="font-medium">Read article</span>
                                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                )}

                {/* View all articles link */}
                <div className="text-center pt-12">
                    <Link
                        href="/posts/archive"
                        className="inline-flex items-center gap-3 text-sm font-medium text-blue-400 hover:text-blue-500 transition-all duration-300 group border border-gray-400 hover:border-blue-400 px-6 py-3 hover:bg-blue-400/5"
                    >
                        <span>Explore All Articles</span>
                        <div className="w-6 h-px bg-blue-400 group-hover:w-8 transition-all duration-300" />
                    </Link>
                </div>
            </section>

            {/* YouTube Videos */}
            <section className="space-y-12">
                <div className="flex items-center gap-6">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-400/60 to-transparent" />
                    <h2 className="text-2xl font-bold tracking-wide">Latest Videos</h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-400/60 to-transparent" />
                </div>

                {loading ? (
                    <div className="text-center py-16">
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <p className="text-muted-foreground mt-4 text-sm">Loading videos...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="space-y-2">
                            <p className="text-red-600 dark:text-red-400 font-medium">
                                Error loading videos
                            </p>
                            <p className="text-muted-foreground text-sm">
                                Unable to load videos at this time. Please try again later.
                            </p>
                        </div>
                    </div>
                ) : videos.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-400/10 flex items-center justify-center">
                            <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-muted-foreground italic">No videos available at this time.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {videos.map((video) => (
                            <article key={video.id} className="group">
                                <a
                                    href={video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block border border-gray-400 overflow-hidden hover:bg-blue-400/5 hover:border-blue-400 transition-all duration-300"
                                >
                                    <div className="relative aspect-video bg-black/10 dark:bg-white/10">
                                        {video.thumbnail ? (
                                            <Image
                                                src={video.thumbnail}
                                                alt={video.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-16 h-16 bg-gray-400/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 space-y-2">
                                        <div className="text-sm text-muted-foreground">
                                            {new Date(video.publishDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </div>
                                        <h3 className="font-semibold group-hover:text-blue-400 transition-colors duration-300">{video.title}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {video.description}
                                        </p>
                                    </div>
                                </a>
                            </article>
                        ))}
                    </div>
                )}

                {/* Visit YouTube Channel link */}
                <div className="text-center pt-12">
                    <a
                        href="https://youtube.com/@pedro_furquim"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-sm font-medium text-blue-400 hover:text-blue-500 transition-all duration-300 group border border-gray-400 hover:border-blue-400 px-6 py-3 hover:bg-blue-400/5"
                    >
                        <span>Visit YouTube Channel</span>
                        <div className="w-6 h-px bg-blue-400 group-hover:w-8 transition-all duration-300" />
                    </a>
                </div>
            </section>

            {/* Newsletter
            <section className="text-center py-8 border-t border-gray-400">
                <h2 className="text-2xl font-bold">Stay Updated</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                    Get notified when I publish new articles or videos.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto mt-4">
                    <input
                        type="email"
                        placeholder="your@email.com"
                        className="flex-1 px-4 py-2 border border-gray-400 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
                    />
                    <button className="px-6 py-2 cursor-pointer bg-blue-400 text-white hover:bg-blue-500 transition-colors duration-300 font-medium">
                        Subscribe
                    </button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                    You can unsubscribe at any time.
                </p>
            </section> */}
        </main>
    )
}
