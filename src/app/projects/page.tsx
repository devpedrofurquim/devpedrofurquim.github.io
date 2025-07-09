'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from 'lucide-react'

type Project = {
    id: string
    title: string
    description: string
    technologies: string[]
    status: 'completed' | 'in-progress' | 'planned'
    date: string
    githubUrl?: string
    liveUrl?: string
    category: 'web' | 'mobile' | 'game' | 'tool' | 'experiment'
    featured: boolean
    image?: string
}

// Sample projects data - you can move this to an API or external file later
const projects: Project[] = [
    {
        id: '1',
        title: 'D281 Studio',
        description: 'My personal development and creative studio where I craft pixel art games and digital experiences.',
        technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
        status: 'completed',
        date: '2024-12-01',
        liveUrl: 'https://d281-git-main-pedr-furquims-projects.vercel.app/',
        category: 'web',
        featured: true
    },
    {
        id: '2',
        title: 'Lawfirm Website',
        description: 'Responsive, fast and intuitive website develepd for a proeminent brazilian law firm.',
        technologies: ['Html', 'Bootstrap', 'Css', 'Javascript'],
        status: 'completed',
        date: '2024-02-01',
        liveUrl: 'https://www.furquimadv.com.br/',
        category: 'web',
        featured: false
    },
    {
        id: '3',
        title: 'Solana Crypto Landing page',
        description: 'A landing page developed for a brazilian solana crypto token called FLAP',
        technologies: ['React', 'Next.js', 'TypeScript', 'Framer Motion', 'Tailwind'],
        status: 'completed',
        date: '2024-02-01',
        liveUrl: 'https://flap-token-landing-page.vercel.app/',
        category: 'web',
        featured: false
    },
    // {
    //     id: '2',
    //     title: 'Wrapd',
    //     description: 'A GitHub companion app that transforms your yearly activity into beautiful, shareable visual stories.',
    //     longDescription: 'Wrapd takes your GitHub contributions and creates stunning visualizations that tell the story of your coding year. Think Spotify Wrapped, but for developers. It analyzes your commits, languages, and coding patterns to generate personalized insights.',
    //     technologies: ['React Native', 'Node.js', 'GitHub API', 'Data Visualization', 'MongoDB'],
    //     status: 'in-progress',
    //     date: '2025-05-15',
    //     githubUrl: 'https://github.com/devpedrofurquim/wrapd',
    //     category: 'mobile',
    //     featured: true
    // },
    // {
    //     id: '3',
    //     title: 'No More Staying Indoors',
    //     description: 'A narrative pixel art game about a little ghost searching for a lost cat in a cozy, mysterious world.',
    //     longDescription: 'An atmospheric pixel art adventure that combines storytelling with exploration. Players guide a gentle ghost through beautifully crafted environments, solving puzzles and uncovering the story of a missing feline friend.',
    //     technologies: ['Java', 'Pixel Art', 'Game Design', 'Sound Design'],
    //     status: 'in-progress',
    //     date: '2024-08-20',
    //     category: 'game',
    //     featured: true
    // },
    {
        id: '6',
        title: 'Minimalist Portfolio',
        description: 'A clean, accessible portfolio template focusing on typography and minimal design principles.',
        technologies: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Accessibility'],
        status: 'planned',
        date: '2026-02-01',
        category: 'tool',
        featured: false
    }
]

const categories = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'web', label: 'Web', count: projects.filter(p => p.category === 'web').length },
    // { id: 'mobile', label: 'Mobile', count: projects.filter(p => p.category === 'mobile').length },
    // { id: 'game', label: 'Games', count: projects.filter(p => p.category === 'game').length },
    { id: 'tool', label: 'Tools', count: projects.filter(p => p.category === 'tool').length },
    // { id: 'experiment', label: 'Experiments', count: projects.filter(p => p.category === 'experiment').length }
]

const statusColors = {
    'completed': 'text-green-600 bg-green-50 border-green-200',
    'in-progress': 'text-blue-600 bg-blue-50 border-blue-200',
    'planned': 'text-gray-600 bg-gray-50 border-gray-200'
}

const statusLabels = {
    'completed': 'Completed',
    'in-progress': 'In Progress',
    'planned': 'Planned'
}

export default function ProjectsPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [showOnlyFeatured, setShowOnlyFeatured] = useState(false)

    // Filter projects
    const filteredProjects = projects.filter(project => {
        const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory
        const featuredMatch = !showOnlyFeatured || project.featured
        return categoryMatch && featuredMatch
    })

    // Separate featured and regular projects
    const featuredProjects = filteredProjects.filter(p => p.featured)
    const regularProjects = filteredProjects.filter(p => !p.featured)

    return (
        <main className="mx-auto max-w-4xl px-6 py-12 space-y-16">
            {/* Back navigation */}
            <div>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-blue-400 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>
            </div>

            {/* Header */}
            <header className="text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    My Projects
                </h1>
                <div className="w-24 h-px bg-blue-400 mx-auto opacity-80" />
                <p className="text-lg text-muted-foreground max-w-1xl mx-auto leading-relaxed">
                    A collection of things I've built, experiments I've tried, and ideas I've helped bring to life.
                </p>
            </header>

            {/* Filters */}
            <section className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Tag className="w-5 h-5" />
                        Filter Projects
                    </h2>
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={showOnlyFeatured}
                            onChange={(e) => setShowOnlyFeatured(e.target.checked)}
                            className="w-4 h-4 text-blue-400 border-gray-400 focus:ring-blue-400 focus:ring-2"
                        />
                        <span>Featured only</span>
                    </label>
                </div>

                <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={selectedCategory === category.id
                                ? 'text-sm px-3 py-1 font-medium cursor-pointer transition-colors bg-blue-400 text-white border border-blue-400'
                                : 'text-sm px-3 py-1 font-medium cursor-pointer transition-colors bg-transparent border border-gray-400 hover:bg-blue-400/10 hover:border-blue-400'
                            }
                        >
                            {category.label} ({category.count})
                        </button>
                    ))}
                </div>
            </section>

            {/* Featured Projects */}
            {featuredProjects.length > 0 && !showOnlyFeatured && (
                <section className="space-y-8">
                    <div className="flex items-center gap-6">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-400/60 to-transparent" />
                        <h2 className="text-2xl font-bold tracking-wide">Featured Projects</h2>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-400/60 to-transparent" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {featuredProjects.map(project => (
                            <article key={project.id} className="group">
                                <div className="border border-gray-400 p-6 hover:bg-blue-400/5 hover:border-blue-400 transition-all duration-300 space-y-4">
                                    {/* Project header */}
                                    <div className="space-y-3">
                                        <div className="flex items-start justify-between gap-4">
                                            <h3 className="text-xl font-bold leading-tight group-hover:text-blue-400 transition-colors">
                                                {project.title}
                                            </h3>
                                            <span className={`text-xs px-2 py-1 border font-medium whitespace-nowrap ${statusColors[project.status]}`}>
                                                {statusLabels[project.status]}
                                            </span>
                                        </div>

                                        <p className="text-muted-foreground leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.slice(0, 4).map((tech, index) => (
                                            <span
                                                key={index}
                                                className="text-xs px-2 py-1 bg-gray-400/10 border border-gray-400 font-medium"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 4 && (
                                            <span className="text-xs px-2 py-1 bg-gray-400/10 border border-gray-400 font-medium">
                                                +{project.technologies.length - 4}
                                            </span>
                                        )}
                                    </div>

                                    {/* Project links */}
                                    <div className="flex items-center gap-4 pt-2">
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-500 transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                Live Demo
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-500 transition-colors"
                                            >
                                                <Github className="w-4 h-4" />
                                                Source Code
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {/* All Projects */}
            {(regularProjects.length > 0 || showOnlyFeatured) && (
                <section className="space-y-8">
                    <div className="flex items-center gap-6">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-400/60 to-transparent" />
                        <h2 className="text-2xl font-bold tracking-wide">
                            {showOnlyFeatured ? 'Featured Projects' : 'All Projects'}
                        </h2>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-400/60 to-transparent" />
                    </div>

                    <div className="space-y-6">
                        {(showOnlyFeatured ? featuredProjects : regularProjects).map(project => (
                            <article key={project.id} className="group">
                                <div className="relative border-l-2 border-gray-400 group-hover:border-blue-400 transition-colors duration-300 pl-6 py-4">
                                    <div className="space-y-4">
                                        {/* Project header */}
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-xl font-bold leading-tight group-hover:translate-x-2 transition-transform duration-300">
                                                        {project.title}
                                                    </h3>
                                                    <span className={`text-xs px-2 py-1 border font-medium ${statusColors[project.status]}`}>
                                                        {statusLabels[project.status]}
                                                    </span>
                                                </div>
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {project.description}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-1 text-sm text-muted-foreground whitespace-nowrap">
                                                <Calendar className="w-4 h-4" />
                                                <time>
                                                    {new Date(project.date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short'
                                                    })}
                                                </time>
                                            </div>
                                        </div>

                                        {/* Technologies */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, index) => (
                                                <span
                                                    key={index}
                                                    className="text-xs px-2 py-1 bg-gray-400/10 border border-gray-400 font-medium"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Project links and read indicator */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                {project.liveUrl && (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-500 transition-colors"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                        Live Demo
                                                    </a>
                                                )}
                                                {project.githubUrl && (
                                                    <a
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-500 transition-colors"
                                                    >
                                                        <Github className="w-4 h-4" />
                                                        Source Code
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {/* Empty state */}
            {filteredProjects.length === 0 && (
                <div className="text-center py-16">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-400/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <p className="text-muted-foreground italic">
                        No projects found in this category.
                    </p>
                </div>
            )}

            {/* Call to action */}
            <section className="text-center py-8 border-t border-gray-400">
                <h2 className="text-2xl font-bold mb-4">Let's Build Something Together</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    I'm always excited to collaborate on interesting projects or discuss new ideas.
                    Whether it's a web app, mobile solution, or creative experiment, let's make it happen.
                </p>
                <Link
                    href="https://www.linkedin.com/in/pedro-furquim/"
                    target="_blank"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-400 text-white hover:bg-blue-500 transition-colors duration-300 font-medium"
                >
                    Start a Conversation
                    <ExternalLink className="w-4 h-4" />
                </Link>
            </section>
        </main>
    )
}
