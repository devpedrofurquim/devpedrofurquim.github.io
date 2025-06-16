'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Github, Menu } from '@deemlol/next-icons'
import ThemeSwitch from './ThemeSwitcher'

const navItems = [
    { href: '/works', label: 'Works', icon: null },
    { href: '/games', label: 'Games', icon: null },
    { href: '/posts', label: 'Articles & Videos', },
    { href: 'https://github.com/devpedrofurquim', label: 'Github', external: true, icon: <Github size={18} /> },
]

export default function Navbar() {
    const pathname = usePathname()
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className="flex justify-around items-center bg-transparent relative">
            {/* Logo */}
            <Link href="/" className="text-lg text-primary">
                Pedro Furquim
            </Link>

            {/* Desktop nav */}
            <div className="hidden sm:flex gap-6">
                {navItems.map(({ href, label, external, icon }) =>
                    external ? (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                        >
                            {icon}
                            {label}
                        </a>
                    ) : (
                        <Link
                            key={label}
                            href={href}
                            className={`flex items-center gap-2 ${pathname === href ? 'text-primary' : 'text-primary'} hover:text-primary transition-colors`}
                        >
                            {icon}
                            {label}
                        </Link>
                    )
                )}
            </div>

            <div className='flex gap-4 items-center'>
                <ThemeSwitch />
                {/* Mobile Menu Icon */}
                <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden">
                    <Menu size={24} />
                </button>
            </div>

            {/* Mobile dropdown menu */}
            {menuOpen && (
                <div className="absolute flex justify-end flex-col items-start top-full right-4 mt-2 rounded-md border border-gray-800 shadow-lg w-48 py-2 sm:hidden z-50">
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
