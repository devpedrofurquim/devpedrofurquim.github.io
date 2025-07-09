'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Github, Menu } from '@deemlol/next-icons'
import ThemeSwitch from './ThemeSwitcher'
import { useTheme } from 'next-themes'


const navItems = [
    { href: '/projects', label: 'Projects', icon: null },
    { href: '/posts', label: 'Articles & Videos', icon: null },
    { href: 'https://github.com/devpedrofurquim', label: 'GitHub', external: true, icon: <Github size={18} /> },
]

export default function Navbar() {
    const pathname = usePathname()
    const [menuOpen, setMenuOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    // Prevent hydration mismatch by not rendering theme-dependent classes until mounted
    if (!mounted) {
        return (
            <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                {/* Desktop nav */}
                <div className="hidden sm:flex items-center gap-8">
                    {navItems.map(({ href, label, external, icon }) =>
                        external ? (<a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-medium hover:text-blue-400 transition-colors duration-300"
                        >
                            {icon}
                            {label}
                        </a>
                        ) : (<Link
                            key={label}
                            href={href}
                            className="text-sm font-medium hover:text-blue-400 transition-colors duration-300"
                        >
                            {label}
                        </Link>
                        )
                    )}
                    <ThemeSwitch />
                </div>

                {/* Mobile Menu Icon */}
                <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden">
                    <Menu size={24} />
                </button>
            </nav>
        )
    }

    return (
        <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-800 relative">
            {/* Logo - Cozy Garden Theme */}
            <Link href="/" className="text-xl font-bold tracking-tight hover:text-blue-400 transition-colors duration-300">
                Pedro's digital space
            </Link>

            {/* Desktop nav */}
            <div className="hidden sm:flex items-center gap-8">
                {navItems.map(({ href, label, external, icon }) =>
                    external ? (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-medium hover:text-blue-400 transition-colors duration-300"
                        >
                            {icon}
                            {label}
                        </a>
                    ) : (
                        <Link
                            key={label}
                            href={href}
                            className={`text-sm font-medium transition-colors duration-300 ${pathname === href
                                ? 'text-blue-400'
                                : 'hover:text-blue-400'
                                }`}
                        >
                            {label}
                        </Link>
                    )
                )}
                <div className="ml-2">
                    <ThemeSwitch />
                </div>
            </div>

            {/* Mobile Menu Icon */}
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="sm:hidden hover:text-blue-400 transition-colors duration-300"
            >
                <Menu size={24} />
            </button>

            {/* Mobile dropdown menu */}
            {menuOpen && (
                <div className={`absolute top-full items-start right-6 mt-2 rounded-lg border shadow-lg w-48 py-2 sm:hidden z-50 ${resolvedTheme === 'dark'
                    ? 'bg-black border-white/20'
                    : 'bg-white border-black/20'
                    }`}>
                    {navItems.map(({ href, label, external, icon }) =>
                        external ? (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors duration-300 hover:text-blue-400`}
                            >
                                {icon}
                                {label}
                            </a>
                        ) : (
                            <Link
                                key={label}
                                href={href}
                                onClick={() => setMenuOpen(false)}
                                className={`block px-4 py-2 text-sm transition-colors duration-300 ${pathname === href
                                    ? 'text-blue-400'
                                    : 'hover:text-blue-400'
                                    }`}
                            >
                                {label}
                            </Link>
                        )
                    )}
                    <div className="border-t border-gray-200 dark:border-gray-800 mt-2 pt-2 px-4">
                        <ThemeSwitch />
                    </div>
                </div>
            )}
        </nav>
    )
}
