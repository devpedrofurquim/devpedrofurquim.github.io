'use client'
import { useTheme } from 'next-themes'
import Image from 'next/image'

export default function Home() {

  const { theme } = useTheme();
  return (
    <main className="px-6 py-12 max-w-xl mx-auto space-y-12">
      The current theme is: {theme}
    </main>
  )
}
