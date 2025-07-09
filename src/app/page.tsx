'use client'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Modal from './components/Modal'


export default function Home() {
  const [showModal, setShowModal] = useState(false)

  const { resolvedTheme } = useTheme()

  // Paintings data
  const paintings = [
    {
      id: 1,
      src: "/painting-1.jpeg",
      title: "Painting 1",
      alt: "Painting 1"
    },
    {
      id: 2,
      src: "/painting-2.jpeg",
      title: "Painting 2",
      alt: "Painting 2"
    },
    {
      id: 3,
      src: "/painting-3.jpeg",
      title: "Painting 3",
      alt: "Painting 3"
    },
  ]

  // Modal buttons configuration
  const modalButtons = [
    {
      label: 'Got it',
      onClick: () => setShowModal(false),
      variant: 'secondary' as const
    },
    {
      label: "Hire Me",
      onClick: () => { },
      variant: 'primary' as const,
      href: 'https://www.linkedin.com/in/pedro-furquim/',
      external: true
    }
  ]

  // Theme-aware text color for modal content
  const mutedTextColor = resolvedTheme === 'dark' ? 'text-white/80' : 'text-black/80'

  return (
    <main className="mx-auto max-w-4xl px-6 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="relative">
          <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-6 ring-2 ring-black/10 dark:ring-white/10">
            <Image
              src="/profile.jpeg"
              alt="Pedro Furquim avatar"
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Welcome to my digital space, where I share my passion for building good software,
            game design & art in general.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-blue-400 text-white hover:bg-blue-500 transition-colors duration-300 font-medium flex items-center gap-2"
          >
            My Career
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex gap-4">
            <Link
              href="https://www.linkedin.com/in/pedro-furquim/"
              target="_blank"
              className="p-3 border border-black/20 dark:border-white/20 hover:border-blue-300 hover:bg-blue-300/10 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </Link>
            <Link
              href="https://github.com/devpedrofurquim"
              target="_blank"
              className="p-3 border border-black/20 dark:border-white/20 hover:border-blue-300 hover:bg-blue-300/10 transition-all duration-300"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </Link>
            <Link
              href="https://www.instagram.com/pedro.furquim/"
              target="_blank"
              className="p-3 border border-black/20 dark:border-white/20 hover:border-blue-300 hover:bg-blue-300/10 transition-all duration-300"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <div className="w-16 h-px bg-blue-300 mx-auto opacity-80"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Software Developer</h3>
            <p className="text-muted-foreground leading-relaxed">
              I'm a 25-year-old mobile developer and computer engineer student based in Brazil. I love crafting elegant software and bringing creative ideas to life.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My mission is to build meaningful software that makes a difference — whether it's a mobile app, a web platform, or even an indie game.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Current Focus</h3>
            <p className="text-muted-foreground leading-relaxed">
              I'm currently working on finishing my computer Engineering bachelor.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I'm also passionate about clean architecture and open source.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Paintings */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Latest Paintings</h2>
          <div className="w-16 h-px bg-blue-300 mx-auto opacity-80"></div>
        </div>

        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-4">
            {paintings.map((painting) => (
              <div key={painting.id} className="flex-shrink-0 w-64">
                <div className="group cursor-pointer">
                  <div className="border border-black/20 dark:border-white/20 p-4 hover:bg-blue-300/5 hover:border-blue-300 transition-all duration-300">
                    <div className="aspect-square overflow-hidden mb-4">
                      <Image
                        src={painting.src}
                        alt={painting.alt}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-semibold text-center">{painting.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Featured Work</h2>
          <div className="w-16 h-px bg-blue-300 mx-auto opacity-80"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-black/20 dark:border-white/20 p-6 hover:bg-blue-300/5 hover:border-blue-300 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-300/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18.5l-7-7 7-7 7 7-7 7z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">D281 Studio</h3>
            <p className="text-sm text-muted-foreground mb-4">
              My game development and art studio where I create pixel art games and digital experiences.
            </p>
            <Link
              href="https://d281-git-main-pedr-furquims-projects.vercel.app/"
              target="_blank"
              className="text-sm font-medium text-blue-400 hover:text-blue-500 transition-colors duration-300"
            >
              Visit Studio →
            </Link>
          </div>

          <div className="border border-black/20 dark:border-white/20 p-6 hover:bg-blue-300/5 hover:border-blue-300 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-300/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Articles & Videos</h3>
            <p className="text-sm text-muted-foreground mb-4">
              I share my knowledge through written articles and video content about development, architecture, and creativity.
            </p>
            <Link
              href="/posts"
              className="text-sm font-medium text-blue-400 hover:text-blue-500 transition-colors duration-300"
            >
              Read Articles →
            </Link>
          </div>
          {/* 
          <div className="border border-black/20 dark:border-white/20 p-6 hover:bg-blue-300/5 hover:border-blue-300 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-300/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Games & Experiments</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Creative projects, game prototypes, and experimental code that explore the boundaries of interactive media.
            </p>
            <Link
              href="/games"
              className="text-sm font-medium text-blue-400 hover:text-blue-500 transition-colors duration-300"
            >
              Play Games →
            </Link>
          </div> */}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Let's Connect</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          I'm always excited to discuss new projects, collaborate on creative ideas,
          or just chat about technology and game development.
        </p>
        <Link
          href="https://www.linkedin.com/in/pedro-furquim/"
          target="_blank"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-400 text-white hover:bg-blue-500 transition-colors duration-300 font-medium"
        >
          Get in Touch
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>
      </section>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="My Career"
        buttons={modalButtons}
        maxWidth="lg"
      >
        <div className="space-y-6">
          {/* Education Section */}
          <div>
            <h3 className={`text-lg font-semibold mb-3 ${mutedTextColor}`}>Education</h3>
            <div className="space-y-3">
              <div className={`${mutedTextColor}`}>
                <div className="font-medium">Computer Engineering</div>
                <div className="text-sm opacity-75">UNISO (Sorocaba SP) • 2022-2028</div>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h3 className={`text-lg font-semibold mb-3 ${mutedTextColor}`}>Professional Experience</h3>
            <div className="space-y-3">
              <div className={`${mutedTextColor}`}>
                <div className="font-medium">Mobile Developer</div>
                <div className="text-sm opacity-75">TANTTO • 2025-Present</div>
                <div className="text-sm opacity-75 mt-1">Creating Flutter apps with great performance, clean UI, and scalable code.</div>
              </div>
              <div className={`${mutedTextColor}`}>
                <div className="font-medium">Mobile Developer</div>
                <div className="text-sm opacity-75">Sitallcom • 2024-2025</div>
                <div className="text-sm opacity-75 mt-1">Developed React Native apps with Expo for over 30,000 users, focusing on scalability, performance, and smooth user experience.</div>
              </div>
              <div className={`${mutedTextColor}`}>
                <div className="font-medium">Intern Developer</div>
                <div className="text-sm opacity-75">Mark Studios • 2023</div>
                <div className="text-sm opacity-75 mt-1">Contributed to web apps using React.js and Node.js, with a focus on clean code and unit testing with Jest in an agile environment.
                </div>
              </div>
            </div>
          </div>

          {/* Notable Projects */}
          <div>
            <h3 className={`text-lg font-semibold mb-3 ${mutedTextColor}`}>Notable Projects</h3>
            <div className="space-y-4">
              <div className={`${mutedTextColor}`}>
                <div className="font-medium">D281 Studio</div>
                <div className="text-sm opacity-75 mt-1 mb-2">My software development studio</div>
                <a
                  href="https://d281-git-main-pedr-furquims-projects.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium hover:opacity-70 transition-opacity border border-current rounded px-2 py-1"
                >
                  Visit Studio
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              <div className={`${mutedTextColor}`}>
                <div className="font-medium">Wrapd - Work in progress</div>
                <div className="text-sm opacity-75 mt-1 mb-2">A GitHub companion app that turns your yearly activity into shareable visual stories.</div>
                <a
                  href="https://github.com/devpedrofurquim/wrapd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium hover:opacity-70 transition-opacity border border-current rounded px-2 py-1"
                >
                  View on GitHub
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Skills & Expertise */}
          <div>
            <h3 className={`text-lg font-semibold mb-3 ${mutedTextColor}`}>Technical Skills</h3>
            <div className={`text-sm ${mutedTextColor} opacity-75`}>
              Mobile Development • React Native • Flutter • JavaScript/TypeScript • Node.js • Game Development • Pixel Art • UI/UX Design • Clean Architecture • Agile Development
            </div>
          </div>
        </div>
      </Modal>
    </main>
  )
}
