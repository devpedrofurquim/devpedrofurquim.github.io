'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon } from "@deemlol/next-icons";
import { Sun } from "@deemlol/next-icons";


const ThemeSwitcher = () => {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)


    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    return (
        <button
            className="cursor-pointer hover:bg-blue-300/10 w-10 h-10 justify-center items-center flex border transition-all duration-300 hover:border-blue-300 focus:border-blue-300 focus:outline-none"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`}
        >
            {resolvedTheme === 'dark' ? (
                <Sun size={20} className="text-white hover:text-blue-300 transition-colors" />
            ) : (
                <Moon size={20} className="text-black hover:text-blue-300 transition-colors" />
            )}
        </button>
    )
}

export default ThemeSwitcher;