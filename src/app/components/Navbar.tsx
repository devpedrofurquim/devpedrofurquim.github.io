'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu } from '@deemlol/next-icons'
import ThemeSwitch from './ThemeSwitcher'

const navItems = [
    { href: '/works', label: 'Works' },
    { href: '/games', label: 'Games' },
    { href: '/posts', label: 'Articles & Videos' },
    { href: 'https://github.com/devpedrofurquim', label: 'Github', external: true },
]

export default function Navbar() {
    const pathname = usePathname()
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className="flex justify-around items-center bg-transparent relative">
            {/* Logo */}
            <Link href="/" className="text-white text-lg">
                Pedro Furquim
            </Link>

            {/* Desktop nav */}
            <div className="hidden sm:flex gap-6">
                {navItems.map(({ href, label, external }) =>
                    external ? (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground hover:text-white transition-colors"
                        >
                            {label}
                        </a>
                    ) : (
                        <Link
                            key={label}
                            href={href}
                            className={`${pathname === href ? 'text-foreground' : 'text-gray-400'
                                } hover:text-white transition-colors`}
                        >
                            {label}
                        </Link>
                    )
                )}
            </div>

            {/* Mobile Menu Icon */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden">
                <Menu size={24} color="#FFFFFF" />
            </button>

            <ThemeSwitch />

            {/* Mobile dropdown menu */}
            {menuOpen && (
                <div className="absolute top-full right-4 mt-2 bg-[#111] rounded-md border border-gray-800 shadow-lg w-48 py-2 sm:hidden z-50">
                    {navItems.map(({ href, label, external }) =>
                        external ? (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                            >
                                {label}
                            </a>
                        ) : (
                            <Link
                                key={label}
                                href={href}
                                onClick={() => setMenuOpen(false)}
                                className={`block px-4 py-2 text-sm ${pathname === href ? 'text-white' : 'text-gray-400'
                                    } hover:bg-gray-800 hover:text-white`}
                            >
                                {label}
                            </Link>
                        )
                    )}
                </div>
            )}
        </nav>
    )
}
