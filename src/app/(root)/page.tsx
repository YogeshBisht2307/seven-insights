import { getPosts } from "@/data/queries";
import Hero from "@/components/sections/Hero";


export const dynamic = 'force-dynamic'

export default async function Home() {
  return (
    <main className="flex flex-col gap-y-20 md:gap-y-32 overflow-hidden">
      <Hero/>
    </main>
  )
}
