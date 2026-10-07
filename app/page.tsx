import { ProductHero } from '@/components/product-hero'
import { VideoLibrary } from '@/components/video-library'

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <ProductHero />
      <VideoLibrary />
      <footer className="border-t border-border py-8">
        <p className="mx-auto max-w-6xl px-4 text-sm text-muted-foreground">
          LG K62 &middot; Octa-Core 2.3 GHz &middot; 4GB/64GB
        </p>
      </footer>
    </main>
  )
}
