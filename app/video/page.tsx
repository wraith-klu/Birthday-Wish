import Hearts from "@/components/Hearts";
import VideoHero from "@/components/VideoHero";
import Link from "next/link";

export default function VideoPage() {
  return (
    <main className="min-h-screen flex flex-col items-center py-12 px-6 gap-8">
      <Hearts />
      <div className="w-full max-w-6xl">
        <VideoHero />
        <div className="mt-8 text-center">
          <p className="text-lg">A little scene woven with flowers and sunlight — for you.</p>
          <div className="mt-6">
            <Link href="/"><button className="px-4 py-2 rounded bg-white/90 text-pink-600">Back Home</button></Link>
          </div>
        </div>
      </div>
    </main>
  );
}
