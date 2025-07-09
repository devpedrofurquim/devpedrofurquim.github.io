'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'

type Article = {
    id: string
    title: string
    date: string
    tags: string[]
    slug: string
    excerpt?: string
}

export default function ArchivePage() {
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedTag, setSelectedTag] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [showAllTags, setShowAllTags] = useState(false)

    const ARTICLES_PER_PAGE = 10
    const TAGS_TO_SHOW = 8

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setLoading(true)
                const res = await fetch('/api/notion/blogs')
                const data = await res.json()
                const sortedArticles = data.sort((a: Article, b: Article) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )
                setArticles(sortedArticles)
            } catch (error) {
                console.error('Error fetching articles:', error)
                setArticles([])
            } finally {
                setLoading(false)
            }
        }

        fetchArticles()
    }, [])

    // Get all unique tags
    const allTags = Array.from(
        new Set(articles.flatMap(article => article.tags))
    ).sort()

    // Filter articles by selected tag
    const filteredArticles = selectedTag
        ? articles.filter(article => article.tags.includes(selectedTag))
        : articles

    // Reset page when tag changes
    useEffect(() => {
        setCurrentPage(1)
    }, [selectedTag])

    // Pagination calculations
    const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE)
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE
    const endIndex = startIndex + ARTICLES_PER_PAGE
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex)

    // Group paginated articles by year
    const articlesByYear = paginatedArticles.reduce((acc, article) => {
        const year = new Date(article.date).getFullYear()
        if (!acc[year]) {
            acc[year] = []
        }
        acc[year].push(article)
        return acc
    }, {} as Record<number, Article[]>)

    const years = Object.keys(articlesByYear)
        .map(Number)
        .sort((a, b) => b - a)

    // Tags pagination
    const visibleTags = showAllTags ? allTags : allTags.slice(0, TAGS_TO_SHOW)
    const hasMoreTags = allTags.length > TAGS_TO_SHOW

    if (loading) {
        return (
            <main className="mx-auto max-w-4xl px-6 py-12">
                <div className="text-center py-16">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <p className="text-muted-foreground mt-4 text-sm">Loading articles...</p>
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

            {/* Header */}
            <header className="text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Article Archive
                </h1>
                <div className="w-24 h-px bg-blue-400 mx-auto opacity-80" />
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    A complete collection of my thoughts.
                    {filteredArticles.length > 0 && (
                        selectedTag
                            ? ` ${filteredArticles.length} articles tagged "${selectedTag}".`
                            : ` ${articles.length} articles and counting.`
                    )}
                </p>
            </header>

            {/* Tag filter */}
            {allTags.length > 0 && (
                <section className="space-y-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Tag className="w-5 h-5" />
                        Filter by Topic
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => {
                                setSelectedTag(null)
                                setCurrentPage(1)
                            }}
                            className={selectedTag === null
                                ? 'text-sm px-3 py-1 font-medium cursor-pointer transition-colors bg-blue-400 text-white border border-blue-400'
                                : 'text-sm px-3 py-1 font-medium cursor-pointer transition-colors bg-transparent border border-gray-400 hover:bg-blue-400/10 hover:border-blue-400'
                            }
                        >
                            All ({articles.length})
                        </button>
                        {visibleTags.map(tag => {
                            const count = articles.filter(article => article.tags.includes(tag)).length
                            return (
                                <button
                                    key={tag}
                                    onClick={() => {
                                        setSelectedTag(tag)
                                        setCurrentPage(1)
                                    }}
                                    className={selectedTag === tag
                                        ? 'text-sm px-3 py-1 font-medium cursor-pointer transition-colors bg-blue-400 text-white border border-blue-400'
                                        : 'text-sm px-3 py-1 font-medium cursor-pointer transition-colors bg-transparent border border-gray-400 hover:bg-blue-400/10 hover:border-blue-400'
                                    }
                                >
                                    {tag} ({count})
                                </button>
                            )
                        })}
                        {hasMoreTags && (
                            <button
                                onClick={() => setShowAllTags(!showAllTags)}
                                className="text-sm px-3 py-1 font-medium cursor-pointer transition-colors bg-transparent border border-gray-400 hover:bg-blue-400/10 hover:border-blue-400 text-muted-foreground hover:text-blue-400"
                            >
                                {showAllTags ? 'Show Less' : `+${allTags.length - TAGS_TO_SHOW} More`}
                            </button>
                        )}
                    </div>
                </section>
            )}

            {/* Articles by year */}
            {years.length > 0 ? (
                <section className="space-y-12">
                    {years.map(year => (
                        <div key={year} className="space-y-6">
                            <h2 className="text-2xl font-bold py-2 border-b border-gray-400">
                                {year}
                            </h2>
                            <div className="space-y-6">
                                {articlesByYear[year].map(article => (
                                    <article key={article.id} className="group">
                                        <Link href={`/posts/${article.slug}`} className="block">
                                            <div className="relative border-l-2 border-gray-400 group-hover:border-blue-400 transition-colors duration-300 pl-6 py-4">
                                                <div className="space-y-3">
                                                    {/* Date and tags */}
                                                    <div className="flex flex-wrap items-center gap-4 text-sm">
                                                        <div className="flex items-center gap-1 text-muted-foreground">
                                                            <Calendar className="w-4 h-4" />
                                                            <time>
                                                                {new Date(article.date).toLocaleDateString('en-US', {
                                                                    month: 'short',
                                                                    day: 'numeric'
                                                                })}
                                                            </time>
                                                        </div>
                                                        {article.tags.length > 0 && (
                                                            <div className="flex gap-2">
                                                                {article.tags.slice(0, 3).map((tag, index) => (
                                                                    <span
                                                                        key={index}
                                                                        className="text-xs px-2 py-1 bg-gray-400/10 border border-gray-400 font-medium"
                                                                    >
                                                                        {tag}
                                                                    </span>
                                                                ))}
                                                                {article.tags.length > 3 && (
                                                                    <span className="text-xs px-2 py-1 bg-gray-400/10 border border-gray-400 font-medium">
                                                                        +{article.tags.length - 3}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Title */}
                                                    <h3 className="text-xl font-bold leading-tight group-hover:translate-x-2 transition-transform duration-300">
                                                        {article.title}
                                                    </h3>

                                                    {/* Excerpt */}
                                                    {article.excerpt && (
                                                        <p className="text-muted-foreground line-clamp-2">
                                                            {article.excerpt}
                                                        </p>
                                                    )}

                                                    {/* Read indicator */}
                                                    <div className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-blue-400 transition-colors">
                                                        <div className="w-8 h-px bg-current group-hover:w-12 transition-all duration-300" />
                                                        <span className="font-medium">Read article</span>
                                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </article>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
            ) : (
                <div className="text-center py-16">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-400/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <p className="text-muted-foreground italic">
                        {selectedTag ? `No articles found with the tag "${selectedTag}".` : 'No articles available.'}
                    </p>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <section className="flex justify-center items-center space-x-4 pt-8 border-t border-gray-400">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-400/10 hover:text-blue-400 cursor-pointer"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                    </button>

                    <div className="flex items-center space-x-2">
                        {/* Show page numbers */}
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (currentPage <= 3) {
                                pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            } else {
                                pageNum = currentPage - 2 + i;
                            }

                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`w-10 h-10 text-sm font-medium transition-colors cursor-pointer ${currentPage === pageNum
                                        ? 'bg-blue-400 text-white'
                                        : 'hover:bg-blue-400/10 hover:text-blue-400'
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-400/10 hover:text-blue-400 cursor-pointer"
                    >
                        Next
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </section>
            )}

            {/* Pagination info */}
            {filteredArticles.length > 0 && (
                <div className="text-center text-sm text-muted-foreground">
                    Showing {startIndex + 1}-{Math.min(endIndex, filteredArticles.length)} of {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
                    {selectedTag && ` tagged "${selectedTag}"`}
                </div>
            )}
        </main>
    )
}
