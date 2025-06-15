'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'


export default function ThemeSwitch() {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)


    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    return (
        <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="ml-4 px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
        >
            {resolvedTheme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
    )
}
