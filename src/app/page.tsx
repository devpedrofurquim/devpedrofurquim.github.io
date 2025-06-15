import Image from 'next/image'

export default function Home() {
  return (
    <main className="px-6 py-12 max-w-xl mx-auto space-y-12">
      <section>
        <h1 className="text-3xl font-bold">Pedro Furquim</h1>
        <p className="text-gray-600 mt-2">Mobile developer & game creator</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">About Me</h2>
        <p className="text-gray-700">
          I build thoughtful apps and stories. Currently working on mobile projects
          and indie games in Java.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Projects</h2>
        <ul className="space-y-2">
          <li className="border-b pb-2">Sitrax – vehicle tracking app</li>
          <li className="border-b pb-2">Orbitar – background location & IAP</li>
          <li className="border-b pb-2">No More Staying Indoors – 2D pixel ghost RPG</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Contact</h2>
        <div className="flex gap-4 text-xl">
          <a href="https://github.com/yourusername" target="_blank">GitHub</a>
          <a href="https://linkedin.com/in/yourusername" target="_blank">LinkedIn</a>
          <a href="mailto:you@email.com">Email</a>
        </div>
      </section>
    </main>
  )
}
