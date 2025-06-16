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
            className="cursor-pointer hover:bg-gray-300 w-10 h-10 justify-center items-center mx-auto flex rounded-md"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        >
            {resolvedTheme === 'dark' ? (
                <Sun size={24} />
            ) : (
                <Moon size={24} />
            )}
        </button>
    )
}

export default ThemeSwitcher;