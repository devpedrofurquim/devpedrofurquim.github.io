'use client'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'


export default function Home() {

  const { theme } = useTheme();
  return (
    <main className="mx-auto space-y-12">
      {/* Intro */}
      <section className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
        {/* Avatar */}
        <div className="rounded-full overflow-hidden w-32 h-32 shrink-0">
          <Image
            src="/photo.jpeg"
            alt="Pedro Furquim avatar"
            width={132}
            height={132}
            className="object-cover w-full h-full"
          />
        </div>
        {/* Text */}
        <div className="flex flex-col gap-2 text-base text-muted-foreground">
          <p>
            Hey! I’m Pedro — a 25-year-old mobile developer and indie game creator based in São Paulo.
          </p>
          <p>
            This is my little corner of the internet (as long as I remember to pay the domain). Here you’ll find my thoughts on life, building a game with no engine, working as a mobile engineer, painting, and trying to make something meaningful out of it all.
          </p>
          <p>
            Check out <Link href="https://d281-git-main-pedr-furquims-projects.vercel.app/" target="_blank" className="text-primary underline">D281</Link>, my tiny game dev & art studio.
            You can also find me on{" "}
            <Link href="https://www.linkedin.com/in/pedro-furquim/" target="_blank" className="text-primary underline">LinkedIn</Link>,{" "}
            <Link href="https://github.com/devpedrofurquim" target="_blank" className="text-primary underline">GitHub</Link>, and{" "}
            <Link href="https://www.instagram.com/pedro.furquim/" target="_blank" className="text-primary underline">Instagram</Link>.
          </p>
        </div>
      </section>
    </main>
  )
}
